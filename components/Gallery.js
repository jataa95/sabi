"use client";
import Image from "next/image";
import { useState } from "react";

export default function Gallery({ images, video, name }) {
  const media = [...(video ? [{ type: "video", src: video, poster: images[0] }] : []), ...images.filter((s) => !video || s !== images[0]).map((src) => ({ type: "image", src }))];
  const [i, setI] = useState(0);
  const m = media[i];
  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e7df]">
        {m.type === "video" ? (
          <video key={m.src} className="h-full w-full object-cover" src={m.src} poster={m.poster} autoPlay muted loop playsInline />
        ) : (
          <Image key={m.src} src={m.src} alt={name} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        )}
      </div>
      {media.length > 1 && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {media.map((x, k) => (
            <button
              key={x.src}
              onClick={() => setI(k)}
              className={`relative aspect-square overflow-hidden border-2 ${k === i ? "border-red" : "border-transparent opacity-70 hover:opacity-100"}`}
              aria-label={`Show image ${k + 1} of ${name}`}
            >
              <Image src={x.type === "video" ? x.poster : x.src} alt="" fill sizes="12vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
