import React, { useState, useEffect } from 'react';
import { ParticleIntro } from './components/ParticleIntro';
import { FloatingCodeSnippets } from './components/FloatingCodeSnippets';
import { AboutSection } from './components/AboutSection';
import { TechnicalSkillsSection } from './components/TechnicalSkillsSection';
import { ProjectCarousel } from './components/ProjectCarousel';
import { InteractiveCodePlayground } from './components/InteractiveCodePlayground';
import { LearningJourney } from './components/LearningJourney';
import { AchievementsSection } from './components/AchievementsSection';
import { GitHubSection } from './components/GitHubSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
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
  ExternalLink,
  ArrowUp,
  User,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [introDismissed, setIntroDismissed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Reliable scroll-to-top on mount
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  // Track active section for consistent navbar highlights & back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionIds = ['hero', 'about', 'skills', 'projects', 'journey', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEnterUniverse = () => {
    setIntroDismissed(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F3F4F6] selection:bg-[#FF4F2A] selection:text-white font-sans relative overflow-x-hidden">
      {/* 1. Cinematic Particle Intro */}
      {!introDismissed && (
        <ParticleIntro
          isSkipped={introDismissed}
          onEnter={handleEnterUniverse}
        />
      )}

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#141414]/90 hover:bg-[#FF4F2A] text-neutral-300 hover:text-white border border-white/10 hover:border-[#FF4F2A] shadow-2xl backdrop-blur-md transition-all duration-300 group"
          title="Return to Top"
          aria-label="Back to Top"
        >
          <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/5 transition-all">
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

          {/* Desktop Nav Items in Reorganized Order */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono">
            <button
              onClick={() => scrollToSection('about')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'about'
                  ? 'text-white border-[#FF4F2A] font-bold'
                  : 'text-neutral-400 border-transparent hover:text-white'
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'skills'
                  ? 'text-white border-[#FF4F2A] font-bold'
                  : 'text-neutral-400 border-transparent hover:text-white'
              }`}
            >
              SKILLS
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'projects'
                  ? 'text-white border-[#FF4F2A] font-bold'
                  : 'text-neutral-400 border-transparent hover:text-white'
              }`}
            >
              PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'journey'
                  ? 'text-white border-[#FF4F2A] font-bold'
                  : 'text-neutral-400 border-transparent hover:text-white'
              }`}
            >
              JOURNEY
            </button>
            <button
              onClick={() => scrollToSection('achievements')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'achievements'
                  ? 'text-white border-[#FF4F2A] font-bold'
                  : 'text-neutral-400 border-transparent hover:text-white'
              }`}
            >
              ACHIEVEMENTS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === 'contact'
                  ? 'text-white border-[#FF4F2A] font-bold'
                  : 'text-neutral-400 border-transparent hover:text-white'
              }`}
            >
              CONTACT
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live deployment indicator */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono mr-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>AWS AMPLIFY // LIVE</span>
            </div>

            <a
              href="https://github.com/iamsantosh777/master-dev-universe"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-white/30 transition-colors"
              title="MASTER.DEV GitHub Repo (iamsantosh777/master-dev-universe)"
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
              CONNECT
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
              onClick={() => scrollToSection('hero')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              01 // HERO / INTRODUCTION
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              02 // ABOUT ME
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              03 // TECHNICAL SKILLS
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              04 // FEATURED PROJECTS
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              05 // LEARNING JOURNEY
            </button>
            <button
              onClick={() => scrollToSection('achievements')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              06 // ACHIEVEMENTS & CERTIFICATIONS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left py-2 text-neutral-300 hover:text-[#FF4F2A]"
            >
              07 // CONTACT
            </button>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Deployed on AWS Amplify
              </span>
              <a
                href="https://github.com/iamsantosh777/master-dev-universe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline"
              >
                Repo ↗
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="relative pt-20">
        {/* ========================================================
            1. HERO / INTRODUCTION
            ======================================================== */}
        <section id="hero" className="relative min-h-[92vh] flex items-center justify-center py-20 px-6 md:px-12 bg-cyber-grid overflow-hidden">
          {/* Ambient Lighting Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#FF4F2A]/10 blur-[130px] pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00D9FF]/10 blur-[130px] pointer-events-none animate-pulse-slow" />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Hero Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Live Deployment & Availability Badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 shadow-inner">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                    2ND-YEAR B.TECH CSE (AI/ML) // VVITU
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                  <span>DEPLOYED ON AWS AMPLIFY</span>
                </div>
              </div>

              {/* Name & Identity */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-sans">
                  DEEKSHITH VARANASI
                </h1>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FF4F2A] font-mono tracking-tight mt-1 uppercase">
                  AI/ML ENGINEER IN PROGRESS
                </div>
                <div className="font-mono text-xs sm:text-sm text-[#00D9FF] tracking-wider mt-1.5 uppercase font-semibold">
                  Creative Developer | Student Builder | Problem Solver
                </div>
              </div>

              {/* Compelling Short Introduction */}
              <p className="text-base sm:text-lg text-neutral-300 font-sans leading-relaxed max-w-2xl font-light">
                A second-year Computer Science and Engineering student specializing in <strong className="text-white font-medium">Artificial Intelligence and Machine Learning at VVITU</strong>.
                <br /><br />
                I explore the intersection of artificial intelligence, computer vision, software engineering and creative technology—building practical tools from ocular driver safety systems to interactive 3D web applications.
              </p>

              {/* Verified Verifiable Statistics */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[#0D0D0D] border border-white/5 max-w-lg font-mono">
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">ACADEMIC STANDING</div>
                  <div className="text-sm font-bold text-white mt-0.5">86% XII MPC</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">PROJECTS BUILT</div>
                  <div className="text-sm font-bold text-[#FF4F2A] mt-0.5">5 Software Repos</div>
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase">CLOUD HOSTING</div>
                  <div className="text-sm font-bold text-[#00D9FF] mt-0.5">AWS Amplify</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF4F2A] to-[#FF7849] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl shadow-[#FF4F2A]/30 hover:shadow-[#FF4F2A]/60 hover:scale-[1.02] transition-all flex items-center gap-2 group"
                >
                  <Sparkles size={16} />
                  <span>EXPLORE PROJECTS</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => scrollToSection('about')}
                  className="px-6 py-3.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-white font-mono text-xs sm:text-sm font-medium tracking-wider transition-all flex items-center gap-2"
                >
                  <User size={15} className="text-[#00D9FF]" />
                  <span>ABOUT ME</span>
                </button>

                <a
                  href="https://github.com/iamsantosh777/master-dev-universe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-xl bg-black/50 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white font-mono text-xs transition-colors flex items-center gap-2"
                  title="View GitHub Repository"
                >
                  <Github size={15} />
                  <span>GITHUB</span>
                  <ExternalLink size={12} className="text-neutral-500" />
                </a>

                <a
                  href="https://www.linkedin.com/in/santosh-subramanya-deekshith-varanasi-8a79b4393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-xl bg-black/50 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-[#00D9FF] font-mono text-xs transition-colors flex items-center gap-2"
                  title="View LinkedIn Profile"
                >
                  <Linkedin size={15} />
                  <span>LINKEDIN</span>
                  <ExternalLink size={12} className="text-neutral-500" />
                </a>
              </div>
            </div>

            {/* Right: Animated Floating Code Snippets (5 cols) */}
            <div className="lg:col-span-5 relative">
              <FloatingCodeSnippets />
            </div>
          </div>

          {/* Subtle Scroll Indicator */}
          <div
            onClick={() => scrollToSection('about')}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-neutral-500 hover:text-white transition-colors select-none"
          >
            <span className="font-mono text-[10px] uppercase tracking-widest">SCROLL TO DISCOVER</span>
            <ChevronDown size={16} className="animate-bounce text-[#FF4F2A]" />
          </div>
        </section>

        {/* ========================================================
            2. ABOUT ME (Moved directly after Hero)
            ======================================================== */}
        <AboutSection />

        {/* ========================================================
            3. TECHNICAL SKILLS (Categorized + 3D Mechanical Keyboard)
            ======================================================== */}
        <TechnicalSkillsSection />

        {/* ========================================================
            4. FEATURED PROJECTS (3D Circular Carousel + Code Insights)
            ======================================================== */}
        <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF] font-mono text-xs uppercase tracking-widest mb-3">
              <Layers size={12} />
              AUTHENTIC INITIATIVES
            </div>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight uppercase">
              FEATURED PROJECTS.
            </h2>
            <p className="text-neutral-400 font-mono text-sm max-w-2xl mt-2">
              Every project represents real codebases under active engineering. Inspect dossiers for architectures, tech stacks, and verified code insights.
            </p>
          </div>

          <ProjectCarousel />
        </section>

        {/* ========================================================
            ENGINEERING CODE PLAYGROUND
            ======================================================== */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          <InteractiveCodePlayground />
        </section>

        {/* ========================================================
            5. LEARNING JOURNEY (Actual 6-Stage Timeline)
            ======================================================== */}
        <LearningJourney />

        {/* ========================================================
            6. ACHIEVEMENTS & CERTIFICATIONS (Verified + AWS Amplify Milestone)
            ======================================================== */}
        <AchievementsSection />

        {/* ========================================================
            GITHUB REPOSITORY PULSE
            ======================================================== */}
        <GitHubSection />

        {/* ========================================================
            INTERACTIVE TERMINAL
            ======================================================== */}
        <InteractiveTerminal />

        {/* ========================================================
            7. CONTACT
            ======================================================== */}
        <ContactSection />

        {/* ========================================================
            8. FOOTER
            ======================================================== */}
        <Footer
          onScrollToTop={scrollToTop}
          onNavigate={(id) => scrollToSection(id)}
        />
      </main>
    </div>
  );
}
