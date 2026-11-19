"use client";
import { useState } from "react";
import { formatPrice } from "@/data/products";

export default function ProductBuy({ p, dm }) {
  const [size, setSize] = useState(p.sizes.length === 1 ? p.sizes[0] : "");
  const [colour, setColour] = useState(p.colours ? p.colours[0] : p.colour);
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);

  const message = `Hi Sabi! I'd like to order: ${p.name}${p.colours ? ` (${colour})` : ""}, size ${size}, quantity ${qty}. Listed at ${formatPrice(p.price * qty)}.`;

  const order = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {}
    window.open(dm, "_blank", "noopener");
  };

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
          <button className="px-4 py-3 text-lg" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Increase quantity">+</button>
        </div>
        <button
          onClick={order}
          disabled={!size}
          className="label flex-1 bg-red px-4 py-3 font-bold transition-colors enabled:hover:bg-cream enabled:hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          {size ? "Order on Instagram" : "Pick a size"}
        </button>
      </div>
      <p className="label leading-relaxed text-mute">
        {copied
          ? "Your order message is copied. Paste it into the Instagram chat that just opened."
          : "We'll open a DM with @_sabilifestyle and copy your order details so you can paste them in."}
      </p>
    </div>
  );
}
