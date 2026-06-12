import React, { useState, useContext, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import ThemeContext from "../context/ThemeContext";
import Headers from "./Headers";
import Marquee from "./Marquee";
import ChibiAvatar from "./ChibiAvatar";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiLeetcode, SiGmail } from "react-icons/si";
import { instagram, github, linkedin, leetcode, gmail } from "../../public/Links";

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

  useEffect(() => {
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const result = await response.json();

      if (response.ok) {
        setHasSent(true);
        localStorage.setItem("contact_msg_sent", String(Date.now()));
        toast.success("Successfully sent email.");
      } else {
        toast.error(result.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts" className="relative px-0 py-8 sm:py-12">
      {/* Pink marquee strip ahead of the contact block, pixel.melbourne style */}
      <div className="mb-12">
        <Marquee items={["Let's Talk", "Say Hello", "Get In Touch", "Let's Build Something"]} variant="pink" />
      </div>

      <div className="px-4 sm:px-8">
        <Headers text="Get in Touch" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-3xl mx-auto mt-8 sm:mt-12"
        >
          {/* Intro text - centered */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex justify-center mb-4">
              <ChibiAvatar emote="peace" size={130} className="chibi-float" />
            </div>
            <h3 className="font-pixel text-base sm:text-xl md:text-2xl mb-4 uppercase leading-relaxed [text-shadow:3px_3px_0_var(--pixel-yellow)]">
              Let&apos;s talk about everything!
            </h3>
            <p className="font-terminal text-lg sm:text-xl text-muted uppercase tracking-wide">
              &gt; Don&apos;t like forms? Send me an email.
            </p>
          </div>

          {/* Form card */}
          <div className="pixel-card p-5 sm:p-8 md:p-10">
            <form onSubmit={submitHandler} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="pixel-label">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    className="pixel-input"
                    placeholder="Your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="pixel-label">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    className="pixel-input"
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="pixel-label">Subject *</label>
                <input
                  id="contact-subject"
                  type="text"
                  className="pixel-input"
                  placeholder="What's this about?"
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="pixel-label">Message *</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  className="pixel-input resize-none"
                  placeholder="Write your message..."
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={hasSent || loading}
                className="btn-pixel btn-pixel-pink w-full sm:w-auto"
              >
                {hasSent ? "Message Sent ✓" : loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <ToastContainer position="bottom-right" theme={theme} />
        </motion.div>

        {/* Social icons */}
        <div className="flex justify-center gap-4 sm:gap-5 mt-10 sm:mt-12">
          {[
            { href: gmail, icon: <SiGmail size={20} />, label: "Email" },
            { href: instagram, icon: <FaInstagram size={20} />, label: "Instagram" },
            { href: linkedin, icon: <FaLinkedin size={20} />, label: "LinkedIn" },
            { href: leetcode, icon: <SiLeetcode size={20} />, label: "LeetCode" },
            { href: github, icon: <FaGithub size={20} />, label: "GitHub" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="pixel-lift flex items-center justify-center w-11 h-11 bg-surface border-2 border-ink shadow-hard-sm hover:bg-pixel-yellow hover:text-[#111014]"
            >
              {icon}
            </a>
          ))}
        </div>

        <footer className="font-terminal text-center mt-10 pb-4 text-muted text-lg uppercase tracking-widest">
          Made with ❤️ by Harsh Pal
        </footer>
      </div>
    </section>
  );
};

export default Contact;
