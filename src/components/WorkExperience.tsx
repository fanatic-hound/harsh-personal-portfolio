"use client";
import Headers from "./Headers";
import Image from "next/image";
import { motion } from "framer-motion";
import { omnissa, wisetech } from "../../public/Links";
import ChibiAvatar, { type ChibiEmote } from "./ChibiAvatar";

const workExperienceData = [
  {
    role: "Software Engineer",
    company: "WiseTech Global, IN",
    date: "July 2024 - May 2026",
    logo: "/images/WiseTech.png",
    link: wisetech,
    chibiEmote: "coding" as ChibiEmote,
  },
  {
    role: "Member of Technical Staff - II",
    company: "Omnissa LLC",
    date: "July 2026 - Present",
    logo: "/images/Omnissa.png",
    link: omnissa,
    chibiEmote: "security" as ChibiEmote,
  },
];

const WorkExperience = () => {
  return (
    <section id="work-experience" className="p-4 sm:p-8 relative">
      <Headers text="Work Experience" />

      {/* ── Centered timeline ── */}
      <div className="relative w-full max-w-4xl mx-auto mt-12 sm:mt-16">
        {/* Vertical dashed centre spine — visible only on md+ */}
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-ink"
          style={{
            maskImage:
              "repeating-linear-gradient(to bottom, #000 0 10px, transparent 10px 18px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to bottom, #000 0 10px, transparent 10px 18px)",
          }}
        />

        {/* Mobile-only left-aligned spine */}
        <div
          className="md:hidden absolute left-5 top-0 bottom-0 w-[3px] bg-ink"
          style={{
            maskImage:
              "repeating-linear-gradient(to bottom, #000 0 10px, transparent 10px 18px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to bottom, #000 0 10px, transparent 10px 18px)",
          }}
        />

        {workExperienceData.map((work, index) => {
          // Odd = right, Even = left (on desktop).  On mobile everything is on the right.
          const isRight = index % 2 !== 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRight ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={`relative mb-12 md:mb-16 md:w-[calc(50%-2rem)] ${
                isRight
                  ? "md:ml-[calc(50%+2rem)]"
                  : "md:mr-[calc(50%+2rem)]"
              } ml-10 md:ml-auto`}
            >
              {/* ── Centre node (company logo) ── */}
              <a
                href={work.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  absolute top-1/2 -translate-y-1/2 z-10
                  w-12 h-12 sm:w-14 sm:h-14
                  bg-surface border-[3px] border-ink shadow-hard-sm
                  flex items-center justify-center pixel-lift
                  /* mobile: left-aligned on the spine */
                  -left-[2.7rem]
                  /* desktop: centred on the spine */
                  ${isRight
                    ? "md:-left-[calc(2rem+1.75rem)]"
                    : "md:-right-[calc(2rem+1.75rem)] md:left-auto"
                  }
                `}
                aria-label={work.company}
              >
                <Image
                  src={work.logo}
                  alt={work.company}
                  width={32}
                  height={32}
                />
              </a>

              {/* ── Connector arm from spine to card ── */}
              <div
                className={`
                  hidden md:block absolute top-1/2 -translate-y-1/2 h-[3px] w-8 bg-ink
                  ${isRight ? "-left-8" : "-right-8 left-auto"}
                `}
              />

              {/* ── Card ── */}
              <div
                className={`pixel-card pixel-lift p-5 sm:p-6 flex items-center gap-4 ${
                  isRight
                    ? "flex-row"
                    : "flex-row md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${isRight ? "" : "md:text-right"}`}>
                  <h3 className="font-pixel text-sm sm:text-base uppercase leading-relaxed mb-2">
                    {work.role}
                  </h3>
                  <p className="font-terminal text-lg sm:text-xl mb-1 text-pixel-pink uppercase tracking-wide">
                    {work.company}
                  </p>
                  <span className="font-terminal text-base sm:text-lg text-muted uppercase">
                    {work.date}
                  </span>
                </div>

                {/* Unique chibi per role */}
                <ChibiAvatar
                  emote={work.chibiEmote}
                  size={100}
                  className="chibi-tilt hidden sm:block flex-shrink-0"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkExperience;
