import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--paper)",
        foreground: "var(--ink)",
        paper: "var(--paper)",
        ink: "var(--ink)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        "pixel-pink": "var(--pixel-pink)",
        "pixel-yellow": "var(--pixel-yellow)",
        "pixel-lime": "var(--pixel-lime)",
        "pixel-sky": "var(--pixel-sky)",
        "pixel-purple": "var(--pixel-purple)",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        terminal: ["var(--font-terminal)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        hard: "4px 4px 0 0 var(--ink)",
        "hard-sm": "2px 2px 0 0 var(--ink)",
        "hard-lg": "8px 8px 0 0 var(--ink)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pixelPop: {
          "0%": { transform: "scale(0)" },
          "60%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)" },
        },
        marqueeScroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        blinkStep: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s steps(4, end)",
        pixelPop: "pixelPop 0.3s steps(3, end)",
        marqueeScroll: "marqueeScroll 22s linear infinite",
        blinkStep: "blinkStep 1s steps(1, end) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
