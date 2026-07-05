"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mail, ExternalLink } from "lucide-react";
import * as THREE from "three";
import Magnetic from "./Magnetic";

function GlobeWireframe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.12;
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
          opacity={0.16}
        />
      </mesh>
      
      {/* Inner glowing core shell */}
      <mesh scale={0.96}>
        <sphereGeometry args={[2.0, 14, 10]} />
        <meshBasicMaterial
          color="#7C3AED"
          wireframe
          transparent
          opacity={0.10}
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

export default function Contact() {
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Globe with floating elements */}
          <div className="col-span-1 md:col-span-6 flex flex-col items-center justify-center relative">
            <div className="w-[320px] h-[320px] relative pointer-events-none animate-pulse-slow">
              <Canvas camera={{ position: [0, 0, 4.5] } as any}>
                <GlobeWireframe />
              </Canvas>
            </div>
            
            {/* Tech bracket HUD under the globe */}
            <div className="mt-4 font-mono text-[9px] text-white/30 tracking-wider text-center">
              <span>GLOBE_SIMULATOR: ACTIVE // AZ_35_ROT</span>
            </div>
          </div>

          {/* Right Column: High-End Contact Buttons */}
          <div className="col-span-1 md:col-span-6 space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-white/5 relative flex flex-col space-y-6">
              
              <div className="border-b border-white/5 pb-4">
                <span className="font-mono text-[9px] text-brand-cyan px-2 py-0.5 rounded bg-brand-cyan/10 uppercase tracking-widest">
                  Direct channels
                </span>
                <h3 className="font-display font-bold text-xl text-white mt-3">
                  Let's Connect & Collaborate
                </h3>
                <p className="text-white/50 text-sm mt-2 leading-relaxed">
                  I am open to machine learning projects, full-stack app development, and research partnerships. Reach out on any network below.
                </p>
              </div>

              {/* Contact Links Stack */}
              <div className="flex flex-col space-y-4">
                
                {/* Email Link */}
                <Magnetic>
                  <a
                    href="mailto:ruturajambure@gmail.com"
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-brand-cyan/35 text-white/70 hover:text-white transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-brand-cyan shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">Email Protocol</span>
                        <span className="text-sm font-sans font-semibold">ruturajambure@gmail.com</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-brand-cyan transition-colors" />
                  </a>
                </Magnetic>

                {/* LinkedIn Link */}
                <Magnetic>
                  <a
                    href="https://www.linkedin.com/in/ruturaj-ambure-2b3385327"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-brand-purple/35 text-white/70 hover:text-white transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <LinkedinIcon className="w-5 h-5 text-brand-purple shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">Professional Graph</span>
                        <span className="text-sm font-sans font-semibold">linkedin/ruturaj-ambure</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-brand-purple transition-colors" />
                  </a>
                </Magnetic>

                {/* GitHub Link */}
                <Magnetic>
                  <a
                    href="https://github.com/Ruturaj24062006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-brand-cyan/35 text-white/70 hover:text-white transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <GithubIcon className="w-5 h-5 text-brand-cyan shrink-0 group-hover:scale-110 transition-transform" />
                      <div className="text-left">
                        <span className="block font-mono text-[8px] uppercase tracking-wider text-white/40">Source Repository</span>
                        <span className="text-sm font-sans font-semibold">github/Ruturaj24062006</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-brand-cyan transition-colors" />
                  </a>
                </Magnetic>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
