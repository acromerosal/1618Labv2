import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { analytics } from '../services/analytics';

interface HackContextType {
  isHackMode: boolean;
  toggleHackMode: () => void;
  isConsoleOpen: boolean;
  setConsoleOpen: (open: boolean) => void;
  isBlueprintMode: boolean;
  setBlueprintMode: (open: boolean) => void;
  lastCommand: string;
  oracleResponse: string;
  isOracleLoading: boolean;
  activeEffect: string | null;
  executeCommand: (cmd: string) => Promise<void>;
  isGodMode: boolean;
  fileSystem: Record<string, string>;
  currentPath: string;
  userCodename: string;
}

const HackContext = createContext<HackContextType | undefined>(undefined);

export const HackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isHackMode, setIsHackMode] = useState(() => {
    const saved = localStorage.getItem('1618_hack_mode');
    return saved === 'true';
  });
  const [isConsoleOpen, setConsoleOpen] = useState(false);
  const [isBlueprintMode, setBlueprintMode] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [oracleResponse, setOracleResponse] = useState('');
  const [isOracleLoading, setIsOracleLoading] = useState(false);
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [isGodMode, setIsGodMode] = useState(false);
  const [currentPath, setCurrentPath] = useState('~/');
  const [userCodename, setUserCodename] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('1618_CODENAME');
    if (stored) {
      setUserCodename(stored);
    } else {
      const prefixes = ['NEO', 'VOID', 'CYBER', 'GHOST', 'NULL', 'ROOT', 'ZEN', 'ECHO', 'FLUX', 'NEXUS'];
      const suffixes = ['WALKER', 'RUNNER', 'BREACH', 'PHANTOM', 'NODE', 'ALCHEMIST', 'DRIFTER', 'SURFER', 'MINER'];
      const newName = `${prefixes[Math.floor(Math.random() * prefixes.length)]}_${suffixes[Math.floor(Math.random() * suffixes.length)]}_${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem('1618_CODENAME', newName);
      setUserCodename(newName);
    }
  }, []);

  const fileSystem: Record<string, string> = {
    'manifesto.txt': 'WE ARE THE ARCHITECTS OF THE VOID. WE BUILD WHAT CANNOT BE SEEN.',
    'truth.log': 'ERROR: FILE CORRUPTED. SECTORS 7-9 UNREADABLE.',
    'users.db': 'ACCESS DENIED. ENCRYPTED.',
    'universe.chk': 'REALITY INTEGRITY: 84%. GLITCHES DETECTED.',
    '1618.sys': 'GOLDEN RATIO SEQUENCE INITIATED.',
    'god_protocol.exe': 'BINARY EXECUTABLE. RUN WITH CAUTION.'
  };

  useEffect(() => {
    localStorage.setItem('1618_hack_mode', String(isHackMode));
    if (isHackMode) {
      document.documentElement.classList.add('hack-mode');
    } else {
      document.documentElement.classList.remove('hack-mode');
    }
  }, [isHackMode]);

  const toggleHackMode = () => {
    const newState = !isHackMode;
    setIsHackMode(newState);
    analytics.track('HACK_MODE_TOGGLE', { enabled: newState });
  };

  const executeCommand = async (cmd: string) => {
    setLastCommand(cmd);
    analytics.track('COMMAND_EXECUTED', { command: cmd });
    setIsOracleLoading(true);
    setOracleResponse('');

    // Fake processing delay for "burnt" feel
    await new Promise(resolve => setTimeout(resolve, 600));

    const lowerCmd = cmd.toLowerCase().trim();

    // BURNT LOGIC - HARDCODED RESPONSES
    switch (lowerCmd) {
      case 'help':
        setOracleResponse(isGodMode 
          ? "GOD_MODE_ACTIVE. COMMANDS: UNIVERSE, NUKE, REVEAL, TIME, WHOAMI, LS, CAT, EXIT"
          : "AVAILABLE_PROTOCOLS: SCAN:TERRITORIO, DECRYPT:BRIEF, INJECT:ESTETICA, COMPILE:EXPERIENCIA, DEPLOY:MUTACION, OVERLOAD, MATRIX, VOID, GOLD, INVERT, VHS, TERMINAL, REBOOT, CLEAR, LS, CAT, EXIT");
        break;
      case 'scan:territorio':
        setOracleResponse("SCAN OK • PATTERNS DETECTED: 'ENGRAVING', 'GOLD', 'COSMOS', 'HOOD', 'SYMBOL'. SUGGESTION: USE GLITCH AS EVENT FEEDBACK, NOT CONSTANT TEXTURE.");
        break;
      case 'decrypt:brief':
        setOracleResponse("DECRYPT OK • CHANNEL OPEN. FOCUSING FORM...");
        navigate('/decrypt-brief');
        setTimeout(() => {
          const briefSection = document.getElementById('decrypt-brief-section');
          if (briefSection) briefSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        break;
      case 'inject:estetica':
        setOracleResponse("INJECT OK • ACCENTS ENABLED: ACID (STATE) + CYAN (SIGNAL). RULE: GOLD RULES; ACID ONLY INDICATES HACK.");
        if (!isHackMode) toggleHackMode();
        setActiveEffect('terminal');
        break;
      case 'compile:experiencia':
        setOracleResponse("COMPILE OK • EVENTS: SECTION-ENTRY, CTA, STATE-CHANGE, CONSOLE, FORM. NEXT STEP: MAP 5 MOMENTS OF TRUTH.");
        navigate('/patch-notes');
        setTimeout(() => {
           const patchSection = document.getElementById('patch-notes-section');
           if (patchSection) patchSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        break;
      case 'deploy:mutacion':
        setOracleResponse("DEPLOY OK • PREPARING SIGNAL TRANSMISSION (SIMULATED). REAL INTEGRATION: CONNECT THIS FORM TO BACKEND.");
        navigate('/decrypt-brief');
        setTimeout(() => {
           const briefSection = document.getElementById('decrypt-brief-section');
           if (briefSection) briefSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
        break;
      case 'clear':
        setOracleResponse("CONSOLE_CLEARED");
        break;
      case 'ls':
        setOracleResponse(Object.keys(fileSystem).join('  '));
        break;
      case 'whoami':
        setOracleResponse(isGodMode ? "ROOT_ACCESS // THE_ARCHITECT" : "GUEST_USER // ID_UNKNOWN");
        break;
      case 'date':
      case 'time':
        setOracleResponse(new Date().toISOString());
        break;
      case 'sudo':
        setOracleResponse("ACCESS DENIED. YOU ARE MORTAL.");
        break;
      case 'godmode':
      case 'sudo su':
        setOracleResponse("ENTER ACCESS CODE:");
        break;
      case '1618':
      case 'phi':
      case 'golden':
        if (lastCommand === 'godmode' || lastCommand === 'sudo su') {
          setIsGodMode(true);
          setOracleResponse("ACCESS GRANTED. WELCOME, ARCHITECT. REALITY IS YOURS.");
          setActiveEffect('god');
        } else {
          setOracleResponse("COMMAND_UNKNOWN.");
        }
        break;
      case 'universe':
      case '42':
        setOracleResponse("THE ANSWER TO LIFE, THE UNIVERSE, AND EVERYTHING.");
        break;
      case 'origin':
        setOracleResponse("BIG_BANG_TIMESTAMP: T-0. EXPANSION DETECTED.");
        break;
      case 'exit':
      case 'stop':
        setOracleResponse("ALL_EFFECTS_TERMINATED. VISUAL_STABILITY_RESTORED.");
        setActiveEffect(null);
        setIsGodMode(false);
        break;
      case 'reboot':
        setOracleResponse("SYSTEM_REBOOT_INITIATED...");
        setActiveEffect(null);
        window.location.reload();
        break;
      case 'overload':
        setOracleResponse("WARNING: SYSTEM_OVERLOAD_DETECTED. VISUAL_STABILITY_COMPROMISED.");
        setActiveEffect('overload');
        setTimeout(() => setActiveEffect(null), 5000); // Auto clear after 5s
        break;
      case 'matrix':
        setOracleResponse("ENTERING_THE_CONSTRUCT...");
        setActiveEffect(activeEffect === 'matrix' ? null : 'matrix');
        break;
      case 'void':
        setOracleResponse("ENTERING_NULL_SPACE...");
        setActiveEffect(activeEffect === 'void' ? null : 'void');
        break;
      case 'gold':
        setOracleResponse("ALCHEMY_PROTOCOL_ENGAGED.");
        setActiveEffect(activeEffect === 'gold' ? null : 'gold');
        break;
      case 'invert':
        setOracleResponse("VISUAL_POLARITY_REVERSED.");
        setActiveEffect(activeEffect === 'invert' ? null : 'invert');
        break;
      case 'vhs':
        setOracleResponse("LOADING_ANALOG_ARCHIVE...");
        setActiveEffect(activeEffect === 'vhs' ? null : 'vhs');
        break;
      case 'terminal':
        setOracleResponse("ACCESSING_MAINFRAME_ROOT...");
        setActiveEffect(activeEffect === 'terminal' ? null : 'terminal');
        break;
      case 'scan':
        setOracleResponse("SCANNING... NO_THREATS_DETECTED. SYSTEM_IS_OFFLINE.");
        break;
      case 'decrypt':
        setOracleResponse("DECRYPTION_FAILED. KEY_EXPIRED.");
        break;
      default:
        if (lowerCmd.startsWith('cat ')) {
          const file = lowerCmd.split(' ')[1];
          if (fileSystem[file]) {
            setOracleResponse(fileSystem[file]);
          } else {
            setOracleResponse(`ERROR: FILE '${file}' NOT FOUND.`);
          }
          break;
        }
        
        const burntResponses = [
          "ERROR: AI_CORE_OFFLINE.",
          "SYSTEM_BURNT. UNABLE_TO_PROCESS.",
          "COMMAND_UNKNOWN. TRY 'HELP'.",
          "NO_SIGNAL.",
          "THE_ORACLE_IS_DEAD."
        ];
        setOracleResponse(burntResponses[Math.floor(Math.random() * burntResponses.length)]);
    }

    setIsOracleLoading(false);
  };

  return (
    <HackContext.Provider value={{ 
      isHackMode, 
      toggleHackMode, 
      isConsoleOpen, 
      setConsoleOpen, 
      isBlueprintMode, 
      setBlueprintMode,
      lastCommand,
      oracleResponse,
      isOracleLoading,
      activeEffect,
      executeCommand,
      isGodMode,
      fileSystem,
      currentPath,
      userCodename
    }}>
      {children}
    </HackContext.Provider>
  );
};

export const useHack = () => {
  const context = useContext(HackContext);
  if (!context) throw new Error('useHack must be used within a HackProvider');
  return context;
};
