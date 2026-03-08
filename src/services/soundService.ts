// --- Sound Service (Web Audio API) ---
export const SoundService = {
  ctx: null as AudioContext | null,
  
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  },

  playBeep(freq = 440, type: OscillatorType = 'square', duration = 0.1, volume = 0.05) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  },

  playGlitch() {
    this.playBeep(Math.random() * 1000 + 200, 'sawtooth', 0.05, 0.02);
    setTimeout(() => this.playBeep(Math.random() * 500 + 100, 'square', 0.03, 0.01), 50);
  },

  playClick() {
    this.playBeep(800, 'sine', 0.02, 0.05);
  }
};
