"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/data/site";
import Arrow from "./Arrow";

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
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="group relative flex h-12 w-12 items-center justify-center bg-red transition-colors hover:bg-cream"
          >
            <span className="relative block h-4 w-6">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`absolute left-0 h-[2.5px] w-full bg-cream transition-all duration-300 group-hover:bg-ink ${
                    i === 0 ? (open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0") : ""
                  } ${i === 1 ? (open ? "top-1/2 -translate-y-1/2 opacity-0" : "top-1/2 -translate-y-1/2") : ""} ${
                    i === 2 ? (open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0") : ""
                  }`}
                />
              ))}
            </span>
          </button>
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
