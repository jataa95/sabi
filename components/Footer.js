import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { categories } from "@/data/products";
import Arrow from "./Arrow";
import LagosTime from "./LagosTime";

const explore = [
  { label: "Shop all", href: "/shop" },
  { label: "Latest drops", href: "/#drops" },
  { label: "New arrivals", href: "/shop?filter=new" },
  { label: "About Sabi", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-32">
      {/* Closing call to action */}
      <section className="grain relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/media/duo-tracksuit-red.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_30%]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>
        <div className="relative grid min-h-[90svh] items-end gap-10 px-4 py-16 md:grid-cols-[1.4fr_1fr] md:px-6 md:py-24">
          <div className="reveal">
            <p className="label mb-6 font-bold text-red">The last word</p>
            <h2 className="display text-[16vw] md:text-[9vw]">
              You already <span className="accent text-red">know.</span>
            </h2>
            <p className="label mt-6 max-w-md leading-relaxed text-cream/85">
              Pick your piece, send us a DM and it's yours. Or walk into the store in Lagos and try it on first.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href={site.dm} target="_blank" rel="noreferrer" className="display bg-red px-6 py-4 text-xl transition-colors hover:bg-cream hover:text-ink md:text-2xl">
                Order on Instagram <Arrow />
              </a>
              <Link href="/shop" className="display border-2 border-cream px-6 py-4 text-xl transition-colors hover:border-red hover:bg-red md:text-2xl">
                Shop now
              </Link>
            </div>
          </div>
          <div className="reveal hidden justify-end gap-2 md:flex">
            <div className="relative aspect-[9/16] w-1/2 max-w-[260px] translate-y-10 -rotate-3 overflow-hidden border-4 border-cream shadow-2xl">
              <video className="h-full w-full object-cover" src="/media/beanies.mp4" poster="/media/beanies-poster.jpg" autoPlay muted loop playsInline />
            </div>
            <div className="relative aspect-[9/16] w-1/2 max-w-[260px] rotate-3 overflow-hidden border-4 border-red shadow-2xl">
              <Image src="/media/model-dab-tee-black.jpg" alt="" fill sizes="260px" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-red py-4 text-cream">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="display px-6 text-3xl md:text-4xl">
                  Sabi Lifestyle <span className="accent">for those who know</span> ✦
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-cream/10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <p className="label mb-4 font-bold text-red">Shop</p>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="text-sm font-bold uppercase transition-colors hover:text-red">{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4 font-bold text-red">Explore</p>
          <ul className="space-y-2">
            {explore.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm font-bold uppercase transition-colors hover:text-red">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-4 font-bold text-red">Talk to us</p>
          <ul className="space-y-2 text-sm font-bold uppercase">
            <li><a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-red">Instagram <Arrow /></a></li>
            <li><a href={site.dm} target="_blank" rel="noreferrer" className="hover:text-red">Send a DM <Arrow /></a></li>
            <li className="text-cream/60">{site.instagramHandle}</li>
          </ul>
        </div>
        <div>
          <p className="label mb-4 font-bold text-red">Store</p>
          <p className="text-sm font-bold uppercase">{site.location}</p>
          <p className="label mt-1 text-cream/60">DM us for address & hours</p>
          <p className="label mt-6 text-cream/60">Lagos time</p>
          <p className="display text-3xl"><LagosTime /></p>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative overflow-hidden px-2 pt-6">
        <p className="display select-none text-center text-[38vw] leading-[0.78] text-cream" aria-hidden="true">
          SABI
        </p>
        <p className="accent pointer-events-none absolute left-1/2 top-[48%] -translate-x-1/2 -rotate-6 text-[9vw] text-red" aria-hidden="true">
          lifestyle
        </p>
      </div>

      <div className="label flex flex-wrap items-center justify-between gap-4 px-4 py-6 text-cream/60 md:px-6">
        <span>© {new Date().getFullYear()} Sabi Lifestyle. Made in Lagos.</span>
        <a href="#top" className="font-bold text-cream hover:text-red">Back to top ↑</a>
      </div>
    </footer>
  );
}
