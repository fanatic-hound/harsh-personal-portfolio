"use client";
import Image from "next/image";

/**
 * Chibi avatar of Harsh — emote stickers used across the site.
 *
 * Section emotes:
 *  - "wave":       waving hand + open smile        (hero)
 *  - "think":      hand on chin, curious smirk     (about)
 *  - "thumbsup":   confident smile + thumbs up     (work experience)
 *  - "excited":    big grin + sparkles             (projects)
 *  - "peace":      V-sign + wink                   (contact)
 *  - "smile":      head only                       (logo / chatbot / favicon)
 *
 * Work-themed emotes:
 *  - "coding":     at desk with laptop             (software engineer role)
 *  - "research":   lab coat + flask                 (researcher role)
 *  - "security":   shield icon + arms crossed       (security/infra role)
 *
 * Extra emotes (for future use):
 *  - "gaming":     headset + controller             (gaming section / hobby)
 *  - "coffee":     cozy with coffee mug             (chill / loading states)
 *  - "celebrate":  grad cap + confetti              (achievements / education)
 *  - "reading":    cross-legged with book           (blog / learning section)
 *  - "presenting": pointing at whiteboard           (talks / presentations)
 *  - "oops":       nervous scratch + sweat drop     (404 / error pages)
 */

export type ChibiEmote =
  | "wave" | "think" | "thumbsup" | "excited" | "peace" | "smile"
  | "coding" | "research" | "security"
  | "gaming" | "coffee" | "celebrate" | "reading" | "presenting" | "oops";

const EMOTE_IMAGES: Record<ChibiEmote, string> = {
  wave: "/images/chibi_wave.png",
  think: "/images/chibi_think.png",
  thumbsup: "/images/chibi_thumbsup.png",
  excited: "/images/chibi_excited.png",
  peace: "/images/chibi_peace.png",
  smile: "/images/chibi_smile.png",
  coding: "/images/chibi_work_coding.png",
  research: "/images/chibi_work_research.png",
  security: "/images/chibi_work_security.png",
  gaming: "/images/chibi_gaming.png",
  coffee: "/images/chibi_coffee.png",
  celebrate: "/images/chibi_celebrate.png",
  reading: "/images/chibi_reading.png",
  presenting: "/images/chibi_presenting.png",
  oops: "/images/chibi_oops.png",
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
