import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, formatPrice, getProduct, products } from "@/data/products";
import { faqs, site } from "@/data/site";
import ProductCard from "@/components/ProductCard";
import ProductBuy from "@/components/ProductBuy";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: p.description, openGraph: { images: [p.images[0]] } };
}

const sizeChart = [
  ["S", 40, 27, 20],
  ["M", 42, 28, 21],
  ["L", 44, 29, 22],
  ["XL", 46, 30, 23],
  ["XXL", 48, 31, 24],
];

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const cat = categories.find((c) => c.slug === p.category);
  const related = products.filter((x) => x.slug !== p.slug).sort((a, b) => (b.category === p.category) - (a.category === p.category)).slice(0, 4);

  return (
    <>
      <section className="grid gap-6 px-4 pt-24 md:grid-cols-2 md:gap-10 md:px-6">
        <Gallery images={p.images} video={p.video} name={p.name} />

        <div className="md:sticky md:top-24 md:self-start">
          <p className="label mb-2 text-mute">
            <Link href="/shop" className="hover:text-cream">Shop</Link> /{" "}
            <Link href={`/shop?category=${p.category}`} className="hover:text-cream">{cat.label}</Link>
          </p>
          <p className="accent text-2xl text-red">sabi lifestyle</p>
          <h1 className="display mb-4 text-5xl md:text-6xl">{p.name}</h1>
          <p className="mb-6 text-2xl font-bold">{formatPrice(p.price)}</p>

          <ProductBuy p={p} dm={site.dm} />

          <p className="mt-8 text-sm leading-relaxed text-cream/85">{p.description}</p>

          <h2 className="label mb-2 mt-8 font-bold text-red">Material & care</h2>
          <ul className="space-y-1 text-sm text-cream/85">
            {p.material.map((m) => <li key={m}>— {m}</li>)}
          </ul>

          {p.sizes.length > 1 && (
            <>
              <h2 className="label mb-2 mt-8 font-bold text-red">Size guide (inches, approx.)</h2>
              <table className="w-full text-left text-sm">
                <thead className="label text-mute">
                  <tr className="border-b border-cream/20">
                    <th className="py-2 font-medium">Size</th>
                    <th className="py-2 font-medium">Chest</th>
                    <th className="py-2 font-medium">Length</th>
                    <th className="py-2 font-medium">Shoulder</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.map((r) => (
                    <tr key={r[0]} className="border-b border-cream/10">
                      {r.map((c, i) => <td key={i} className="py-2">{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="label mt-2 text-mute">Between sizes? DM us and we'll help you pick.</p>
            </>
          )}
        </div>
      </section>

      <section className="px-4 pt-24 md:px-6">
        <h2 className="display mb-4 text-5xl md:text-7xl"><span className="text-red">FAQs</span></h2>
        <Faq items={faqs} />
      </section>

      <section className="px-4 pt-24 md:px-6">
        <h2 className="display mb-4 text-5xl md:text-7xl">
          <span className="accent">goes well</span> <span className="text-red">With</span>
        </h2>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {related.map((r) => <ProductCard key={r.slug} p={r} />)}
        </div>
      </section>
    </>
  );
}
