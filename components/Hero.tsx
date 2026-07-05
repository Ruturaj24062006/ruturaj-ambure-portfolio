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
  "Software Developer",
  "Problem Solver",
];

function Typewriter({ words }: { words: string[] }) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const activeWord = words[currentWordIdx];
    const speed = isDeleting ? 30 : 65;

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
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
      <span className="w-[2px] h-[75%] bg-brand-cyan absolute -right-1 top-[15%] animate-pulse" />
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
      className="min-h-screen relative flex items-center justify-center pt-28 pb-12 overflow-hidden"
    >
      {/* Visual background overlays */}
      <div className="absolute top-1/4 left-10 font-mono text-[8px] text-white/5 opacity-40 select-none hidden lg:block tracking-widest leading-loose">
        <span>[SYSTEM_INITIALIZATION: COMPLETED]</span><br />
        <span>[AZIMUTH_SECTOR: 35.8.A]</span><br />
        <span>[Z_LEVEL_OFFSET: -0.1983]</span>
      </div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center justify-items-center md:justify-items-stretch">
        
        {/* Left Side: Typography and CTAs */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Status Capsule */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-brand-cyan/25 bg-brand-cyan/5 font-mono text-[9px] tracking-widest text-brand-cyan uppercase shadow-[0_0_15px_rgba(0,229,255,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            <span>Available for Industry Collaboration</span>
          </motion.div>
 
          {/* Large Title */}
          <div className="space-y-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase"
            >
              Hello World, I'm
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05]"
            >
              <span className="text-white block">Ruturaj</span>
              <span className="text-gradient-cyan-purple block">Ambure</span>
            </motion.h1>
          </div>
 
          {/* Subheading with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-lg sm:text-xl font-semibold flex flex-wrap items-center gap-x-2 text-white/90"
          >
            <span>A passionate</span>
            <Typewriter words={roles} />
          </motion.div>
 
          {/* Summary / Pitch */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 text-sm sm:text-base max-w-xl leading-relaxed font-sans"
          >
            I build high-performance machine learning pipelines and scalable full-stack applications. Specialized in optimizing complex algorithms and deploying explainable AI architectures.
          </motion.p>
 
          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 items-center pt-2"
          >
            {/* Primary Download Resume */}
            <Magnetic>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider font-mono bg-gradient-to-r from-brand-cyan to-brand-purple text-white shadow-[0_4px_20px_rgba(0,229,255,0.12)] hover:shadow-[0_4px_30px_rgba(0,229,255,0.25)] hover:scale-[1.02] active:scale-95 transition-all duration-300 border border-brand-cyan/20 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume.pdf</span>
              </a>
            </Magnetic>
 
            {/* View Projects */}
            <Magnetic>
              <button
                onClick={() => handleScrollTo("#projects")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider font-mono bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-brand-cyan/35 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Projects</span>
              </button>
            </Magnetic>
 
            {/* Contact Me */}
            <Magnetic>
              <button
                onClick={() => handleScrollTo("#contact")}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold tracking-wider font-mono text-white/70 hover:text-white transition-all duration-300 cursor-pointer"
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
