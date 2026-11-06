import React, { useState } from 'react';
import { PROJECTS_DATA, Project } from '../data/portfolioData';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Code2, Layers, Cpu, Sparkles, Check, Copy, X } from 'lucide-react';

export const ProjectCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'code' | 'features'>('overview');
  const [copied, setCopied] = useState(false);

  const total = PROJECTS_DATA.length;

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const current = PROJECTS_DATA[currentIndex];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full relative">
      {/* 3D Circular Carousel Stage */}
      <div className="relative py-12 flex flex-col items-center justify-center overflow-hidden">
        {/* Navigation arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20 pointer-events-none">
          <button
            onClick={prevProject}
            aria-label="Previous project"
            className="pointer-events-auto p-3 m-2 md:m-4 rounded-full bg-neutral-900/80 border border-white/10 hover:border-[#FF4F2A] text-white hover:text-[#FF4F2A] transition-all backdrop-blur-md shadow-xl"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center z-20 pointer-events-none">
          <button
            onClick={nextProject}
            aria-label="Next project"
            className="pointer-events-auto p-3 m-2 md:m-4 rounded-full bg-neutral-900/80 border border-white/10 hover:border-[#FF4F2A] text-white hover:text-[#FF4F2A] transition-all backdrop-blur-md shadow-xl"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Visual Track */}
        <div className="relative w-full max-w-5xl h-[460px] md:h-[500px] flex items-center justify-center perspective-[1200px]">
          {PROJECTS_DATA.map((proj, idx) => {
            // Calculate relative offset in circular ring
            const diff = (idx - currentIndex + total) % total;
            let offset = diff;
            if (offset > total / 2) offset -= total;

            const isCenter = offset === 0;
            const isLeft = offset === -1 || (offset < -1 && offset >= -2);
            const isRight = offset === 1 || (offset > 1 && offset <= 2);
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            // Compute 3D transformation values
            const rotateY = offset * -28;
            const translateX = offset * 260;
            const translateZ = -Math.abs(offset) * 140;
            const scale = isCenter ? 1 : 0.82;
            const opacity = isCenter ? 1 : 0.45;
            const zIndex = 20 - Math.abs(offset) * 5;

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (isCenter) {
                    setSelectedProject(proj);
                    setActiveModalTab('overview');
                  } else {
                    setCurrentIndex(idx);
                  }
                }}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity
                }}
                className={`absolute w-[310px] sm:w-[380px] md:w-[440px] rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-500 ease-out select-none backdrop-blur-xl border ${
                  isCenter
                    ? 'bg-gradient-to-b from-[#181818] via-[#111111] to-[#0A0A0A] border-[#FF4F2A]/60 shadow-[0_0_50px_rgba(255,79,42,0.2)]'
                    : 'bg-[#121212]/90 border-white/10 hover:border-white/30'
                }`}
              >
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border"
                    style={{
                      color: proj.statusColor,
                      borderColor: `${proj.statusColor}44`,
                      backgroundColor: `${proj.statusColor}15`
                    }}
                  >
                    ● {proj.status}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">
                    0{idx + 1} / 0{total}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-[#FF4F2A] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-mono line-clamp-2 mb-4 leading-relaxed">
                  {proj.tagline}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.techStack.length > 4 && (
                    <span className="px-2 py-1 rounded-md bg-neutral-900 text-[11px] font-mono text-neutral-400">
                      +{proj.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Metrics Preview */}
                {proj.metrics && (
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 mb-6">
                    {proj.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-[10px] font-mono text-neutral-400 uppercase">{m.label}</div>
                        <div className="text-xs font-bold font-mono text-white mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
                  <span className="text-[#FF4F2A] font-bold flex items-center gap-1.5">
                    <Sparkles size={13} />
                    {isCenter ? 'CLICK TO OPEN DOSSIER' : 'CLICK TO FOCUS'}
                  </span>
                  <span className="text-neutral-400">
                    {proj.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Dots indicator */}
        <div className="flex items-center gap-2 mt-6 z-20">
          {PROJECTS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? 'w-8 bg-[#FF4F2A]'
                  : 'w-2 bg-neutral-700 hover:bg-neutral-500'
              }`}
              aria-label={`Jump to project ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Modal with CODE INSIGHT Tab */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F0F0F] border border-white/15 p-6 md:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 border border-neutral-700 hover:border-[#FF4F2A] text-neutral-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="pr-12 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase border"
                  style={{
                    color: selectedProject.statusColor,
                    borderColor: `${selectedProject.statusColor}44`,
                    backgroundColor: `${selectedProject.statusColor}15`
                  }}
                >
                  ● {selectedProject.status}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {selectedProject.category}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {selectedProject.title}
              </h2>
              <p className="text-sm font-mono text-neutral-400 mt-1">
                {selectedProject.tagline}
              </p>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-white/10 mb-6 gap-2">
              <button
                onClick={() => setActiveModalTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-mono font-bold border-b-2 transition-all ${
                  activeModalTab === 'overview'
                    ? 'border-[#FF4F2A] text-white'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Layers size={14} />
                OVERVIEW & ARCHITECTURE
              </button>
              <button
                onClick={() => setActiveModalTab('code')}
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-mono font-bold border-b-2 transition-all ${
                  activeModalTab === 'code'
                    ? 'border-[#00D9FF] text-[#00D9FF]'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Code2 size={14} />
                CODE INSIGHT
              </button>
              <button
                onClick={() => setActiveModalTab('features')}
                className={`flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-mono font-bold border-b-2 transition-all ${
                  activeModalTab === 'features'
                    ? 'border-[#FF4F2A] text-white'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Cpu size={14} />
                SYSTEM SPECS
              </button>
            </div>

            {/* Tab: Overview */}
            {activeModalTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#FF4F2A] font-bold mb-2">
                    PROJECT SUMMARY
                  </h4>
                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-3">
                    CORE ENGINEERING HIGHLIGHTS
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedProject.keyFeatures.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F2A] mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedProject.metrics && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-3">
                      TELEMETRY BENCHMARKS
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProject.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="p-3 rounded-xl bg-black/60 border border-white/5 text-center"
                        >
                          <div className="text-[11px] font-mono text-neutral-400 uppercase">
                            {m.label}
                          </div>
                          <div className="text-sm md:text-base font-bold font-mono text-white mt-1">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Code Insight */}
            {activeModalTab === 'code' && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 text-xs text-neutral-400 font-mono flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
                    <span className="text-neutral-200 font-bold">
                      {selectedProject.codeSnippet.filename}
                    </span>
                    <span className="text-neutral-500">
                      ({selectedProject.codeSnippet.language})
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(selectedProject.codeSnippet.code)}
                    className="flex items-center gap-1 px-3 py-1 rounded bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copied ? 'COPIED' : 'COPY SNIPPET'}</span>
                  </button>
                </div>

                <p className="text-xs text-neutral-400 italic">
                  {selectedProject.codeSnippet.description}
                </p>

                <div className="relative rounded-xl bg-[#080808] border border-white/10 p-4 font-mono text-xs overflow-x-auto text-neutral-300 max-h-[340px]">
                  <pre className="leading-5 whitespace-pre">
                    {selectedProject.codeSnippet.code}
                  </pre>
                </div>

                <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2 pt-1">
                  <span className="text-[#FF4F2A]">● Note:</span>
                  <span>
                    Illustrative implementation algorithm. Verified against active development repository.
                  </span>
                </div>
              </div>
            )}

            {/* Tab: System Specs */}
            {activeModalTab === 'features' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#FF4F2A] font-bold mb-3">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <div className="text-xs font-mono text-neutral-400 uppercase">
                    INTEGRITY & VERIFICATION NOTE
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    In compliance with genuine engineering standards, live deployment links are not fabricated. Repositories and ongoing prototypes are hosted under Deekshith Varanasi's official GitHub ecosystem.
                  </p>
                </div>
              </div>
            )}

            {/* Modal Actions Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span>STATUS:</span>
                <span className="font-bold text-white">{selectedProject.status}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {selectedProject.hasRepo && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-mono tracking-wider transition-colors"
                  >
                    <Github size={15} />
                    VIEW GITHUB REPO
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#FF4F2A] hover:bg-[#FF7849] text-white text-xs font-mono font-bold tracking-wider transition-colors"
                >
                  CLOSE DOSSIER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
