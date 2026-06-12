"use client";
import React, { useState } from "react";
import Headers from "./Headers";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import ChibiAvatar from "./ChibiAvatar";

const TAG_COLORS = ["tag-yellow", "tag-pink", "tag-lime", "tag-sky"];

const projects = [
  {
    title: "Curio.Ai - AI-Powered Personalized Course Generator",
    description: "Developed an AI-powered platform that generates personalized courses based on user preferences and learning goals.",
    techStack: ["Spring Boot", "Java", "OpenAI API"],
    category: "Software",
    repoUrl: "https://github.com/fanatic-hound/curio.ai",
    // deployedUrl: "https://...",
  },
  {
    title: "AI Powered Mini Blogging Platform",
    description: "Developed an AI-ready mini blogging platform that is capable to answer users queries regarding the blogging platform and published blogs.",
    techStack: ["TypeScript", "Next.js", "OpenAI API"],
    category: "Software",
    repoUrl: "https://github.com/fanatic-hound/mini-blogging-platform",
    deployedUrl: "https://mini-blogging-platform-gilt.vercel.app/",
  },
  {
    title: "AR Based Game",
    description: "Developed an AR-Based First Person Shooter game having different difficulties, weapons and enemies",
    techStack: ["C#", "Unity Game Engine", "Visual Studio"],
    category: "Software",
    repoUrl: "https://github.com/fanatic-hound/AR-based-game-1",
    // deployedUrl: "https://...",
  },
  {
    title: "ASCII Art Generator",
    description: "Created an ASCII Art Generator that converts images to ASCII art using Python.",
    techStack: ["Python", "Pillow", "Numpy"],
    category: "Software",
    // repoUrl: "https://github.com/...",
    // deployedUrl: "https://...",
  },
  {
    title: "Byteshell",
    description: "Simple shell implementation written in C language providing a basic command-line interface where users can enter commands, execute built-in commands, and view command history.",
    techStack: ["C"],
    category: "Software",
    // repoUrl: "https://github.com/...",
    // deployedUrl: "https://...",
  },
  {
    title: "Minimization of Earing defect in deep-drawn cups using Machine Learning",
    description: "Analyzed and minimized the earing defect in deep-drawn cups using Machine Learning and simulations",
    techStack: ["DynaForm", "SolidWorks", "Python"],
    category: "Mechanical",
    // repoUrl: "https://github.com/...",
    // deployedUrl: "https://...",
  },
  {
    title: "1-D Compressible Flow Analysis",
    description: "C++ program to analyze 1-D compressible flow through different cross-sections",
    techStack: ["C++", "Compressible Flow", "Fluid Mechanics"],
    category: "Mechanical",
    // repoUrl: "https://github.com/...",
    // deployedUrl: "https://...",
  },
  {
    title: "Formability Analysis of Sheet Metal using Machine Learning",
    description: "Predicted Forming Limit Diagrams (FLD) of various materials to prevent sheet metal industry failures",
    techStack: ["Python", "Stress and Strains"],
    category: "Mechanical",
    // repoUrl: "https://github.com/...",
    // deployedUrl: "https://...",
  },
  {
    title: "Design and Aerodynamic Analysis of F1 Car Front Wing",
    description: "Designed F1 Car frontwing optimizing it for maximum downforce and efficient airflow around the car",
    techStack: ["SolidWorks", "Ansys Fluent", "CFD"],
    category: "Mechanical",
    // repoUrl: "https://github.com/...",
    // deployedUrl: "https://...",
  },
];

interface Project {
  title: string;
  description: string;
  techStack: string[];
  category: string;
  repoUrl?: string;
  deployedUrl?: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
      className="h-full"
    >
      <div className="pixel-card pixel-lift p-5 sm:p-6 h-full flex flex-col">
        <h3 className="font-pixel text-xs sm:text-sm leading-relaxed uppercase mb-3">{project.title}</h3>
        <p className="font-body text-sm sm:text-[0.95rem] text-muted mb-4 flex-1 leading-relaxed">{project.description}</p>
        <div className="flex items-end justify-between gap-2 mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className={`pixel-tag ${TAG_COLORS[i % TAG_COLORS.length]} !text-[0.75rem] !px-1.5 !py-0.5`}
              >
                {tech}
              </span>
            ))}
          </div>
          {(project.repoUrl || project.deployedUrl) && (
            <div className="flex items-center gap-3 flex-shrink-0">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-hover"
                  title="Source Code"
                  aria-label={`${project.title} source code`}
                >
                  <FiGithub size={18} />
                </a>
              )}
              {project.deployedUrl && (
                <a
                  href={project.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-hover"
                  title="Live Demo"
                  aria-label={`${project.title} live demo`}
                >
                  <FiExternalLink size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("Software");
  const categories = ["Software", "Mechanical"];

  return (
    <section id="projects" className="min-h-screen relative overflow-y-auto p-4 sm:p-8 md:p-12 lg:p-16">
      <Headers text="Projects" />

      {/* Arcade category selector */}
      <div className="flex justify-center items-center gap-4 sm:gap-6 my-8 sm:my-10">
        <ChibiAvatar emote="excited" size={90} className="chibi-float hidden sm:block" />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            aria-pressed={selectedCategory === category}
            className={`btn-pixel text-base sm:text-lg ${
              selectedCategory === category ? "btn-pixel-pink" : "btn-pixel-paper"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Project Display */}
      <div className="flex justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {projects
              .filter((project) => project.category === selectedCategory)
              .map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
