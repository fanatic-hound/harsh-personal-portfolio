"use client";
import Image from "next/image";

/**
 * Chibi avatar of Harsh — emote stickers used across the site.
 *
 * Emotes (one per section):
 *  - "wave":     waving hand + open smile     (hero)
 *  - "think":    hand on chin, curious smirk  (about)
 *  - "thumbsup": confident smile + thumbs up  (work experience)
 *  - "excited":  big grin + sparkles          (projects)
 *  - "peace":    V-sign + wink                (contact)
 *  - "smile":    head only                    (logo / chatbot / favicon)
 */

export type ChibiEmote = "wave" | "think" | "thumbsup" | "excited" | "peace" | "smile";

const EMOTE_IMAGES: Record<ChibiEmote, string> = {
  wave: "/images/chibi_wave.png",
  think: "/images/chibi_think.png",
  thumbsup: "/images/chibi_thumbsup.png",
  excited: "/images/chibi_excited.png",
  peace: "/images/chibi_peace.png",
  smile: "/images/chibi_smile.png",
};

interface ChibiAvatarProps {
  size?: number;
  emote?: ChibiEmote;
  variant?: "full" | "head";
  className?: string;
}

export default function ChibiAvatar({
  size = 180,
  emote = "smile",
  variant = "full",
  className = "",
}: ChibiAvatarProps) {
  // The "smile" image is already a head-only crop — use it for the head variant.
  const src = variant === "head" ? EMOTE_IMAGES.smile : EMOTE_IMAGES[emote];

  return (
    <Image
      src={src}
      alt={`Chibi avatar of Harsh Pal — ${variant === "head" ? "smile" : emote}`}
      width={size}
      height={size}
      className={`object-contain select-none ${className}`}
      priority={size >= 150}
      draggable={false}
    />
  );
}
