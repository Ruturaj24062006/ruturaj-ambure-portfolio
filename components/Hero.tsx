"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Mail, Eye } from "lucide-react";
import HolographicPortrait from "./HolographicPortrait";
import Magnetic from "./Magnetic";

const roles = [
  "AI Engineer",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "Problem Solver",
];

function Typewriter({ words }: { words: string[] }) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = words[currentWordIdx];
    const speed = isDeleting ? 35 : 75;

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? activeWord.substring(0, currentText.length - 1)
            : activeWord.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, words]);

  return (
    <span className="text-brand-cyan relative inline-block min-h-[36px]">
      {currentText}
      <span className="w-[3px] h-[75%] bg-brand-cyan absolute -right-1.5 top-[15%] animate-pulse" />
    </span>
  );
}

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen relative flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      <div className="container max-w-5xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center justify-items-center md:justify-items-stretch">
        
        {/* Left Side: Typography and CTAs */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Status Capsule */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 font-mono text-[10px] tracking-widest text-brand-cyan uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-ping" />
            <span>Available for Industry Collaboration</span>
          </motion.div>

          {/* Large Title */}
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="font-mono text-xs tracking-[0.25em] text-white/50 uppercase"
            >
              Hello World, I'm
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]"
            >
              <span className="text-white block">Ruturaj</span>
              <span className="text-gradient-cyan-purple block">Ambure</span>
            </motion.h1>
          </div>

          {/* Subheading with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="font-mono text-lg sm:text-xl font-semibold flex items-center gap-2 text-white/80"
          >
            <span>A passionate</span>
            <Typewriter words={roles} />
          </motion.div>

          {/* Summary / Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-white/60 text-sm sm:text-base max-w-lg leading-relaxed font-sans"
          >
            Artificial Intelligence and Data Science undergraduate specializing in Data Structures & Algorithms, Machine Learning, and building high-performance full-stack solutions. Dedicated to solving complex engineering challenges with state-of-the-art tech.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap gap-4 items-center pt-2"
          >
            {/* Primary Download Resume */}
            <Magnetic>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider font-mono bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 active:scale-95 border border-brand-cyan/20 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Resume.pdf</span>
              </a>
            </Magnetic>

            {/* View Projects */}
            <Magnetic>
              <button
                onClick={() => handleScrollTo("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider font-mono bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-brand-cyan/30 transition-all duration-300 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-brand-cyan" />
                <span>Projects</span>
              </button>
            </Magnetic>

            {/* Contact Me */}
            <Magnetic>
              <button
                onClick={() => handleScrollTo("#contact")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider font-mono text-white/80 hover:text-white transition-all duration-300 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-brand-purple" />
                <span>Contact</span>
                <ArrowUpRight className="w-3 h-3 text-white/40" />
              </button>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Side: Floating Interactive 3D Hologram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="col-span-1 md:col-span-5 flex justify-center items-center relative w-full"
        >
          {/* Extra visual indicators behind portrait */}
          <div className="absolute top-10 -right-4 font-mono text-[8px] text-brand-cyan/40 select-none hidden md:block">
            <span>AZ_POS_72: 9.882.119</span>
            <br />
            <span>ALT_FLT_RAD: +882.35m</span>
          </div>

          <HolographicPortrait />
        </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-bg-dark to-transparent pointer-events-none" />
    </section>
  );
}
