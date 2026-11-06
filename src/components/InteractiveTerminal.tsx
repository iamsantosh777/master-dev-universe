import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Copy, Check, Trash2 } from 'lucide-react';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [copied, setCopied] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isInitialMount = useRef(true);

  // Initialize terminal welcome banner
  useEffect(() => {
    setHistory([
      {
        id: 'init-1',
        command: 'system --boot',
        timestamp: new Date().toLocaleTimeString(),
        output: (
          <div className="space-y-1.5 text-xs text-neutral-300 font-mono">
            <div className="text-emerald-400 font-bold">
              [SYSTEM OK] MASTER.DEV v2.4 (x86_64-node-vvitu)
            </div>
            <div>Welcome to the interactive CLI environment of Deekshith Varanasi.</div>
            <div className="text-neutral-400">
              Type <span className="text-[#FF4F2A] font-bold">help</span> to list available commands or try <span className="text-[#00D9FF]">about</span>, <span className="text-[#00D9FF]">projects</span>, <span className="text-[#00D9FF]">python</span>.
            </div>
          </div>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Only scroll the terminal's own inner box, never the entire window!
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add to command history buffer
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryPointer(-1);

    const now = new Date().toLocaleTimeString();

    let resultNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#FF4F2A] font-bold uppercase tracking-wider">
              Available Terminal Commands:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-300">
              <div><strong className="text-white">help</strong> : Display this operational manual</div>
              <div><strong className="text-white">about</strong> : Summary dossier of Deekshith</div>
              <div><strong className="text-white">skills</strong> : Technical superpowers & competencies</div>
              <div><strong className="text-white">projects</strong> : List of active & completed initiatives</div>
              <div><strong className="text-white">experience</strong> : Academic & engineering background</div>
              <div><strong className="text-white">achievements</strong> : Verified academic standings</div>
              <div><strong className="text-white">contact</strong> : Direct communication channels</div>
              <div><strong className="text-white">github</strong> : Official code repositories link</div>
              <div><strong className="text-white">linkedin</strong> : Professional network profile</div>
              <div><strong className="text-[#00D9FF]">python</strong> : Sample AI & Computer Vision script</div>
              <div><strong className="text-[#00D9FF]">javascript</strong> : Sample interactive developer script</div>
              <div><strong className="text-red-400">clear</strong> : Flush current terminal history</div>
            </div>
          </div>
        );
        break;

      case 'about':
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono text-neutral-300">
            <div className="text-[#FF4F2A] font-bold">DEEKSHITH VARANASI</div>
            <div>Role: AI/ML Engineer in Progress | Creative Developer | Builder</div>
            <div>Institution: VVITU (Vignan's Institute of Information Technology)</div>
            <div>Academic Year: 2nd Year B.Tech CSE (AI & ML)</div>
            <div>Interests: Computer Vision, OpenCV, Python Architecture, Vocal Music.</div>
          </div>
        );
        break;

      case 'skills':
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-400 font-bold">CORE COMPETENCIES // ACTIVE STACK:</div>
            <div className="text-neutral-300">
              • <strong className="text-white">Languages:</strong> Python, C, JavaScript (ES6+), HTML5, CSS3, SQL<br />
              • <strong className="text-white">Data / AI:</strong> OpenCV, MediaPipe, NumPy, Pandas, SciPy<br />
              • <strong className="text-white">Frameworks:</strong> React, FastAPI, Tailwind CSS, Three.js<br />
              • <strong className="text-white">Tools & Cloud:</strong> Git, GitHub, AWS (EC2/S3 Foundations)
            </div>
          </div>
        );
        break;

      case 'projects':
        resultNode = (
          <div className="space-y-2 text-xs font-mono text-neutral-300">
            <div className="text-[#FF4F2A] font-bold">ACTIVE INITIATIVES:</div>
            <div>1. <strong className="text-white">GAZE GUARD AI</strong> — Driver Alertness & EAR Monitoring (In Progress)</div>
            <div>2. <strong className="text-white">CITRA</strong> — Algorithmic ASCII & Love Pixels Transformer (Concept)</div>
            <div>3. <strong className="text-white">VERNACULAR PEDAGOGY AI</strong> — Regional Multilingual CS EdTech (Prototype)</div>
            <div>4. <strong className="text-white">RAKSHA LIVE MAP</strong> — Multi-Hazard Geospatial Crisis Response (Concept)</div>
            <div>5. <strong className="text-white">MASTER TERMINAL ARCADE</strong> — Python Curses Gaming Engine (Completed)</div>
          </div>
        );
        break;

      case 'experience':
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono text-neutral-300">
            <div className="text-[#00D9FF] font-bold">ACADEMIC & BUILDER BACKGROUND:</div>
            <div>• <strong>2023–2027:</strong> B.Tech CSE (AI/ML) — VVITU (Ongoing)</div>
            <div>• <strong>2023:</strong> Senior Secondary Intermediate (Class XII) — 86% Distinction</div>
            <div>• <strong>Projects Lab:</strong> Architect of 5+ independent computer vision & CLI systems</div>
          </div>
        );
        break;

      case 'achievements':
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono text-neutral-300">
            <div className="text-emerald-400 font-bold">VERIFIED MILESTONES:</div>
            <div>• 86% Score in Intermediate Class XII Board Examinations (MPC)</div>
            <div>• University engineering journey at VVITU with AI specialization</div>
            <div>• Creative expression in classical and modern vocal music</div>
            <div className="text-neutral-400 italic">Note: Strict transparency enforced. Zero fake certifications.</div>
          </div>
        );
        break;

      case 'contact':
        resultNode = (
          <div className="space-y-1.5 text-xs font-mono text-neutral-300">
            <div className="text-[#FF4F2A] font-bold">DIRECT CHANNELS:</div>
            <div>• Email: <a href="mailto:deekshithvaranasi.777@gmail.com" className="text-[#00D9FF] underline">deekshithvaranasi.777@gmail.com</a></div>
            <div>• GitHub: <a href="https://github.com/iamsantosh777" target="_blank" rel="noreferrer" className="text-[#00D9FF] underline">github.com/iamsantosh777</a></div>
            <div>• LinkedIn: <a href="https://www.linkedin.com/in/santosh-subramanya-deekshith-varanasi-8a79b4393" target="_blank" rel="noreferrer" className="text-[#00D9FF] underline">linkedin.com/in/santosh-subramanya-deekshith-varanasi-8a79b4393</a></div>
          </div>
        );
        break;

      case 'github':
        resultNode = (
          <div className="text-xs font-mono text-neutral-300">
            Opening official repository portal: <a href="https://github.com/iamsantosh777" target="_blank" rel="noreferrer" className="text-[#00D9FF] underline font-bold">https://github.com/iamsantosh777</a>
          </div>
        );
        break;

      case 'linkedin':
        resultNode = (
          <div className="text-xs font-mono text-neutral-300">
            Opening LinkedIn profile: <a href="https://www.linkedin.com/in/santosh-subramanya-deekshith-varanasi-8a79b4393" target="_blank" rel="noreferrer" className="text-[#00D9FF] underline font-bold">santosh-subramanya-deekshith-varanasi-8a79b4393</a>
          </div>
        );
        break;

      case 'python':
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-emerald-400 font-bold">SAMPLE PYTHON SCRIPT // COMPUTER VISION:</div>
            <div className="p-3 rounded-lg bg-black/90 border border-white/10 text-neutral-300 overflow-x-auto">
              <pre className="whitespace-pre">
{`import cv2
import numpy as np

def analyze_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    return edges

print("MASTER.DEV // AI SYSTEM READY")`}
              </pre>
            </div>
            <div className="text-[11px] text-neutral-400">Status: Verified OpenCV Canny Edge snippet.</div>
          </div>
        );
        break;

      case 'javascript':
        resultNode = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-[#00D9FF] font-bold">SAMPLE JAVASCRIPT SCRIPT // DEVELOPER OBJECT:</div>
            <div className="p-3 rounded-lg bg-black/90 border border-white/10 text-neutral-300 overflow-x-auto">
              <pre className="whitespace-pre">
{`const developer = {
  name: "Deekshith",
  role: "AI/ML Engineer in Progress",
  passion: [
    "Artificial Intelligence",
    "Computer Vision",
    "Creative Development"
  ]
};

console.log("Welcome to MASTER.DEV");`}
              </pre>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        resultNode = (
          <div className="text-xs font-mono text-rose-400">
            Command not recognized: "{rawCmd}". Type <span className="text-white underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> for operational list.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: rawCmd,
        output: resultNode,
        timestamp: now
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPointer = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPointer);
      setInputVal(commandHistory[nextPointer] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPointer = historyPointer + 1;
      if (nextPointer >= commandHistory.length) {
        setHistoryPointer(-1);
        setInputVal('');
      } else {
        setHistoryPointer(nextPointer);
        setInputVal(commandHistory[nextPointer] || '');
      }
    }
  };

  const copyTerminalOutput = () => {
    const text = history
      .map((h) => `$ ${h.command}\n${h.timestamp}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="terminal" className="w-full py-20 border-t border-white/5 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4F2A]/10 border border-[#FF4F2A]/30 text-[#FF4F2A] font-mono text-xs uppercase tracking-widest mb-3">
            <TerminalIcon size={12} />
            DIRECT KERNEL ACCESS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            MASTER.DEV INTERACTIVE TERMINAL.
          </h2>
          <p className="text-neutral-400 font-mono text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            A genuine CLI interface with command history, autocomplete shortcuts, and code visualizers.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="rounded-3xl bg-[#0C0C0C] border border-white/10 shadow-2xl overflow-hidden cursor-text"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#141414] border-b border-white/5 select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-3 font-mono text-xs text-neutral-300 font-medium hidden sm:inline">
                deekshith@master-dev: ~ (bash / zsh)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  copyTerminalOutput();
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 text-neutral-300 hover:text-white text-[11px] font-mono transition-colors"
                title="Copy Terminal Logs"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'COPIED' : 'COPY LOG'}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([]);
                }}
                className="p-1 rounded text-neutral-400 hover:text-rose-400 transition-colors"
                title="Clear Terminal"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div ref={terminalBodyRef} className="p-6 font-mono text-xs max-h-[460px] overflow-y-auto space-y-4 scroll-smooth">
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-[#FF4F2A] font-bold">➜</span>
                  <span className="text-[#00D9FF]">master.dev</span>
                  <span className="text-neutral-500">git:(main)</span>
                  <span className="text-white font-semibold">$ {item.command}</span>
                  <span className="text-[10px] text-neutral-600 ml-auto">{item.timestamp}</span>
                </div>
                <div className="pl-4 border-l border-neutral-800/80">
                  {item.output}
                </div>
              </div>
            ))}

            {/* Current Input Prompt */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[#FF4F2A] font-bold">➜</span>
              <span className="text-[#00D9FF]">master.dev</span>
              <span className="text-neutral-500">git:(main)</span>
              <span className="text-white font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help', 'skills', 'projects', 'python'..."
                className="flex-1 bg-transparent text-white font-mono text-xs outline-none caret-[#FF4F2A]"
              />
            </div>
            <div ref={bottomRef} />
          </div>

          {/* Quick Autocomplete Buttons */}
          <div className="p-3 bg-[#0E0E0E] border-t border-white/5 flex flex-wrap gap-2 items-center text-[11px] font-mono">
            <span className="text-neutral-500 mr-1 select-none">Quick:</span>
            {['help', 'about', 'skills', 'projects', 'python', 'javascript', 'contact'].map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCommand(cmd);
                }}
                className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 hover:border-[#FF4F2A] text-neutral-300 hover:text-white transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
