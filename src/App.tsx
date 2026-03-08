import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'motion/react';
import { NoiseOverlay } from './components/effects/NoiseOverlay';
import { CustomCursor } from './components/effects/CustomCursor';
import { Background3D } from './components/effects/Background3D';
import { RebootOverlay } from './components/effects/RebootOverlay';
import { ChromaticAberration } from './components/effects/ChromaticAberration';
import { ActiveEffects } from './components/effects/ActiveEffects';
import { BlueprintOverlay } from './components/effects/BlueprintOverlay';
import { SoundService } from './services/soundService';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// Prefetch functions for strategic loading
const prefetchHome = () => import('./pages/Home');
const prefetchPayloads = () => import('./pages/Payloads');
const prefetchPatchNotes = () => import('./pages/PatchNotes');
const prefetchLab = () => import('./pages/Lab');
const prefetchDecryptBrief = () => import('./pages/DecryptBrief');
const prefetchArtifacts = () => import('./pages/Artifacts');
const prefetchMethod = () => import('./pages/Method');
const prefetchManifesto = () => import('./pages/Manifesto');
const prefetchAbout = () => import('./pages/About');

// Lazy Loaded Pages
const Home = lazy(prefetchHome);
const Payloads = lazy(prefetchPayloads);
const PatchNotes = lazy(prefetchPatchNotes);
const Lab = lazy(prefetchLab);
const DecryptBrief = lazy(prefetchDecryptBrief);
const Artifacts = lazy(prefetchArtifacts);
const Method = lazy(prefetchMethod);
const Manifesto = lazy(prefetchManifesto);
const About = lazy(prefetchAbout);

import { HackProvider, useHack } from './context/HackContext';
import RitualConsole from './components/RitualConsole';
import SEO from './components/SEO';

// --- Components ---

import { analytics } from './services/analytics';

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark text-gold font-mono">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="animate-spin" size={32} />
      <span className="text-xs tracking-[0.3em] animate-pulse">LOADING_MODULE...</span>
    </div>
  </div>
);

const UserIntelModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { userCodename } = useHack();
  const [intel, setIntel] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const connection = (navigator as any).connection || { effectiveType: 'UNKNOWN', rtt: 0 };
      
      // Simulate scanning delay
      const timer = setTimeout(() => {
        setIntel({
          ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          location: Intl.DateTimeFormat().resolvedOptions().timeZone.split('/')[1]?.replace('_', ' ') || 'UNKNOWN_SECTOR',
          platform: navigator.platform,
          cores: navigator.hardwareConcurrency || 4,
          connection: connection.effectiveType || 'SECURE',
          rtt: (connection.rtt || Math.floor(Math.random() * 50) + 10) + 'ms',
          screen: `${window.screen.width}x${window.screen.height}`,
          gpu: 'RENDER_ENGINE_V8',
          memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory}GB` : 'ALLOCATED',
          session: Math.random().toString(36).substring(7).toUpperCase()
        });
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3, type: "spring" }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 bg-black/90 backdrop-blur-md"
             onClick={onClose}
           />
           <motion.div
             initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
             exit={{ scale: 0.9, opacity: 0, y: 20 }}
             className="bg-black border border-gold/30 p-0 max-w-lg w-full relative shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden rounded-sm"
           >
             {/* Scanning Effect */}
             {loading && (
               <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/90">
                 <div className="flex flex-col items-center gap-4">
                   <div className="w-16 h-16 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
                   <p className="font-mono text-gold text-xs animate-pulse">ESTABLISHING_NEURAL_LINK...</p>
                 </div>
               </div>
             )}

             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"></div>
             <div className="absolute bottom-0 right-0 p-8 opacity-5 pointer-events-none">
                <Terminal size={200} strokeWidth={0.5} />
             </div>

             <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="font-mono text-[10px] text-gold tracking-widest">CLASSIFIED_INTEL</span>
                </div>
                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                   <X size={16} />
                </button>
             </div>
             
             <div className="p-8 relative z-10">
                <div className="flex items-start gap-6 mb-8">
                    <div className="w-20 h-20 border border-gold/30 flex items-center justify-center bg-gold/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <span className="font-mono text-3xl text-gold relative z-10">ID</span>
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gold"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gold"></div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-2xl tracking-tighter uppercase mb-1">Subject_Identified</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-1.5 py-0.5 bg-gold/20 text-gold text-[10px] font-mono rounded">LVL_5_ACCESS</span>
                            <span className="px-1.5 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-mono rounded">AUTHORIZED</span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-mono tracking-widest leading-relaxed">
                            IDENTITY_VERIFIED_VIA_NEURAL_HANDSHAKE.
                            <br/>SESSION_TOKEN: {intel?.session || 'PENDING...'}
                        </p>
                    </div>
                </div>

                {!loading && (
                  <div className="space-y-6 font-mono text-xs">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {[
                            { label: 'ASSIGNED_CODENAME', value: userCodename, color: 'text-gold' },
                            { label: 'GEOLOCATION_SECTOR', value: intel?.location, color: 'text-white' },
                            { label: 'IP_ADDRESS_MASK', value: intel?.ip, color: 'text-gray-400' },
                            { label: 'CONNECTION_TYPE', value: `${intel?.connection} [${intel?.rtt}]`, color: 'text-green-400' },
                            { label: 'SYSTEM_ARCH', value: `${intel?.platform} / ${intel?.cores} CORES`, color: 'text-white' },
                            { label: 'DISPLAY_MATRIX', value: intel?.screen, color: 'text-gray-400' },
                            { label: 'MEMORY_ALLOC', value: intel?.memory, color: 'text-white' },
                            { label: 'GPU_UNIT', value: intel?.gpu, color: 'text-gray-400' }
                          ].map((item, i) => (
                            <motion.div 
                              key={item.label}
                              custom={i}
                              variants={itemVariants}
                              initial="hidden"
                              animate="visible"
                              className="relative"
                            >
                                <span className="block text-gray-600 text-[9px] uppercase tracking-[0.2em] mb-1">{item.label}</span>
                                <span className={`text-sm tracking-wider ${item.color} border-b border-dashed border-white/10 pb-1 block`}>
                                  {item.value}
                                </span>
                            </motion.div>
                          ))}
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 p-4 bg-green-500/5 border border-green-500/20 rounded relative overflow-hidden"
                      >
                          <div className="absolute top-0 left-0 w-1 h-full bg-green-500/50"></div>
                          <p className="text-green-400/80 italic leading-relaxed text-[10px]">
                              "Surveillance systems bypassed. Your digital presence is currently masked within the 1618 LAB network. Proceed with operations."
                          </p>
                      </motion.div>
                  </div>
                )}
             </div>
           </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

import { Menu, X, Terminal, Eye, EyeOff } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { isHackMode, toggleHackMode, setConsoleOpen, setBlueprintMode } = useHack();
  const holdTimer = React.useRef<NodeJS.Timeout | null>(null);
  
  const navItems = [
    { name: 'INICIO', path: '/', prefetch: prefetchHome },
    { name: 'SYSTEMS', path: '/payloads', prefetch: prefetchPayloads },
    { name: 'METHOD', path: '/method', prefetch: prefetchMethod },
    { name: 'ABOUT', path: '/about', prefetch: prefetchAbout },
    { name: 'LAB', path: '/lab', prefetch: prefetchLab },
    { name: 'CONTACT', path: '/contact', prefetch: prefetchDecryptBrief }
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    SoundService.playClick();
    setIsOpen(false);
  };

  const handleLogoMouseDown = () => {
    holdTimer.current = setTimeout(() => {
      setBlueprintMode(true);
      analytics.track('BLUEPRINT_OPEN');
      SoundService.playGlitch();
    }, 2000);
  };

  const handleLogoMouseUp = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 px-6 md:px-8 flex justify-between items-center transition-all duration-500 ${scrolled ? 'py-4 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-lg text-white' : 'py-6 mix-blend-difference text-white'}`}
        onMouseEnter={() => SoundService.init()}
      >
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tighter cursor-pointer block"
          onClick={handleNavClick}
          onMouseDown={handleLogoMouseDown}
          onMouseUp={handleLogoMouseUp}
          onMouseLeave={handleLogoMouseUp}
        >
          <span className={isHackMode ? 'text-cyan-400' : 'text-gold'}>1618</span> LAB
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 font-mono text-xs tracking-widest">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={handleNavClick}
              onMouseEnter={() => item.prefetch && item.prefetch()}
              className={`hover:text-gold transition-colors relative group ${location.pathname === item.path ? 'text-gold' : ''}`}
            >
              {item.name}
              <span className={`absolute -bottom-2 left-0 h-[1px] bg-gold transition-all duration-300 ${location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile Hack Toggle */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              SoundService.init();
              toggleHackMode();
              SoundService.playGlitch();
            }}
            className={`md:hidden flex items-center justify-center p-2 transition-colors ${isHackMode ? 'text-cyan-400' : 'text-white/40'}`}
            aria-label="Toggle Hack Mode"
          >
            {isHackMode ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>

          {/* Mobile Console Toggle */}
          <button 
            onClick={() => {
              SoundService.init();
              setConsoleOpen(true);
              analytics.track('CONSOLE_OPEN');
            }}
            className="md:hidden flex items-center justify-center p-2 text-white/40"
            aria-label="Open Console"
          >
            <Terminal size={20} />
          </button>

          <button 
            onClick={() => {
              toggleHackMode();
              SoundService.playGlitch();
            }}
            className={`hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest transition-colors ${isHackMode ? 'text-cyan-400' : 'text-white/40 hover:text-gold'}`}
          >
            {isHackMode ? <Eye size={14} /> : <EyeOff size={14} />}
            HACK_MODE
          </button>

          <button 
            onClick={() => {
              setConsoleOpen(true);
              analytics.track('CONSOLE_OPEN');
            }}
            className="hidden md:flex items-center gap-2 text-white/40 hover:text-gold transition-colors"
          >
            <Terminal size={16} />
          </button>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white hover:text-gold transition-colors z-50"
            onClick={() => {
              setIsOpen(!isOpen);
              SoundService.playClick();
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link 
                  to={item.path} 
                  onClick={() => setIsOpen(false)}
                  onMouseEnter={() => item.prefetch && item.prefetch()}
                  className={`text-3xl font-bold tracking-tighter hover:text-gold transition-colors ${location.pathname === item.path ? 'text-gold' : 'text-white'}`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <div className="mt-8 flex flex-col items-center gap-6">
              <button 
                onClick={() => {
                  toggleHackMode();
                  SoundService.playGlitch();
                }}
                className={`flex items-center gap-3 font-mono text-sm tracking-widest transition-colors ${isHackMode ? 'text-cyan-400' : 'text-white/60 hover:text-gold'}`}
              >
                {isHackMode ? <Eye size={18} /> : <EyeOff size={18} />}
                HACK_MODE
              </button>

              <button 
                onClick={() => {
                  setConsoleOpen(true);
                  setIsOpen(false);
                  analytics.track('CONSOLE_OPEN');
                }}
                className="flex items-center gap-3 font-mono text-sm tracking-widest text-white/60 hover:text-gold transition-colors"
              >
                <Terminal size={18} />
                CONSOLE_ROOT
              </button>
            </div>

            <div className="mt-8 flex gap-8">
              {['IG', 'TW', 'LI'].map(social => (
                <span key={social} className="text-gold font-mono text-sm tracking-widest cursor-pointer hover:text-white transition-colors">
                  {social}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = ({ onOpenIntel }: { onOpenIntel: () => void }) => {
  const { isHackMode, userCodename } = useHack();
  
  return (
    <footer className={`py-24 px-8 border-t transition-colors duration-500 ${isHackMode ? 'bg-black border-cyan-900/50 text-cyan-400' : 'bg-gold border-black text-black'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h2 className="text-7xl font-bold tracking-tighter mb-8">1618 LAB</h2>
            <p className="font-mono text-sm max-w-md leading-relaxed opacity-80">
              ESTUDIO CREATIVO Y LABORATORIO DE DISEÑO DIGITAL. 
              TRANSFORMAMOS LA COMPLEJIDAD EN BELLEZA TÁCTICA. 
              OPERANDO DESDE EL SUR GLOBAL HACIA EL INFINITO.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold uppercase mb-6 tracking-widest text-xs opacity-50">Navegación</h3>
            <ul className="space-y-4 font-mono text-xs uppercase tracking-widest">
              <li><Link to="/" className="hover:opacity-50 transition-opacity">Inicio</Link></li>
              <li><Link to="/payloads" className="hover:opacity-50 transition-opacity">Systems</Link></li>
              <li><Link to="/method" className="hover:opacity-50 transition-opacity">Method</Link></li>
              <li><Link to="/about" className="hover:opacity-50 transition-opacity">About</Link></li>
              <li><Link to="/manifesto" className="hover:opacity-50 transition-opacity">Manifesto</Link></li>
              <li><Link to="/patch-notes" className="hover:opacity-50 transition-opacity">Case Abstracts</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase mb-6 tracking-widest text-xs opacity-50">Contacto</h3>
            <ul className="space-y-4 font-mono text-xs uppercase tracking-widest">
              <li><Link to="/contact" className="hover:opacity-50 transition-opacity">Decrypt Brief</Link></li>
              <li><a href="mailto:hello@1618lab.com" className="hover:opacity-50 transition-opacity">hello@1618lab.com</a></li>
              <li className="opacity-50">Soacha, Colombia, Sudamérica</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-current/20">
          <div className="flex gap-6">
            {['INSTAGRAM', 'BEHANCE', 'LINKEDIN', 'TWITTER'].map(social => (
              <a key={social} href="#" className="font-mono text-[10px] tracking-[0.2em] hover:opacity-50 transition-opacity">
                {social}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 font-mono text-[10px] opacity-40">
            <span>© 2026 1618 LAB</span>
            <span className="hidden md:block">|</span>
            <button 
                onClick={onOpenIntel}
                className="hidden md:flex items-center gap-2 hover:text-white hover:opacity-100 transition-all cursor-pointer group"
            >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>ID: {userCodename || 'GUEST'}</span>
            </button>
            <span className="hidden md:block">|</span>
            <span>ALL_SYSTEMS_OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export function App() {
  const location = useLocation();
  const [isRebooting, setIsRebooting] = React.useState(false);

  useEffect(() => {
    setIsRebooting(true);
    const timer = setTimeout(() => setIsRebooting(false), 1200);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <HackProvider>
      <AppContent isRebooting={isRebooting} location={location} />
    </HackProvider>
  );
}

const AppContent = ({ isRebooting, location }: { isRebooting: boolean, location: any }) => {
  const { isHackMode, isBlueprintMode, setBlueprintMode } = useHack();
  const [isModeSwitching, setModeSwitching] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);
  const [isIntelOpen, setIntelOpen] = React.useState(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
    
    if (isHackMode !== undefined) {
      setModeSwitching(true);
      const timer = setTimeout(() => setModeSwitching(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isHackMode]);

  return (
    <LazyMotion features={domAnimation}>
      <div className={`bg-dark min-h-screen text-white selection:bg-gold selection:text-black transition-colors duration-1000 ${isHackMode ? 'hack-theme' : ''} ${isTouchDevice ? '' : 'cursor-none'}`}>
        <SEO />
        <ScrollToTop />
        <div className="scanlines"></div>
        <NoiseOverlay />
        <ChromaticAberration />
        <ActiveEffects />
        <BlueprintOverlay />
        <Background3D />
        <RebootOverlay isVisible={isRebooting} />
        
        {/* Mode Switch Glitch Flash */}
        <AnimatePresence>
          {isModeSwitching && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-cyan-500 mix-blend-overlay pointer-events-none"
            >
              <div className="absolute inset-0 bg-cyan-500/50 mix-blend-hard-light animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        <CustomCursor />
        <UserIntelModal isOpen={isIntelOpen} onClose={() => setIntelOpen(false)} />
        <Navbar />
        <RitualConsole />
        
        <main>
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <div key={location.pathname}>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes location={location}>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/payloads" element={<PageWrapper><Payloads /></PageWrapper>} />
                    <Route path="/artifacts" element={<PageWrapper><Artifacts /></PageWrapper>} />
                    <Route path="/patch-notes" element={<PageWrapper><PatchNotes /></PageWrapper>} />
                    <Route path="/lab" element={<PageWrapper><Lab /></PageWrapper>} />
                    <Route path="/method" element={<PageWrapper><Method /></PageWrapper>} />
                    <Route path="/manifesto" element={<PageWrapper><Manifesto /></PageWrapper>} />
                    <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><DecryptBrief /></PageWrapper>} />
                  </Routes>
                </Suspense>
              </div>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
        <Footer onOpenIntel={() => setIntelOpen(true)} />
      </div>
    </LazyMotion>
  );
};

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
