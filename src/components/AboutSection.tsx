import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, Heart, Cpu, Sparkles, Terminal, Code } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [halftoneActive, setHalftoneActive] = useState(true);

  // Procedural WebGL / Canvas Halftone Portrait Reveal (No fake photograph, authentic creative computing artifact)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 460);
    let height = (canvas.height = 540);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const renderHalftone = () => {
      time += 0.025;
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, width, height);

      const dotSpacing = 14;
      const cols = Math.floor(width / dotSpacing);
      const rows = Math.floor(height / dotSpacing);

      // Render algorithmic digital silhouette / avatar mesh
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * dotSpacing + dotSpacing / 2;
          const y = r * dotSpacing + dotSpacing / 2;

          // Compute distance to center silhouette profile & mouse
          const dxCenter = x - width / 2;
          const dyCenter = y - height * 0.45;
          const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);

          const dxMouse = x - mouseX;
          const dyMouse = y - mouseY;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          // Procedural human-head & shoulders silhouette density
          let density = 0;
          // Head oval
          if (distCenter < 120 && Math.abs(dxCenter) < 85) {
            density = 0.85 - distCenter / 180;
          }
          // Torso / shoulders
          if (y > height * 0.55 && Math.abs(dxCenter) < (y - height * 0.35) * 0.8) {
            density = Math.max(density, 0.7 - (y / height) * 0.3);
          }

          // Add subtle wave modulation
          density += Math.sin(x * 0.05 + time) * 0.15;

          // Reactive mouse distortion
          if (distMouse < 90) {
            density += (1 - distMouse / 90) * 0.4;
          }

          if (density > 0.15) {
            const radius = Math.min(dotSpacing * 0.48, Math.max(1, density * 5.5));
            const isHighlighted = distMouse < 70;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);

            if (isHighlighted) {
              ctx.fillStyle = '#FF4F2A';
            } else if (density > 0.6) {
              ctx.fillStyle = '#FFFFFF';
            } else if (density > 0.4) {
              ctx.fillStyle = '#00D9FF';
            } else {
              ctx.fillStyle = '#333333';
            }

            ctx.fill();
          }
        }
      }

      // Terminal overlay lines
      ctx.strokeStyle = 'rgba(255, 79, 42, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, (Math.sin(time) * 0.5 + 0.5) * height);
      ctx.lineTo(width, (Math.sin(time) * 0.5 + 0.5) * height);
      ctx.stroke();

      animId = requestAnimationFrame(renderHalftone);
    };

    renderHalftone();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [halftoneActive]);

  return (
    <div id="about" className="w-full py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F2A]/10 border border-[#FF4F2A]/30 text-[#FF4F2A] font-mono text-xs uppercase tracking-widest mb-3">
            <Cpu size={12} />
            BIOGRAPHY & PHILOSOPHY
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            ENGINEERING THE SYNTHESIS.
          </h2>
          <p className="text-neutral-400 font-mono text-sm max-w-2xl mt-2">
            Where mathematical precision in Artificial Intelligence converges with creative technology and digital craft.
          </p>
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authentic Portrait & Cybernetic Telemetry */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl bg-[#0C0C0C] border border-white/10 p-2 shadow-2xl overflow-hidden group">
              {/* Photo Display / Halftone Mode */}
              {halftoneActive ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-950">
                  <img
                    src="/assets/aistudio/deekshith_2023911e.png"
                    alt="Deekshith Varanasi — AI/ML Engineer in Progress"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter contrast-105"
                  />
                  {/* Subtle futuristic gradient vignettes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute inset-0 bg-[#FF4F2A]/5 mix-blend-color pointer-events-none" />
                </div>
              ) : (
                <canvas
                  ref={canvasRef}
                  className="w-full h-full rounded-2xl cursor-crosshair object-cover"
                />
              )}

              {/* Holographic Frame Badges */}
              <div className="absolute top-5 left-5 px-3 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#00D9FF] flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                DEEKSHITH VARANASI // OFFICIAL
              </div>
              
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-auto">
                <div className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-[#FF4F2A]/30 text-[10px] font-mono text-[#FF4F2A] shadow-lg">
                  VVITU • AI/ML SPEC
                </div>
                
                <button
                  onClick={() => setHalftoneActive(!halftoneActive)}
                  className="px-3 py-1 rounded-md bg-neutral-900/90 hover:bg-neutral-800 backdrop-blur-md border border-white/20 text-[10px] font-mono text-neutral-200 hover:text-white transition-all shadow-lg flex items-center gap-1"
                  title="Toggle between Photographic and Algorithmic Halftone View"
                >
                  <Sparkles size={11} className="text-[#00D9FF]" />
                  <span>{halftoneActive ? 'VIEW HALFTONE' : 'VIEW REAL PHOTO'}</span>
                </button>
              </div>

              {/* Scanning laser line */}
              <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4F2A] to-transparent pointer-events-none animate-scanline shadow-[0_0_12px_#FF4F2A]" />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-neutral-400 text-center">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Official portrait verified: Deekshith Varanasi (VVITU CSE AI/ML).</span>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Academic Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base md:text-lg text-neutral-300 leading-relaxed font-sans font-light">
              <p>
                I am <strong className="text-white font-semibold">Deekshith Varanasi</strong>, a second-year B.Tech student in <span className="text-[#FF4F2A] font-semibold">Computer Science & Engineering</span> specializing in <span className="text-white font-semibold">Artificial Intelligence & Machine Learning</span> at <span className="text-[#00D9FF] font-semibold">VVITU (Vignan's Institute of Information Technology)</span>.
              </p>
              <p>
                My engineering pursuit centers on transforming theoretical machine learning algorithms into tangible, high-speed human interfaces. Rather than treating AI as a black box, I explore low-level computer vision routines, facial landmark geometries, and responsive web systems that run on client devices with zero latency.
              </p>
              <p>
                Beyond code, I have a deep passion for <strong className="text-white font-semibold">singing and vocal arts</strong>. I view music and software architecture through the same lens: both demand rhythmic discipline, structural harmony, and emotional resonance.
              </p>
            </div>

            {/* Verified Academic & Demographic Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#FF4F2A]/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#FF4F2A]/15 text-[#FF4F2A]">
                    <GraduationCap size={18} />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold">
                    HIGHER SECONDARY (CLASS XII)
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  86% Distinction
                </div>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  Board of Intermediate Education (MPC)
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#00D9FF]/50 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#00D9FF]/15 text-[#00D9FF]">
                    <Award size={18} />
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold">
                    UNIVERSITY CURRENT
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  VVITU — B.Tech 2nd Year
                </div>
                <p className="text-xs font-mono text-neutral-400 mt-1">
                  CSE (Artificial Intelligence & Machine Learning)
                </p>
              </div>
            </div>

            {/* Technical Interests Matrix */}
            <div className="pt-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold mb-3">
                CORE TECHNICAL PASSIONS
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Artificial Intelligence',
                  'Computer Vision (OpenCV)',
                  'Python Architecture',
                  'Full-Stack Web Engineering',
                  'Data Analytics & NumPy',
                  'Singing & Vocal Music',
                  'Creative Computing',
                  'System Optimization'
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-200 hover:border-[#FF4F2A] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
