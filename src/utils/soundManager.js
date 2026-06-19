// Procedural Sci-Fi Sound Synthesizer using Web Audio API
class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('portfolio-muted') === 'true';
    this.globalVolume = 0.15; // Set to moderate level so it's not piercing
  }

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  setMute(mute) {
    this.isMuted = mute;
    localStorage.setItem('portfolio-muted', mute ? 'true' : 'false');
  }

  playHover() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    
    // Ensure audio context is running (resume if suspended by browser autoplay policy)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    // Fast laser sweep upward
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1500, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(this.globalVolume * 0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playClick() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // High tech double pulse
    const now = this.ctx.currentTime;
    
    const playPulse = (time, freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);
      
      gain.gain.setValueAtTime(this.globalVolume * 0.5, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(time);
      osc.stop(time + 0.04);
    };

    playPulse(now, 1000);
    playPulse(now + 0.04, 1600);
  }

  playBoot() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    const duration = 1.2;
    const frequencies = [220, 330, 440, 660]; // Sci-Fi synth chord

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Distribute wave types for a rich harmonic texture
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      
      // Sweep pitch upwards slightly
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);
      
      // Dynamic volume envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(this.globalVolume * 0.4, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      // Filter out high harshes
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(2000, now + duration);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + duration);
    });
  }

  playDenied() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(this.globalVolume * 0.8, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
}

export const soundManager = new SoundManager();
