import Link from "next/link";
import { formatPrice } from "@/data/products";
import { site } from "@/data/site";
import ClearCart from "@/components/ClearCart";
import Arrow from "@/components/Arrow";

export const metadata = { title: "Order", robots: { index: false } };

async function verify(reference) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !reference || !/^[\w.-]{1,100}$/.test(reference)) return null;
  try {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
      cache: "no-store",
    });
    const data = await res.json();
    return data?.status ? data.data : null;
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }) {
  const { reference, trxref } = await searchParams;
  const ref = reference || trxref;
  const tx = await verify(ref);
  const meta = tx?.metadata && typeof tx.metadata === "object" ? tx.metadata : {};
  const paid = tx?.status === "success" && tx.currency === "NGN" && (!meta.expected_amount || tx.amount === meta.expected_amount);

  if (!paid) {
    return (
      <section className="flex min-h-[70svh] flex-col items-center justify-center px-4 pt-28 text-center">
        <h1 className="display mb-4 text-6xl md:text-8xl">Payment <span className="text-red">not confirmed</span></h1>
        <p className="label mb-8 max-w-md leading-relaxed text-cream/80">
          We couldn't confirm this payment{tx?.status ? ` (status: ${tx.status})` : ""}. Your bag is still saved. If money left
          your account, DM us with this reference: <span className="font-bold text-cream">{ref || "none"}</span>
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/checkout" className="label bg-red px-6 py-3 font-bold hover:bg-cream hover:text-ink">Try again</Link>
          <a href={site.dm} target="_blank" rel="noreferrer" className="label border border-cream px-6 py-3 font-bold hover:border-red hover:bg-red">DM us <Arrow /></a>
        </div>
      </section>
    );
  }

  const lines = Array.isArray(meta.lines) ? meta.lines : [];
  return (
    <section className="px-4 pt-28 md:px-6">
      <ClearCart />
      <p className="accent text-3xl text-red">thank you</p>
      <h1 className="display mb-6 text-6xl md:text-9xl">Order placed</h1>
      <p className="label mb-10 max-w-xl leading-relaxed text-cream/80">
        We've received your payment of <span className="font-bold text-cream">{formatPrice(tx.amount / 100)}</span>. A receipt is on
        its way to {tx.customer?.email}. We'll reach out on {meta.customer?.phone || "your phone"} about {meta.delivery?.toLowerCase().startsWith("pick") ? "collection" : "delivery"}.
      </p>
      <div className="max-w-xl border border-cream/15 bg-ink-2 p-5">
        <p className="label mb-3 text-mute">Reference: <span className="font-bold text-cream">{tx.reference}</span></p>
        <ul className="divide-y divide-cream/10">
          {lines.map((l, i) => (
            <li key={i} className="flex justify-between gap-4 py-2 text-sm">
              <span className="uppercase">{l.qty} × {l.name} <span className="text-mute">({[l.colour, l.size].filter(Boolean).join(", ")})</span></span>
              <span className="font-bold">{formatPrice(l.total)}</span>
            </li>
          ))}
          <li className="flex justify-between py-2 text-sm"><span>{meta.delivery}</span><span>{meta.delivery_fee ? formatPrice(meta.delivery_fee) : "Free"}</span></li>
          <li className="flex justify-between py-2 text-lg font-bold"><span>Total</span><span>{formatPrice(tx.amount / 100)}</span></li>
        </ul>
      </div>
      <Link href="/shop" className="display mt-10 inline-block text-3xl hover:text-red">Keep shopping <Arrow /></Link>
    </section>
  );
}
