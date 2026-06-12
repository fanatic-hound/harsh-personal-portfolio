import { motion } from "framer-motion";

export default function Headers({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex justify-center items-center w-full gap-3 sm:gap-5"
    >
      <div className="flex-grow h-[3px] bg-ink" style={{ maskImage: "repeating-linear-gradient(to right, #000 0 12px, transparent 12px 20px)", WebkitMaskImage: "repeating-linear-gradient(to right, #000 0 12px, transparent 12px 20px)" }} />

      <div className="relative flex items-center gap-2 sm:gap-4 px-2 sm:px-4">
        <span className="hidden sm:inline-block w-3 h-3 bg-pixel-pink border-2 border-ink" />
        <h2 className="font-pixel text-lg sm:text-2xl md:text-3xl whitespace-nowrap text-center uppercase leading-relaxed [text-shadow:3px_3px_0_var(--pixel-pink)]">
          {text}
        </h2>
        <span className="hidden sm:inline-block w-3 h-3 bg-pixel-yellow border-2 border-ink" />
      </div>

      <div className="flex-grow h-[3px] bg-ink" style={{ maskImage: "repeating-linear-gradient(to right, #000 0 12px, transparent 12px 20px)", WebkitMaskImage: "repeating-linear-gradient(to right, #000 0 12px, transparent 12px 20px)" }} />
    </motion.div>
  );
}
