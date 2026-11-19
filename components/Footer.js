import Link from "next/link";
import { site } from "@/data/site";
import Arrow from "./Arrow";

const links = [
  { label: "All", href: "/shop" },
  { label: "Drops", href: "/#drops" },
  { label: "New", href: "/shop?filter=new" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-cream/10">
      <div className="overflow-hidden border-b border-cream/10 bg-red py-3 text-cream">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0" aria-hidden={k === 1}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="display px-6 text-2xl">
                  Sabi Lifestyle <span className="accent">for those who know</span> ✦
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="display text-5xl">SABI</p>
          <p className="accent text-2xl">lifestyle clothing</p>
        </div>
        <div className="label space-y-2 leading-relaxed">
          <p className="font-bold text-red">Find us</p>
          <p>{site.location}</p>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="block hover:text-red">
            {site.instagramHandle} <Arrow />
          </a>
          <a href={site.dm} target="_blank" rel="noreferrer" className="block hover:text-red">
            Send us a DM <Arrow />
          </a>
        </div>
        <div className="label leading-relaxed">
          <p className="mb-2 font-bold text-red">How to order</p>
          <p className="max-w-xs text-cream/80">
            Pick your piece and size, then message us on Instagram. We'll confirm price, payment and delivery in the DM.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 px-4 md:grid-cols-4 md:px-6">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="label border border-cream/30 py-3 text-center font-bold transition-colors hover:border-red hover:bg-red"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="label flex flex-wrap justify-between gap-4 px-4 py-8 text-cream/60 md:px-6">
        <span>© {new Date().getFullYear()} Sabi Lifestyle. Lagos, Nigeria.</span>
        <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-cream">
          Instagram
        </a>
      </div>
    </footer>
  );
}
