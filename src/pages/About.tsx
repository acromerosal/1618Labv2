import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, Zap, Target, Eye, X, User, Code, PenTool, Brain, Network } from 'lucide-react';
import { GlitchText } from '../components/effects/GlitchText';
import { HackerText } from '../components/effects/HackerText';
import { SoundService } from '../services/soundService';
import { aboutContent } from '../data/content';

const operatives = [
  {
    id: 'OP_01',
    codename: 'PHANTOM',
    role: 'STRATEGY_LEAD',
    specialization: 'SYSTEM_ARCHITECTURE',
    icon: <Brain size={32} />,
    stats: { int: 98, cre: 85, tec: 70 },
    bio: 'Architect of the invisible. Specializes in long-term strategic vectors and narrative injection.'
  },
  {
    id: 'OP_02',
    codename: 'VECTOR',
    role: 'VISUAL_ENGINEER',
    specialization: 'UI/UX_SYNTHESIS',
    icon: <PenTool size={32} />,
    stats: { int: 80, cre: 95, tec: 88 },
    bio: 'Reality distortion specialist. Translates abstract data into tactile visual interfaces.'
  },
  {
    id: 'OP_03',
    codename: 'GLITCH',
    role: 'CODE_WRAITH',
    specialization: 'FULL_STACK_ASSAULT',
    icon: <Code size={32} />,
    stats: { int: 90, cre: 75, tec: 99 },
    bio: 'Digital biological interface. Constructs the backbone of all 1618 operations.'
  },
  {
    id: 'OP_04',
    codename: 'CIPHER',
    role: 'DATA_ANALYST',
    specialization: 'PATTERN_RECOGNITION',
    icon: <Network size={32} />,
    stats: { int: 95, cre: 60, tec: 92 },
    bio: 'Information broker. Extracts meaning from noise and predicts user behavior patterns.'
  }
];

const OperativeModal = ({ operative, onClose }: { operative: any; onClose: () => void }) => {
  if (!operative) return null;

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
        layoutId={`op-${operative.id}`}
        className="bg-black border border-white/20 w-full max-w-lg relative overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        
        <div className="p-8 relative z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-start gap-6 mb-8">
            <div className="w-24 h-24 bg-white/5 border border-white/10 flex items-center justify-center text-gold relative overflow-hidden">
              <div className="absolute inset-0 bg-gold/10 animate-pulse"></div>
              {operative.icon}
              <div className="absolute bottom-0 right-0 p-1 bg-gold text-black text-[8px] font-bold font-mono">
                LVL_5
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-500 font-mono text-[10px] tracking-widest">ACTIVE_STATUS</span>
              </div>
              <h3 className="text-3xl font-bold uppercase tracking-tighter text-white mb-1">{operative.codename}</h3>
              <p className="text-gold font-mono text-xs tracking-widest uppercase">{operative.role}</p>
            </div>
          </div>

          <div className="space-y-6 font-mono text-xs">
            <div className="p-4 bg-white/5 border-l-2 border-gold">
              <p className="text-gray-300 leading-relaxed">"{operative.bio}"</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {Object.entries(operative.stats).map(([stat, val]: [string, any]) => (
                <div key={stat} className="bg-black/50 p-2 border border-white/10 text-center">
                  <div className="text-gray-500 uppercase text-[9px] mb-1">{stat}</div>
                  <div className="text-gold text-lg font-bold">{val}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="text-gray-500 uppercase text-[9px] mb-2 tracking-widest">SPECIALIZATION</div>
              <div className="text-white border-b border-dashed border-white/20 pb-1">
                {operative.specialization}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest">
              <span>ID: {operative.id}</span>
              <span>ACCESS_GRANTED</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const About = () => {
  const [selectedOperative, setSelectedOperative] = React.useState<any>(null);

  const handleInteraction = () => {
    SoundService.init();
    SoundService.playClick();
  };

  return (
    <div className="bg-dark min-h-screen pt-32 pb-24" onMouseEnter={() => SoundService.init()}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 border-b border-white/10 pb-12 text-center flex flex-col items-center"
        >
          <div className="flex items-center gap-4 text-gold font-mono text-xs mb-6 tracking-[0.3em]">
            <Terminal size={14} />
            <span>ABOUT_US_v2.0</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.8] uppercase mb-8">
            {aboutContent.title} <br/>
            <span className="text-gold font-serif italic">1618 LAB</span>
          </h1>
          <p className="text-xl md:text-2xl text-white font-light max-w-3xl mx-auto mb-8 leading-relaxed">
            {aboutContent.lead}
          </p>
          <p className="text-gray-400 font-mono max-w-2xl mx-auto text-sm leading-relaxed">
            {aboutContent.body}
          </p>
        </motion.div>

        <div className="mb-32">
          <h2 className="text-4xl font-bold uppercase mb-12 text-center">Capacidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutContent.capabilities.map((capability, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 p-8 hover:border-gold/50 transition-colors group"
                onClick={handleInteraction}
              >
                <div className="text-gold mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  <Zap size={24} />
                </div>
                <h3 className="text-lg font-bold uppercase mb-2 group-hover:text-gold transition-colors">
                  <GlitchText text={capability} />
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Nodes Section */}
        <div className="mb-32">
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] bg-white/10 w-24"></div>
            <h2 className="text-2xl font-mono text-gold tracking-widest uppercase">Active Nodes</h2>
            <div className="h-[1px] bg-white/10 w-24"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operatives.map((op, i) => (
              <motion.div
                layoutId={`op-${op.id}`}
                key={op.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  handleInteraction();
                  setSelectedOperative(op);
                }}
                className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Target size={16} className="text-gold" />
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-black border border-white/20 flex items-center justify-center text-white/50 mb-4 group-hover:border-gold group-hover:text-gold transition-colors">
                    {op.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight">{op.codename}</h3>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{op.role}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-600">
                  <span>STATUS:</span>
                  <span className="text-green-500">ONLINE</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 p-12 border border-white/10 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold uppercase mb-4">¿Quieres unirte al Lab?</h2>
            <p className="text-gray-400 font-mono text-sm">
              Siempre estamos buscando nuevos nodos con habilidades excepcionales en diseño, código o estrategia. Si crees que puedes aportar a la mutación, envía tu señal.
            </p>
          </div>
          <button className="px-12 py-4 bg-gold text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors">
            Enviar_Señal
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedOperative && (
          <OperativeModal 
            operative={selectedOperative} 
            onClose={() => setSelectedOperative(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
