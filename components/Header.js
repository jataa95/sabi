"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import Arrow from "./Arrow";
import { useCart } from "./CartProvider";

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

  // Lock scrolling and close on Escape while the menu is open.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-300 ${
          open ? "bg-transparent" : solid ? "bg-ink/90 backdrop-blur" : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <Link href="/" className="display text-3xl md:text-4xl" aria-label="SABI home" onClick={() => setOpen(false)}>
            SABI
          </Link>
          <div className="flex items-stretch gap-2">
            <BagButton />
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex h-12 items-stretch"
            >
              <span className="flex items-center bg-cream px-4 text-ink">
                <span className="relative block h-[1.1em] overflow-hidden text-sm font-extrabold uppercase leading-[1.1em] tracking-wide">
                  <span className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? "-translate-y-1/2" : "group-hover:-translate-y-1/2"}`}>
                    <span>{open ? "Close" : "Menu"}</span>
                    <span>{open ? "Close" : "Menu"}</span>
                  </span>
                </span>
              </span>
              <span className="relative flex w-12 items-center justify-center bg-red transition-colors group-hover:bg-[#c92415]">
                <span
                  className={`absolute h-[2.5px] bg-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open ? "w-6 rotate-45" : "w-6 -translate-y-[4px] group-hover:w-4 group-hover:-translate-x-1"
                  }`}
                />
                <span
                  className={`absolute h-[2.5px] bg-cream transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    open ? "w-6 -rotate-45" : "w-6 translate-y-[4px] group-hover:w-4 group-hover:translate-x-1"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-[55] grid bg-ink transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:grid-cols-[1fr_minmax(320px,34%)] ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="flex flex-col justify-end px-4 pb-8 pt-24 md:px-6 md:pb-10">
          {nav.map((n, i) => (
            <Link
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-cream/10 py-2 md:py-3"
              style={{ transitionDelay: open ? `${200 + i * 70}ms` : "0ms" }}
            >
              <span className="label w-8 text-mute">0{i + 1}</span>
              <span
                className={`display text-[15vw] transition-all duration-500 group-hover:translate-x-3 group-hover:text-red md:text-[8vw] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${200 + i * 70}ms` : "0ms" }}
              >
                {n.label}
              </span>
            </Link>
          ))}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <a href={site.dm} target="_blank" rel="noreferrer" className="label bg-red px-6 py-4 font-bold transition-colors hover:bg-cream hover:text-ink">
              Order on Instagram <Arrow />
            </a>
            <p className="label text-cream/60">{site.location} · {site.instagramHandle}</p>
          </div>
        </nav>
        <div className="relative hidden overflow-hidden md:block">
          <Image src="/media/duo-tracksuit-red.jpg" alt="" fill sizes="34vw" className={`object-cover transition-transform duration-[1200ms] ${open ? "scale-100" : "scale-110"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <p className="accent absolute bottom-6 left-6 text-4xl text-cream">for those who know</p>
        </div>
      </div>
    </>
  );
}

function BagButton() {
  const { count, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
      className="group flex h-12 items-stretch border border-cream/40 bg-ink/40 backdrop-blur transition-colors hover:border-cream"
    >
      <span className="flex items-center gap-2 px-3 text-sm font-extrabold uppercase tracking-wide sm:px-4">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <path d="M5 8h14l-1 13H6L5 8Z M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <span className="hidden sm:inline">Bag</span>
      </span>
      <span className={`flex min-w-10 items-center justify-center px-2 text-sm font-extrabold transition-colors ${count ? "bg-red text-cream" : "bg-cream/10"}`}>
        {count}
      </span>
    </button>
  );
}
