"use client";
import React, { useState } from "react";
import Headers from "./Headers";
import ChibiAvatar from "./ChibiAvatar";
import ResumeButton from "./ResumeButton";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useRouter } from "next/navigation";
import { codeforces, iitr, leetcode, uvic, instagram, linkedin, gmail } from "../../public/Links";

const techStack = [
  "C++", "C#", "Java", "Python", "Data Structures & Algorithms",
  "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js",
  "Android Studio", "WinForms", "Blazor", "Unity Game Engine",
];

const TAG_COLORS = ["tag-yellow", "tag-pink", "tag-lime", "tag-sky", "tag-purple"];

const About = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const linkClasses = "underline decoration-2 underline-offset-4 decoration-[var(--pixel-pink)] cursor-pointer font-bold hover:bg-pixel-yellow hover:text-[#111014] transition-colors duration-150";

  return (
    <section id="about" className="my-4 sm:my-8 p-4 sm:p-8 relative overflow-y-auto">
      <Headers text="About Me" />
      <section className="p-2 sm:p-4 md:p-8 mx-auto max-w-screen-lg">
        <div className="grid w-full sm:w-11/12 md:w-full mx-auto my-5 grid-cols-1 md:grid-cols-[auto_1fr] gap-8 sm:gap-10 p-2 sm:p-4 md:p-6 justify-center items-center">
          {/* Pixel avatar with connect overlay */}
          <div
            className="relative flex justify-center items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered((prev) => !prev)}
          >
            <div className="pixel-frame pixel-lift relative bg-surface p-3 rotate-[-2deg] hover:rotate-0">
              <ChibiAvatar size={170} emote="think" className="block" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-pixel-lime border-2 border-ink" />

              {/* Solid pixel-card overlay — fully opaque for contrast */}
              {isHovered && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-paper border-[3px] border-ink p-4 animate-pixelPop">
                  <span className="font-terminal text-xl text-center mb-4 uppercase tracking-wide">
                    &gt; Connect with me!
                  </span>
                  <div className="flex gap-3">
                    <a href={gmail} target="_blank" rel="noopener noreferrer" aria-label="Email" className="pixel-lift flex items-center justify-center w-10 h-10 bg-pixel-yellow text-[#111014] border-2 border-ink shadow-hard-sm">
                      <SiGmail size={18} />
                    </a>
                    <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="pixel-lift flex items-center justify-center w-10 h-10 bg-pixel-pink text-white border-2 border-ink shadow-hard-sm">
                      <FaInstagram size={18} />
                    </a>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="pixel-lift flex items-center justify-center w-10 h-10 bg-pixel-sky text-[#111014] border-2 border-ink shadow-hard-sm">
                      <FaLinkedin size={18} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="pixel-card grid text-[0.9rem] sm:text-base grid-cols-1 items-start relative p-5 sm:p-7"
          >
            <div className="about__info">
              <p className="font-body leading-relaxed mb-4">
                I&apos;m a passionate software developer with a Bachelor of Technology in Mechanical Engineering from the{" "}
                <a
                  onClick={() => {
                    window.open(iitr, "_blank", "noopener,noreferrer");
                    router.push("/");
                  }}
                  className={linkClasses}
                >
                  Indian Institute of Technology, Roorkee (IITR)
                </a>
                . Although my academic background is in mechanical engineering, I have a strong foundation in software development, with a keen focus on problem-solving and writing clean, production-level code. My experience spans both mechanical and software engineering, giving me a unique perspective on tackling diverse challenges.
                <br />
                <br />
                I have also completed a research internship at the{" "}
                <a
                  onClick={() => {
                    window.open(uvic, "_blank", "noopener,noreferrer");
                    router.push("/");
                  }}
                  className={linkClasses}
                >
                  University of Victoria, BC (UVic)
                </a>
                , which ignited my passion for research. In addition to my professional experiences, I actively engage in competitive programming on platforms like{" "}
                <a
                  onClick={() => {
                    window.open(codeforces, "_blank", "noopener,noreferrer");
                    router.push("/");
                  }}
                  className={linkClasses}
                >
                  Codeforces
                </a>{" "}
                and{" "}
                <a
                  onClick={() => {
                    window.open(leetcode, "_blank", "noopener,noreferrer");
                    router.push("/");
                  }}
                  className={linkClasses}
                >
                  Leetcode
                </a>
                , consistently solving problems of varying difficulty to sharpen my problem-solving skills.
                <br />
                <br />
                I love coding and am always eager to explore and solve problems, whether they are related to mechanical or software engineering.
              </p>

              <p className="font-terminal text-lg uppercase tracking-wider mb-3">
                &gt; Inventory: technologies I have worked on
              </p>

              <div className="flex flex-wrap gap-2.5 mb-5">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                    className={`pixel-tag ${TAG_COLORS[index % TAG_COLORS.length]} text-[0.8rem] sm:text-[0.9rem] cursor-default`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <ResumeButton />
            </div>
          </motion.div>
        </div>
      </section>
    </section>
  );
};

export default About;
