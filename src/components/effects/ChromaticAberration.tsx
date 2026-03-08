import React from 'react';
import { useHack } from '../../context/HackContext';

export const ChromaticAberration = () => {
  const { isHackMode } = useHack();
  if (!isHackMode) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-[150] mix-blend-screen opacity-30"
      style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
    >
      <div className="absolute inset-0 bg-red-500/10 translate-x-[1px] translate-y-[1px]"></div>
      <div className="absolute inset-0 bg-cyan-500/10 -translate-x-[1px] -translate-y-[1px]"></div>
    </div>
  );
};
