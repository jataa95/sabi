"use client";
import { useEffect, useState } from "react";

// Black grainy screen: SABI rises letter by letter while a counter runs to 100,
// then a red panel wipes the screen away. Plays once per browser session.
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("load"); // load -> exit -> done

  useEffect(() => {
    if (document.documentElement.classList.contains("seen-loader")) {
      setPhase("done");
      return;
    }
    document.documentElement.style.overflow = "hidden";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 300 : 2000;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / total);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setPhase("exit");
        try { sessionStorage.setItem("sabi-loader", "1"); } catch {}
        setTimeout(() => {
          setPhase("done");
          document.documentElement.style.overflow = "";
        }, reduce ? 50 : 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`preloader ${phase === "exit" ? "is-exit" : ""}`} aria-hidden="true">
      <div className="preloader-panel grain">
        <div className="flex flex-1 items-center justify-center">
          <p className="display flex overflow-hidden text-[30vw] leading-[0.85] md:text-[20vw]">
            {"SABI".split("").map((l, i) => (
              <span key={i} className="preloader-letter" style={{ animationDelay: `${150 + i * 120}ms` }}>
                {l}
              </span>
            ))}
          </p>
        </div>
        <div className="flex items-end justify-between p-4 md:p-6">
          <p className="accent text-2xl text-red md:text-4xl">for those who know</p>
          <p className="display text-6xl tabular-nums md:text-9xl">
            {String(count).padStart(3, "0")}
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-cream/10">
          <div className="h-full bg-red" style={{ width: `${count}%` }} />
        </div>
      </div>
      <div className="preloader-wipe" />
    </div>
  );
}
