import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Zap, Search, Shield, PenTool, Cpu, Rocket, X, Terminal, Activity, Hash, FileCode, Repeat, Database, Network } from 'lucide-react';
import { SoundService } from '../services/soundService';
import { methodContent } from '../data/content';

const iconMap: Record<string, any> = {
  Search: <Search size={32} />,
  Layers: <Layers size={32} />,
  PenTool: <PenTool size={32} />,
  Cpu: <Cpu size={32} />,
  Rocket: <Rocket size={32} />,
  Zap: <Zap size={32} />,
  Shield: <Shield size={32} />,
  Repeat: <Repeat size={32} />
};

const MethodModal = ({ phase, onClose, index }: { phase: any; onClose: () => void; index: number }) => {
  if (!phase) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        layoutId={`phase-${index}`}
        className="bg-dark border border-gold/30 w-full max-w-3xl relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gold/10 text-gold border border-gold/20">
              {iconMap[phase.icon] || <Zap size={24} />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-gold/60 tracking-widest uppercase">PROTOCOL_0{index + 1}</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-white">{phase.title}</h3>
              <p className="text-gold font-mono text-xs tracking-widest uppercase mt-1 opacity-80">{phase.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-3 bg-black/40 border border-white/5 rounded">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Activity size={12} />
                <span className="text-[9px] font-mono uppercase tracking-widest">LOAD</span>
              </div>
              <div className="text-lg font-mono text-gold">{Math.floor(Math.random() * 30) + 70}%</div>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Shield size={12} />
                <span className="text-[9px] font-mono uppercase tracking-widest">CLEARANCE</span>
              </div>
              <div className="text-lg font-mono text-white">LVL {index + 1}</div>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Database size={12} />
                <span className="text-[9px] font-mono uppercase tracking-widest">BUFFER</span>
              </div>
              <div className="text-lg font-mono text-green-400">OPTIMAL</div>
            </div>
            <div className="p-3 bg-black/40 border border-white/5 rounded">
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Hash size={12} />
                <span className="text-[9px] font-mono uppercase tracking-widest">HASH</span>
              </div>
              <div className="text-lg font-mono text-white/50 text-xs truncate">
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h4 className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest mb-4">
                <Terminal size={14} />
                Tactical Analysis
              </h4>
              <p className="text-gray-300 leading-relaxed text-lg border-l-2 border-gold/20 pl-4">
                {phase.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
              <div>
                <h4 className="flex items-center gap-2 text-white/60 font-mono text-xs uppercase tracking-widest mb-4">
                  <FileCode size={14} />
                  Execution Parameters
                </h4>
                <ul className="space-y-3">
                  {phase.steps?.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-400 font-mono group">
                      <span className="text-gold/30 group-hover:text-gold transition-colors">▹</span> 
                      <span className="group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-6">
                 <div>
                    <h4 className="flex items-center gap-2 text-white/60 font-mono text-xs uppercase tracking-widest mb-4">
                      <Cpu size={14} />
                      Core Functions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['ANALYSIS', 'SYNTHESIS', 'DEPLOYMENT', 'OPTIMIZATION', 'SECURITY', 'SCALING'].slice(0, 4 + (index % 2)).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 rounded hover:border-gold/30 hover:text-gold transition-colors cursor-default">
                          {tag}
                        </span>
                      ))}
                    </div>
                 </div>

                 <div className="p-4 bg-white/5 border border-white/10 rounded relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <Network size={40} />
                    </div>
                    <h4 className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-widest mb-2">
                        <Activity size={14} />
                        Alchemical Resonance
                    </h4>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mb-2">
                        <motion.div 
                            className="h-full bg-gold"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.random() * 30 + 70}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                        <span>STABILITY_INDEX</span>
                        <span className="text-green-400">STABLE</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex justify-between items-center">
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-8 h-1 ${i <= index ? 'bg-gold' : 'bg-white/10'}`}></div>
            ))}
          </div>
          <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
            SEQUENCE_ID: {index + 1}/6
          </span>
        </div>
      </motion.div>
    </div>
  );
};

const Method = () => {
  const [selectedPhase, setSelectedPhase] = React.useState<any>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const handleInteraction = (step: any, index: number) => {
    SoundService.init();
    SoundService.playClick();
    setSelectedPhase(step);
    setSelectedIndex(index);
  };

  return (
    <section className="py-32 bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold uppercase mb-6">Nuestro <span className="text-gold">Método</span></h2>
          <p className="text-white/60 font-mono text-sm tracking-widest uppercase max-w-2xl mx-auto">{methodContent.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {methodContent.phases.map((step, i) => (
            <motion.div
              layoutId={`phase-${i}`}
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/10 p-8 hover:border-gold/50 transition-colors group cursor-pointer relative overflow-hidden"
              onMouseEnter={() => SoundService.playGlitch()}
              onClick={() => handleInteraction(step, i)}
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
              </div>
              
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {iconMap[step.icon] || <Zap size={32} />}
              </div>
              <div className="text-xs text-gold/50 font-mono mb-2">0{i + 1} // FASE</div>
              <h3 className="text-xl font-bold mb-4 tracking-tighter">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-3">{step.desc}</p>
              
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono text-gold uppercase tracking-widest">EXPAND_PROTOCOL</span>
                <Terminal size={12} className="text-gold" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhase && (
          <MethodModal 
            phase={selectedPhase} 
            index={selectedIndex} 
            onClose={() => setSelectedPhase(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Method;
