import React from 'react';
import { Github, Linkedin, Mail, ExternalLink, ArrowUp, Cpu, Heart } from 'lucide-react';

interface FooterProps {
  onScrollToTop: () => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onNavigate }) => {
  return (
    <footer className="w-full bg-[#060606] border-t border-white/10 text-neutral-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF4F2A] to-[#FF7849] p-0.5 shadow-md shadow-[#FF4F2A]/30">
                <div className="w-full h-full rounded-[6px] bg-[#0C0C0C] flex items-center justify-center font-black text-xs text-white">
                  M
                </div>
              </div>
              <span className="font-mono text-base font-black tracking-widest text-white">
                MASTER<span className="text-[#FF4F2A]">.DEV</span>
              </span>
            </div>

            <p className="text-neutral-400 font-sans text-xs leading-relaxed max-w-sm">
              The Developer Universe of <strong className="text-white">Deekshith Varanasi</strong>. Second-year B.Tech CSE (AI/ML) student at VVITU. Building at the intersection of artificial intelligence, computer vision, and creative web engineering.
            </p>

            {/* Live deployment status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE ON AWS AMPLIFY // PROD STABLE</span>
            </div>
          </div>

          {/* Quick Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              PORTFOLIO INDEX
            </div>
            <ul className="space-y-2 text-neutral-400 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#FF4F2A] transition-colors"
                >
                  01 // Hero & Introduction
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FF4F2A] transition-colors"
                >
                  02 // About Me
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('skills')}
                  className="hover:text-[#FF4F2A] transition-colors"
                >
                  03 // Technical Skills
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#FF4F2A] transition-colors"
                >
                  04 // Featured Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journey')}
                  className="hover:text-[#FF4F2A] transition-colors"
                >
                  05 // Learning Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('achievements')}
                  className="hover:text-[#FF4F2A] transition-colors"
                >
                  06 // Achievements & Certifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#FF4F2A] transition-colors"
                >
                  07 // Contact Protocol
                </button>
              </li>
            </ul>
          </div>

          {/* Connect Column (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              VERIFIED CHANNELS
            </div>
            <div className="space-y-2.5">
              <a
                href="https://github.com/iamsantosh777/master-dev-universe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-white/30 text-neutral-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Github size={15} />
                  <span>iamsantosh777/master-dev-universe</span>
                </div>
                <ExternalLink size={12} className="text-neutral-500 group-hover:text-white" />
              </a>

              <a
                href="https://www.linkedin.com/in/santosh-subramanya-deekshith-varanasi-8a79b4393"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-[#00D9FF]/40 text-neutral-300 hover:text-[#00D9FF] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Linkedin size={15} />
                  <span>LinkedIn Profile</span>
                </div>
                <ExternalLink size={12} className="text-neutral-500 group-hover:text-[#00D9FF]" />
              </a>

              <a
                href="mailto:deekshithvaranasi.777@gmail.com"
                className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-[#FF4F2A]/40 text-neutral-300 hover:text-[#FF4F2A] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Mail size={15} />
                  <span>deekshithvaranasi.777@gmail.com</span>
                </div>
                <ExternalLink size={12} className="text-neutral-500 group-hover:text-[#FF4F2A]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} MASTER.DEV</span>
            <span>•</span>
            <span>Architected by Deekshith Varanasi</span>
            <span>•</span>
            <span>VVITU CSE (AI/ML)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline">Deployed on AWS Amplify</span>
            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-[#FF4F2A] text-neutral-300 hover:text-white transition-colors"
            >
              <span>BACK TO TOP</span>
              <ArrowUp size={12} className="text-[#FF4F2A]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
