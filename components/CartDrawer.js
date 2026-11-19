"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/data/products";
import Arrow from "./Arrow";

export default function CartDrawer() {
  const { lines, count, subtotal, open, setOpen, setQty, remove } = useCart();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname, setOpen]);
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      <div className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`} onClick={() => setOpen(false)} />
      <aside
        role="dialog"
        aria-label="Your bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream/10 px-5 py-4">
          <h2 className="display text-4xl">
            Bag <span className="text-red">({count})</span>
          </h2>
          <button onClick={() => setOpen(false)} className="label border border-cream/30 px-3 py-2 font-bold hover:border-red hover:bg-red">
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="display text-4xl text-mute">Your bag is empty</p>
            <Link href="/shop" className="label bg-red px-6 py-3 font-bold hover:bg-cream hover:text-ink">
              Shop now <Arrow />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-cream/10 overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-4">
                  <Link href={`/shop/${l.slug}`} className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-[#e9e7df]">
                    <Image src={l.product.images[0]} alt={l.product.name} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase leading-tight">{l.product.name}</p>
                      <p className="label mt-1 text-mute">
                        {l.colour ? `${l.colour} · ` : ""}Size {l.size}
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <div className="flex items-center border border-cream/30">
                        <button className="px-3 py-1" onClick={() => setQty(l.key, l.qty - 1)} aria-label={`One less ${l.product.name}`}>−</button>
                        <span className="w-6 text-center text-sm font-bold">{l.qty}</span>
                        <button className="px-3 py-1" onClick={() => setQty(l.key, l.qty + 1)} aria-label={`One more ${l.product.name}`}>+</button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{formatPrice(l.product.price * l.qty)}</p>
                        <button onClick={() => remove(l.key)} className="label text-mute underline hover:text-red">Remove</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-cream/10 px-5 py-5">
              <div className="mb-1 flex justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="label mb-4 text-mute">Delivery is added at checkout.</p>
              <Link href="/checkout" className="display block bg-red py-4 text-center text-2xl transition-colors hover:bg-cream hover:text-ink">
                Checkout <Arrow />
              </Link>
              <p className="label mt-3 text-center text-mute">Secure payment with Paystack</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
