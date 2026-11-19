import Link from "next/link";
import Image from "next/image";
import { byTag, categories, drops, products } from "@/data/products";
import { site } from "@/data/site";
import SectionHead from "@/components/SectionHead";
import ProductCard from "@/components/ProductCard";
import Arrow from "@/components/Arrow";
import Hero from "@/components/Hero";

const why = [
  { title: "Made in Lagos", sub: "Designed at home", body: "Every piece is designed by the Sabi team in Lagos and made in small runs." },
  { title: "Order by DM", sub: "Talk to a real person", body: "No checkout forms. Message us on Instagram and we sort your size, payment and delivery with you." },
  { title: "Limited runs", sub: "When it's gone, it's gone", body: "Drops are made in small batches, so you won't see your fit on everybody." },
  { title: "Visit the store", sub: "Lagos, Nigeria", body: "Come and try it on. DM us for the address and opening hours." },
];

const categoryTiles = [
  { slug: "t-shirts", image: "/media/model-dab-tee-black.jpg", className: "row-span-2" },
  { slug: "hoodies", image: "/media/hoodie-rare-on-purpose.jpg" },
  { slug: "shirts", image: "/media/model-stripe-shirt.jpg" },
  { slug: "tanks", image: "/media/tanks-big-dreams.jpg" },
  { slug: "tracksuits", image: "/media/tracksuit-flat.jpg", className: "row-span-2" },
  { slug: "accessories", image: "/media/beanies-poster.jpg", className: "md:col-span-2" },
];

