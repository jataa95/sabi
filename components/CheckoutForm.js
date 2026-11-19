"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/data/products";
import { deliveryOptions } from "@/data/site";
import Arrow from "./Arrow";

const field = "w-full border border-cream/25 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/35 focus:border-red focus:outline-none";

function Input({ label, name, className = "", ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="label mb-2 block font-bold">{label}</span>
      <input name={name} className={field} {...props} />
    </label>
  );
}

export default function CheckoutForm() {
  const { lines, items, subtotal, ready } = useCart();
  const [delivery, setDelivery] = useState(deliveryOptions[0].id);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const fee = deliveryOptions.find((d) => d.id === delivery).fee;
  const pickup = delivery === "pickup";

  if (!ready) return <p className="label text-mute">Loading your bag…</p>;

  if (lines.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="display mb-6 text-4xl text-mute">Your bag is empty</p>
        <Link href="/shop" className="label bg-red px-6 py-3 font-bold hover:bg-cream hover:text-ink">Shop now <Arrow /></Link>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const customer = Object.fromEntries(["name", "email", "phone", "address", "city", "state", "notes"].map((k) => [k, f.get(k) || ""]));
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, delivery, customer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-10 lg:grid-cols-[1fr_420px]">
      <div className="space-y-10">
        <fieldset className="space-y-4">
          <legend className="display mb-4 text-3xl"><span className="text-red">01</span> Contact</legend>
          <Input label="Full name" name="name" autoComplete="name" required />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Email" name="email" type="email" autoComplete="email" required />
            <Input label="Phone" name="phone" type="tel" autoComplete="tel" placeholder="080..." required />
          </div>
        </fieldset>

        <fieldset>
          <legend className="display mb-4 text-3xl"><span className="text-red">02</span> Delivery</legend>
          <div className="grid gap-2">
            {deliveryOptions.map((d) => (
              <label
                key={d.id}
                className={`flex cursor-pointer items-center justify-between border px-4 py-4 transition-colors ${
                  delivery === d.id ? "border-red bg-red/10" : "border-cream/25 hover:border-cream"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input type="radio" name="delivery" value={d.id} checked={delivery === d.id} onChange={() => setDelivery(d.id)} className="accent-[#ea301f]" />
                  <span className="text-sm font-bold uppercase">{d.label}</span>
                </span>
                <span className="text-sm font-bold">{d.fee ? formatPrice(d.fee) : "Free"}</span>
              </label>
            ))}
          </div>
          {pickup ? (
            <p className="label mt-4 text-mute">We'll contact you when your order is ready to collect.</p>
          ) : (
            <div className="mt-6 space-y-4">
              <Input label="Street address" name="address" autoComplete="street-address" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="City" name="city" autoComplete="address-level2" required />
                <Input label="State" name="state" autoComplete="address-level1" required />
              </div>
            </div>
          )}
          <label className="mt-4 block">
            <span className="label mb-2 block font-bold">Order notes (optional)</span>
            <textarea name="notes" rows={3} className={field} placeholder="Anything we should know?" />
          </label>
        </fieldset>
      </div>

      <aside className="h-fit border border-cream/15 bg-ink-2 p-5 lg:sticky lg:top-24">
        <h2 className="display mb-4 text-3xl"><span className="text-red">03</span> Summary</h2>
        <ul className="divide-y divide-cream/10">
          {lines.map((l) => (
            <li key={l.key} className="flex gap-3 py-3">
              <div className="relative aspect-[4/5] w-16 shrink-0 overflow-hidden bg-[#e9e7df]">
                <Image src={l.product.images[0]} alt="" fill sizes="64px" className="object-cover" />
                <span className="absolute right-0 top-0 bg-red px-1.5 text-xs font-bold">{l.qty}</span>
              </div>
              <div className="flex flex-1 justify-between gap-2">
                <div>
                  <p className="text-sm font-bold uppercase leading-tight">{l.product.name}</p>
                  <p className="label mt-1 text-mute">{l.colour ? `${l.colour} · ` : ""}{l.size}</p>
                </div>
                <p className="text-sm font-bold">{formatPrice(l.product.price * l.qty)}</p>
              </div>
            </li>
          ))}
        </ul>
        <dl className="mt-4 space-y-2 border-t border-cream/10 pt-4 text-sm">
          <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Delivery</dt><dd>{fee ? formatPrice(fee) : "Free"}</dd></div>
          <div className="flex justify-between border-t border-cream/10 pt-3 text-xl font-bold"><dt>Total</dt><dd>{formatPrice(subtotal + fee)}</dd></div>
        </dl>
        {error && <p role="alert" className="mt-4 border border-red bg-red/10 p-3 text-sm">{error}</p>}
        <button type="submit" disabled={busy} className="display mt-5 w-full bg-red py-4 text-2xl transition-colors enabled:hover:bg-cream enabled:hover:text-ink disabled:opacity-60">
          {busy ? "Opening Paystack…" : `Pay ${formatPrice(subtotal + fee)}`}
        </button>
        <p className="label mt-3 text-center leading-relaxed text-mute">
          You'll pay on Paystack's secure page: card, bank transfer or USSD.
        </p>
      </aside>
    </form>
  );
}
