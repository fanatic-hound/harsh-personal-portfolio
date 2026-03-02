import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Headers from './Headers';
import ResumeButton from './ResumeButton';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { Anonymous_Pro, Playpen_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { codeforces, iitr, leetcode, uvic, instagram, linkedin, gmail } from '../../public/Links';

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400"],
});

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const About = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const aboutRef = useRef(null);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setFadeIn(true);
      } else {
        setFadeIn(false);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1.0,
    });

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, [aboutRef]);

  return (
    <section id="about" ref={aboutRef} className='my-4 sm:my-8 p-4 sm:p-8 relative overflow-y-auto'>
      {/* <Card> */}
      <Headers text="About Me" />
        <section className={`${fadeIn ? "fadeIn" : ""} p-2 sm:p-4 md:p-8 mx-auto max-w-screen-lg`}>
          <div className="grid w-full sm:w-11/12 md:w-full mx-auto my-5 grid-cols-1 sm:p-[0.5rem] md:grid-cols-[auto_1fr] gap-4 sm:gap-6 p-2 sm:p-4 md:p-6 animate-fadeIn justify-center items-center">
          <div className="relative flex justify-center items-center md:flex md:justify-center">
          <div 
          className="relative group" // Group container for image and overlay
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src="/images/about.png"
            alt="About Image"
            width={150}
            height={150}
            className="custom-shadow transition-transform duration-[0.3s] ease-[ease] rounded-full hover:scale-[1.1] justify-center group-hover:blur-sm"
          />
          {/* Content overlay on hover */}
          {isHovered && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.6)] rounded-full p-4 transition-opacity duration-300"
            >
              <span className={`${playpenSans.className} text-white text-sm text-center mb-1 sm:text-xs md:text-sm lg:text-base animate-bounce`}>Hii!! Connect with me 👇🏻</span>
              
              <div className="flex gap-4 animate-pulse">
                <a href={`mailto:${gmail}`} target="_blank" rel="noopener noreferrer">
                  <SiGmail size={20} className="text-white" />
                </a>
                <a href={instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={20} className="text-white" />
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={20} className="text-white" />
                </a>
              </div>
            </div>
          )}
          </div>
          </div>

            <div className="about__data custom-shadow grid text-[0.8rem] sm:text-[0.9rem] bg-[color:var(--container-color)] grid-cols-[repeat(1,1fr)] gap-x-[1.875rem] items-start relative p-3 sm:p-4 rounded-[20px]">
              <div className="about__info">
                <p className={`${poppins.className} about__description`}>
                  I&apos;m a passionate software developer with a Bachelor of Technology in Mechanical Engineering from the <a
                    onClick={() => {
                      window.open(iitr, "_blank");
                      router.push("/");
                    }}
                    className="hover:underline cursor-pointer transition-all font-semibold text-violet-400"
                  >
                    {" "}
                    Indian Institute of Technology, Roorkee (IITR)
                  </a>. Although my academic background is in mechanical engineering, I have a strong foundation in software development, with a keen focus on problem-solving and writing clean, production-level code. My experience spans both mechanical and software engineering, giving me a unique perspective on tackling diverse challenges.<br /><br />
                  I have also completed a research internship at the <a
                    onClick={() => {
                      window.open(uvic, "_blank");
                      router.push("/");
                    }}
                    className="hover:underline cursor-pointer transition-all font-semibold text-violet-400"
                  >
                    {" "}
                    University of Victoria, BC (UVic)
                  </a>, which ignited my passion for research. In addition to my professional experiences, I actively engage in competitive programming on platforms like {" "}
                  <a
                    onClick={() => {
                      window.open(codeforces, "_blank");
                      router.push("/");
                    }}
                    className="hover:underline cursor-pointer transition-all font-semibold text-violet-400"
                  >
                    Codeforces
                  </a>{" "} and {" "}
                  <a
                    onClick={() => {
                      window.open(leetcode, "_blank");
                      router.push("/");
                    }}
                    className="hover:underline cursor-pointer transition-all font-semibold text-violet-400"
                  >
                    Leetcode
                  </a>, consistently solving problems of varying difficulty to sharpen my problem-solving skills.<br /><br />
                  I love coding and am always eager to explore and solve problems, whether they are related to mechanical or software engineering.<br /><br />
                  Here are a few technologies I have worked on:
                </p>
                <ul className={`${anonymousPro.className} grid text-[0.65rem] sm:text-[0.7rem] grid-cols-1 sm:grid-cols-[repeat(2,1fr)] mb-4`}>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>C++</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>C#</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>Java</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>Python</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>Data Structure and Algorithms</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>JavaScript (ES6+)</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>TypeScript</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>React.js</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>Next.js</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>Android Studio</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>Winforms</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>Blazor</li>
                  <li className='relative pl-5 before:content-["▹"] before:absolute before:left-0'>Unity Game Engine</li>
                </ul>
                <ResumeButton />
              </div>
            </div>
          </div>
        </section>
      {/* </Card> */}
    </section>
  );
};

export default About;
