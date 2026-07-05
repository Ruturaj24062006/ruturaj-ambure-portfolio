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

  // Smooth spring animations for mouse hover 3D tilt
  const rotateX = useSpring(rotateXVal, { stiffness: 90, damping: 22 });
  const rotateY = useSpring(rotateYVal, { stiffness: 90, damping: 22 });

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

    // Convert to rotation angles (max +/- 8 degrees for premium control)
    const multiplier = 8;
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

  // Dynamic glare overlay matching mouse
  const glareBg = useTransform(
    [flareX, flareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(0, 229, 255, 0.16) 0%, transparent 60%)`
  );

  return (
    <div 
      className="relative flex items-center justify-center p-6 w-full max-w-[340px]"
      style={{ perspective: "1200px" }}
    >
      {/* Outer Blue Holographic Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-brand-cyan/20 to-brand-blue/20 rounded-2xl blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse-slow pointer-events-none" />

      {/* Main Glassmorphism Border Container */}
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
        className="relative w-full aspect-[3/4] rounded-2xl bg-brand-bg-card/35 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-lg cursor-pointer group gradient-border-mask sheen-glow transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,229,255,0.12)]"
      >
        {/* Subtle, fine digital grid backdrop */}
        <div className="absolute inset-0 digital-grid-fine opacity-10 pointer-events-none" />

        {/* Clean, high-fidelity portrait render */}
        <div className="relative w-full h-full select-none overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <Image
            src="/profile.jpg"
            alt="Ruturaj Ambure Portrait"
            fill
            sizes="(max-width: 400px) 100vw, 400px"
            className="object-cover object-top filter brightness-[0.98] contrast-[1.02] saturate-[0.95]"
            priority
          />
        </div>

        {/* Interactive Dynamic Lighting Glare */}
        <motion.div
          style={{
            background: glareBg,
          }}
          className="absolute inset-0 pointer-events-none z-20"
        />

        {/* High-Tech HUD brackets (corners) */}
        <div className="absolute top-4 left-4 w-3.5 h-3.5 border-t border-l border-brand-cyan/40 z-20 pointer-events-none" />
        <div className="absolute top-4 right-4 w-3.5 h-3.5 border-t border-r border-brand-cyan/40 z-20 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-3.5 h-3.5 border-b border-l border-brand-cyan/40 z-20 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-3.5 h-3.5 border-b border-r border-brand-cyan/40 z-20 pointer-events-none" />

        {/* Subtle HUD Metadata Telemetry */}
        <div className="absolute top-4 left-4 pl-4 pt-1 flex flex-col font-mono text-[8px] text-white/40 z-20 tracking-wider pointer-events-none select-none">
          <span>HOST: R_AMBURE</span>
        </div>
        <div className="absolute bottom-4 right-4 pr-4 pb-1 font-mono text-[8px] text-white/50 z-20 pointer-events-none select-none">
          <span>PORTRAIT // SECURE_ID</span>
        </div>

      </motion.div>
    </div>
  );
}

