import React, { useState } from 'react';
import { LEARNING_JOURNEY_DATA } from '../data/portfolioData';
import { GitCommit, Sparkles, CheckCircle2, ChevronRight, Binary, ArrowUpRight } from 'lucide-react';

export const LearningJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div id="journey" className="w-full py-20 border-t border-white/5 bg-[#090909]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF] font-mono text-xs uppercase tracking-widest mb-3">
            <Binary size={12} />
            CHRONOLOGICAL TECHNICAL PROGRESSION
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            MY LEARNING JOURNEY.
          </h2>
          <p className="text-neutral-400 font-mono text-sm max-w-2xl mt-2">
            A transparent architectural roadmap of concepts mastered from foundational C & Python to AI, Data Pipelines, and Cloud Infrastructure.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline Navigation Ribbon (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {LEARNING_JOURNEY_DATA.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
                    isActive
                      ? 'bg-[#141414] border-[#FF4F2A] shadow-[0_0_25px_rgba(255,79,42,0.15)] translate-x-1.5'
                      : 'bg-[#0E0E0E] border-white/5 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                        isActive ? 'bg-[#FF4F2A] text-white' : 'bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      {item.step}
                    </span>
                    <div>
                      <h4
                        className={`text-sm md:text-base font-bold ${
                          isActive ? 'text-white' : 'text-neutral-300'
                        }`}
                      >
                        {item.topic}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`transition-transform ${
                      isActive ? 'text-[#FF4F2A] translate-x-1' : 'text-neutral-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Milestone Deep Dive (7 cols) */}
          <div className="lg:col-span-7 sticky top-24 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#131313] to-[#0A0A0A] border border-white/10 shadow-2xl">
            {(() => {
              const current = LEARNING_JOURNEY_DATA[activeStep];
              return (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-[#FF4F2A]">
                        {current.step}
                      </span>
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-neutral-300 uppercase">
                          {current.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          {current.topic}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
                      VERIFIED CURRICULUM
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-[#00D9FF] font-semibold mb-1">
                      CORE ENGINEERING FOCUS
                    </h5>
                    <p className="text-lg text-white font-medium">
                      {current.focus}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                      CONCEPTUAL PROFICIENCY
                    </h5>
                    <p className="text-sm md:text-base text-neutral-300 leading-relaxed">
                      {current.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-3">
                      KEY LEARNING HIGHLIGHTS
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {current.highlights.map((high, hIdx) => (
                        <div
                          key={hIdx}
                          className="flex items-center gap-2 p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-200"
                        >
                          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                          <span>{high}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation controls */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                      disabled={activeStep === 0}
                      className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      ← PREVIOUS
                    </button>
                    <span className="text-xs font-mono text-neutral-400">
                      Step {activeStep + 1} of {LEARNING_JOURNEY_DATA.length}
                    </span>
                    <button
                      onClick={() =>
                        setActiveStep((prev) =>
                          Math.min(LEARNING_JOURNEY_DATA.length - 1, prev + 1)
                        )
                      }
                      disabled={activeStep === LEARNING_JOURNEY_DATA.length - 1}
                      className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      NEXT →
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
