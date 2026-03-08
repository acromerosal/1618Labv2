import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Shield, Zap, Cpu, Lock, Terminal } from 'lucide-react';
import { GlitchText } from '../components/effects/GlitchText';
import { HackerText } from '../components/effects/HackerText';
import { SoundService } from '../services/soundService';
import { artifacts } from '../data/content';

const Artifacts = () => {
  const handleInteraction = () => {
    SoundService.init();
    SoundService.playClick();
  };

  return (
    <section className="py-32 bg-dark min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 border-b border-white/20 pb-4 text-center md:text-left gap-4 md:gap-0">
           <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">ARTIFACTS</h2>
           <span className="font-mono text-xs mb-2 text-gold font-serif italic">EQUIPAMIENTO_LAB</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artifacts.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col"
              onMouseEnter={() => {
                SoundService.init();
                SoundService.playGlitch();
              }}
              onClick={handleInteraction}
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-gold text-black font-mono text-[10px] px-2 py-1 font-bold">
                  {product.type}
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors">
                    <GlitchText text={product.title} />
                  </h3>
                  <span className="font-mono text-gold text-sm">{product.price}</span>
                </div>
                
                <p className="text-gray-400 text-sm font-mono mb-6 flex-grow">
                  {product.desc}
                </p>
                
                <button className="w-full py-3 border border-gold text-gold hover:bg-gold hover:text-black transition-all font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group/btn">
                  <ShoppingCart size={14} />
                  ADQUIRIR
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              {/* Decorative Tech Lines */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/30"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/30"></div>
            </motion.div>
          ))}
        </div>
        <div className="mt-32 border-t border-white/10 pt-24">
          <h2 className="text-4xl font-bold uppercase mb-16">Infraestructura_Técnica</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { name: "REACT_18", status: "STABLE" },
              { name: "THREE_JS", status: "ACTIVE" },
              { name: "TAILWIND_4", status: "OPTIMIZED" },
              { name: "GEMINI_AI", status: "CONNECTED" },
              { name: "FRAMER_MOTION", status: "FLUID" },
              { name: "VITE_6", status: "FAST" },
              { name: "TYPESCRIPT", status: "STRICT" },
              { name: "WEB_AUDIO", status: "REACTIVE" }
            ].map((tech, i) => (
              <div key={i} className="border border-white/5 p-6 bg-white/5 hover:bg-gold/10 transition-colors group">
                <p className="font-mono text-[10px] text-gold mb-2 group-hover:animate-pulse">{tech.status}</p>
                <h4 className="text-sm font-bold tracking-widest">{tech.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Artifacts;
