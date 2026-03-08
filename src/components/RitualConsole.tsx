import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, ChevronRight, Minimize2, Maximize2 } from 'lucide-react';
import { useHack } from '../context/HackContext';
import { SoundService } from '../services/soundService';
import { HackerText } from './effects/HackerText';

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const workerRef = useRef<Worker | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    // Initialize worker
    workerRef.current = new Worker(new URL('../workers/hackerWorker.ts', import.meta.url), { type: 'module' });

    workerRef.current.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === 'TEXT_DECRYPTED') {
        setDisplayedText(payload);
        if (progressRef.current < text.length) {
           progressRef.current += 1; // Increment progress
           // Request next frame
           workerRef.current?.postMessage({ 
             type: 'DECRYPT_TEXT', 
             payload: { target: text, progress: progressRef.current } 
           });
           
           if (Math.random() > 0.9) SoundService.playBeep(800, 'square', 0.01, 0.02);
        } else {
           onComplete?.();
        }
      }
    };

    // Start decryption
    workerRef.current.postMessage({ 
      type: 'DECRYPT_TEXT', 
      payload: { target: text, progress: 0 } 
    });

    return () => {
      workerRef.current?.terminate();
    };
  }, [text]);

  return <span>{displayedText}</span>;
};

const RitualConsole = () => {
  const { 
    isConsoleOpen, 
    setConsoleOpen, 
    lastCommand, 
    oracleResponse, 
    isOracleLoading, 
    executeCommand,
    isGodMode,
    currentPath,
    userCodename
  } = useHack();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  // Boot Sequence
  useEffect(() => {
    if (isConsoleOpen && history.length === 0) {
      setIsBooting(true);
      const bootLines = [
        'INITIALIZING_KERNEL...',
        'LOADING_MODULES: [PHYSICS, TIME, LOGIC]...',
        'CONNECTING_TO_AKASHIC_RECORDS...',
        'SYSTEM_READY.'
      ];
      
      let delay = 0;
      bootLines.forEach((line, i) => {
        setTimeout(() => {
          setHistory(prev => [...prev, `SYS: ${line}`]);
          SoundService.playBeep(200 + i * 100, 'sawtooth', 0.05, 0.05);
          if (i === bootLines.length - 1) setIsBooting(false);
        }, delay);
        delay += 500 + Math.random() * 500;
      });
    }
  }, [isConsoleOpen]);

  useEffect(() => {
    if (isConsoleOpen && !isBooting) {
      inputRef.current?.focus();
    }
  }, [isConsoleOpen, isBooting]);

  useEffect(() => {
    if (oracleResponse) {
      // We don't add it directly to history here, we let the Typewriter component handle it in the render loop
      // But wait, we need to store it in history to persist it.
      // Let's just add it to history, and render the last item as typewriter if it's new.
      // Actually, simpler: Just add it.
      setHistory(prev => [...prev, `ORACLE: ${oracleResponse}`]);
    }
  }, [oracleResponse]);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    setHistory(prev => [...prev, `${isGodMode ? 'ROOT' : (userCodename || 'GUEST')}@UNIVERSE:${currentPath}$ ${cmd}`]);
    
    switch (cmd.toLowerCase()) {
      case 'clear':
        setHistory([]);
        break;
      default:
        await executeCommand(cmd);
    }

    setInput('');
    SoundService.playClick();
  };

  return (
    <AnimatePresence>
      {isConsoleOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            width: isMaximized ? '100vw' : undefined,
            height: isMaximized ? '100vh' : undefined,
            bottom: isMaximized ? 0 : undefined,
            right: isMaximized ? 0 : undefined,
            borderRadius: isMaximized ? 0 : undefined
          }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed z-[100] bg-black/95 backdrop-blur-xl flex flex-col overflow-hidden
            ${isMaximized ? '' : 'bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-[500px] h-[50vh] md:h-[400px] rounded-lg border border-white/10 shadow-2xl'}
            ${isGodMode ? 'border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)]' : 'border-white/10'}
          `}
        >
          {/* Header */}
          <div className={`flex items-center justify-between p-3 border-b ${isGodMode ? 'bg-amber-900/20 border-amber-500/30' : 'bg-white/5 border-white/10'}`}>
            <div className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest ${isGodMode ? 'text-amber-500' : 'text-white/60'}`}>
              <Terminal size={14} />
              <span>{isGodMode ? 'OMNIPOTENCE_TERMINAL_v9.9' : 'RITUAL_CONSOLE_v1.0'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMaximized(!isMaximized)} className="text-white/40 hover:text-white transition-colors">
                {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>
              <button onClick={() => setConsoleOpen(false)} className="text-white/40 hover:text-red-400 transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>
          
          {/* Terminal Body */}
          <div className={`flex-1 p-4 font-mono text-xs md:text-sm overflow-y-auto space-y-2 font-medium custom-scrollbar ${isGodMode ? 'scrollbar-gold' : 'scrollbar-cyan'}`} onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => {
              const isCommand = line.includes('$');
              const isSystem = line.startsWith('SYS:');
              const isOracle = line.startsWith('ORACLE:');
              
              let colorClass = 'text-white/60';
              if (isCommand) colorClass = isGodMode ? 'text-amber-300' : 'text-white';
              if (isSystem) colorClass = 'text-emerald-400';
              if (isOracle) colorClass = isGodMode ? 'text-amber-400' : 'text-cyan-400';

              // Strip prefixes for display
              const displayLine = line.replace(/^(SYS:|ORACLE:)/, '');

              return (
                <div key={i} className={`${colorClass} break-words leading-relaxed`}>
                  {isOracle && i === history.length - 1 ? (
                    <TypewriterText text={displayLine} />
                  ) : isSystem ? (
                    <HackerText text={line} speed={18} />
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              );
            })}
            
            {isOracleLoading && (
              <div className={`${isGodMode ? 'text-amber-500' : 'text-cyan-400'} animate-pulse`}>
                {isGodMode ? 'DIVINING_TRUTH...' : 'PROCESSING...'}
              </div>
            )}
            <div ref={historyEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleCommand} className={`p-3 border-t ${isGodMode ? 'border-amber-500/30 bg-amber-900/10' : 'border-white/10 bg-black'}`}>
            <div className={`flex items-center gap-2 ${isGodMode ? 'text-amber-500' : 'text-white/60'}`}>
              <ChevronRight size={16} className="animate-pulse" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={`bg-transparent border-none outline-none flex-1 font-mono text-xs md:text-sm tracking-wider placeholder-white/20 ${isGodMode ? 'text-amber-300' : 'text-white'}`}
                placeholder={isBooting ? "INITIALIZING..." : "ENTER COMMAND..."}
                disabled={isBooting}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RitualConsole;
