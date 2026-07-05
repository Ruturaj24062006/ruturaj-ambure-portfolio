"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { GraduationCap, Award, Brain, Compass } from "lucide-react";

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(x, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative position
    const relativeX = e.clientX - rect.left - width / 2;
    const relativeY = e.clientY - rect.top - height / 2;

    // Set rotation limits (max 15 deg)
    x.set(-(relativeY / (height / 2)) * 15);
    y.set((relativeX / (width / 2)) * 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-brand-cyan tracking-[0.2em] uppercase mb-2">01 // Executive Bio</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Architecting Intelligent Solutions
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left: 3D Tilting Portrait Panel */}
          <div className="col-span-1 md:col-span-5 flex justify-center animate-float-slow" style={{ perspective: "1200px" }}>
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl border border-white/10 bg-brand-bg-card/40 overflow-hidden shadow-2xl p-2 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/10 to-brand-purple/10 pointer-events-none" />
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0a0f1d]">
                <Image
                  src="/profile.jpg"
                  alt="Ruturaj Ambure"
                  fill
                  sizes="(max-width: 320px) 100vw, 320px"
                  className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                
                {/* HUD border details */}
                <div className="absolute inset-4 border border-white/5 rounded-lg pointer-events-none group-hover:border-brand-cyan/20 transition-colors duration-500" />
              </div>

              {/* Decorative brackets */}
              <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/30 z-20 group-hover:border-brand-cyan" />
              <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/30 z-20 group-hover:border-brand-cyan" />
              <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/30 z-20 group-hover:border-brand-cyan" />
              <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/30 z-20 group-hover:border-brand-cyan" />
            </motion.div>
          </div>

          {/* Right: Narrative Story */}
          <div className="col-span-1 md:col-span-7 space-y-6 text-white/70 text-sm sm:text-base">
            <p className="leading-relaxed">
              I am an Artificial Intelligence and Data Science undergraduate at <strong className="text-white">Vishwakarma Institute of Technology, Pune</strong>. My technical journey is driven by a deep fascination with how algorithm optimization can solve industrial problems and how deep learning models can simulate human decision processes.
            </p>
            <p className="leading-relaxed">
              With a solid foundation in Data Structures and Algorithms, I build end-to-end full-stack applications and ML pipelines. I bridge the gap between complex backend architectures and mathematical machine learning algorithms, enabling performant, secure, and user-centric systems.
            </p>

            {/* Structured bio points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3.5 items-start p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <GraduationCap className="w-5 h-5 text-brand-cyan mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">Education</h4>
                  <p className="text-xs text-white/50 mt-1">B.Tech AI & Data Science<br />VIT Pune (CGPA: 8.67/10)</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <Award className="w-5 h-5 text-brand-purple mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">Patents</h4>
                  <p className="text-xs text-white/50 mt-1">2 Patents Published<br />(Web Apps & GenAI)</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <Brain className="w-5 h-5 text-brand-cyan mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">Research & ML</h4>
                  <p className="text-xs text-white/50 mt-1">U-Net Tumor Segmentation<br />XGBoost Risk Appraisals</p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <Compass className="w-5 h-5 text-brand-purple mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-mono text-xs font-semibold text-white uppercase tracking-wider">Projects</h4>
                  <p className="text-xs text-white/50 mt-1">Indian Railways<br />Cravita Technologies</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
