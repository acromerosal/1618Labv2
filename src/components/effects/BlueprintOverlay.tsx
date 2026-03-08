import React, { useState, useEffect } from 'react';
import { useHack } from '../../context/HackContext';

export const BlueprintOverlay = () => {
  const { isBlueprintMode, setBlueprintMode } = useHack();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fps, setFps] = useState(60);
  const [nodes, setNodes] = useState(0);

  useEffect(() => {
    if (!isBlueprintMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBlueprintMode(false);
    };

    const interval = setInterval(() => {
      setFps(Math.floor(58 + Math.random() * 4));
      setNodes(document.getElementsByTagName('*').length);
    }, 1000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, [isBlueprintMode, setBlueprintMode]);

  if (!isBlueprintMode) return null;

  return (
    <div className="fixed inset-0 z-[180] pointer-events-none font-mono text-[10px] text-cyan-500/60 overflow-hidden">
      {/* Dynamic Grid - Scanning Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      {/* Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 animate-[scan_4s_linear_infinite]"></div>

      {/* Rulers */}
      <div className="absolute top-0 left-0 w-full h-6 border-b border-cyan-500/20 flex justify-between px-2 items-center bg-black/40 backdrop-blur-sm">
         {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="h-2 w-[1px] bg-cyan-500/40"></div>
         ))}
      </div>
      <div className="absolute top-0 left-0 h-full w-6 border-r border-cyan-500/20 flex flex-col justify-between py-2 items-center bg-black/40 backdrop-blur-sm">
         {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-2 h-[1px] bg-cyan-500/40"></div>
         ))}
      </div>

      {/* Crosshairs & Corners */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-cyan-500"></div>
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-cyan-500"></div>
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-cyan-500"></div>
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-cyan-500"></div>

      {/* Close Button */}
      <button 
        onClick={() => setBlueprintMode(false)}
        className="absolute top-8 right-8 pointer-events-auto border border-cyan-500/40 px-4 py-2 bg-black/50 hover:bg-cyan-500/10 text-cyan-400 transition-colors z-[200]"
      >
        EXIT_BLUEPRINT [ESC]
      </button>

      {/* Mouse Follower / Reticle */}
      <div 
        className="absolute w-full h-[1px] bg-cyan-500/30 pointer-events-none"
        style={{ top: mousePos.y }}
      />
      <div 
        className="absolute h-full w-[1px] bg-cyan-500/30 pointer-events-none"
        style={{ left: mousePos.x }}
      />
      <div 
        className="absolute w-20 h-20 border border-cyan-500/40 rounded-full pointer-events-none flex items-center justify-center transition-transform duration-75"
        style={{ top: mousePos.y - 40, left: mousePos.x - 40 }}
      >
        <div className="w-1 h-1 bg-cyan-500"></div>
        <div className="absolute top-[-20px] left-0 text-[9px] bg-black/80 px-1 border border-cyan-500/20 whitespace-nowrap">
          X:{mousePos.x} Y:{mousePos.y}
        </div>
      </div>

      {/* Center Marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-cyan-500/10 rounded-full flex items-center justify-center">
        <div className="w-[1px] h-full bg-cyan-500/20"></div>
        <div className="h-[1px] w-full bg-cyan-500/20 absolute"></div>
      </div>

      {/* Dynamic Data Panel */}
      <div className="absolute top-24 right-8 w-64 bg-black/80 backdrop-blur border border-cyan-500/20 p-4 space-y-4 pointer-events-auto">
        <div className="flex justify-between border-b border-cyan-500/20 pb-2">
          <span>SYSTEM_DIAGNOSTICS</span>
          <span className="animate-pulse text-cyan-400">● LIVE</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>VIEWPORT</span>
            <span>{window.innerWidth}x{window.innerHeight}</span>
          </div>
          <div className="flex justify-between">
            <span>FPS</span>
            <span className="text-green-400">{fps}</span>
          </div>
          <div className="flex justify-between">
            <span>DOM_NODES</span>
            <span>{nodes}</span>
          </div>
          <div className="flex justify-between">
            <span>MEMORY</span>
            <span>{Math.floor(Math.random() * 40 + 20)}MB</span>
          </div>
          <div className="flex justify-between">
            <span>LATENCY</span>
            <span>{Math.floor(Math.random() * 10 + 5)}ms</span>
          </div>
        </div>

        <div className="pt-2 border-t border-cyan-500/20">
          <div className="text-[8px] opacity-50 mb-1">RENDER_QUEUE</div>
          <div className="flex gap-1 h-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="flex-1 bg-cyan-500/20"
                style={{ opacity: Math.random() }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 bg-black/80 px-6 py-2 border border-cyan-500/20 rounded-full backdrop-blur-sm pointer-events-auto">
         <span>GRID: 100px</span>
         <span>SNAP: OFF</span>
         <span>LAYER: OVERLAY</span>
         <span>ZOOM: 100%</span>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
