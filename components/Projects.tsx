"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Globe, FileText, Code2, BrainCircuit, ShieldAlert } from "lucide-react";
import Magnetic from "./Magnetic";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


interface ProjectItem {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  details: string[];
  tech: string[];
  github: string;
  live: string;
  caseStudy: string;
  icon: React.ReactNode;
  gradient: string; // Tailwind background gradient for visual theme
}

const projects: ProjectItem[] = [
  {
    id: "tumorverse",
    title: "TumorVerse",
    category: "Virtual Cancer Simulation & ML Framework",
    date: "May 2026",
    description: "An end-to-end AI framework for high-precision cancer detection, classification, and visual tumor segmentation in medical imaging data.",
    details: [
      "Built an end-to-end AI framework for cancer detection and classification using machine learning and deep learning techniques.",
      "Implemented U-Net-based tumor segmentation to accurately identify and analyze tumor regions from medical imaging data."
    ],
    tech: ["Python", "PyTorch", "XGBoost", "ResNet50", "U-Net"],
    github: "https://github.com/ruturajambure/TumorVerse",
    live: "#",
    caseStudy: "#",
    icon: <BrainCircuit className="w-6 h-6 text-brand-cyan" />,
    gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
  },
  {
    id: "stegovault",
    title: "StegoVault",
    category: "Secure Steganography Hiding System",
    date: "March 2026",
    description: "An interactive steganography web application designed to conceal, encrypt, and retrieve sensitive communication payloads hidden inside digital images.",
    details: [
      "Developed a secure steganography system to conceal sensitive information within digital images.",
      "Implemented OOP principles, custom encryption, and secure extraction mechanisms.",
      "Built an interactive web app for embedding and retrieving hidden data via image-based communication."
    ],
    tech: ["React.js", "Python", "Image Processing", "Cryptography", "OOP"],
    github: "https://github.com/ruturajambure/StegoVault",
    live: "#",
    caseStudy: "#",
    icon: <ShieldAlert className="w-6 h-6 text-brand-purple" />,
    gradient: "from-purple-500/20 via-pink-600/10 to-transparent",
  },
  {
    id: "karta",
    title: "KARTA",
    category: "AI Credit Appraisal Platform",
    date: "April 2025",
    description: "An automated document intelligence and credit risk assessment platform pulling records from 40+ financial sources to identify fraud and evaluate borrowers.",
    details: [
      "Architected an AI-powered credit appraisal platform featuring 6 automated analysis modules for borrower evaluation and fraud detection.",
      "Enabled multilingual document intelligence and explainable risk assessment by combining OCR, ML, and 40+ financial data sources."
    ],
    tech: ["React.js", "FastAPI", "PostgreSQL", "PaddleOCR", "XGBoost"],
    github: "https://github.com/ruturajambure/KARTA",
    live: "#",
    caseStudy: "#",
    icon: <Code2 className="w-6 h-6 text-blue-400" />,
    gradient: "from-blue-500/20 via-cyan-600/10 to-transparent",
  }
];

function ProjectCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  const rotateX = useSpring(rotateXVal, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(rotateYVal, { stiffness: 120, damping: 20 });

  const flareX = useMotionValue("50%");
  const flareY = useMotionValue("50%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Subtle rotation limits (max 8 degrees)
    rotateXVal.set(-(y / (height / 2)) * 8);
    rotateYVal.set((x / (width / 2)) * 8);

    const flarePercentX = ((e.clientX - rect.left) / width) * 100;
    const flarePercentY = ((e.clientY - rect.top) / height) * 100;
    flareX.set(`${flarePercentX}%`);
    flareY.set(`${flarePercentY}%`);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateXVal.set(0);
    rotateYVal.set(0);
    flareX.set("50%");
    flareY.set("50%");
  };

  const glareBg = useTransform(
    [flareX, flareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255, 255, 255, 0.08) 0%, transparent 60%)`
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="glass-card rounded-2xl relative overflow-hidden flex flex-col justify-between border border-white/5 bg-brand-bg-card/30 p-6 md:p-8 cursor-pointer transition-shadow duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] group"
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
      
      {/* Glare spotlight overlay */}
      <motion.div style={{ background: glareBg }} className="absolute inset-0 pointer-events-none z-10" />

      {/* Main card content wrapper */}
      <div className="relative z-10 flex flex-col space-y-4">
        
        {/* Header HUD */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 group-hover:border-brand-cyan/35 transition-colors duration-300">
              {project.icon}
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-wider text-brand-cyan uppercase">
                {project.category}
              </span>
              <h3 className="font-display font-black text-xl text-white mt-0.5 tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-cyan transition-all duration-300">
                {project.title}
              </h3>
            </div>
          </div>
          <span className="font-mono text-[10px] text-white/40">{project.date}</span>
        </div>

        {/* Short Summary */}
        <p className="text-white/70 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/5 text-white/50"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bullet details shown on hover */}
        <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out border-t border-white/5 mt-4 pt-4 space-y-2">
          {project.details.map((d, index) => (
            <div key={index} className="flex gap-2 items-start text-xs text-white/50 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-1.5 shrink-0" />
              <span>{d}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Action Footer Buttons */}
      <div className="relative z-10 flex gap-3.5 border-t border-white/5 pt-6 mt-6 justify-end items-center">
        
        {/* Case Study */}
        <Magnetic>
          <a
            href={project.caseStudy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold tracking-wider text-white/50 hover:text-white transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CASE_STUDY</span>
          </a>
        </Magnetic>

        {/* GitHub */}
        <Magnetic>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-semibold tracking-wider bg-white/5 border border-white/5 hover:border-brand-cyan/30 text-white/80 hover:text-brand-cyan transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>REPOSITORY</span>
          </a>
        </Magnetic>

        {/* Live Demo */}
        <Magnetic>
          <a
            href={project.live}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-mono font-semibold tracking-wider bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 border border-brand-cyan/20 text-brand-cyan hover:border-brand-cyan/40 hover:brightness-110 transition-all"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>DEMO_URL</span>
          </a>
        </Magnetic>

      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-brand-cyan tracking-[0.2em] uppercase mb-2">04 // Built Artifacts</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Projects Portfolio
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mt-3 rounded-full" />
        </div>

        {/* Projects Grid layout */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>

      </div>
    </section>
  );
}
