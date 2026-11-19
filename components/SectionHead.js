import Link from "next/link";
import Arrow from "./Arrow";

// "latest DROPS"-style heading: a serif italic word, then a big mono word in red.
export default function SectionHead({ accent, title, href, linkLabel = "View all", children }) {
  return (
    <div className="reveal mb-4 flex flex-wrap items-end justify-between gap-4">
      <h2 className="display flex flex-wrap items-baseline gap-x-3 text-5xl md:text-7xl">
        <span className="accent text-cream">{accent}</span>
        <span className="text-red">{title}</span>
        {children}
      </h2>
      {href && (
        <Link href={href} className="display text-xl transition-colors hover:text-red md:text-2xl">
          {linkLabel} <Arrow />
        </Link>
      )}
    </div>
  );
}
