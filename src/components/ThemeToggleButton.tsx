import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiSunLine, RiMoonLine } from "react-icons/ri";
import ThemeContext from "../context/ThemeContext";

const ThemeToggleButton = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-11 h-11 border-2 border-ink bg-surface text-xl overflow-hidden cursor-pointer pixel-lift hover:bg-pixel-yellow hover:text-[#111014]"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.15, ease: "linear" }}
          className="flex items-center justify-center"
        >
          {theme === "light" ? <RiMoonLine /> : <RiSunLine />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggleButton;
