import React from 'react';
import { ACHIEVEMENTS_DATA } from '../data/portfolioData';
import { Award, ShieldCheck, CheckCircle2, Clock, FileBadge } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  return (
    <div id="achievements" className="w-full py-20 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F2A]/10 border border-[#FF4F2A]/30 text-[#FF4F2A] font-mono text-xs uppercase tracking-widest mb-3">
            <Award size={12} />
            CREDENTIALS & MILESTONES
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            VERIFIED ACHIEVEMENTS.
          </h2>
          <p className="text-neutral-400 font-mono text-sm max-w-2xl mt-2">
            Strictly authentic milestones, academic standings, and active developmental achievements. Zero fabricated certifications or internships.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS_DATA.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                item.verified
                  ? 'bg-gradient-to-b from-[#131313] to-[#0D0D0D] border-white/10 hover:border-[#FF4F2A]/60 shadow-xl hover:shadow-[0_0_30px_rgba(255,79,42,0.15)]'
                  : 'bg-[#0E0E0E]/60 border-dashed border-white/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/10 text-neutral-300">
                    {item.category}
                  </span>
                  {item.verified ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
                      <ShieldCheck size={14} />
                      VERIFIED
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[#00D9FF]">
                      <Clock size={13} />
                      SLOT RESERVED
                    </span>
                  )}
                </div>

                <div className="text-xl font-black font-mono text-white mb-1">
                  {item.metric}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs font-mono text-[#FF4F2A] mb-3">
                  {item.organization}
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{item.timeframe}</span>
                <span className={item.verified ? 'text-emerald-400' : 'text-neutral-400'}>
                  {item.statusText}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Integrity Pledge Card */}
        <div className="mt-10 p-5 rounded-2xl bg-[#0D0D0D] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
            <CheckCircle2 size={16} className="text-[#00D9FF] shrink-0" />
            <span>
              <strong className="text-neutral-200">Engineering Transparency Standard:</strong> As a student developer at VVITU, I take pride in honest representation. Evidence slots are held open for upcoming competitive hackathons and verified certifications.
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#FF4F2A] whitespace-nowrap">
            PORTFOLIO INTEGRITY GUARANTEE
          </span>
        </div>
      </div>
    </div>
  );
};