export default function Home() {
  const best = byTag("best").slice(0, 8);
  const fresh = byTag("new").slice(0, 8);
  const label = (slug) => categories.find((c) => c.slug === slug).label;

  return (
    <>
      <Hero />

      {/* ABOUT over video */}
      <section className="relative flex min-h-[90svh] items-center justify-center overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" src="/media/store-outfit.mp4" poster="/media/store-outfit-poster.jpg" autoPlay muted loop playsInline />
        <div className="absolute inset-0 bg-black/65" />
        <div className="reveal relative max-w-3xl px-6 text-center">
          <p className="accent mb-4 text-3xl text-red md:text-4xl">about us</p>
          <p className="text-sm font-medium uppercase leading-relaxed md:text-lg">
            To sabi is to know. SABI LIFESTYLE is a Lagos clothing brand for people who already know who they are:
            big prints, clean cuts and pieces with something to say. We don't make clothes to explain you. We make them for
            when you've already figured it out.
          </p>
          <Link href="/about" className="label mt-8 inline-block border border-cream px-6 py-3 font-bold transition-colors hover:border-red hover:bg-red">
            Our story <Arrow />
          </Link>
        </div>
      </section>

      {/* DROPS */}
      <section id="drops" className="scroll-mt-20 px-4 pt-24 md:px-6">
        <SectionHead accent="latest" title="Drops" href="/shop" />
        <div className="grid gap-2 md:grid-cols-3">
          {drops.map((d, i) => (
            <Link key={d.name} href={d.href} className={`group reveal relative block overflow-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
              <div className={`relative ${i === 0 ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[720px]" : "aspect-[4/5] md:aspect-[4/3.5]"}`}>
                <Image src={d.image} alt={d.name} fill sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <p className="label text-red font-bold">Sabi ×</p>
                <h3 className="display text-4xl md:text-5xl">{d.name}</h3>
                <p className="label mt-2 max-w-sm text-cream/80">{d.copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="px-4 pt-24 md:px-6">
        <SectionHead accent="best" title="Sellers" href="/shop" />
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {best.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* WHY SABI */}
      <section className="px-4 pt-24 md:px-6">
        <h2 className="display reveal mb-10 text-5xl md:text-7xl">
          <span className="accent">why</span> <span className="text-red">Sabi?</span>
        </h2>
        <div className="grid gap-px border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <div key={w.title} className="reveal flex flex-col justify-between gap-12 bg-ink p-5 md:min-h-[340px]" style={{ transitionDelay: `${i * 90}ms` }}>
              <p className="label leading-relaxed text-cream/80">{w.body}</p>
              <div>
                <h3 className="display text-3xl md:text-4xl">{w.title}</h3>
                <p className="label mt-2 text-mute">{w.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-4 pt-24 md:px-6">
        <SectionHead accent="shop by" title="Category" href="/shop" linkLabel="Shop all" />
        <div className="grid auto-rows-[220px] grid-cols-2 gap-2 md:auto-rows-[260px] md:grid-cols-3">
          {categoryTiles.map((c) => (
            <Link key={c.slug} href={`/shop?category=${c.slug}`} className={`group reveal relative overflow-hidden ${c.className || ""}`}>
              <Image src={c.image} alt="" fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-red/60" />
              <span className="display absolute bottom-3 left-3 text-3xl md:text-5xl">{label(c.slug)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* BIG BANNER */}
      <section className="px-4 pt-24 md:px-6">
        <div className="grain relative flex min-h-[80svh] items-center justify-center overflow-hidden">
          <video className="absolute inset-0 h-full w-full object-cover" src="/media/sabi-interview.mp4" poster="/media/sabi-interview-poster.jpg" autoPlay muted loop playsInline />
          <div className="absolute inset-0 bg-black/55" />
          <div className="reveal relative text-center">
            <h2 className="display relative text-[22vw] text-cream md:text-[16vw]">
              Sabi
              <span className="accent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 text-[0.45em] text-red">lifestyle</span>
            </h2>
            <Link href="/shop" className="label mt-4 inline-block border border-cream px-6 py-3 font-bold transition-colors hover:border-red hover:bg-red">
              Shop the collection
            </Link>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="px-4 pt-24 md:px-6">
        <SectionHead accent="new" title="Arrivals" href="/shop?filter=new" />
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {fresh.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* SOCIAL WALL */}
      <section className="px-4 pt-24 md:px-6">
        <SectionHead accent="social" title="Wall" href={site.instagram} linkLabel={site.instagramHandle} />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="reveal flex aspect-[3/4] flex-col justify-between bg-red p-4 md:p-5">
            <p className="text-sm font-bold uppercase leading-snug md:text-base">
              "Customers", "Celebrities", "Store" — see who's wearing Sabi in our Instagram highlights.
            </p>
            <span className="label font-bold">{site.instagramHandle} <Arrow /></span>
          </a>
          <div className="reveal relative aspect-[3/4] overflow-hidden">
            <video className="h-full w-full object-cover" src="/media/sabi-interview.mp4" poster="/media/sabi-interview-poster.jpg" autoPlay muted loop playsInline />
          </div>
          <div className="reveal relative aspect-[3/4] overflow-hidden">
            <Image src="/media/model-dab-tee-white.jpg" alt="Model in the white Globe Tee" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </div>
          <a href={site.dm} target="_blank" rel="noreferrer" className="reveal flex aspect-[3/4] flex-col justify-between border-2 border-red p-4 md:p-5">
            <p className="text-sm font-bold uppercase leading-snug md:text-base">
              Wearing Sabi? Tag {site.instagramHandle} and you could end up on this wall.
            </p>
            <span className="label font-bold text-red">Send a DM <Arrow /></span>
          </a>
          <div className="reveal relative aspect-[3/4] overflow-hidden">
            <Image src="/media/tee-on-top-of-the-world.jpg" alt="On Top Of The World Tee" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="reveal relative aspect-[3/4] overflow-hidden">
            <video className="h-full w-full object-cover" src="/media/beanies.mp4" poster="/media/beanies-poster.jpg" autoPlay muted loop playsInline />
          </div>
          <div className="reveal relative aspect-[3/4] overflow-hidden">
            <Image src="/media/duo-stripe-shirts.jpg" alt="Two models in the Stripe Zip Shirt" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="reveal relative aspect-[3/4] overflow-hidden bg-black">
            <Image src="/media/sabi-logo.jpg" alt="SABI logo" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain" />
          </div>
        </div>
      </section>

      {/* STORE */}
      <section className="px-4 pt-24 md:px-6">
        <h2 className="display reveal mb-4 text-5xl md:text-7xl">
          <span className="accent">walk-in</span> <span className="text-red">Store</span>
        </h2>
        <div className="grid gap-2 md:grid-cols-2">
          <div className="reveal relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[520px]">
            <video className="absolute inset-0 h-full w-full object-cover" src="/media/store-outfit.mp4" poster="/media/store-outfit-poster.jpg" autoPlay muted loop playsInline />
          </div>
          <div className="reveal flex flex-col justify-end gap-6 bg-ink-2 p-5 md:p-8">
            <div>
              <h3 className="display text-6xl md:text-8xl">Lagos</h3>
              <p className="accent text-3xl text-red">Nigeria</p>
            </div>
            <p className="label max-w-md leading-relaxed text-cream/80">
              Come through, try it on, take your time. Send us a DM for the address and today's opening hours.
            </p>
            <a href={site.dm} target="_blank" rel="noreferrer" className="label self-start bg-red px-6 py-3 font-bold transition-colors hover:bg-cream hover:text-ink">
              Get directions on IG <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
