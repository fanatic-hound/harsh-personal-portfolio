"use client";
import { useState, useEffect, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggleButton from "./ThemeToggleButton";

const languages = [
  "Hello!",
  "Hola!!",
  "Bonjour!",
  "Hallo!",
  "नमस्ते",
  "こんにちは",
  "안녕하세요",
  "Привет",
  "Ciao!",
  "Olá!",
];

const TOTAL_BLOCKS = 10;

export default function Landing({ setIsLandingVisible }: { setIsLandingVisible: (a: boolean) => void }) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const { toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (index < languages.length - 1) {
      const timeout = setTimeout(() => setIndex((prev) => prev + 1), 260);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setIsExiting(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const filled = Math.round(((index + 1) / languages.length) * TOTAL_BLOCKS);

  return (
    <AnimatePresence onExitComplete={() => setIsLandingVisible(false)}>
      {!isExiting && (
        <motion.div
          key="landing"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "linear" }}
          className="pixel-grid-bg fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-paper"
        >
          {/* Corner pixel decorations */}
          <div className="absolute top-6 left-6 flex gap-2">
            <span className="w-4 h-4 bg-pixel-pink border-2 border-ink" />
            <span className="w-4 h-4 bg-pixel-yellow border-2 border-ink" />
            <span className="w-4 h-4 bg-pixel-lime border-2 border-ink" />
          </div>

          <div className="absolute top-6 right-6 z-10">
            <ThemeToggleButton toggleTheme={toggleTheme} />
          </div>

          <div className="flex flex-col items-center gap-8 px-4">
            {/* Cycling greeting — instant pixel swap, no easing */}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.08, ease: "linear" }}
                className="font-pixel text-3xl sm:text-5xl md:text-6xl text-center leading-relaxed [text-shadow:4px_4px_0_var(--pixel-pink)]"
              >
                {languages[index]}
              </motion.div>
            </AnimatePresence>

            {/* Pixel loading bar */}
            <div className="pixel-card-flat flex gap-1 p-2" role="progressbar" aria-valuenow={filled} aria-valuemin={0} aria-valuemax={TOTAL_BLOCKS} aria-label="Loading">
              {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <span
                  key={i}
                  className={`w-4 h-6 sm:w-6 sm:h-8 ${i < filled ? "bg-pixel-pink" : "bg-transparent"}`}
                />
              ))}
            </div>

            <div className="font-terminal text-xl sm:text-2xl uppercase tracking-widest text-muted">
              Loading portfolio...
              <span className="blink-cursor h-[1em]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
