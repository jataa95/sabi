import Image from "next/image";
import Link from "next/link";
import { faqs, site } from "@/data/site";
import Faq from "@/components/Faq";
import Arrow from "@/components/Arrow";

export const metadata = {
  title: "About",
  description: "SABI LIFESTYLE is a clothing brand from Lagos, Nigeria. To sabi is to know.",
};

export default function About() {
  return (
    <>
      <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pb-8 md:px-6">
        <Image src="/media/duo-big-dreams.jpg" alt="Two models in Big Dreams tanks holding basketballs" fill priority sizes="100vw" className="object-cover object-[50%_25%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
        <div className="relative">
          <p className="label mb-3 font-bold">Scroll down ↓</p>
          <h1 className="display text-[18vw] md:text-[12vw]">
            Our <span className="accent text-red">story</span>
          </h1>
        </div>
      </section>

      <section className="grid gap-10 px-4 pt-24 md:grid-cols-2 md:px-6">
        <div className="reveal">
          <p className="accent text-3xl text-red">the word</p>
          <h2 className="display mb-6 text-5xl md:text-7xl">To sabi</h2>
          <p className="text-sm uppercase leading-relaxed text-cream/85 md:text-base">
            In Nigerian Pidgin, to sabi is to know. You sabi the place, you sabi the people, you sabi yourself. That's who
            we make clothes for: people who don't wait for anyone to tell them what's hot.
          </p>
        </div>
        <div className="reveal relative aspect-[4/5] overflow-hidden">
          <Image src="/media/model-sabi-tee.jpg" alt="Model in the SABI Logo Tee" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="grid gap-10 px-4 pt-24 md:grid-cols-2 md:px-6">
        <div className="reveal relative order-2 aspect-[9/16] max-h-[80svh] overflow-hidden md:order-1">
          <video className="h-full w-full object-cover" src="/media/sabi-interview.mp4" poster="/media/sabi-interview-poster.jpg" controls playsInline preload="metadata" />
        </div>
        <div className="reveal order-1 flex flex-col justify-center gap-12 md:order-2">
          <div>
            <h3 className="display mb-4 text-4xl md:text-5xl">From Lagos</h3>
            <p className="text-sm uppercase leading-relaxed text-cream/85">
              Sabi started in Lagos and it's still designed there. Graphic tees with something to say, stripe shirts that
              zip instead of button, and tracksuits made to be seen.
            </p>
          </div>
          <div>
            <h3 className="display mb-4 text-4xl md:text-5xl">Our culture</h3>
            <p className="text-sm uppercase leading-relaxed text-cream/85">
              Small runs, real people and a store you can walk into. Our customers, and a few famous faces, show up on our
              Instagram wearing it their own way.
            </p>
          </div>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="label self-start border border-cream px-6 py-3 font-bold transition-colors hover:border-red hover:bg-red">
            Follow {site.instagramHandle} <Arrow />
          </a>
        </div>
      </section>

      <section className="px-4 pt-24 md:px-6">
        <h2 className="display reveal mb-4 text-5xl md:text-7xl"><span className="text-red">FAQs</span></h2>
        <Faq items={faqs} />
        <Link href="/shop" className="display mt-10 inline-block text-3xl hover:text-red">
          Shop the collection <Arrow />
        </Link>
      </section>
    </>
  );
}
