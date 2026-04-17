import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Playpen_Sans, Playfair_Display } from "next/font/google";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../context/ThemeContext";
import Headers from "./Headers";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGmail } from "react-icons/si";
import { instagram, github, linkedin, leetcode, gmail } from "../../public/Links";

const playpenSans = Playpen_Sans({
  subsets: ["latin"],
  weight: ["400"],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
});

interface ContactProps {
  theme?: string;
}

const Contact: React.FC<ContactProps> = () => {
  const { theme } = useContext(ThemeContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasSent, setHasSent] = useState<boolean>(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 250);
    const lastSent = localStorage.getItem("contact_msg_sent");
    if (lastSent && Date.now() - Number(lastSent) < 24 * 60 * 60 * 1000) {
      setHasSent(true);
    } else {
      localStorage.removeItem("contact_msg_sent");
    }
  }, []);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      return toast.error("Please complete the form above");
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email address");
    }

    if (hasSent) {
      return toast.error("You can only send one message per day. Please try again tomorrow!");
    }

    setLoading(true);

    const data = {
      name,
      email,
      subject,
      message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_API!
      )
      .then(
        () => {
          setLoading(false);
          setHasSent(true);
          localStorage.setItem("contact_msg_sent", String(Date.now()));
          toast.success(`Successfully sent email.`);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error(error.text);
        }
      );
  };

  return (
    <section id="contacts" className={`relative ${fadeIn ? "fadeIn" : ""} px-4 sm:px-8 py-8 sm:py-12`}>
      <Headers text="Get in Touch" />

      <div className={`${playpenSans.className} max-w-3xl mx-auto mt-8 sm:mt-12 animate-fadeIn`}>
        {/* Intro text - centered */}
        <div className="text-center mb-8 sm:mb-10">
          <h3 className="text-xl sm:text-2xl md:text-3xl mb-3 font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Let&apos;s talk about everything!
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            Don&apos;t like forms? Send me an email. 👋
          </p>
        </div>

        {/* Form card */}
        <div className="custom-shadow bg-[color:var(--container-color)] rounded-2xl p-5 sm:p-8 md:p-10">
          <form onSubmit={submitHandler} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                className="w-full h-12 sm:h-14 bg-[color:var(--hover-tech-item)] border border-gray-700 outline-none rounded-xl px-4 text-sm sm:text-base transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="w-full h-12 sm:h-14 bg-[color:var(--hover-tech-item)] border border-gray-700 outline-none rounded-xl px-4 text-sm sm:text-base transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="text"
              className="w-full h-12 sm:h-14 bg-[color:var(--hover-tech-item)] border border-gray-700 outline-none rounded-xl px-4 text-sm sm:text-base transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
            />

            <textarea
              rows={5}
              className="w-full bg-[color:var(--hover-tech-item)] border border-gray-700 outline-none rounded-xl p-4 text-sm sm:text-base resize-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Write your message..."
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button
              type="submit"
              disabled={hasSent || loading}
              className={`w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm sm:text-base font-medium px-8 py-3 rounded-full transition-all duration-300 ${hasSent || loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90 hover:scale-[1.02] active:scale-95"}`}
            >
              {hasSent ? "Message Sent ✓" : loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
        <ToastContainer position="bottom-right" theme={theme} />
      </div>

      {/* Social icons */}
      <div className="flex justify-center gap-5 sm:gap-6 mt-10 sm:mt-12">
        <a href={`mailto:${gmail}`} target="_blank" rel="noopener noreferrer" className="text-current transition-all duration-300 ease-in-out hover:scale-125 hover:text-purple-400">
          <SiGmail size={22} />
        </a>
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-current transition-all duration-300 ease-in-out hover:scale-125 hover:text-purple-400">
          <FaInstagram size={22} />
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-current transition-all duration-300 ease-in-out hover:scale-125 hover:text-purple-400">
          <FaLinkedin size={22} />
        </a>
        <a href={leetcode} target="_blank" rel="noopener noreferrer" className="text-current transition-all duration-300 ease-in-out hover:scale-125 hover:text-purple-400">
          <SiLeetcode size={22} />
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer" className="text-current transition-all duration-300 ease-in-out hover:scale-125 hover:text-purple-400">
          <FaGithub size={22} />
        </a>
      </div>

      <footer className={`${playfairDisplay.className} text-center mt-8 sm:mt-10 pb-4 text-gray-500 text-sm`}>
        Made with ❤️ by Harsh Pal
      </footer>
    </section>
  );
};

export default Contact;
