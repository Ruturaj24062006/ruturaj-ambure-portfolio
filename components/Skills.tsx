"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillItem {
  name: string;
  detail: string;
}

interface SkillGroup {
  category: string;
  skills: SkillItem[];
  color: string;      // Tailwind border/shadow color
  dotColor: string;   // Hex color for glowing dot
}

const skillGroups: SkillGroup[] = [
  {
    category: "AI & Machine Learning",
    color: "group-hover:border-brand-purple/40 shadow-brand-purple/5",
    dotColor: "#7C3AED",
    skills: [
      { name: "Machine Learning", detail: "Supervised & Unsupervised pipelines" },
      { name: "Deep Learning", detail: "Neural networks & neural systems" },
      { name: "CNN", detail: "Convolutional models for computer vision" },
      { name: "U-Net", detail: "Biomedical tumor segmentations" },
      { name: "XGBoost", detail: "Gradient boosted decision trees" }
    ]
  },
  {
    category: "Languages & Programming",
    color: "group-hover:border-brand-cyan/40 shadow-brand-cyan/5",
    dotColor: "#00E5FF",
    skills: [
      { name: "C/C++", detail: "DSA & Low-level optimizations" },
      { name: "Python", detail: "ML modeling & FastAPI pipelines" },
      { name: "TypeScript", detail: "Type-safe robust frontends" },
      { name: "JavaScript", detail: "Web apps & interactive UI logic" },
      { name: "SQL", detail: "Relational DB design & query tuning" }
    ]
  },
  {
    category: "Frontend Architectures",
    color: "group-hover:border-blue-500/40 shadow-blue-500/5",
    dotColor: "#3B82F6",
    skills: [
      { name: "React.js", detail: "Component architectures & hooks" },
      { name: "Next.js", detail: "App Router, SSR & performance tuning" },
      { name: "Tailwind CSS", detail: "Utility-first clean design styling" },
      { name: "HTML5/CSS3", detail: "Semantic web & styling foundations" }
    ]
  },
  {
    category: "Backend & Systems",
    color: "group-hover:border-indigo-500/40 shadow-indigo-500/5",
    dotColor: "#6366F1",
    skills: [
      { name: "FastAPI", detail: "High-performance Python backends" },
      { name: "Node.js", detail: "Event-driven asynchronous services" },
      { name: "Express", detail: "RESTful web API routers" },
      { name: "RESTful APIs", detail: "Secure modular web integrations" }
    ]
  },
  {
    category: "Relational Databases",
    color: "group-hover:border-teal-500/40 shadow-teal-500/5",
    dotColor: "#14B8A6",
    skills: [
      { name: "PostgreSQL", detail: "Scalable enterprise data storage" },
      { name: "MySQL", detail: "Relational data tables & indexes" }
    ]
  },
  {
    category: "Core Computer Science",
    color: "group-hover:border-pink-500/40 shadow-pink-500/5",
    dotColor: "#EC4899",
    skills: [
      { name: "Data Structures & Algorithms", detail: "Optimal time & space complexity" },
      { name: "OOP", detail: "Modular encapsulation & polymorphism" },
      { name: "DBMS", detail: "Database relations & normalization" },
      { name: "Computer Networks", detail: "OSI model, TCP/IP protocols" }
    ]
  },
  {
    category: "Development Tooling",
    color: "group-hover:border-amber-500/40 shadow-amber-500/5",
    dotColor: "#F59E0B",
    skills: [
      { name: "Git", detail: "Distributed version control systems" },
      { name: "GitHub", detail: "Collaboration pipelines & actions" },
      { name: "VS Code", detail: "Development workspace & tooling" }
    ]
  }
];

function FloatingCapsule({ 
  skill, 
  dotColor, 
  index 
}: { 
  skill: SkillItem; 
  dotColor: string; 
  index: number; 
}) {
  const [active, setActive] = useState(false);

  // Staggered slow float durations to make them look organic
  const floatDuration = 3 + (index % 3) * 0.7;
  const floatOffset = index % 2 === 0 ? [0, -6, 0] : [-3, 3, -3];

  return (
    <div className="relative">
      <motion.div
        animate={{
          y: floatOffset,
          x: index % 2 === 0 ? [-2, 2, -2] : [0, 0, 0]
        }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className={`relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[11px] font-mono tracking-wide text-white/80 hover:text-white hover:bg-white/[0.04] transition-all duration-300 cursor-help select-none ${
          active ? "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.06)] scale-105" : ""
        }`}
      >
        {/* Glow Dot */}
        <span 
          className="w-1.5 h-1.5 rounded-full shrink-0" 
          style={{ 
            backgroundColor: dotColor,
            boxShadow: `0 0 8px ${dotColor}`
          }} 
        />
        <span>{skill.name}</span>
      </motion.div>

      {/* Hover Info Tooltip */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-[#0b1120] border border-white/10 rounded-lg shadow-xl z-30 pointer-events-none text-center"
          >
            <div className="text-[10px] text-white font-medium leading-relaxed font-sans">
              {skill.detail}
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-width-[5px] border-solid border-t-white/10 border-r-transparent border-b-transparent border-l-transparent w-0 h-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-brand-cyan tracking-[0.2em] uppercase mb-2">02 // Knowledge Matrix</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Skill Core & Capsules
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mt-3 rounded-full" />
        </div>

        {/* Categories Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className={`glass-panel p-6 rounded-2xl border border-white/5 transition-all duration-500 shadow-xl group ${group.color}`}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-5">
                <h3 className="font-display font-bold text-sm tracking-wide text-white/90">
                  {group.category}
                </h3>
                <span className="font-mono text-[8px] text-white/30 tracking-widest uppercase">
                  MATRIX_SECTOR
                </span>
              </div>

              {/* Floating Capsules Cloud */}
              <div className="flex flex-wrap gap-3.5">
                {group.skills.map((skill, index) => (
                  <FloatingCapsule 
                    key={skill.name} 
                    skill={skill} 
                    dotColor={group.dotColor}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
