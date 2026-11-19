"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { MAX_QTY } from "@/lib/cart";

export default function ProductBuy({ p, dm }) {
  const { add } = useCart();
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [colour, setColour] = useState(p.colours ? p.colours[0] : undefined);
  const [qty, setQty] = useState(1);

  const btn = (active) =>
    `min-w-12 border px-3 py-2 text-sm font-bold transition-colors ${active ? "border-red bg-red" : "border-cream/30 hover:border-cream"}`;

  return (
    <div className="space-y-5">
      {p.colours && (
        <div>
          <p className="label mb-2 font-bold">Colour: <span className="text-mute">{colour}</span></p>
          <div className="flex flex-wrap gap-2">
            {p.colours.map((c) => (
              <button key={c} className={btn(c === colour)} onClick={() => setColour(c)} aria-pressed={c === colour}>{c}</button>
            ))}
          </div>
        </div>
      )}
      <div>
        <p className="label mb-2 font-bold">Size: <span className="text-mute">{size || "pick one"}</span></p>
        <div className="flex flex-wrap gap-2">
          {p.sizes.map((s) => (
            <button key={s} className={btn(s === size)} onClick={() => setSize(s)} aria-pressed={s === size}>{s}</button>
          ))}
        </div>
      </div>
      <div className="flex items-stretch gap-2">
        <div className="flex items-center border border-cream/30">
          <button className="px-4 py-3 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
          <span className="w-8 text-center font-bold" aria-live="polite">{qty}</span>
          <button className="px-4 py-3 text-lg" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} aria-label="Increase quantity">+</button>
        </div>
        <button
          onClick={() => {
            add({ slug: p.slug, size, colour, qty });
            setQty(1);
          }}
          disabled={!size}
          className="display flex-1 bg-red px-4 py-3 text-xl transition-colors enabled:hover:bg-cream enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          {size ? "Add to bag" : "Pick a size"}
        </button>
      </div>
      <p className="label leading-relaxed text-mute">
        Pay securely by card, bank transfer or USSD with Paystack. Questions first?{" "}
        <a href={dm} target="_blank" rel="noreferrer" className="text-cream underline hover:text-red">DM us on Instagram</a>.
      </p>
    </div>
  );
}
