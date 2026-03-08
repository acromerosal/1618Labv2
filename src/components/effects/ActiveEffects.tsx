import React, { useEffect, useRef } from 'react';
import { useHack } from '../../context/HackContext';

export const ActiveEffects = () => {
  const { activeEffect } = useHack();

  if (!activeEffect) return null;

  return (
    <>
      {activeEffect === 'matrix' && <MatrixOverlay />}
      {activeEffect === 'void' && <VoidOverlay />}
      {activeEffect === 'gold' && <div className="fixed inset-0 z-[200] bg-gold mix-blend-color pointer-events-none" />}
      {activeEffect === 'invert' && <div className="fixed inset-0 z-[200] backdrop-invert pointer-events-none" />}
      {activeEffect === 'vhs' && <VHSOverlay />}
      {activeEffect === 'terminal' && <TerminalOverlay />}
      {activeEffect === 'overload' && <OverloadOverlay />}
      {activeEffect === 'god' && <GodModeOverlay />}
    </>
  );
};

const GodModeOverlay = () => {
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden mix-blend-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-transparent to-amber-500/20 animate-pulse" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] border border-amber-500/30 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-[600px] h-[600px] border border-amber-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute w-[400px] h-[400px] border border-amber-500/40 rounded-full animate-[spin_10s_linear_infinite]" />
      </div>
      <div className="absolute top-32 left-0 w-full text-center text-amber-300 font-mono text-xs tracking-[1em] animate-pulse pointer-events-none">
        GOD_MODE_ACTIVE // REALITY_UNLOCKED
      </div>
      {Array.from({ length: 50 }).map((_, i) => (
        <div 
          key={i}
          className="absolute w-1 h-1 bg-amber-400 rounded-full animate-ping"
          style={{ 
            top: `${Math.random() * 100}%`, 
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 2 + 1}s`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

const VHSOverlay = () => {
  return (
    <div className="fixed inset-0 z-[190] pointer-events-none overflow-hidden mix-blend-hard-light opacity-60">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[20px] w-full animate-[scanline_8s_linear_infinite]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />
      <div className="absolute top-8 left-8 font-mono text-xl text-white/80 tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
        PLAY <span className="animate-pulse">▶</span>
      </div>
      <div className="absolute bottom-8 right-8 font-mono text-xl text-white/80 tracking-widest drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
        SP: {new Date().toLocaleTimeString()}
      </div>
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

const TerminalOverlay = () => {
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none backdrop-grayscale backdrop-sepia backdrop-hue-rotate-90 backdrop-contrast-125">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[210] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-[220]" />
    </div>
  );
};

const MatrixOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[190] pointer-events-none opacity-80" />;
};

const VoidOverlay = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center pointer-events-none">
      <div className="text-white font-mono text-xs tracking-[1em] animate-pulse">
        N U L L _ S P A C E
      </div>
    </div>
  );
};

const OverloadOverlay = () => {
  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-red-500/20 animate-pulse mix-blend-overlay"></div>
      <div className="absolute inset-0 flex items-center justify-center">
         <h1 className="text-9xl font-black text-red-600 opacity-20 animate-bounce">ERROR</h1>
      </div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i}
          className="absolute bg-white h-[1px] w-full"
          style={{ 
            top: `${Math.random() * 100}%`, 
            opacity: Math.random(),
            animation: `overload-shake ${Math.random() * 0.2 + 0.1}s infinite`
          }}
        />
      ))}
      <style>{`
        @keyframes overload-shake {
          0% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          100% { transform: translateX(-2px); }
        }
      `}</style>
    </div>
  );
};
