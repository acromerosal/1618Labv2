import React from 'react';

export const NoiseOverlay = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-40 opacity-[0.03] mix-blend-overlay"
      style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
