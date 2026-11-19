import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-4 pt-24 text-center">
      <h1 className="display text-[30vw] text-red md:text-[18vw]">404</h1>
      <p className="accent mb-8 text-3xl">you no sabi this page</p>
      <Link href="/shop" className="label bg-red px-6 py-3 font-bold hover:bg-cream hover:text-ink">
        Back to the shop
      </Link>
    </section>
  );
}
