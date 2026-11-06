import React, { useState } from 'react';
import { TECH_KEYS_DATA } from '../data/portfolioData';
import { InteractiveKeyboard } from './InteractiveKeyboard';
import { Terminal, Cpu, Database, Layers, Cloud, Sparkles, CheckCircle2 } from 'lucide-react';

interface SkillCategory {
  id: string;
  title: string;
  icon: typeof Terminal;
  accent: string;
  description: string;
  skills: { name: string; level: string; note: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'PROGRAMMING',
    icon: Terminal,
    accent: '#FF4F2A',
    description: 'Foundational language fluency across low-level and high-level environments.',
    skills: [
      { name: 'Python', level: 'Primary Language', note: 'AI/ML scripting, OpenCV, automation & data analysis' },
      { name: 'C', level: 'Foundations', note: 'Pointers, memory management & algorithms' },
      { name: 'JavaScript (ES6+)', level: 'Proficient', note: 'Asynchronous event architecture, DOM & Canvas APIs' },
      { name: 'HTML5 Semantic', level: 'Fluent', note: 'Accessible structure, multimedia & canvas rendering' },
      { name: 'CSS3 / Tailwind', level: 'Fluent', note: 'Responsive design, animations, dark aesthetics' }
    ]
  },
  {
    id: 'ai-cv',
    title: 'AI & COMPUTER VISION',
    icon: Cpu,
    accent: '#00D9FF',
    description: 'Practical exploration of vision pipelines and intelligent assistive models.',
    skills: [
      { name: 'OpenCV', level: 'Computer Vision', note: 'Image transformations, contours & ocular metrics' },
      { name: 'NumPy', level: 'Core Toolkit', note: 'Multidimensional tensors & matrix linear algebra' },
      { name: 'MediaPipe', level: 'Facial Mesh', note: '68-point facial landmark triangulation' },
      { name: 'Generative AI APIs', level: 'Applied Prototyping', note: 'Multimodal prompting & language model integration' }
    ]
  },
  {
    id: 'data',
    title: 'DATA',
    icon: Database,
    accent: '#10B981',
    description: 'Structured data wrangling, cleaning, analysis, and relational queries.',
    skills: [
      { name: 'Pandas', level: 'Data Wrangling', note: 'DataFrame manipulation, cleaning & feature extraction' },
      { name: 'SQL', level: 'Relational Queries', note: 'Schema design, complex joins, grouping & aggregations' },
      { name: 'Data Analytics', level: 'Exploration', note: 'Statistical summary, distributions & trend discovery' }
    ]
  },
  {
    id: 'frameworks-tools',
    title: 'FRAMEWORKS & TOOLS',
    icon: Layers,
    accent: '#8B5CF6',
    description: 'Modern development ecosystems, reactive component models, and 3D graphics.',
    skills: [
      { name: 'React', level: 'Proficient', note: 'Component architectures, hooks & single-page apps' },
      { name: 'Vite', level: 'Build Tooling', note: 'Ultra-fast bundling, HMR & build optimization' },
      { name: 'FastAPI', level: 'Intermediate', note: 'Lightweight REST microservices & model serving' },
      { name: 'Git', level: 'Daily Workflow', note: 'Atomic commits, branch workflows & merge hygiene' },
      { name: 'GitHub', level: 'Daily Workflow', note: 'Open-source collaboration, issue tracking & releases' },
      { name: 'Three.js', level: 'Creative Tech', note: 'Interactive WebGL 3D scenes & procedural meshes' }
    ]
  },
  {
    id: 'cloud',
    title: 'CLOUD',
    icon: Cloud,
    accent: '#FF9900',
    description: 'Hosting infrastructure, CI/CD pipelines, and cloud distribution.',
    skills: [
      { name: 'AWS Amplify', level: 'Production Deployment', note: 'Full-stack hosting, Git CI/CD triggers, and CDN edge delivery' }
    ]
  }
];

export const TechnicalSkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'categorized' | '3d'>('categorized');

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F2A]/10 border border-[#FF4F2A]/30 text-[#FF4F2A] font-mono text-xs uppercase tracking-widest mb-3">
            <Cpu size={12} />
            ENGINEERING CAPABILITIES
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight uppercase">
            TECHNICAL SKILLS.
          </h2>
          <p className="text-neutral-400 font-mono text-sm max-w-2xl mt-2">
            Organized categories reflecting authentic competencies, coursework, and active learning milestones. Zero beginner-level claims exaggerated.
          </p>
        </div>

        {/* View Switcher: Categorized vs 3D Mechanical Matrix */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-900 border border-neutral-800 self-start md:self-auto font-mono text-xs">
          <button
            onClick={() => setViewMode('categorized')}
            className={`px-4 py-2 rounded-xl transition-all ${
              viewMode === 'categorized'
                ? 'bg-[#FF4F2A] text-white font-bold shadow-md shadow-[#FF4F2A]/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            CATEGORIZED
          </button>
          <button
            onClick={() => setViewMode('3d')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              viewMode === '3d'
                ? 'bg-[#00D9FF] text-black font-bold shadow-md shadow-[#00D9FF]/30'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sparkles size={12} />
            3D HARDWARE MATRIX
          </button>
        </div>
      </div>

      {viewMode === '3d' ? (
        /* Interactive 3D Keyboard Matrix */
        <div>
          <InteractiveKeyboard />
        </div>
      ) : (
        /* Categorized Grid View */
        <div className="space-y-8">
          {/* Category Filter Pills */}
          <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl font-mono text-xs whitespace-nowrap transition-all border ${
                activeCategory === 'all'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              ALL CATEGORIES (5)
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl font-mono text-xs whitespace-nowrap transition-all border flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? 'bg-[#FF4F2A] text-white border-[#FF4F2A] font-bold shadow-md shadow-[#FF4F2A]/25'
                    : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{cat.title}</span>
                <span className="text-[10px] opacity-75">({cat.skills.length})</span>
              </button>
            ))}
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.filter(
              (cat) => activeCategory === 'all' || activeCategory === cat.id
            ).map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="p-6 md:p-8 rounded-3xl bg-[#0D0D0D] border border-white/10 hover:border-neutral-700 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-2.5 rounded-xl text-white shadow-lg"
                          style={{ backgroundColor: `${cat.accent}20`, color: cat.accent }}
                        >
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
                            {cat.title}
                          </h3>
                          <p className="text-xs font-mono text-neutral-400 mt-0.5">
                            {cat.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-neutral-400">
                        {cat.skills.length} skills
                      </span>
                    </div>

                    {/* Skill Items */}
                    <div className="space-y-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          className="p-3.5 rounded-xl bg-neutral-900/70 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: cat.accent }}
                            />
                            <span className="font-mono text-sm font-bold text-white">
                              {skill.name}
                            </span>
                            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
                              — {skill.note}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-black/60 text-neutral-300 border border-white/10 self-start sm:self-auto shrink-0">
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Footer Note */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400" />
                      Active Student / Project Toolkit
                    </span>
                    <span className="text-neutral-400">MASTER.DEV</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick toggle to 3D matrix banner */}
          <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#00D9FF]" />
              <span>Want to test the mechanical 3D hardware keyboard?</span>
            </div>
            <button
              onClick={() => setViewMode('3d')}
              className="px-4 py-1.5 rounded-xl bg-neutral-800 hover:bg-[#00D9FF] hover:text-black text-white transition-colors"
            >
              LAUNCH 3D KEYBOARD ↗
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
