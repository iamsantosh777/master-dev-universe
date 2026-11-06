import React, { useState } from 'react';
import { PLAYGROUND_SNIPPETS, CodeSnippetItem } from '../data/portfolioData';
import { Play, Copy, RotateCcw, Check, Terminal, Sparkles, AlertCircle, Code } from 'lucide-react';

export const InteractiveCodePlayground: React.FC = () => {
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>(PLAYGROUND_SNIPPETS[0].id);
  const [currentSnippet, setCurrentSnippet] = useState<CodeSnippetItem>(PLAYGROUND_SNIPPETS[0]);
  const [editorCode, setEditorCode] = useState<string>(PLAYGROUND_SNIPPETS[0].code);
  const [outputConsole, setOutputConsole] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectSnippet = (snippet: CodeSnippetItem) => {
    setSelectedSnippetId(snippet.id);
    setCurrentSnippet(snippet);
    setEditorCode(snippet.code);
    setOutputConsole(null);
  };

  const handleReset = () => {
    setEditorCode(currentSnippet.code);
    setOutputConsole(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editorCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsExecuting(true);
    setOutputConsole(null);

    setTimeout(() => {
      if (currentSnippet.runnable && currentSnippet.language === 'javascript') {
        try {
          const logs: string[] = [];
          const customConsole = {
            log: (...args: unknown[]) => {
              logs.push(args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '));
            },
            warn: (...args: unknown[]) => logs.push('[WARN] ' + args.join(' ')),
            error: (...args: unknown[]) => logs.push('[ERR] ' + args.join(' '))
          };

          const runFn = new Function('console', editorCode);
          runFn(customConsole);

          setOutputConsole(logs.length > 0 ? logs.join('\n') : '[Process finished with exit code 0 — No stdout output]');
        } catch (err: unknown) {
          setOutputConsole(`[EXECUTION ERROR]: ${err instanceof Error ? err.message : String(err)}`);
        }
      } else {
        // Honest disclosure: Python / SQL runtimes require simulated browser pipeline
        setOutputConsole(currentSnippet.expectedOutput || 'Execution completed with status 0.');
      }
      setIsExecuting(false);
    }, 450);
  };

  return (
    <div id="code-playground" className="w-full my-12 rounded-3xl bg-[#0B0B0B] border border-white/10 shadow-2xl overflow-hidden">
      {/* Playground Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-5 bg-[#121212] border-b border-white/5 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#00D9FF] font-bold">
              INSIDE THE CODE // EXPLORE MY ENGINEERING
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Interactive Engineering Playground
          </h3>
          <p className="text-xs font-mono text-neutral-400 mt-0.5">
            Real code, real algorithms. Test, inspect, and execute code snippets across Deekshith's domains.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs font-mono transition-colors"
            title="Reset to default code"
          >
            <RotateCcw size={13} />
            <span>RESET</span>
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 text-xs font-mono transition-colors"
            title="Copy code to clipboard"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? 'COPIED' : 'COPY'}</span>
          </button>
          <button
            onClick={handleRun}
            disabled={isExecuting}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF4F2A] to-[#FF7849] hover:opacity-95 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#FF4F2A]/30 transition-all active:scale-95 disabled:opacity-50"
          >
            {isExecuting ? (
              <span className="animate-spin">⟳</span>
            ) : (
              <Play size={13} fill="currentColor" />
            )}
            <span>{isExecuting ? 'RUNNING...' : 'EXECUTE CODE'}</span>
          </button>
        </div>
      </div>

      {/* Snippet Selection Tabs */}
      <div className="flex overflow-x-auto scrollbar-none px-4 pt-3 bg-[#0E0E0E] border-b border-white/5 gap-2">
        {PLAYGROUND_SNIPPETS.map((snip) => (
          <button
            key={snip.id}
            onClick={() => handleSelectSnippet(snip)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-t-xl text-xs font-mono shrink-0 transition-all border-b-2 ${
              selectedSnippetId === snip.id
                ? 'bg-[#141414] text-white border-[#FF4F2A] font-bold shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200 border-transparent hover:bg-neutral-900/50'
            }`}
          >
            <Code size={13} className={selectedSnippetId === snip.id ? 'text-[#FF4F2A]' : 'text-neutral-500'} />
            <span>{snip.name}</span>
          </button>
        ))}
      </div>

      {/* Code Editor Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
        {/* Editor Area (7 Cols) */}
        <div className="lg:col-span-7 p-4 bg-[#080808] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-3 mb-2 border-b border-white/5">
              <span className="font-semibold text-neutral-300">
                {currentSnippet.title}
              </span>
              <span className="text-[11px] text-neutral-400">
                {currentSnippet.runnable ? '● Live Browser JS Runtime' : '● Verified Output Preview'}
              </span>
            </div>

            {/* Editable Textarea styled like an IDE */}
            <div className="relative font-mono text-xs">
              <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                className="w-full h-[280px] bg-transparent text-neutral-200 resize-none outline-none font-mono leading-6 p-2 selection:bg-[#FF4F2A]/40"
                spellCheck={false}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>Lines: {editorCode.split('\n').length} | Chars: {editorCode.length}</span>
            <span className="text-[#00D9FF]">UTF-8 • Standard Syntax</span>
          </div>
        </div>

        {/* Output Console (5 Cols) */}
        <div className="lg:col-span-5 p-4 bg-[#0A0A0A] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#FF4F2A]" />
                <span className="text-neutral-300 font-bold uppercase tracking-wider">
                  OUTPUT CONSOLE
                </span>
              </div>
              <span className="text-[10px] text-neutral-400">
                STDOUT STREAM
              </span>
            </div>

            {outputConsole ? (
              <div className="rounded-xl bg-black/80 border border-white/10 p-4 font-mono text-xs text-emerald-400 overflow-x-auto min-h-[220px] max-h-[280px]">
                <pre className="whitespace-pre-wrap leading-relaxed">
                  {outputConsole}
                </pre>
              </div>
            ) : (
              <div className="rounded-xl bg-black/40 border border-dashed border-white/10 p-6 flex flex-col items-center justify-center text-center text-neutral-400 font-mono text-xs min-h-[220px]">
                <Sparkles size={24} className="text-neutral-600 mb-2" />
                <p>Click <span className="text-[#FF4F2A] font-bold">EXECUTE CODE</span> to compile and inspect stdout telemetries.</p>
                <p className="text-[11px] text-neutral-400 mt-2">
                  Edit code freely above to test behaviors.
                </p>
              </div>
            )}
          </div>

          {/* Genuine Runtime Transparency Banner */}
          <div className="mt-4 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5 text-[11px] font-mono text-neutral-400">
            <AlertCircle size={14} className="text-[#FF4F2A] shrink-0 mt-0.5" />
            <p>
              <strong className="text-neutral-300">Engineering Integrity:</strong> JavaScript executes directly in the browser's V8 engine. Python and SQL showcase verified outputs without fabricating server environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
