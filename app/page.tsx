import React from "react";
import Navbar from "@/components/Navbar";
import Background3D from "@/components/Background3D";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 3D Dynamic Animated Environment */}
      <Background3D />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Structural Layout */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Hero Landing */}
        <Hero />

        {/* Bio Story Section */}
        <About />

        {/* Dynamic Skill Cubes */}
        <Skills />

        {/* Career Timeline */}
        <Experience />

        {/* Premium Project Cards */}
        <Projects />

        {/* Numeric honors and records */}
        <Achievements />

        {/* Signal Forms & Networks */}
        <Contact />

        {/* Elegant Footer */}
        <Footer />
      </main>
    </>
  );
}
