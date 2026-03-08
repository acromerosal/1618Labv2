import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '', as: Component = 'span' }) => {
  return (
    <Component className={`glitch-text relative inline-block group cursor-default ${className}`} data-text={text}>
      <span className="relative z-10">{text}</span>
    </Component>
  );
};
