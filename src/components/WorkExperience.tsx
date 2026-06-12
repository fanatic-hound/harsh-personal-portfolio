"use client";
import Headers from "./Headers";
import Image from "next/image";
import { motion } from "framer-motion";
import { wisetech } from "../../public/Links";
import ChibiAvatar from "./ChibiAvatar";

const workExperienceData = [
  {
    role: "Software Engineer",
    company: "WiseTech Global, IN",
    date: "July 2024 - Present",
    logo: "/images/WiseTech.png",
    link: wisetech,
  },
];

const WorkExperience = () => {
  return (
    <section id="work-experience" className="p-4 sm:p-8 relative">
      <Headers text="Work Experience" />
      <div className="relative w-full max-w-3xl mx-auto mt-12 sm:mt-16 pl-14 sm:pl-20">
        {/* Dashed pixel spine */}
        <div
          className="absolute left-5 sm:left-7 top-2 bottom-2 w-[3px] bg-ink"
          style={{
            maskImage: "repeating-linear-gradient(to bottom, #000 0 10px, transparent 10px 18px)",
            WebkitMaskImage: "repeating-linear-gradient(to bottom, #000 0 10px, transparent 10px 18px)",
          }}
        />

        {workExperienceData.map((work, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mb-8"
          >
            {/* Square logo node */}
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -left-14 sm:-left-20 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-surface border-[3px] border-ink shadow-hard-sm flex items-center justify-center pixel-lift z-10"
              aria-label={work.company}
            >
              <Image src={work.logo} alt={work.company} width={32} height={32} />
            </a>

            <div className="pixel-card pixel-lift p-5 sm:p-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-pixel text-sm sm:text-base uppercase leading-relaxed mb-2">{work.role}</h3>
                <p className="font-terminal text-lg sm:text-xl mb-1 text-pixel-pink uppercase tracking-wide">{work.company}</p>
                <span className="font-terminal text-base sm:text-lg text-muted uppercase">{work.date}</span>
              </div>
              <ChibiAvatar emote="thumbsup" size={100} className="chibi-tilt hidden sm:block flex-shrink-0" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
