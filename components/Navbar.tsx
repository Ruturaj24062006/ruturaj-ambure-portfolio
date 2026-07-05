"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("#home");
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      lastScrollY.current = currentScrollY;

      // Active Section Tracking
      const sections = navItems.map((item) => document.querySelector(item.href));
      const scrollPos = window.scrollY + 200; // Offset for triggers

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(navItems[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <nav className="w-full max-w-5xl glass-nav rounded-full px-6 py-3.5 flex items-center justify-between border border-white/5 shadow-[0_8px_32px_0_rgba(5,8,22,0.6)] pointer-events-auto relative">
            
            {/* Logo / Terminal Signifier */}
            <a 
              href="#home" 
              onClick={(e) => handleLinkClick(e, "#home")}
              className="flex items-center gap-2 group font-mono text-sm tracking-wider font-bold text-white transition-colors hover:text-brand-cyan"
            >
              <Terminal className="w-4 h-4 text-brand-cyan group-hover:rotate-12 transition-transform duration-300" />
              <span>RA<span className="text-brand-cyan font-sans font-medium">.IO</span></span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1.5 font-mono text-xs">
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`relative px-4 py-1.5 rounded-full transition-colors ${
                      isActive ? "text-[#00E5FF] font-medium" : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute inset-0 bg-white/[0.04] border border-white/10 shadow-[0_0_15px_rgba(0,229,255,0.08)] rounded-full z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Resume Button */}
            <div className="hidden md:block">
              <a
                href="/resume.pdf"
                download
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium text-white rounded-full group bg-gradient-to-br from-brand-cyan to-brand-purple group-hover:from-brand-cyan group-hover:to-brand-purple hover:text-white focus:ring-2 focus:outline-none focus:ring-cyan-800 transition duration-300"
              >
                <span className="relative px-4 py-1.5 transition-all ease-in duration-75 bg-brand-bg-dark rounded-full group-hover:bg-opacity-0">
                  Get CV
                </span>
              </a>
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full border border-white/10 bg-white/5 text-white hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 left-2 right-2 glass-panel border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shadow-2xl md:hidden pointer-events-auto"
                >
                  <div className="flex flex-col gap-2.5">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.href;
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleLinkClick(e, item.href)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-mono tracking-wider transition-colors ${
                            isActive 
                              ? "bg-brand-cyan/10 text-brand-cyan font-bold border border-brand-cyan/25" 
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                  <div className="h-px bg-white/10 my-1" />
                  <a
                    href="/resume.pdf"
                    download
                    className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-white text-sm font-medium tracking-wide shadow-lg hover:shadow-brand-cyan/20 hover:brightness-105 active:scale-95 transition-all duration-300"
                  >
                    Download Resume
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
