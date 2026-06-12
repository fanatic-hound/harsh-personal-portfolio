"use client";
import React, { useContext, useState } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";
import ThemeToggleButton from "./ThemeToggleButton";
import ThemeContext from "../context/ThemeContext";
import Logo from "./Logo";
import {
  RiHome2Line,
  RiUser3Line,
  RiBriefcase2Line,
  RiDraftLine,
  RiChat3Line,
  RiMenu2Line,
  RiProjectorFill,
} from "react-icons/ri";

const navItems = [
  { to: "intro", icon: RiHome2Line, label: "Home" },
  { to: "about", icon: RiUser3Line, label: "About" },
  { to: "work-experience", icon: RiBriefcase2Line, label: "Experience" },
  { to: "projects", icon: RiProjectorFill, label: "Projects" },
  { to: "contact", icon: RiChat3Line, label: "Contact" },
];

const Navbar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [toggle, showMenu] = useState(false);
  const [active, setActive] = useState("intro");

  return (
    <>
      <aside
        className={`fixed top-0 left-0 h-screen w-[88px] z-[11] flex flex-col items-center justify-between py-8 bg-surface border-r-[3px] border-ink transition-transform duration-300 lg:translate-x-0 ${
          toggle ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <a href="#intro" className="block pixel-lift border-2 border-transparent">
          <Logo />
        </a>

        <nav>
          <ul className="flex flex-col gap-3">
            {navItems.map(({ to, icon: Icon, label }) => (
              <li key={to} className="relative">
                <Link
                  to={to}
                  spy={true}
                  smooth={true}
                  duration={500}
                  onSetActive={() => setActive(to)}
                  onClick={() => showMenu(false)}
                  aria-label={label}
                  className="relative z-10 flex items-center justify-center w-11 h-11 text-xl cursor-pointer transition-colors duration-150"
                  style={{ color: active === to ? "#fff" : "var(--ink)" }}
                >
                  <Icon />
                </Link>
                {active === to && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-pixel-pink border-2 border-ink shadow-hard-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-4">
          <ThemeToggleButton toggleTheme={toggleTheme} />
          <a
            href="/Harsh_Pal_CV.pdf"
            className="flex items-center justify-center w-11 h-11 border-2 border-ink bg-surface text-xl cursor-pointer pixel-lift hover:bg-pixel-yellow hover:text-[#111014]"
            download
            aria-label="Download resume"
          >
            <RiDraftLine />
          </a>
        </div>
      </aside>

      <button
        className={`fixed top-5 left-5 z-[12] flex lg:hidden items-center justify-center w-11 h-11 bg-surface border-[3px] border-ink shadow-hard text-xl transition-transform duration-300 ${
          toggle ? "translate-x-[96px]" : ""
        }`}
        onClick={() => showMenu(!toggle)}
        aria-label="Toggle navigation"
      >
        <RiMenu2Line />
      </button>
    </>
  );
};

export default Navbar;
