import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-red-500 font-mono flex flex-col items-center justify-center p-8 text-center selection:bg-red-500 selection:text-black">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse"></div>
            <AlertTriangle size={64} className="relative z-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter glitch-text">SYSTEM_FAILURE</h1>
          <div className="h-px w-24 bg-red-500/50 my-6"></div>
          <p className="text-xs md:text-sm opacity-70 max-w-md mb-8 uppercase tracking-widest leading-relaxed">
            CRITICAL_ERROR_DETECTED: {this.state.error?.message || 'UNKNOWN_ANOMALY'}
            <br/>
            NEURAL_LINK_SEVERED.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="group relative px-8 py-3 bg-red-500/10 border border-red-500/50 hover:bg-red-500 hover:text-black transition-all duration-300"
          >
            <span className="font-mono text-xs font-bold tracking-[0.2em]">FORCE_REBOOT</span>
            <div className="absolute inset-0 bg-red-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
