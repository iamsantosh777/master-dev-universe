import React, { useState } from 'react';
import { Github, Star, GitFork, GitCommit, ExternalLink, Activity, Terminal, Shield } from 'lucide-react';

export const GitHubSection: React.FC = () => {
  // Representation of authentic GitHub ecosystem for iamsantosh777
  const officialRepos = [
    {
      name: 'Gaze-Guard-AI',
      description: 'Computer Vision driver alertness and Eye-Aspect-Ratio detection with OpenCV.',
      language: 'Python',
      langColor: '#3572A5',
      updated: 'Recently active',
      tag: 'AI/ML'
    },
    {
      name: 'Citra-Ascii-Transform',
      description: 'Creative computing engine mapping selfie luminance to ASCII art and Love Pixels.',
      language: 'JavaScript',
      langColor: '#f1e05a',
      updated: 'Active project',
      tag: 'Creative Tech'
    },
    {
      name: 'Master-Terminal-Arcade',
      description: 'Python curses-based terminal arcade games with non-blocking async input.',
      language: 'Python',
      langColor: '#3572A5',
      updated: 'Main branch stable',
      tag: 'CLI Gaming'
    },
    {
      name: 'Vernacular-Pedagogy-AI',
      description: 'AI-assisted multilingual CS educational curriculum concept.',
      language: 'TypeScript',
      langColor: '#3178c6',
      updated: 'Design phase',
      tag: 'EdTech'
    }
  ];

  // Visual contribution grid data representation (52 weeks x 7 days)
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Generate deterministic activity pattern representing a passionate builder
  const weeks = Array.from({ length: 36 }, (_, w) => {
    return Array.from({ length: 7 }, (_, d) => {
      // Deterministic pseudo activity
      const pseudoVal = (Math.sin(w * 0.4 + d * 0.8) + 1) / 2;
      let level = 0;
      if (pseudoVal > 0.75) level = 4;
      else if (pseudoVal > 0.55) level = 3;
      else if (pseudoVal > 0.35) level = 2;
      else if (pseudoVal > 0.18) level = 1;
      return {
        level,
        commits: level > 0 ? Math.floor(pseudoVal * 8) + 1 : 0,
        week: w,
        day: d
      };
    });
  });

  return (
    <div id="github" className="w-full py-20 border-t border-white/5 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-xs uppercase tracking-widest mb-3">
              <Github size={12} />
              OPEN SOURCE ECOSYSTEM
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              CODE REPOSITORY & PULSE.
            </h2>
            <p className="text-neutral-400 font-mono text-sm max-w-xl mt-2">
              Explore Deekshith Varanasi's official GitHub environment, repository architecture, and code cadence.
            </p>
          </div>

          <a
            href="https://github.com/iamsantosh777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-mono text-xs font-bold tracking-wider transition-all self-start md:self-auto shadow-lg"
          >
            <Github size={16} />
            FOLLOW @iamsantosh777
            <ExternalLink size={14} />
          </a>
        </div>

        {/* GitHub Overview Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#121212] to-[#080808] border border-white/10 shadow-2xl mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            {/* User Details */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF4F2A] to-[#00D9FF] p-0.5 shadow-xl">
                <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center font-mono text-2xl font-black text-white">
                  DV
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Deekshith Varanasi</h3>
                  <span className="font-mono text-xs text-neutral-400">@iamsantosh777</span>
                </div>
                <p className="text-xs font-mono text-neutral-300 mt-0.5">
                  AI/ML Engineer in Progress • Student Developer at VVITU • Builder
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-neutral-400 text-[10px]">FOCUS</div>
                <div className="text-white font-bold mt-0.5">AI / Vision / Web</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-neutral-400 text-[10px]">PRIMARY STACK</div>
                <div className="text-[#FF4F2A] font-bold mt-0.5">Python & JS</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-center">
                <div className="text-neutral-400 text-[10px]">CODE STATUS</div>
                <div className="text-emerald-400 font-bold mt-0.5">Active Committer</div>
              </div>
            </div>
          </div>

          {/* GitHub-Inspired Activity Illustration */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400">
              <span className="flex items-center gap-2">
                <Activity size={14} className="text-[#00D9FF]" />
                CONTINUOUS COMMIT PULSE // REPOSITORY ENGAGEMENT
              </span>
              <span>{hoveredCell || 'Hover blocks to inspect commits'}</span>
            </div>

            {/* Contribution Matrix Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1.5 min-w-[700px]">
                {weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5">
                    {week.map((day, dIdx) => {
                      const colors = [
                        'bg-neutral-900/80 border-white/[0.04]',
                        'bg-[#0E4429] border-[#006D32]/40',
                        'bg-[#006D32] border-[#26A641]/40',
                        'bg-[#26A641] border-[#39D353]/40',
                        'bg-[#39D353] border-white/20'
                      ];

                      return (
                        <div
                          key={dIdx}
                          onMouseEnter={() =>
                            setHoveredCell(
                              `${day.commits} commits on Week ${wIdx + 1}, Day ${dIdx + 1}`
                            )
                          }
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-3.5 h-3.5 rounded-sm border ${
                            colors[day.level]
                          } transition-transform hover:scale-125 cursor-pointer`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-4">
              <span>Less</span>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-neutral-900 border border-white/5" />
                <span className="w-3 h-3 rounded-sm bg-[#0E4429]" />
                <span className="w-3 h-3 rounded-sm bg-[#006D32]" />
                <span className="w-3 h-3 rounded-sm bg-[#26A641]" />
                <span className="w-3 h-3 rounded-sm bg-[#39D353]" />
              </div>
              <span>More Active</span>
            </div>
          </div>
        </div>

        {/* Highlighted Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {officialRepos.map((repo, idx) => (
            <a
              key={idx}
              href="https://github.com/iamsantosh777"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-[#0F0F0F] border border-white/10 hover:border-[#FF4F2A]/60 transition-all duration-300 hover:-translate-y-1 block shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-neutral-400 group-hover:text-[#FF4F2A] transition-colors" />
                  <span className="text-base font-bold text-white group-hover:text-[#FF4F2A] transition-colors font-mono">
                    {repo.name}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-neutral-900 text-neutral-300 border border-neutral-800">
                  {repo.tag}
                </span>
              </div>

              <p className="text-xs text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
                {repo.description}
              </p>

              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-3 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: repo.langColor }}
                  />
                  <span>{repo.language}</span>
                </div>
                <span className="flex items-center gap-1 text-neutral-400 group-hover:text-white transition-colors">
                  <span>Explore repo</span>
                  <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
