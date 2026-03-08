import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SoundService } from '../../services/soundService';

// --- Reboot Overlay (Transition Effect) ---
export const RebootOverlay: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    if (isVisible) {
      const codeLines = [
        'INITIALIZING_KERNEL...',
        'LOADING_CORE_MODULES...',
        'ESTABLISHING_SECURE_LINK...',
        'BYPASSING_FIREWALL...',
        'DECRYPTING_DATA_STREAM...',
        'ACCESS_GRANTED_1618_LAB',
        'SYSTEM_REBOOT_COMPLETE'
      ];
      setLines(codeLines);
      SoundService.playGlitch();
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-gold p-8"
        >
          <div className="w-full max-w-md space-y-2">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-xs md:text-sm"
              >
                <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                {line}
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="absolute bottom-10 left-10 w-32 h-1 bg-gold/20 overflow-hidden"
          >
            <motion.div 
              className="h-full bg-gold"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
          <div className="scanlines pointer-events-none"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
