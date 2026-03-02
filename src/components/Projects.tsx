import React, { useState } from "react";
import Headers from "./Headers";
import { Anonymous_Pro, Playpen_Sans, Josefin_Slab } from "next/font/google";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400"],
});

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  weight: ["600"],
});

const projects = [
  {
    title: "AR Based Game",
    description: "Developed an AR-Based First Person Shooter game having different difficulties, weapons and enemies",
    techStack: ["C#", "Unity Game Engine", "Visual Studio"],
    category: "Software",
  },
  {
    title: "ASCII Art Generator",
    description: "Created an ASCII Art Generator that converts images to ASCII art using Python.",
    techStack: ["Python", "Pillow", "Numpy"],
    category: "Software",
  },
  {
    title: "Byteshell",
    description: "Simple shell implementation written in C language providing a basic command-line interface where users can enter commands, execute built-in commands, and view command history.",
    techStack: ["C"],
    category: "Software",
  },
  {
    title: "Minimization of Earing defect in deep-drawn cups using Machine Learning",
    description: "Analyzed and minimized the earing defect in deep-drawn cups using Machine Learning and simulations",
    techStack: ["DynaForm", "SolidWorks", "Python"],
    category: "Mechanical",
  },
  {
    title: "1-D Compressible Flow Analysis",
    description: "C++ program to analyze 1-D compressible flow through different cross-sections",
    techStack: ["C++", "Compressible Flow", "Fluid Mechanics"],
    category: "Mechanical",
  },
  {
    title: "Formability Analysis of Sheet Metal using Machine Learning",
    description: "Predicted Forming Limit Diagrams (FLD) of various materials to prevent sheet metal industry failures",
    techStack: ["Python", "Stress and Strains"],
    category: "Mechanical",
  },
  {
    title: "Design and Aerodynamic Analysis of F1 Car Front Wing",
    description: "Designed F1 Car frontwing optimizing it for maximum downforce and efficient airflow around the car",
    techStack: ["SolidWorks", "Ansys Fluent", "CFD"],
    category: "Mechanical",
  },
];

interface Project {
  title: string;
  description: string;
  techStack: string[];
  category: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="project-card">
      <h3 className={`${josefinSlab.className}`}>{project.title}</h3>
      <p className={`${playpenSans.className}`}>{project.description}</p>
      <div className={` ${anonymousPro.className} tech-stack`}>
        {project.techStack.map((tech, index) => (
          <span key={index} className="tech-item">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("Software");

  return (
    <section id="projects" className="min-h-screen relative overflow-y-auto">
    {/* <Card> */}
    <section style={{ padding: '2rem' }} className="projects-section">
      <Headers text="Projects" />
      
      {/* Navigator */}
      <div className={` ${playpenSans.className} projects-navigator`}>
        <button
          className={selectedCategory === "Software" ? "active" : ""}
          onClick={() => setSelectedCategory("Software")}
        >
          Software
        </button>
        <button
          className={selectedCategory === "Mechanical" ? "active" : ""}
          onClick={() => setSelectedCategory("Mechanical")}
        >
          Mechanical
        </button>
      </div>
      
      {/* Project Display */}
      <div className="projects">
        <div className="project-grid">
          {projects
            .filter((project) => project.category === selectedCategory)
            .map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
        </div>
      </div>
    </section>
    {/* </Card> */}
    </section>
  );
};

export default Projects;
