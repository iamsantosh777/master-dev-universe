import React, { useState } from 'react';
import { Copy, Check, Terminal, Code2, Database, Palette, Minimize2, Maximize2 } from 'lucide-react';

interface CodeSnippet {
  title: string;
  lang: string;
  icon: typeof Terminal;
  accent: string;
  code: string;
}

const SNIPPETS: CodeSnippet[] = [
  {
    title: 'analyze_image.py',
    lang: 'Python // AI/ML',
    icon: Terminal,
    accent: '#FF4F2A',
    code: `import numpy as np
import cv2

def analyze_image(image):
    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    edges = cv2.Canny(
        gray, 100, 200
    )

    return edges

print("MASTER.DEV // AI SYSTEM READY")`
  },
  {
    title: 'master_vision.py',
    lang: 'Python // CV',
    icon: Terminal,
    accent: '#00D9FF',
    code: `import cv2

cap = cv2.VideoCapture(0)

while True:
    success, frame = cap.read()

    if not success:
        break

    cv2.imshow("MASTER VISION", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()`
  },
  {
    title: 'developer.js',
    lang: 'JavaScript // Dev',
    icon: Code2,
    accent: '#F7DF1E',
    code: `const developer = {
  name: "Deekshith",
  role: "AI/ML Engineer in Progress",
  passion: [
    "Artificial Intelligence",
    "Computer Vision",
    "Creative Development"
  ]
};

console.log("Welcome to MASTER.DEV");`
  },
  {
    title: 'TechCard.jsx',
    lang: 'React // UI',
    icon: Code2,
    accent: '#61DAFB',
    code: `import React, { useState } from "react";

export default function TechCard() {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive(!active)}
      className="tech-card"
    >
      {active ? "SYSTEM ACTIVE" : "EXPLORE TECH"}
    </button>
  );
}`
  },
  {
    title: 'projects.sql',
    lang: 'SQL // Database',
    icon: Database,
    accent: '#10B981',
    code: `SELECT
    project_name,
    technology,
    project_status
FROM projects
ORDER BY project_name;`
  },
  {
    title: 'master-card.css',
    lang: 'CSS // Design',
    icon: Palette,
    accent: '#FF4F2A',
    code: `.master-card {
  background: #080808;
  border: 1px solid #ff4f2a;
  border-radius: 18px;
  transition: transform 0.3s ease;
}

.master-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 30px #ff4f2a33;
}`
  }
];

export const FloatingCodeSnippets: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const snippet = SNIPPETS[activeTab];
  const Icon = snippet.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-white/10 bg-[#0C0C0C]/90 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden transition-all duration-300 hover:border-neutral-700">
      {/* VS Code Style Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#141414]/90 border-b border-white/5 select-none">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80 hover:bg-[#FF5F56] transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80 hover:bg-[#FFBD2E] transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]/80 hover:bg-[#27C93F] transition-colors cursor-pointer" />
          <span className="ml-2 font-mono text-[11px] text-neutral-400 flex items-center gap-1.5">
            <Icon size={12} style={{ color: snippet.accent }} />
            {snippet.title}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title={isMinimized ? 'Expand Code' : 'Minimize Code'}
          >
            {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-mono transition-all"
            title="Copy Code Snippet"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>
        </div>
      </div>

      {/* Language Tabs */}
      <div className="flex items-center overflow-x-auto scrollbar-none px-2 pt-2 bg-[#0E0E0E] border-b border-white/5 gap-1">
        {SNIPPETS.map((snip, idx) => (
          <button
            key={snip.title}
            onClick={() => {
              setActiveTab(idx);
              setIsMinimized(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all shrink-0 border-t-2 ${
              activeTab === idx
                ? 'bg-[#141414] text-white border-[#FF4F2A]'
                : 'text-neutral-400 hover:text-neutral-200 border-transparent hover:bg-neutral-900/40'
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: snip.accent }}
            />
            {snip.lang.split(' // ')[0]}
          </button>
        ))}
      </div>

      {/* Editor Body */}
      {!isMinimized && (
        <div className="relative p-4 font-mono text-xs overflow-x-auto bg-[#0A0A0A]/95 text-neutral-300 max-h-[300px]">
          <div className="table w-full">
            {snippet.code.split('\n').map((line, i) => (
              <div key={i} className="table-row hover:bg-white/[0.03] transition-colors leading-6">
                <span className="table-cell pr-4 text-right select-none text-neutral-600 text-[11px] w-8">
                  {i + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {highlightSyntax(line)}
                  {i === snippet.code.split('\n').length - 1 && (
                    <span className="inline-block w-2 h-4 bg-[#FF4F2A] animate-pulse ml-1 translate-y-0.5" />
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Sub-label */}
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400 select-none">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE SYNTAX ENGINE
            </span>
            <span>{snippet.lang}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Lightweight client-side syntax highlighter for requested snippets
function highlightSyntax(line: string) {
  // Keywords
  const pythonKeywords = /\b(import|as|def|return|while|True|if|not|break|print)\b/g;
  const jsKeywords = /\b(const|let|var|function|return|export|default|import|from)\b/g;
  const sqlKeywords = /\b(SELECT|FROM|WHERE|ORDER BY|GROUP BY|INSERT|UPDATE)\b/g;

  let styledLine = line;

  // Strings
  styledLine = styledLine.replace(/(["'`].*?["'`])/g, '<span class="text-[#00D9FF]">$1</span>');

  // Comments
  styledLine = styledLine.replace(/(#.*|\/\/.*)/g, '<span class="text-neutral-500 italic">$1</span>');

  // Numbers
  styledLine = styledLine.replace(/\b(\d+)\b/g, '<span class="text-[#FFBD2E]">$1</span>');

  // Python/JS keywords
  styledLine = styledLine.replace(
    /\b(import|as|def|return|while|True|if|not|break|print|const|let|var|function|export|default|from|SELECT|ORDER|BY)\b/g,
    '<span class="text-[#FF4F2A] font-semibold">$1</span>'
  );

  return <span dangerouslySetInnerHTML={{ __html: styledLine }} />;
}
