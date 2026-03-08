import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Cpu, Zap, Activity, Shield, X, Terminal, ArrowUpRight } from 'lucide-react';
import { HackerText } from '../components/effects/HackerText';
import { SoundService } from '../services/soundService';
import { payloads } from '../data/content';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = {
  Globe: <Globe size={32} />,
  Cpu: <Cpu size={32} />,
  Activity: <Activity size={32} />,
  Zap: <Zap size={32} />,
  Shield: <Shield size={32} />,
  Terminal: <Terminal size={32} />,
  ArrowUpRight: <ArrowUpRight size={32} />
};

const Payloads = () => {
  const [activePayload, setActivePayload] = useState<typeof payloads[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleInteraction = () => {
    SoundService.init();
    SoundService.playClick();
  };

  return (
    <section className="py-32 bg-black text-white relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 border-b border-white/20 pb-4 text-center md:text-left gap-4 md:gap-0">
           <h2 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase">SYSTEMS</h2>
           <span className="font-mono text-xs mb-2 text-gold">CAPABILITIES_V4.0</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {payloads.map((service, index) => (
            <motion.div 
              key={service.id}
              layoutId={`payload-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onMouseEnter={() => {
                setHoveredIndex(index);
                SoundService.init();
                SoundService.playGlitch();
              }}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                handleInteraction();
                setActivePayload(service);
              }}
            >
              <div className="border border-white/10 p-8 h-full hover:border-gold transition-all duration-500 relative overflow-hidden bg-white/5 backdrop-blur-sm">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity text-gold">
                  {iconMap[service.icon]}
                </div>
                
                <div className="w-full aspect-square mb-8 border border-white/10 rounded-full flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform duration-700 group-hover:border-gold">
                   <div className="w-3/4 h-3/4 border border-white/10 rotate-45 flex items-center justify-center group-hover:border-gold">
                      <div className="w-1/2 h-1/2 border border-white/10 -rotate-45 bg-white/10 group-hover:bg-gold group-hover:border-gold"></div>
                   </div>
                </div>

                <h3 className="text-2xl font-bold uppercase mb-2 group-hover:text-gold transition-colors">{service.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tech.map(t => (
                    <span key={t} className="font-mono text-[9px] uppercase tracking-widest opacity-50 border border-white/10 px-2 py-0.5">{t}</span>
                  ))}
                </div>
                <div className="min-h-[6rem]">
                  {hoveredIndex === index ? (
                    <p className="font-mono text-sm leading-relaxed text-gold">
                      <HackerText text={service.desc} speed={18} />
                    </p>
                  ) : (
                    <p className="font-mono text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {service.desc}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payload Modal */}
      <AnimatePresence>
        {activePayload && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setActivePayload(null)}
            />
            <motion.div 
              layoutId={`payload-${activePayload.id}`}
              className="bg-black border border-gold text-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button 
                onClick={() => setActivePayload(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gold hover:text-black transition-colors border border-transparent hover:border-black z-50"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gold/20 bg-gold/5">
                  <div className="text-gold mb-8">{iconMap[activePayload.icon]}</div>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase leading-none mb-8 text-gold">{activePayload.title}</h2>
                  
                  {activePayload.stats && (
                    <div className="space-y-4 font-mono text-sm">
                      {Object.entries(activePayload.stats).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-white/10 pb-2">
                          <span className="uppercase opacity-50">{key.replace('_', ' ')}</span>
                          <span className="text-gold">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="font-mono text-gold text-xs tracking-widest uppercase mb-6">/// SYSTEM_OVERRIDE_DESCRIPTION</h3>
                    <p className="text-lg leading-relaxed mb-8 text-gray-300">
                      {activePayload.fullDesc || activePayload.desc}
                    </p>
                    
                    {activePayload.deliverables && (
                      <>
                        <h3 className="font-mono text-gold text-xs tracking-widest uppercase mb-4">/// DEPLOYMENT_PACKAGES</h3>
                        <ul className="grid grid-cols-1 gap-3 mb-8">
                          {activePayload.deliverables.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 font-mono text-sm text-gray-400">
                              <span className="w-1 h-1 bg-gold"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <h3 className="font-mono text-gold text-xs tracking-widest uppercase mb-4">/// TECH_STACK</h3>
                    <div className="flex flex-wrap gap-2">
                       {activePayload.tech.map(t => (
                         <span key={t} className="border border-white/20 px-2 py-1 text-xs font-mono text-gold/80">{t}</span>
                       ))}
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <Link 
                      to="/decrypt-brief"
                      className="inline-flex items-center gap-2 bg-gold text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors w-full justify-center md:w-auto"
                      onClick={() => setActivePayload(null)}
                    >
                      <Terminal size={16} />
                      Iniciar Secuencia
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Payloads;
