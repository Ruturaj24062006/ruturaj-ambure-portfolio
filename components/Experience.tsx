"use client";

import React from "react";
import { motion } from "framer-motion";
import { Train, ShieldAlert, Calendar, MapPin, Briefcase } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  project: string;
  duration: string;
  location: string;
  icon: React.ReactNode;
  details: string[];
  type: string;
  tech: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Indian Railways – Nagpur Division",
    role: "Project Developer",
    project: "Railway Evaluation & Inspection Management System",
    duration: "April 2026 – June 2026",
    location: "Nagpur, India (Industry-Sponsored)",
    icon: <Train className="w-5 h-5 text-brand-cyan" />,
    type: "Industry-Sponsored Project",
    tech: ["Database Architecture", "Role-Based Workflows", "Reporting Systems", "Performance Assessments"],
    details: [
      "Developed a centralized railway evaluation and inspection management system for monitoring operational activities across multiple stations.",
      "Designed role-based workflows, inspection tracking, counseling management, and performance assessment modules.",
      "Built scalable database architecture and automated reporting features to improve operational transparency and efficiency."
    ]
  },
  {
    company: "Cravita Technologies India Pvt. Ltd.",
    role: "Project Developer",
    project: "Secure Incident Tracker with Email Alerts using Generative AI",
    duration: "Aug 2025 – Nov 2025",
    location: "Pune, India (Industry-Sponsored)",
    icon: <ShieldAlert className="w-5 h-5 text-brand-purple" />,
    type: "Industry-Sponsored Project",
    tech: ["Generative AI", "LLMs", "Node.js", "Email Automation", "Incident Resolution"],
    details: [
      "Developed a Secure Incident Tracker with Email Alerts to streamline incident reporting, tracking, and resolution workflows.",
      "Implemented automated email notification mechanisms to improve incident visibility and response efficiency.",
      "Integrated LLM-based incident analysis and automated report generation using Generative AI."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-brand-cyan tracking-[0.2em] uppercase mb-2">03 // Career Milestones</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Professional Timeline
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mt-3 rounded-full" />
        </div>

        {/* Timeline Path Container */}
        <div className="relative ml-4 md:ml-8 space-y-12">
          
          {/* Vertical gradient timeline line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-brand-cyan via-brand-purple to-brand-bg-dark/20 opacity-40 pointer-events-none z-0" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-10 md:pl-14 group z-10"
            >
              {/* Glowing Dot on Timeline Line */}
              <div className="absolute -left-[16px] top-1.5 w-8 h-8 rounded-full border border-white/10 bg-brand-bg-dark flex items-center justify-center group-hover:border-brand-cyan group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300 z-10">
                {exp.icon}
              </div>

              {/* Glass Card Details */}
              <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden gradient-border-mask sheen-glow transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,229,255,0.04)]">
                {/* Visual Glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5 blur-xl group-hover:from-brand-cyan/12 group-hover:to-brand-purple/12 transition-all duration-500 rounded-full" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
                  <div>
                    <span className="font-mono text-[9px] tracking-wider text-brand-cyan uppercase bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
                      {exp.type}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white mt-2 group-hover:text-brand-cyan transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <p className="font-sans text-sm font-semibold text-white/80 mt-1">
                      {exp.project}
                    </p>
                  </div>
                  
                  {/* Meta Details */}
                  <div className="flex flex-row md:flex-col items-start gap-3 md:gap-1.5 text-xs text-white/50 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-purple" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-cyan" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description Bullets */}
                <ul className="space-y-3 text-white/60 text-sm list-none p-0">
                  {exp.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex gap-2.5 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2 shrink-0" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/5 text-white/50 hover:text-white hover:border-brand-cyan/25 transition-all"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
