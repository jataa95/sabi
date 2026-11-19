import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/data/products";

export default function ProductCard({ p, priority = false }) {
  const isNew = p.tags.includes("new");
  return (
    <Link
      href={`/shop/${p.slug}`}
      className="group reveal flex flex-col border border-cream/10 bg-ink-2 transition-colors hover:border-red"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e7df]">
        <Image
          src={p.images[0]}
          alt={p.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {p.images[1] && (
          <Image
            src={p.images[1]}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}
        {isNew && <span className="label absolute right-2 top-2 bg-red px-2 py-1 text-[10px] font-bold">New</span>}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-6 p-3 md:p-4">
        <h3 className="text-sm font-bold uppercase leading-tight md:text-base">{p.name}</h3>
        <div className="flex items-end justify-between text-sm font-bold">
          <span>{formatPrice(p.price)}</span>
          <span className="label text-[10px] text-mute">{p.colour}</span>
        </div>
      </div>
    </Link>
  );
}
