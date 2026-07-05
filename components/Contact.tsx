"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import * as THREE from "three";
import Magnetic from "./Magnetic";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


function GlobeWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.12;
  });

  return (
    <group>
      {/* Outer grid sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.0, 28, 20]} />
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>
      
      {/* Inner glowing core shell */}
      <mesh scale={0.96}>
        <sphereGeometry args={[2.0, 14, 10]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
      
      {/* Tiny solid glowing center */}
      <mesh scale={0.1}>
        <sphereGeometry args={[2.0, 8, 8]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <span className="font-mono text-xs text-brand-cyan tracking-[0.2em] uppercase mb-2">06 // Link Channels</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Initiate Contact
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-brand-cyan to-brand-purple mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Left: Contact Form */}
          <div className="col-span-1 md:col-span-7">
            <div className="glass-panel p-8 rounded-2xl border border-white/5 relative">
              <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2">
                <span>Direct Signal</span>
                <span className="font-mono text-[9px] text-brand-cyan px-2 py-0.5 rounded bg-brand-cyan/10 uppercase tracking-widest font-normal">
                  Secure channel
                </span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block font-mono text-[10px] uppercase text-white/50 tracking-wider mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-white/20 focus:border-brand-cyan/50 focus:bg-white/[0.04] focus:outline-none transition-all duration-300 font-sans text-sm"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] uppercase text-white/50 tracking-wider mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-white/20 focus:border-brand-cyan/50 focus:bg-white/[0.04] focus:outline-none transition-all duration-300 font-sans text-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase text-white/50 tracking-wider mb-2">
                    Message payload
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-white/20 focus:border-brand-cyan/50 focus:bg-white/[0.04] focus:outline-none transition-all duration-300 font-sans text-sm resize-none"
                    placeholder="Type your message..."
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Magnetic>
                    <button
                      type="submit"
                      disabled={status !== "idle"}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider font-mono bg-gradient-to-r from-brand-cyan to-brand-purple text-white hover:brightness-105 active:scale-95 disabled:opacity-50 transition-all duration-300 shadow-[0_0_20px_rgba(0,229,255,0.15)] cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{status === "idle" ? "TRANSMIT" : status === "sending" ? "TRANSMITTING..." : "TRANSMITTED!"}</span>
                    </button>
                  </Magnetic>
                  
                  {status === "sent" && (
                    <span className="font-mono text-[10px] text-brand-cyan animate-pulse">
                      STATUS: DELIVERED // OK
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Right: R3F Wireframe Globe + Details */}
          <div className="col-span-1 md:col-span-5 flex flex-col items-center justify-center space-y-8 relative">
            
            {/* 3D Canvas for wireframe Earth */}
            <div className="w-[280px] h-[280px] relative pointer-events-none">
              <Canvas camera={{ position: [0, 0, 4.5] } as any}>
                <GlobeWireframe />
              </Canvas>
            </div>

            {/* Link details list */}
            <div className="flex flex-col space-y-4 w-full max-w-[285px] font-mono text-xs">
              
              {/* Email link */}
              <a
                href="mailto:ruturajambure@gmail.com"
                className="flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-brand-cyan/30 text-white/70 hover:text-white transition-all duration-300 group"
              >
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <span className="truncate">ruturajambure@gmail.com</span>
              </a>

              {/* LinkedIn link */}
              <a
                href="https://www.linkedin.com/in/ruturaj-ambure-282672288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-brand-purple/30 text-white/70 hover:text-white transition-all duration-300 group"
              >
                <LinkedinIcon className="w-4 h-4 text-brand-purple shrink-0" />
                <span className="truncate">linkedin/ruturaj-ambure</span>
              </a>

              {/* GitHub link */}
              <a
                href="https://github.com/Ruturaj24062006"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-brand-cyan/30 text-white/70 hover:text-white transition-all duration-300 group"
              >
                <GithubIcon className="w-4 h-4 text-brand-cyan shrink-0" />
                <span className="truncate">github/Ruturaj24062006</span>
              </a>



            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
