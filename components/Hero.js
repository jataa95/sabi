"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Arrow from "./Arrow";
import { site } from "@/data/site";

// Three portrait columns that each cycle through lifestyle shots, out of step with each other.
const columns = [
  [
    { src: "/media/model-sabi-tee.jpg", alt: "Model in the SABI Logo Tee", pos: "50% 20%" },
    { src: "/media/model-dab-tee-white.jpg", alt: "Model in the white Globe Tee", pos: "50% 15%" },
    { src: "/media/model-stripe-shirt.jpg", alt: "Model in the Stripe Zip Shirt", pos: "50% 20%" },
  ],
  [
    { src: "/media/duo-tracksuit-red.jpg", alt: "Two models in the black and red SABI tracksuit", pos: "50% 25%" },
    { src: "/media/duo-big-dreams.jpg", alt: "Two models in Big Dreams tanks with basketballs", pos: "50% 20%" },
    { src: "/media/duo-stripe-shirts.jpg", alt: "Two models in matching Stripe Zip Shirts", pos: "50% 20%" },
  ],
  [
    { src: "/media/model-dab-tee-black.jpg", alt: "Model in the black Globe Tee", pos: "50% 15%" },
    { src: "/media/tee-on-top-of-the-world.jpg", alt: "On Top Of The World Tee", pos: "50% 50%" },
    { src: "/media/tanks-big-dreams.jpg", alt: "Big Dreams tanks in black and white", pos: "50% 50%" },
  ],
];

const INTERVAL = 3600;

function Column({ shots, offset, className = "relative", sizes, priority }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id;
    const t = setTimeout(() => {
      setI((n) => (n + 1) % shots.length);
      id = setInterval(() => setI((n) => (n + 1) % shots.length), INTERVAL);
    }, INTERVAL + offset);
    return () => (clearTimeout(t), clearInterval(id));
  }, [shots.length, offset]);

  return (
    <div className={`overflow-hidden ${className}`}>
      {shots.map((s, k) => (
        <Image
          key={s.src}
          src={s.src}
          alt={k === i ? s.alt : ""}
          fill
          priority={priority && k === 0}
          sizes={sizes}
          style={{ objectPosition: s.pos }}
          className={`object-cover transition-[opacity,transform] duration-[1400ms] ease-out ${
            k === i ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const mobileShots = [columns[1][0], columns[0][0], columns[2][0], columns[1][1]];
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink">
      {/* Desktop: three columns */}
      <div className="absolute inset-0 hidden grid-cols-3 gap-1 md:grid">
        {columns.map((c, i) => (
          <Column key={i} shots={c} offset={i * 900} sizes="34vw" priority />
        ))}
      </div>
      {/* Mobile: one column */}
      <Column shots={mobileShots} offset={0} sizes="100vw" priority className="absolute inset-0 md:hidden" />

      <div className="grain pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/50" />

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <p className="label max-w-xs font-bold leading-relaxed">
            New season out now.<br />Tees, tracksuits & stripes from {site.location}.
          </p>
          <div className="flex gap-2">
            <Link href="/shop" className="label bg-red px-5 py-3 font-bold transition-colors hover:bg-cream hover:text-ink">
              Shop now <Arrow />
            </Link>
            <Link href="/#drops" className="label border border-cream px-5 py-3 font-bold transition-colors hover:border-red hover:bg-red">
              See the drops
            </Link>
          </div>
        </div>
        <h1 className="display text-[17vw] md:text-[11.5vw]">
          Wear it like you <span className="accent text-red">sabi</span>
        </h1>
      </div>
    </section>
  );
}
