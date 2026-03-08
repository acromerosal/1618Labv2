import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Hash, Activity, Send, ShieldCheck, Calendar, Lock, AlertTriangle, CheckCircle, Building, Target, DollarSign, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SoundService } from '../services/soundService';
import { HackerText } from '../components/effects/HackerText';
import { contactContent } from '../data/content';

const DecryptBrief = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [activeField, setActiveField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    missionType: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix Rain Effect
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

      ctx.fillStyle = '#0F0'; // Green text
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

  const handleFocus = (field: string) => {
    setActiveField(field);
    SoundService.init();
    SoundService.playClick();
  };

  const handleVerify = () => {
    if (isVerified) return;
    setIsVerifying(true);
    SoundService.init();
    SoundService.playGlitch();
    
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      SoundService.playClick();
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      SoundService.playGlitch();
      alert('ACCESS DENIED: HUMAN VERIFICATION REQUIRED');
      return;
    }
    
    setFormStatus('sending');
    SoundService.playClick();

    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
      SoundService.playClick();
      setFormData({ 
        name: '', 
        email: '', 
        company: '',
        missionType: '',
        budget: '',
        timeline: '',
        message: '' 
      });
      setIsVerified(false);
    }, 2000);
  };

  return (
    <section id="decrypt-brief-section" className="py-32 bg-black text-white min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Matrix Background */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-10 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Panel: Context & Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <h1 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-white tracking-tighter leading-tight">
                {contactContent.title}
              </h1>
              <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-md lg:max-w-none">
                <HackerText text={contactContent.intro} speed={10} />
              </p>
              <p className="font-mono text-[10px] text-gold/80 mt-4 border-l border-gold pl-4">
                {contactContent.note}
              </p>
            </div>

            <div className="border border-white/10 bg-black/50 backdrop-blur-sm p-6 rounded-lg space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-gray-500">STATUS</span>
                <span className="text-green-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  ONLINE
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-gray-500">ENCRYPTION</span>
                <span className="text-gold">AES-256</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-gray-500">LATENCY</span>
                <span className="text-white">12ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">LOCATION</span>
                <span className="text-white">SOACHA_COL</span>
              </div>
            </div>
          </div>

          {/* Right Panel: The Terminal Form */}
          <div className="lg:col-span-8">
            <div className="border border-white/20 bg-black/80 backdrop-blur-md p-8 md:p-12 relative overflow-hidden rounded-xl shadow-2xl">
               {/* Scanline Effect */}
               <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]"></div>
               
               {formStatus === 'success' ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col items-center justify-center h-full py-12 text-center space-y-6"
                 >
                   <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500">
                     <CheckCircle size={48} className="text-green-500" />
                   </div>
                   <h3 className="text-3xl font-bold uppercase text-white">Transmisión Recibida</h3>
                   <p className="text-gray-400 max-w-md">
                     El núcleo ha procesado tu señal. Si tu frecuencia resuena con nuestros objetivos, estableceremos un enlace directo en breve.
                   </p>
                   <button 
                     onClick={() => setFormStatus('idle')}
                     className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-widest transition-colors border border-white/10"
                   >
                     Reiniciar Enlace
                   </button>
                 </motion.div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-8 font-mono relative z-30">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2 group">
                       <label className={`text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeField === 'name' ? 'text-gold' : 'text-gray-500'}`}>
                         <Terminal size={12} /> {contactContent.fields[0]}
                       </label>
                       <div className="relative">
                         <input 
                           type="text" 
                           required
                           value={formData.name}
                           onFocus={() => handleFocus('name')}
                           onBlur={() => setActiveField(null)}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className="w-full bg-black/50 border border-white/10 focus:border-gold outline-none py-3 px-4 text-white transition-all rounded-sm focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                           placeholder="IDENTIFICACIÓN" 
                         />
                         <div className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${activeField === 'name' ? 'w-full' : 'w-0'}`}></div>
                       </div>
                     </div>

                     <div className="space-y-2 group">
                       <label className={`text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeField === 'email' ? 'text-gold' : 'text-gray-500'}`}>
                         <Hash size={12} /> {contactContent.fields[1]}
                       </label>
                       <div className="relative">
                         <input 
                           type="email" 
                           required
                           value={formData.email}
                           onFocus={() => handleFocus('email')}
                           onBlur={() => setActiveField(null)}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="w-full bg-black/50 border border-white/10 focus:border-gold outline-none py-3 px-4 text-white transition-all rounded-sm focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                           placeholder="CORREO@DOMINIO.COM" 
                         />
                         <div className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${activeField === 'email' ? 'w-full' : 'w-0'}`}></div>
                       </div>
                     </div>
                   </div>

                   <div className="space-y-2 group">
                     <label className={`text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeField === 'company' ? 'text-gold' : 'text-gray-500'}`}>
                       <Building size={12} /> {contactContent.fields[2]}
                     </label>
                     <div className="relative">
                       <input 
                         type="text" 
                         value={formData.company}
                         onFocus={() => handleFocus('company')}
                         onBlur={() => setActiveField(null)}
                         onChange={(e) => setFormData({...formData, company: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 focus:border-gold outline-none py-3 px-4 text-white transition-all rounded-sm focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                         placeholder="ORGANIZACIÓN / PROYECTO" 
                       />
                       <div className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${activeField === 'company' ? 'w-full' : 'w-0'}`}></div>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div className="space-y-2 group">
                       <label className={`text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeField === 'missionType' ? 'text-gold' : 'text-gray-500'}`}>
                         <Target size={12} /> {contactContent.fields[3]}
                       </label>
                       <div className="relative">
                         <select 
                           value={formData.missionType}
                           onFocus={() => handleFocus('missionType')}
                           onBlur={() => setActiveField(null)}
                           onChange={(e) => setFormData({...formData, missionType: e.target.value})}
                           className="w-full bg-black/50 border border-white/10 focus:border-gold outline-none py-3 px-4 text-white transition-all rounded-sm appearance-none"
                         >
                           <option value="" disabled>SELECCIONAR</option>
                           <option value="AUDIT">AUDITORÍA</option>
                           <option value="PROTOTYPE">PROTOTIPO</option>
                           <option value="SYSTEM">SISTEMA COMPLETO</option>
                           <option value="CONSULTING">CONSULTORÍA</option>
                         </select>
                         <div className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${activeField === 'missionType' ? 'w-full' : 'w-0'}`}></div>
                       </div>
                     </div>

                     <div className="space-y-2 group">
                       <label className={`text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeField === 'budget' ? 'text-gold' : 'text-gray-500'}`}>
                         <DollarSign size={12} /> {contactContent.fields[4]}
                       </label>
                       <div className="relative">
                         <select 
                           value={formData.budget}
                           onFocus={() => handleFocus('budget')}
                           onBlur={() => setActiveField(null)}
                           onChange={(e) => setFormData({...formData, budget: e.target.value})}
                           className="w-full bg-black/50 border border-white/10 focus:border-gold outline-none py-3 px-4 text-white transition-all rounded-sm appearance-none"
                         >
                           <option value="" disabled>RANGO</option>
                           <option value="SEED">SEED (&lt;5K)</option>
                           <option value="SERIES_A">SERIES A (5K-20K)</option>
                           <option value="ENTERPRISE">ENTERPRISE (&gt;20K)</option>
                         </select>
                         <div className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${activeField === 'budget' ? 'w-full' : 'w-0'}`}></div>
                       </div>
                     </div>

                     <div className="space-y-2 group">
                       <label className={`text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeField === 'timeline' ? 'text-gold' : 'text-gray-500'}`}>
                         <Clock size={12} /> {contactContent.fields[5]}
                       </label>
                       <div className="relative">
                         <select 
                           value={formData.timeline}
                           onFocus={() => handleFocus('timeline')}
                           onBlur={() => setActiveField(null)}
                           onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                           className="w-full bg-black/50 border border-white/10 focus:border-gold outline-none py-3 px-4 text-white transition-all rounded-sm appearance-none"
                         >
                           <option value="" disabled>TIEMPO</option>
                           <option value="ASAP">INMEDIATO</option>
                           <option value="Q3">Q3 2025</option>
                           <option value="Q4">Q4 2025</option>
                         </select>
                         <div className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${activeField === 'timeline' ? 'w-full' : 'w-0'}`}></div>
                       </div>
                     </div>
                   </div>
                   
                   <div className="space-y-2 group">
                     <label className={`text-xs uppercase tracking-widest flex items-center gap-2 transition-colors ${activeField === 'message' ? 'text-gold' : 'text-gray-500'}`}>
                       <Activity size={12} /> {contactContent.fields[6]}
                     </label>
                     <div className="relative">
                       <textarea 
                         rows={5} 
                         required
                         value={formData.message}
                         onFocus={() => handleFocus('message')}
                         onBlur={() => setActiveField(null)}
                         onChange={(e) => setFormData({...formData, message: e.target.value})}
                         className="w-full bg-black/50 border border-white/10 focus:border-gold outline-none py-3 px-4 text-white transition-all resize-none rounded-sm focus:shadow-[0_0_15px_rgba(212,175,55,0.1)]" 
                         placeholder="INICIE LA SECUENCIA DE DATOS..."
                       ></textarea>
                       <div className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-300 ${activeField === 'message' ? 'w-full' : 'w-0'}`}></div>
                     </div>
                   </div>

                   <div className="flex flex-col md:flex-row gap-6 items-center pt-4 border-t border-white/10">
                     {/* Verification Module */}
                     <div 
                       className={`flex-1 w-full p-4 border transition-all duration-300 flex items-center justify-between cursor-pointer rounded-sm group ${isVerified ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 bg-white/5 hover:border-gold/30'}`}
                       onClick={handleVerify}
                     >
                       <div className="flex items-center gap-3">
                         <div className="relative">
                           {isVerifying && (
                             <motion.div 
                               animate={{ rotate: 360 }}
                               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                               className="absolute inset-0 border-2 border-gold border-t-transparent rounded-full"
                             />
                           )}
                           <div className={`w-5 h-5 flex items-center justify-center rounded border ${isVerified ? 'border-green-500 bg-green-500 text-black' : 'border-white/30'}`}>
                             {isVerified && <CheckCircle size={14} />}
                           </div>
                         </div>
                         <div className="flex flex-col">
                           <span className={`text-[10px] uppercase tracking-widest font-bold ${isVerified ? 'text-green-500' : 'text-gray-400 group-hover:text-white'}`}>
                             {isVerifying ? 'VERIFICANDO...' : isVerified ? 'ACCESO AUTORIZADO' : 'VERIFICACIÓN DE SEGURIDAD'}
                           </span>
                           {!isVerified && !isVerifying && <span className="text-[9px] text-gray-600">CLICK PARA VALIDAR</span>}
                         </div>
                       </div>
                       <ShieldCheck size={16} className={isVerified ? 'text-green-500' : 'text-gray-600'} />
                     </div>

                     <div className="flex gap-4 w-full md:w-auto">
                       <a 
                         href="https://calendly.com" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="p-4 border border-white/10 text-white/40 hover:text-gold hover:border-gold transition-all flex items-center justify-center rounded-sm"
                         onClick={() => {
                           SoundService.init();
                           SoundService.playClick();
                         }}
                         title="Agendar Reunión Segura"
                       >
                         <Calendar size={20} />
                       </a>
                       <button 
                         type="submit"
                         disabled={formStatus === 'sending'}
                         className={`flex-1 md:flex-none px-8 py-4 font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 group rounded-sm ${isVerified ? 'bg-gold text-black hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'}`}
                       >
                         {formStatus === 'sending' ? (
                           <>ENVIANDO...</>
                         ) : (
                           <>
                             TRANSMITIR <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                           </>
                         )}
                       </button>
                     </div>
                   </div>
                 </form>
               )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DecryptBrief;
