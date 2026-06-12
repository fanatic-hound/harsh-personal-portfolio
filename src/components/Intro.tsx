"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Marquee from "./Marquee";
import ChibiAvatar from "./ChibiAvatar";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const phrases = [
  "Self taught Software Engineer",
  "School taught Mechanical Engineer",
];

const marqueeItems = [
  "Software Engineer",
  "IIT Roorkee",
  "Competitive Programmer",
  "Problem Solver",
  "Open To Work",
];

export default function Intro() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[loopNum % phrases.length];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }

      setTypingSpeed(isDeleting ? 40 : 120);
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const router = useRouter();

  const handleScrollToContact = () => {
    router.push("/#contacts");
    scroller.scrollTo("contacts", {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -80,
    });
  };

  // Full-bleed: cancel <main>'s padding so the hero spans the whole viewport
  return (
    <div className="-mt-2 -mx-2 sm:-mt-4 sm:-mx-4 flex flex-col min-h-screen">
      <div
        id="intro"
        className="pixel-grid-bg relative flex-1 flex items-center justify-center px-4 py-12 overflow-hidden"
      >
        {/* Drifting pixel squares */}
        <div className="absolute inset-0 -z-10 opacity-60">
          <ParticleField />
        </div>

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            {/* Profile image in a pixel frame */}
            <div className="relative mb-8 group">
              <div className="pixel-frame pixel-lift relative bg-surface p-2">
                <ChibiAvatar size={170} emote="wave" className="block chibi-float" />
                {/* Sticker-style corner pixels */}
                <span className="absolute -top-2 -left-2 w-4 h-4 bg-pixel-yellow border-2 border-ink" />
                <span className="absolute -bottom-2 -right-2 w-4 h-4 bg-pixel-pink border-2 border-ink" />
              </div>
              <div className="font-terminal absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 pixel-card text-lg whitespace-nowrap opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
                Hello!! 👋
              </div>
            </div>

            <div className="font-terminal text-xl sm:text-2xl text-muted mb-3 uppercase tracking-widest">
              &gt; Hey there I&apos;m,
            </div>

            <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl uppercase leading-relaxed mb-6 [text-shadow:4px_4px_0_var(--pixel-pink),8px_8px_0_var(--pixel-yellow)]">
              Harsh Pal
            </h1>

            <div className="status-pill mb-6">
              <span className="status-dot" />
              Open to interesting opportunities
            </div>

            <div className="font-terminal flex items-center justify-center text-xl sm:text-2xl md:text-3xl mb-10 min-h-[2.5rem] uppercase">
              {text}
              <span className="blink-cursor h-[1em]" />
            </div>

            <button onClick={handleScrollToContact} className="btn-pixel btn-pixel-pink">
              Find me on social media
            </button>
        </motion.div>
      </div>

      {/* Marquee strip pinned to the bottom of the hero */}
      <Marquee items={marqueeItems} />
    </div>
  );
}
