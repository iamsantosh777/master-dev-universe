import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, Send, Sparkles, MapPin, Globe, Terminal } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sentStatus, setSentStatus] = useState<string | null>(null);

  const officialEmail = 'deekshithvaranasi.777@gmail.com';
  const officialGithub = 'https://github.com/iamsantosh777';
  const officialLinkedin = 'https://www.linkedin.com/in/santosh-subramanya-deekshith-varanasi-8a79b4393';

  const copyEmail = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto bridge
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${officialEmail}?subject=${subject}&body=${body}`;

    setSentStatus('Connecting via email client...');
    setTimeout(() => setSentStatus(null), 4000);
  };

  return (
    <div id="contact" className="w-full py-20 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF4F2A]/10 border border-[#FF4F2A]/30 text-[#FF4F2A] font-mono text-xs uppercase tracking-widest mb-3">
            <Mail size={12} />
            COMMUNICATION PROTOCOL
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            INITIATE CONTACT.
          </h2>
          <p className="text-neutral-400 font-mono text-sm mt-2">
            Interested in collaborating on AI/ML models, computer vision systems, or engineering projects? Let's connect.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="p-6 rounded-3xl bg-[#111111] border border-white/10 hover:border-[#FF4F2A]/60 transition-all duration-300 shadow-xl group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-[#FF4F2A]/10 text-[#FF4F2A]">
                  <Mail size={22} />
                </div>
                <button
                  onClick={copyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 hover:text-white hover:border-[#FF4F2A] transition-colors"
                >
                  {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
                </button>
              </div>

              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                PRIMARY EMAIL
              </div>
              <a
                href={`mailto:${officialEmail}`}
                className="text-base sm:text-lg font-bold text-white hover:text-[#FF4F2A] transition-colors font-mono break-all"
              >
                {officialEmail}
              </a>
              <p className="text-xs text-neutral-400 mt-2 font-sans">
                Open for internship inquiries, project discussions, and research collaborations.
              </p>
            </div>

            {/* LinkedIn Card */}
            <a
              href={officialLinkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-[#111111] border border-white/10 hover:border-[#00D9FF]/60 transition-all duration-300 shadow-xl block group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-[#00D9FF]/10 text-[#00D9FF]">
                  <Linkedin size={22} />
                </div>
                <span className="text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                  CONNECT ON LINKEDIN ↗
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                PROFESSIONAL NETWORK
              </div>
              <div className="text-base font-bold text-white group-hover:text-[#00D9FF] transition-colors font-mono">
                Santosh Subramanya Deekshith Varanasi
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                View student achievements, collegiate activities, and professional background.
              </p>
            </a>

            {/* GitHub Card */}
            <a
              href={officialGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-3xl bg-[#111111] border border-white/10 hover:border-white/40 transition-all duration-300 shadow-xl block group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-white/10 text-white">
                  <Github size={22} />
                </div>
                <span className="text-xs font-mono text-neutral-400 group-hover:text-white transition-colors">
                  EXPLORE REPOSITORIES ↗
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                GITHUB PROFILE
              </div>
              <div className="text-base font-bold text-white group-hover:text-[#FF4F2A] transition-colors font-mono">
                @iamsantosh777
              </div>
              <p className="text-xs text-neutral-400 mt-1 font-sans">
                Explore source code for Gaze Guard AI, Citra, and terminal arcade software.
              </p>
            </a>
          </div>

          {/* Interactive Dispatch Terminal Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#121212] to-[#0A0A0A] border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-[#FF4F2A]" />
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-200 font-bold">
                  TRANSMISSION CONSOLE
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">
                ● STATUS: READY FOR DISPATCH
              </span>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-neutral-400 mb-1.5 uppercase tracking-wider text-[11px]">
                  YOUR NAME / CALLSIGN
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. Alex Mercer / Recruiter"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-[#FF4F2A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1.5 uppercase tracking-wider text-[11px]">
                  YOUR CONTACT EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-[#FF4F2A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1.5 uppercase tracking-wider text-[11px]">
                  MESSAGE / PROJECT INQUIRY
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your technical proposal, collaboration idea, or inquiry..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white outline-none focus:border-[#FF4F2A] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF4F2A] to-[#FF7849] hover:opacity-95 text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xl shadow-[#FF4F2A]/30 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <Send size={15} />
                <span>DISPATCH MESSAGE TO DEEKSHITH</span>
              </button>

              {sentStatus && (
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-center font-mono">
                  {sentStatus}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white">MASTER.DEV</span>
            <span>//</span>
            <span>DESIGNED & ENGINEERED BY DEEKSHITH VARANASI</span>
          </div>

          <div className="flex items-center gap-4">
            <span>VVITU CSE (AI/ML)</span>
            <span>•</span>
            <span>BUILT WITH REACT, THREE.JS & TAILWIND</span>
          </div>
        </div>
      </div>
    </div>
  );
};
