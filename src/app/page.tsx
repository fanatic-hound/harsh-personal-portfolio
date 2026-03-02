"use client";
import { useState, useEffect } from "react";
import Head from 'next/head';
import Landing from '../components/Landing';
import Navbar from '../components/Navbar';
import Intro from "../components/Intro";
import About from '../components/About';
import WorkExperience from '../components/WorkExperience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import ChatBot from '../components/ChatBot';
import {Analytics} from "@vercel/analytics/react";

export default function Home(): JSX.Element {
  const [isLandingVisible, setIsLandingVisible] = useState(true);

  const sections = [
    { component: <Intro />, id: 'intro' },
    { component: <About />, id: 'about' },
    { component: <WorkExperience />, id: 'workExperience' },
    { component: <Projects />, id: 'projects' },
    { component: <Contact />, id: 'contact' },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Harsh Pal&apos;s Portfolio</title>
      </Head>
      {/* Landing Page */}
      {isLandingVisible && <Landing setIsLandingVisible={setIsLandingVisible} />}
      {!isLandingVisible && <Navbar />}
      {!isLandingVisible && <ChatBot />}

      {/* Main Content */}
      {!isLandingVisible && (
        <main className="p-2 sm:p-4 ml-0 lg:ml-[100px] transition-all">
          <div className="sections-container">
            {sections.map((section, index) => (
              <div key={index} id={section.id} className="section">
                {section.component}
              </div>
            ))}
          </div>
        </main>
      )}
      <Analytics/>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CursorArea = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (event: any) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="absolute w-[800px] blur-[200px] h-[800px] bg-blue-500/10 rounded-full cursor-default pointer-events-none transition-transform duration-75 ease-linear top-0 left-0"
      style={{
        transform: `translate(${cursorPosition.x - 400}px, ${
          cursorPosition.y - 400
        }px)`,
      }}
    ></div>
  );
};