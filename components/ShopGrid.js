"use client";
import { useMemo, useState } from "react";
import { categories, products } from "@/data/products";
import ProductCard from "./ProductCard";

const sorts = {
  relevance: { label: "Relevance", fn: () => 0 },
  low: { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  high: { label: "Price: high to low", fn: (a, b) => b.price - a.price },
};

export default function ShopGrid({ initialCategory = "all", initialNew = false }) {
  const [category, setCategory] = useState(categories.some((c) => c.slug === initialCategory) ? initialCategory : "all");
  const [onlyNew, setOnlyNew] = useState(initialNew);
  const [sort, setSort] = useState("relevance");

  const sync = (cat, isNew) => {
    const q = new URLSearchParams();
    if (cat !== "all") q.set("category", cat);
    if (isNew) q.set("filter", "new");
    const s = q.toString();
    window.history.replaceState(null, "", s ? `/shop?${s}` : "/shop");
  };

  const list = useMemo(
    () =>
      products
        .filter((p) => (category === "all" || p.category === category) && (!onlyNew || p.tags.includes("new")))
        .sort(sorts[sort].fn),
    [category, onlyNew, sort]
  );

  const chip = (active) =>
    `label border px-3 py-2 font-bold transition-colors ${
      active ? "border-red bg-red text-cream" : "border-cream/30 hover:border-cream"
    }`;

  return (
    <>
      <div className="sticky top-[60px] z-30 -mx-4 mb-4 flex flex-wrap items-center gap-2 border-y border-cream/10 bg-ink/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
        {[{ slug: "all", label: "All" }, ...categories].map((c) => (
          <button
            key={c.slug}
            className={chip(category === c.slug)}
            onClick={() => (setCategory(c.slug), sync(c.slug, onlyNew))}
            aria-pressed={category === c.slug}
          >
            {c.label}
          </button>
        ))}
        <button className={chip(onlyNew)} onClick={() => (setOnlyNew(!onlyNew), sync(category, !onlyNew))} aria-pressed={onlyNew}>
          New arrivals
        </button>
        <label className="label ml-auto flex items-center gap-2 font-bold">
          Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="border border-cream/30 bg-ink px-2 py-2 uppercase">
            {Object.entries(sorts).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="label mb-4 text-mute">{list.length} {list.length === 1 ? "piece" : "pieces"}</p>
      {list.length ? (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {list.map((p, i) => <ProductCard key={p.slug} p={p} priority={i < 4} />)}
        </div>
      ) : (
        <p className="display py-24 text-center text-3xl text-mute">Nothing here yet</p>
      )}
    </>
  );
}
