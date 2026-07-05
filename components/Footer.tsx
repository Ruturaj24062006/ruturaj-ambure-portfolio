"use client";

import React from "react";
import { Terminal } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12 relative overflow-hidden bg-brand-bg-dark/50">
      <div className="container max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand and Copyright */}
        <div className="flex items-center gap-3">
          <Terminal className="w-4 h-4 text-brand-cyan" />
          <p className="font-mono text-xs text-white/50">
            &copy; {currentYear} Ruturaj Ambure. All rights reserved.
          </p>
        </div>

        {/* Center: System Telemetry */}
        <div className="font-mono text-[9px] text-white/30 tracking-widest text-center">
          <span>LATENCY: 12ms // STABLE // FPS: 60</span>
        </div>

        {/* Right Side: Philosophy tagline */}
        <div className="font-mono text-xs text-brand-purple tracking-wide">
          <span>OPTIMIZED FOR COGNITION</span>
        </div>

      </div>
    </footer>
  );
}
