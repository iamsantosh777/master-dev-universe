import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Volume2, VolumeX, Eye } from 'lucide-react';

interface ParticleIntroProps {
  onEnter: () => void;
  isSkipped: boolean;
}

export const ParticleIntro: React.FC<ParticleIntroProps> = ({ onEnter, isSkipped }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [assembledPercent, setAssembledPercent] = useState(0);
  const [ambientSound, setAmbientSound] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play subtle futuristic sound chord using Web Audio API on enter
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = audioCtxRef.current || new AudioCtx();
      audioCtxRef.current = ctx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [220, 277.18, 329.63, 440, 554.37];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + idx * 0.08 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 1.3);
      });
      setAmbientSound(true);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    if (isSkipped) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      scatterDuration: number;
    }

    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999, radius: 100 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    function initParticles() {
      if (!ctx) return;
      particles = [];

      // Render offscreen text to sample pixel coordinates
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCanvas.width = width;
      offCanvas.height = height;

      offCtx.fillStyle = '#080808';
      offCtx.fillRect(0, 0, width, height);
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      // Responsive font sizing
      const fontSize = Math.min(width * 0.12, 110);
      offCtx.font = `900 ${fontSize}px 'Space Grotesk', sans-serif`;
      offCtx.fillStyle = '#FFFFFF';
      offCtx.fillText('DEEKSHITH', width / 2, height / 2 - 25);

      offCtx.font = `700 ${fontSize * 0.32}px 'JetBrains Mono', monospace`;
      offCtx.fillStyle = '#FF4F2A';
      offCtx.fillText('VARANASI // MASTER.DEV', width / 2, height / 2 + fontSize * 0.55);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // Sample density step
      const step = Math.max(3, Math.floor(width / 320));

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3];

          if (a > 128 && (r > 60 || g > 60 || b > 60)) {
            // Is it orange or white?
            const isOrange = r > 180 && g < 140;
            const color = isOrange
              ? (Math.random() > 0.4 ? '#FF4F2A' : '#FF7849')
              : (Math.random() > 0.8 ? '#00D9FF' : '#E5E7EB');

            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              originX: x,
              originY: y,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              size: Math.random() * 2 + 1.2,
              color,
              alpha: Math.random() * 0.6 + 0.4,
              scatterDuration: 0
            });
          }
        }
      }
    }

    initParticles();

    let frameCount = 0;
    const render = () => {
      frameCount++;
      ctx.fillStyle = 'rgba(8, 8, 8, 0.22)';
      ctx.fillRect(0, 0, width, height);

      let assembledCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Distance from target
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;
        const distOrigin = Math.sqrt(dxOrigin * dxOrigin + dyOrigin * dyOrigin);

        if (distOrigin < 4) {
          assembledCount++;
        }

        // Distance from mouse
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          // Push away
          const force = (mouse.radius - distMouse) / mouse.radius;
          const angle = Math.atan2(dyMouse, dxMouse);
          p.vx += Math.cos(angle) * force * 3;
          p.vy += Math.sin(angle) * force * 3;
        } else {
          // Ease back to target
          p.vx += (dxOrigin * 0.04 - p.vx * 0.12);
          p.vy += (dyOrigin * 0.04 - p.vy * 0.12);
        }

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (frameCount % 6 === 0 && particles.length > 0) {
        setAssembledPercent(Math.min(100, Math.round((assembledCount / particles.length) * 100)));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isSkipped]);

  if (isSkipped) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080808] text-white select-none overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 cursor-crosshair" />

      {/* Top Bar Header */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF4F2A] animate-ping" />
          <div className="flex flex-col">
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF4F2A] font-bold">MASTER.DEV</span>
            <span className="text-[10px] font-mono text-neutral-400">The Developer Universe // System 2.0</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playChime();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 hover:text-white hover:border-[#FF4F2A] transition-all"
            title="Toggle Audio Feedback"
          >
            {ambientSound ? <Volume2 size={14} className="text-[#00D9FF]" /> : <VolumeX size={14} />}
            <span className="font-mono text-[11px] hidden sm:inline">{ambientSound ? 'SFX ON' : 'SFX READY'}</span>
          </button>

          <button
            onClick={onEnter}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-700/80 hover:border-[#FF4F2A] text-xs font-mono tracking-wider uppercase text-neutral-200 hover:text-white transition-all duration-300 shadow-lg shadow-black/60"
          >
            <span>Skip Intro</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-[#FF4F2A]" />
          </button>
        </div>
      </div>

      {/* Floating Center Interaction Guide */}
      <div className="relative z-20 pointer-events-none flex flex-col items-center justify-center text-center px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md mb-3 text-xs text-neutral-400 font-mono">
          <Sparkles size={13} className="text-[#00D9FF] animate-spin" />
          <span>Move cursor to scatter particles • Particles assemble into name</span>
        </div>
      </div>

      {/* Bottom Bar: Action & Telemetry */}
      <div className="relative z-20 flex flex-col sm:flex-row items-center justify-between px-6 py-6 md:px-12 gap-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-auto">
        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
            <span>PARTICLES CONVERGENCE: <span className="text-white font-bold">{assembledPercent}%</span></span>
          </div>
          <span className="hidden md:inline text-neutral-600">|</span>
          <span className="hidden md:inline text-neutral-400">VVITU CSE (AI/ML)</span>
        </div>

        {/* Enter CTA */}
        <button
          onClick={() => {
            playChime();
            setTimeout(onEnter, 150);
          }}
          className="relative group px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF4F2A] to-[#FF7849] text-white font-mono text-xs md:text-sm font-bold uppercase tracking-widest shadow-xl shadow-[#FF4F2A]/30 hover:shadow-[#FF4F2A]/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Eye size={16} />
            ENTER THE UNIVERSE
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </span>
          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </div>
  );
};
