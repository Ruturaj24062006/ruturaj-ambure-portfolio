"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, BookOpen, GraduationCap, Sparkles } from "lucide-react";

function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 12);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

function CgpaRadial({ isInView }: { isInView: boolean }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const cgpaPercent = 8.67 / 10;
  const strokeDashoffset = circumference - (cgpaPercent * circumference);

  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0 mb-3">
      <svg className="w-full h-full transform -rotate-90">
        {/* Base Track */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="4"
          fill="transparent"
        />
        {/* Colored Progress Ring */}
        <motion.circle
          cx="32"
          cy="32"
          r={radius}
          stroke="#00E5FF"
          strokeWidth="4.5"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset } : {}}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
          style={{
            filter: "drop-shadow(0 0 6px rgba(0, 229, 255, 0.4))"
          }}
        />
      </svg>
      <span className="absolute font-display font-black text-sm text-white">8.67</span>
    </div>
  );
}

export default function Achievements() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="achievements" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-brand-cyan tracking-[0.2em] uppercase mb-2">05 // Track Records</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Honors & Achievements
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mt-3 rounded-full" />
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          
          {/* Patents Counter */}
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group gradient-border-mask sheen-glow">
            <Award className="w-7 h-7 text-brand-cyan mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-display text-4xl sm:text-5xl font-black text-white leading-none">
              <AnimatedCounter value={2} />
            </span>
            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase mt-2.5">
              Patents Published
            </span>
          </div>

          {/* DSA Counter */}
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group gradient-border-mask sheen-glow">
            <BookOpen className="w-7 h-7 text-brand-purple mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-display text-4xl sm:text-5xl font-black text-white leading-none">
              <AnimatedCounter value={250} />+
            </span>
            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase mt-2.5">
              DSA Solved (LeetCode)
            </span>
          </div>

          {/* CGPA Counter - Radial Circle */}
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group gradient-border-mask sheen-glow">
            <CgpaRadial isInView={isInView} />
            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase mt-2.5">
              B.Tech VIT CGPA
            </span>
          </div>

        </div>

        {/* Detailed Achievements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Patent details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group gradient-border-mask sheen-glow"
          >
            <div className="flex items-center gap-3.5 border-b border-white/5 pb-4 mb-4">
              <div className="p-2 bg-brand-cyan/10 rounded-lg">
                <Award className="w-5 h-5 text-brand-cyan" />
              </div>
              <div>
                <span className="font-mono text-[9px] text-brand-cyan tracking-wider uppercase">Patent Registry</span>
                <h3 className="font-display font-bold text-white text-base">Indian Patent Office</h3>
              </div>
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Published <strong className="text-white">2 patents</strong> through the Indian Patent Office in the domains of Web Applications and Generative AI-Based Incident Management. Focuses on system logic, secure encryption layers, and NLP-driven notification scripts.
            </p>
          </motion.div>

          {/* CDAC details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group gradient-border-mask sheen-glow"
          >
            <div className="flex items-center gap-3.5 border-b border-white/5 pb-4 mb-4">
              <div className="p-2 bg-brand-purple/10 rounded-lg">
                <Sparkles className="w-5 h-5 text-brand-purple" />
              </div>
              <div>
                <span className="font-mono text-[9px] text-brand-purple tracking-wider uppercase">Specialist Bootcamp</span>
                <h3 className="font-display font-bold text-white text-base">C-DAC Pune Bootcamp</h3>
              </div>
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              Successfully completed the intensive <strong className="text-white">Artificial Intelligence Bootcamp</strong> conducted by C-DAC Pune under the FutureSkills PRIME (MeitY & NASSCOM Digital Skilling Initiative) program. Strengthened models, CNN architectures, and deep neural network parameters.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
