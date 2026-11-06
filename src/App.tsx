import React, { useState } from 'react';
import { ParticleIntro } from './components/ParticleIntro';
import { FloatingCodeSnippets } from './components/FloatingCodeSnippets';
import { InteractiveKeyboard } from './components/InteractiveKeyboard';
import { ProjectCarousel } from './components/ProjectCarousel';
import { InteractiveCodePlayground } from './components/InteractiveCodePlayground';
import { AboutSection } from './components/AboutSection';
import { LearningJourney } from './components/LearningJourney';
import { AchievementsSection } from './components/AchievementsSection';
import { GitHubSection } from './components/GitHubSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { 
  Terminal, 
  Sparkles, 
  Github, 
  Linkedin, 
  ArrowRight, 
  ChevronDown, 
  Layers, 
  Cpu, 
  Code2, 
  Menu, 
  X,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [introDismissed, setIntroDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F3F4F6] selection:bg-[#FF4F2A] selection:text-white font-sans relative overflow-x-hidden">
      {/* 1. Cinematic Particle Intro */}
      {!introDismissed && (
        <ParticleIntro
          isSkipped={introDismissed}
          onEnter={() => setIntroDismissed(true)}
        />
      )}

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#080808]/85 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Logo Branding */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF4F2A] to-[#FF7849] p-0.5 shadow-md shadow-[#FF4F2A]/30">
              <div className="w-full h-full rounded-[6px] bg-[#0C0C0C] flex items-center justify-center font-mono font-black text-xs text-white group-hover:text-[#FF4F2A] transition-colors">
                M
              </div>
            </div>
            <div>
              <div className="font-mono text-sm font-black tracking-widest text-white group-hover:text-[#FF4F2A] transition-colors">
                MASTER<span className="text-[#FF4F2A]">.DEV</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 -mt-1 hidden sm:block">
                DEEKSHITH VARANASI
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono">
            <button
              onClick={() => scrollToSection('superpowers')}
              className="text-neutral-300 hover:text-[#FF4F2A] transition-colors"
            >
              SUPERPOWERS
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-neutral-300 hover:text-[#FF4F2A] transition-colors"
            >
              PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('code-playground')}
              className="text-neutral-300 hover:text-[#00D9FF] transition-colors"
            >
              CODE ENGINE
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-neutral-300 hover:text-[#FF4F2A] transition-colors"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className="text-neutral-300 hover:text-[#FF4F2A] transition-colors"
            >
              JOURNEY
            </button>
            <button
              onClick={() => scrollToSection('terminal')}
              className="text-neutral-300 hover:text-[#00D9FF] transition-colors"
            >
              TERMINAL
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-neutral-300 hover:text-[#FF4F2A] transition-colors"
            >
              CONTACT
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/iamsantosh777"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white/30 transition-colors"
              title="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/santosh-subramanya-deekshith-varanasi-8a79b4393"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-[#00D9FF] hover:border-[#00D9FF]/40 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF4F2A] to-[#FF7849] hover:opacity-90 text-white font-mono text-xs font-bold tracking-wider shadow-md shadow-[#FF4F2A]/30 transition-all"
            >
              ENGAGE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-6 py-6 bg-[#0E0E0E] border-b border-white/10 space-y-3 font-mono text-xs">
            <button
              onClick={() => scrollToSection('superpowers')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              ● 3D TECH KEYBOARD
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              ● 3D PROJECTS CAROUSEL
            </button>
            <button
              onClick={() => scrollToSection('code-playground')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#00D9FF]"
            >
              ● CODE PLAYGROUND
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              ● ABOUT & PHILOSOPHY
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              ● LEARNING JOURNEY
            </button>
            <button
              onClick={() => scrollToSection('achievements')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              ● ACHIEVEMENTS
            </button>
            <button
              onClick={() => scrollToSection('github')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              ● GITHUB PULSE
            </button>
            <button
              onClick={() => scrollToSection('terminal')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#00D9FF]"
            >
              ● INTERACTIVE TERMINAL
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              ● CONTACT PROTOCOL
            </button>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative pt-20">
        {/* ========================================================
            2. HERO SECTION
            ======================================================== */}
        <section id="hero" className="relative min-h-[92vh] flex items-center justify-center py-20 px-6 md:px-12 bg-cyber-grid overflow-hidden">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#FF4F2A]/10 blur-[130px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00D9FF]/10 blur-[130px] pointer-events-none animate-pulse-slow" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Hero Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Live Availability Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 shadow-inner">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                  AVAILABLE FOR COLLABORATION // VVITU
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white uppercase leading-[1.05]">
                  BUILDING INTELLIGENCE.
                </h1>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F2A] via-[#FF7849] to-[#00D9FF] uppercase leading-[1.05]">
                  ENGINEERING EXPERIENCES.
                </h1>
              </div>

              {/* Name & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  DEEKSHITH VARANASI
                </h2>
                <div className="font-mono text-xs sm:text-sm text-[#00D9FF] tracking-wider mt-1 uppercase font-semibold">
                  AI/ML ENGINEER IN PROGRESS | CREATIVE DEVELOPER | BUILDER
                </div>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-2xl font-light">
                A second-year B.Tech Computer Science and Engineering student specializing in <strong className="text-white font-medium">Artificial Intelligence and Machine Learning at VVITU</strong>.
                <br /><br />
                I explore the intersection of artificial intelligence, computer vision, software engineering and creative technology.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF4F2A] to-[#FF7849] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl shadow-[#FF4F2A]/30 hover:shadow-[#FF4F2A]/60 hover:scale-[1.02] transition-all flex items-center gap-2 group"
                >
                  <Sparkles size={16} />
                  <span>EXPLORE PROJECTS</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="https://github.com/iamsantosh777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white font-mono text-xs sm:text-sm font-medium tracking-wider transition-all flex items-center gap-2 group"
                >
                  <Github size={16} />
                  <span>VIEW GITHUB</span>
                  <ExternalLink size={14} className="text-neutral-400 group-hover:text-white" />
                </a>

                <button
                  onClick={() => scrollToSection('terminal')}
                  className="px-5 py-4 rounded-xl bg-black/40 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-mono text-xs transition-colors flex items-center gap-2"
                >
                  <Terminal size={15} className="text-[#00D9FF]" />
                  <span>OPEN TERMINAL</span>
                </button>
              </div>
            </div>

            {/* Right: Animated Floating Code Snippets (5 cols) */}
            <div className="lg:col-span-5 relative">
              <FloatingCodeSnippets />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            onClick={() => scrollToSection('superpowers')}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-neutral-400 hover:text-white transition-colors"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest">SCROLL TO HARDWARE</span>
            <ChevronDown size={18} className="animate-bounce text-[#FF4F2A]" />
          </div>
        </section>

        {/* ========================================================
            3. INTERACTIVE 3D TECH KEYBOARD
            ======================================================== */}
        <section id="superpowers" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F2A]/10 border border-[#FF4F2A]/30 text-[#FF4F2A] font-mono text-xs uppercase tracking-widest mb-3">
              <Cpu size={12} />
              HARDWARE-ACCELERATED TALENT
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight uppercase">
              MY TECHNICAL SUPERPOWERS.
            </h2>
            <p className="text-neutral-400 font-mono text-sm max-w-2xl mt-2">
              An interactive 3D mechanical keyboard built with Three.js. Click any keycap to inspect proficiency, telemetry data, and production use cases.
            </p>
          </div>

          <InteractiveKeyboard />
        </section>

        {/* ========================================================
            4. PROJECT SHOWCASE (3D Circular Carousel)
            ======================================================== */}
        <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF] font-mono text-xs uppercase tracking-widest mb-3">
              <Layers size={12} />
              SYSTEM ARCHITECTURE & INITIATIVES
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight uppercase">
              FEATURED PROJECTS.
            </h2>
            <p className="text-neutral-400 font-mono text-sm max-w-2xl mt-2">
              3D interactive carousel featuring Gaze Guard AI, Citra, Vernacular Pedagogy AI, Raksha Live Map, and Master Terminal Arcade.
            </p>
          </div>

          <ProjectCarousel />
        </section>

        {/* ========================================================
            FEATURE: INTERACTIVE CODE PLAYGROUND
            ======================================================== */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <InteractiveCodePlayground />
        </section>

        {/* ========================================================
            5. ABOUT ME (Editorial + Halftone Portrait)
            ======================================================== */}
        <AboutSection />

        {/* ========================================================
            6. LEARNING JOURNEY (Interactive Timeline)
            ======================================================== */}
        <LearningJourney />

        {/* ========================================================
            7. ACHIEVEMENTS (Verified & Transparent)
            ======================================================== */}
        <AchievementsSection />

        {/* ========================================================
            FEATURE: GITHUB DEVELOPER SECTION
            ======================================================== */}
        <GitHubSection />

        {/* ========================================================
            8. INTERACTIVE TERMINAL
            ======================================================== */}
        <InteractiveTerminal />

        {/* ========================================================
            9. CONTACT SECTION
            ======================================================== */}
        <ContactSection />
      </main>
    </div>
  );
}
