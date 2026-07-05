"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HolographicPortrait() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tracking mouse relative coordinates
  const rotateXVal = useMotionValue(0);
  const rotateYVal = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(rotateXVal, { stiffness: 100, damping: 20 });
  const rotateY = useSpring(rotateYVal, { stiffness: 100, damping: 20 });

  // Flare gradient position tracking
  const flareX = useMotionValue("50%");
  const flareY = useMotionValue("50%");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Convert to rotation angles (max +/- 12 degrees)
    const multiplier = 12;
    const rX = -(y / (height / 2)) * multiplier;
    const rY = (x / (width / 2)) * multiplier;

    rotateXVal.set(rX);
    rotateYVal.set(rY);

    // Dynamic flare position
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

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const glareBg = useTransform(
    [flareX, flareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(0, 229, 255, 0.22) 0%, transparent 60%)`
  );

  return (
    <div 
      className="relative flex items-center justify-center p-6 w-full max-w-[380px]"
      style={{ perspective: "1500px" }}
    >
      {/* Back Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-brand-cyan to-brand-purple rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse-slow pointer-events-none" />

      {/* Main Holographic Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full aspect-[3/4] rounded-2xl border border-brand-cyan/20 bg-brand-bg-card/45 overflow-hidden shadow-[0_0_35px_rgba(0,0,0,0.8)] backdrop-blur-md cursor-pointer group"
      >
        {/* Hologram Grid Overlay */}
        <div className="absolute inset-0 digital-grid opacity-25 z-10 pointer-events-none" />
        <div className="absolute inset-0 digital-grid-fine opacity-20 z-10 pointer-events-none" />

        {/* Scanlines / Distortion */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%),linear-gradient(90deg,rgba(0,229,255,0.03),rgba(124,58,237,0.02),rgba(0,229,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none z-10 opacity-70" />
        
        {/* Scanning horizontal glow line */}
        <div className="holo-scanline z-10" />

        {/* Professional Portrait Image */}
        <div className="relative w-full h-full select-none overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
          <Image
            src="/profile.jpg"
            alt="Ruturaj Ambure Portrait"
            fill
            sizes="(max-width: 400px) 100vw, 400px"
            className="object-cover object-top filter brightness-[0.88] contrast-[1.08] saturate-[0.8] hue-rotate-[5deg]"
            priority
          />
        </div>

        {/* Interactive Lighting Glare Overlay */}
        <motion.div
          style={{
            background: glareBg,
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* Inner Border Rim Glow */}
        <div className="absolute inset-0 rounded-2xl border border-brand-cyan/25 pointer-events-none z-20 group-hover:border-brand-cyan/50 transition-colors duration-300" />
        
        {/* Cyberpunk HUD Frame Details */}
        <div className="absolute top-3.5 left-3.5 flex flex-col font-mono text-[9px] text-brand-cyan/85 z-20 tracking-wider pointer-events-none">
          <span>SYS_ACTIVE</span>
          <span>DEV_LOC: VIT_PUNE</span>
        </div>
        <div className="absolute top-3.5 right-3.5 flex flex-col font-mono text-[9px] text-brand-purple/85 z-20 text-right tracking-wider pointer-events-none">
          <span>COGNITIVE: ML_ENG</span>
          <span>OP: 8.67_CGPA</span>
        </div>
        <div className="absolute bottom-3.5 left-3.5 font-mono text-[8px] text-brand-cyan/55 z-20 pointer-events-none">
          <span>MOD: RT_AMBURE // v2026.7</span>
        </div>
        <div className="absolute bottom-3.5 right-3.5 font-mono text-[8px] text-white/70 bg-brand-cyan/20 border border-brand-cyan/35 rounded px-1.5 py-0.5 z-20 pointer-events-none">
          <span>HOLO_PORTRAIT</span>
        </div>

        {/* 3D Floating Bracket elements */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-cyan/80 z-20" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-brand-cyan/80 z-20" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-brand-cyan/80 z-20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-cyan/80 z-20" />
      </motion.div>
    </div>
  );
}
