export default function Faq({ items }) {
  return (
    <div className="border-t border-cream/20">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-cream/20">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-bold uppercase md:text-xl">
            {f.q}
            <span className="text-2xl text-red transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-3xl pb-6 text-sm leading-relaxed text-cream/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
