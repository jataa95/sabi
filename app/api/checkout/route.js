import { priceCart } from "@/lib/cart";
import { formatPrice } from "@/data/products";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Prices the bag on the server and starts a Paystack transaction.
// Returns the Paystack page to send the customer to.
export async function POST(request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return Response.json({ error: "Payments aren't switched on yet. Please DM us on Instagram to order." }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request." }, { status: 400 });
  }

  const customer = {
    name: clean(body?.customer?.name, 100),
    email: clean(body?.customer?.email, 150).toLowerCase(),
    phone: clean(body?.customer?.phone, 30),
    address: clean(body?.customer?.address, 300),
    city: clean(body?.customer?.city, 80),
    state: clean(body?.customer?.state, 80),
    notes: clean(body?.customer?.notes, 500),
  };
  const deliveryId = clean(body?.delivery, 20);
  const cart = priceCart(body?.items, deliveryId);

  const errors = [...cart.errors];
  if (!customer.name) errors.push("Enter your name.");
  if (!EMAIL.test(customer.email)) errors.push("Enter a valid email address.");
  if (customer.phone.replace(/\D/g, "").length < 7) errors.push("Enter a valid phone number.");
  if (deliveryId !== "pickup" && (!customer.address || !customer.city || !customer.state)) errors.push("Enter your delivery address, city and state.");
  if (errors.length) return Response.json({ error: errors[0], errors }, { status: 400 });

  const origin = new URL(request.url).origin;
  const items = cart.lines.map((l) => `${l.qty} × ${l.name} (${[l.colour, `size ${l.size}`].filter(Boolean).join(", ")})`).join("; ");
  const address = deliveryId === "pickup" ? "Store pickup" : [customer.address, customer.city, customer.state].join(", ");

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: customer.email,
      amount: cart.total * 100, // kobo
      currency: "NGN",
      callback_url: `${origin}/checkout/success`,
      metadata: {
        expected_amount: cart.total * 100,
        lines: cart.lines,
        delivery: cart.delivery.label,
        delivery_fee: cart.fee,
        customer,
        // These show on the transaction in your Paystack dashboard.
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: customer.name },
          { display_name: "Phone", variable_name: "phone", value: customer.phone },
          { display_name: "Items", variable_name: "items", value: items },
          { display_name: "Delivery", variable_name: "delivery", value: `${cart.delivery.label} (${formatPrice(cart.fee)})` },
          { display_name: "Address", variable_name: "address", value: address },
          ...(customer.notes ? [{ display_name: "Notes", variable_name: "notes", value: customer.notes }] : []),
        ],
      },
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.status) {
    console.error("Paystack initialize failed", res.status, data?.message);
    return Response.json({ error: "We couldn't start the payment. Please try again in a moment." }, { status: 502 });
  }
  return Response.json({ url: data.data.authorization_url, reference: data.data.reference });
}
