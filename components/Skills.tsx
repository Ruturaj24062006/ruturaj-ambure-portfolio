"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  skills: string[];
  color: string; // Tailwind color class for neon effects
  cubeColor: string; // RGB/Hex for R3F-like CSS Cube faces
}

const skillGroups: SkillGroup[] = [
  {
    category: "Programming",
    skills: ["C/C++", "Python", "JavaScript", "TypeScript", "SQL"],
    color: "from-cyan-500 to-blue-500",
    cubeColor: "rgba(0, 229, 255, 0.35)",
  },
  {
    category: "AI & Machine Learning",
    skills: ["Machine Learning", "Deep Learning", "CNN", "U-Net", "XGBoost"],
    color: "from-purple-500 to-indigo-500",
    cubeColor: "rgba(124, 58, 237, 0.35)",
  },
  {
    category: "Web & Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "TypeScript", "HTML5/CSS3"],
    color: "from-blue-400 to-cyan-400",
    cubeColor: "rgba(96, 165, 250, 0.35)",
  },
  {
    category: "Backend & API Development",
    skills: ["Node.js", "Express", "FastAPI", "RESTful APIs"],
    color: "from-indigo-600 to-purple-600",
    cubeColor: "rgba(79, 70, 229, 0.35)",
  },
  {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL"],
    color: "from-teal-400 to-emerald-500",
    cubeColor: "rgba(45, 212, 191, 0.35)",
  },
  {
    category: "Core CS & Algorithms",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Computer Networks"],
    color: "from-pink-500 to-purple-500",
    cubeColor: "rgba(236, 72, 153, 0.35)",
  },
  {
    category: "Tools & Git",
    skills: ["Git", "GitHub", "VS Code"],
    color: "from-amber-500 to-orange-500",
    cubeColor: "rgba(245, 158, 11, 0.35)",
  },
];

// Helper to render the CSS 3D Cube
function CSS3DCube({ color }: { color: string }) {
  return (
    <div className="w-12 h-12 relative shrink-0" style={{ perspective: "400px" }}>
      <div 
        className="w-full h-full absolute transform-style-3d animate-[spin_8s_linear_infinite] hover:animate-[spin_4s_linear_infinite]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 border border-white/25 backdrop-blur-[1px]"
          style={{ 
            backgroundColor: color, 
            transform: "translateZ(24px)",
          }}
        />
        {/* Back */}
        <div 
          className="absolute inset-0 border border-white/25 backdrop-blur-[1px]"
          style={{ 
            backgroundColor: color, 
            transform: "rotateY(180deg) translateZ(24px)",
          }}
        />
        {/* Left */}
        <div 
          className="absolute inset-0 border border-white/25 backdrop-blur-[1px]"
          style={{ 
            backgroundColor: color, 
            transform: "rotateY(-90deg) translateZ(24px)",
          }}
        />
        {/* Right */}
        <div 
          className="absolute inset-0 border border-white/25 backdrop-blur-[1px]"
          style={{ 
            backgroundColor: color, 
            transform: "rotateY(90deg) translateZ(24px)",
          }}
        />
        {/* Top */}
        <div 
          className="absolute inset-0 border border-white/25 backdrop-blur-[1px]"
          style={{ 
            backgroundColor: color, 
            transform: "rotateX(90deg) translateZ(24px)",
          }}
        />
        {/* Bottom */}
        <div 
          className="absolute inset-0 border border-white/25 backdrop-blur-[1px]"
          style={{ 
            backgroundColor: color, 
            transform: "rotateX(-90deg) translateZ(24px)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-brand-cyan tracking-[0.2em] uppercase mb-2">02 // Knowledge Matrix</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Skill Core & Cubes
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mt-3 rounded-full" />
        </div>

        {/* Grid of Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={group.category}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="glass-card p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-all duration-300 group"
              >
                {/* Visual Glow behind card */}
                <div 
                  className={`absolute -inset-4 bg-gradient-to-r ${group.color} opacity-0 group-hover:opacity-[0.05] blur-xl transition-opacity duration-300 pointer-events-none`} 
                />

                {/* Top Section: Title & Cube */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display font-bold text-white text-base tracking-wide leading-snug max-w-[70%] pt-1">
                    {group.category}
                  </h3>
                  
                  {/* CSS 3D Cube */}
                  <CSS3DCube color={group.cubeColor} />
                </div>

                {/* Bottom Section: Skills List */}
                <div className="mt-8 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-mono tracking-wide rounded-md bg-white/[0.03] border border-white/5 text-white/70 group-hover:border-white/10 group-hover:text-white/95 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {/* Tech HUD Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-cyan/20 via-brand-purple/20 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
