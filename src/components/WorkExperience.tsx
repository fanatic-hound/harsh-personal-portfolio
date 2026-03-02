import Headers from "./Headers";
import React from "react";
import Image from "next/image";
import { wisetech } from "../../public/Links";
import { useRouter } from "next/navigation";
import { Anonymous_Pro, Playpen_Sans } from "next/font/google";

const anonymousPro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400"],
});

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});


const WorkExperience = () => {
  const router = useRouter();
  const workExperienceData = [
    {
      role: "Associate Software Engineer",
      company: "WiseTech Global, IN",
      date: "July 2024 - Present",
    },
  ];
    return (
    // <Card>
      <section id="work-experience" className="p-4 sm:p-8 relative">
        <Headers text="Work Experience" />
        <div className="w-full mx-auto p-2 sm:p-6 md:p-12">
          <div className="timeline relative py-4 list-none">
        {workExperienceData.map((work, index) => (
          <div
            key={index}
            className={`timeline-item flex justify-start items-center mb-12 ml-8 relative ${
          index % 2 === 0 ? "left" : "right"
            }`}
          >
            <a
          onClick={() => {
            window.open(wisetech, "_blank");
            router.push("/");
          }}
            >
          <div className="icon bg-purple-600 w-12 h-12 flex rounded-full text-white text-2xl absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-slideInFromBottomWork transition-transform duration-300 ease hover:scale-110 cursor-pointer justify-center">
            <Image
              src="/images/WiseTech.png"
              alt="WiseTech"
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
            </a>
            <div
          className={`content bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-lg shadow-md text-center text-white ${
            index % 2 === 0 ? "animate-slideInFromLeft" : "animate-slideInFromRight"
          }`}
            >
          <h3 className={`${anonymousPro.className} mb-2 text-base`}>{work.role}</h3>
          <p className={`${playpenSans.className} mb-1 text-sm`}>{work.company}</p>
          <span className={`${playpenSans.className} text-sm text-gray-400`}>{work.date}</span>
            </div>
          </div>
        ))}
          </div>
        </div>
      </section>
      // </Card>
    );
  };
  
  export default WorkExperience;

