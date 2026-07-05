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

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
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
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-cyan to-transparent" />
            <Award className="w-8 h-8 text-brand-cyan mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-display text-4xl sm:text-5xl font-black text-white leading-none">
              <AnimatedCounter value={2} />
            </span>
            <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase mt-2">
              Patents Published
            </span>
          </div>

          {/* DSA Counter */}
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-purple to-transparent" />
            <BookOpen className="w-8 h-8 text-brand-purple mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-display text-4xl sm:text-5xl font-black text-white leading-none">
              <AnimatedCounter value={250} />+
            </span>
            <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase mt-2">
              DSA Solved (LeetCode)
            </span>
          </div>

          {/* CGPA Counter */}
          <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-transparent" />
            <GraduationCap className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-display text-4xl sm:text-5xl font-black text-white leading-none">
              8.67
            </span>
            <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase mt-2">
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
            className="glass-card p-6 rounded-2xl relative overflow-hidden group"
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
            className="glass-card p-6 rounded-2xl relative overflow-hidden group"
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
