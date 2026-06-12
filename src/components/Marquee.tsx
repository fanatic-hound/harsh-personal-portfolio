"use client";

interface MarqueeProps {
  items: string[];
  variant?: "yellow" | "pink";
}

/** Scrolling text strip à la pixel.melbourne. Content is duplicated for a seamless loop. */
export default function Marquee({ items, variant = "yellow" }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <div className="marquee-track" aria-hidden={ariaHidden}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-6">
          {item}
          <span className="inline-block w-2.5 h-2.5 bg-current" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${variant === "pink" ? "marquee-pink" : ""}`} role="presentation">
      {row(false)}
      {row(true)}
    </div>
  );
}
