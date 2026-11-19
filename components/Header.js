"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid || open ? "bg-ink/95 backdrop-blur" : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-baseline gap-2" aria-label="SABI LIFESTYLE home">
          <span className="display text-2xl md:text-3xl">SABI</span>
          <span className="accent hidden text-lg sm:inline">lifestyle</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.label} href={n.href} className="label font-bold transition-colors hover:text-red">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={site.dm}
            target="_blank"
            rel="noreferrer"
            className="label hidden bg-red px-4 py-2 font-bold text-cream transition-colors hover:bg-cream hover:text-ink sm:inline-block"
          >
            Order on IG
          </a>
          <button
            className="label border border-cream/40 px-3 py-2 font-bold md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="flex flex-col border-t border-cream/10 px-4 pb-6 md:hidden">
          {nav.map((n) => (
            <Link key={n.label} href={n.href} className="display border-b border-cream/10 py-4 text-4xl hover:text-red">
              {n.label}
            </Link>
          ))}
          <a href={site.dm} target="_blank" rel="noreferrer" className="label mt-6 bg-red px-4 py-3 text-center font-bold">
            Order on Instagram
          </a>
        </nav>
      )}
    </header>
  );
}
