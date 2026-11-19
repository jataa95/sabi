import CheckoutForm from "@/components/CheckoutForm";

export const metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="px-4 pt-28 md:px-6">
      <h1 className="display mb-10 text-6xl md:text-8xl">
        <span className="accent">your</span> <span className="text-red">Checkout</span>
      </h1>
      <CheckoutForm />
    </section>
  );
}
