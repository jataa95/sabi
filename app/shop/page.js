import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Shop",
  description: "Shop SABI LIFESTYLE: tees, shirts, hoodies, tanks, tracksuits and accessories.",
};

export default async function ShopPage({ searchParams }) {
  const { category = "all", filter = "" } = await searchParams;
  return (
    <section className="px-4 pt-28 md:px-6">
      <h1 className="display mb-8 text-6xl md:text-8xl">
        <span className="accent">shop</span> <span className="text-red">All</span>
      </h1>
      <ShopGrid initialCategory={category} initialNew={filter === "new"} />
    </section>
  );
}
