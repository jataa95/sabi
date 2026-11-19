import { getProduct } from "@/data/products";
import { deliveryOptions } from "@/data/site";

export const MAX_QTY = 10;

export const lineKey = ({ slug, size, colour }) => `${slug}|${size}|${colour || ""}`;

// Prices a cart from the catalogue. Used on the server so the browser can't change the amount.
export function priceCart(items, deliveryId) {
  const errors = [];
  const lines = [];
  if (!Array.isArray(items) || items.length === 0) errors.push("Your bag is empty.");
  for (const it of Array.isArray(items) ? items.slice(0, 50) : []) {
    const p = getProduct(it?.slug);
    const qty = Number(it?.qty);
    if (!p) { errors.push("A product in your bag no longer exists."); continue; }
    if (!p.sizes.includes(it.size)) { errors.push(`Pick a valid size for ${p.name}.`); continue; }
    if (p.colours && !p.colours.includes(it.colour)) { errors.push(`Pick a valid colour for ${p.name}.`); continue; }
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) { errors.push(`Check the quantity for ${p.name}.`); continue; }
    lines.push({ slug: p.slug, name: p.name, size: it.size, colour: p.colours ? it.colour : p.colour, qty, price: p.price, total: p.price * qty });
  }
  const delivery = deliveryOptions.find((d) => d.id === deliveryId);
  if (deliveryId !== undefined && !delivery) errors.push("Choose a delivery option.");
  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const fee = delivery ? delivery.fee : 0;
  return { lines, subtotal, delivery, fee, total: subtotal + fee, errors };
}
