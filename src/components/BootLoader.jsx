import React, { useState, useEffect } from "react";
import { soundManager } from "../utils/soundManager";
import { Shield, Cpu, Terminal as TermIcon, Volume2, VolumeX } from "lucide-react";

const BootLoader = ({ onConnect }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const mockLogs = [
    { text: "INITIALIZING ELECTRONIC ARTS APPLICANT PROFILE...", delay: 200 },
    { text: "CORE SYSTEMS: ONLINE [V22.20.0]", delay: 500 },
    { text: "CALIBRATING 3D GRAPHICS PIPELINE... OK", delay: 900 },
    { text: "SYNTHESIZING PROCEDURAL AUDIO WAVEGUIDE... OK", delay: 1300 },
    { text: "PARALLAX CAMERA LINK ESTABLISHED... OK", delay: 1700 },
    { text: "LOADING SKILLS MATRIX...", delay: 2200 },
    { text: "PROJECT MODULES CALIBRATED...", delay: 2600 },
    { text: "TARGET IDENTIFIED: NAGULA CHETAN SAI [CS STUDENT & ASPIRING GAME DEVELOPER]", delay: 3000 },
    { text: "SYSTEM DIAGNOSTICS: 100% OPERATIONAL", delay: 3400 },
    { text: "READY FOR CONNECTION DIRECTIVE.", delay: 3600 },
  ];

  useEffect(() => {
    // Sound manager mute state local init
    setIsMuted(soundManager.isMuted);

    // Increment progress bar
    const duration = 3800; // 3.8 seconds boot
    const intervalTime = 40;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min(Math.round((step / steps) * 100), 100);
      setProgress(currentProgress);
      if (currentProgress === 100) {
        clearInterval(timer);
        setIsLoaded(true);
      }
    }, intervalTime);

    // Trigger diagnostics logs
    const logTimers = mockLogs.map((log) => {
      return setTimeout(() => {
        setLogs((prev) => [...prev, log.text]);
      }, log.delay);
    });

    return () => {
      clearInterval(timer);
      logTimers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleMuteToggle = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    soundManager.setMute(newState);
    if (!newState) {
      soundManager.playHover();
    }
  };

  const handleConnect = () => {
    soundManager.playBoot();
    onConnect();
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-cyber-dark z-50 flex flex-col justify-between p-6 sm:p-12 font-mono cyber-overlay overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Top Banner HUD */}
      <div className="flex justify-between items-center border-b border-cyber-cyan/20 pb-4 z-10">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-cyber-cyan animate-pulse" />
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-widest uppercase">
              EA Career Gate v1.4
            </h1>
            <p className="text-[10px] text-cyber-cyan opacity-80">
              SECURE DOSSIER TERMINAL
            </p>
          </div>
        </div>
        <button
          onClick={handleMuteToggle}
          onMouseEnter={() => soundManager.playHover()}
          className="flex items-center gap-2 border border-cyber-cyan/30 px-3 py-1.5 rounded-sm text-xs text-cyber-cyan hover:bg-cyber-cyan/10 hover:border-cyber-cyan transition-all"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>AUDIO: MUTED</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-cyber-cyan" />
              <span>AUDIO: ACTIVE</span>
            </>
          )}
        </button>
      </div>

      {/* Main Terminal Window */}
      <div className="flex-1 my-8 border border-cyber-cyan/15 bg-cyber-deep/80 clip-cyber p-6 flex flex-col justify-between z-10 shadow-2xl relative">
        {/* Laser scanner effect */}
        <div className="laser-line top-0 animate-scanline opacity-30" />

        {/* Text Diagnostics Logs */}
        <div className="flex-1 overflow-y-auto space-y-2 text-xs sm:text-sm text-slate-300 max-h-[50vh] pr-2">
          <div className="text-cyber-cyan text-sm mb-3 border-b border-cyber-cyan/10 pb-1 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> SYSTEM DIAGNOSTICS & TELEMETRY
          </div>
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-cyber-cyan select-none">&gt;&gt;</span>
              <span className={index === logs.length - 1 ? "animate-pulse text-white" : ""}>
                {log}
              </span>
            </div>
          ))}
          {progress < 100 && (
            <div className="flex items-center gap-1.5 text-cyber-cyan animate-pulse">
              <span>&gt;&gt;</span>
              <span className="w-2 h-4 bg-cyber-cyan inline-block animate-ping" />
            </div>
          )}
        </div>

        {/* Bottom Loading Progress Indicator */}
        <div className="mt-6 border-t border-cyber-cyan/15 pt-6 flex flex-col gap-2">
          <div className="flex justify-between text-xs text-cyber-cyan tracking-wider">
            <span>CALIBRATING HOLOGRAPHIC ENGINES</span>
            <span>{progress}% Loaded</span>
          </div>
          <div className="h-2 bg-cyber-accent rounded-full overflow-hidden border border-cyber-cyan/10 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full transition-all duration-75 shadow-[0_0_10px_#00f0ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Connecting Button Area */}
      <div className="flex flex-col items-center justify-center min-h-[100px] z-10">
        {isLoaded ? (
          <button
            onClick={handleConnect}
            onMouseEnter={() => soundManager.playHover()}
            className="group px-10 py-4 border border-cyber-cyan text-cyber-cyan font-bold tracking-widest text-base sm:text-lg hover:text-cyber-dark bg-transparent hover:bg-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_#00f0ff] clip-cyber transition-all duration-300 transform active:scale-95 cursor-pointer relative overflow-hidden"
          >
            {/* Corner highlights */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyber-cyan group-hover:border-cyber-dark" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyber-cyan group-hover:border-cyber-dark" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyber-cyan group-hover:border-cyber-dark" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyber-cyan group-hover:border-cyber-dark" />
            
            <div className="flex items-center gap-3">
              <TermIcon className="w-5 h-5 animate-pulse" />
              <span className="glitch-text uppercase tracking-widest" data-text="Connect to System">
                CONNECT TO SYSTEM
              </span>
            </div>
          </button>
        ) : (
          <div className="text-xs text-cyber-dim tracking-widest animate-pulse uppercase">
            WAITING FOR DIAGNOSTICS COMPLETION...
          </div>
        )}
      </div>

      {/* Bottom Footer Telemetry */}
      <div className="flex justify-between items-center text-[10px] text-cyber-dim border-t border-cyber-cyan/10 pt-4 mt-6 z-10">
        <span>LOC: C:\Users\Chetan</span>
        <span>IP: 127.0.0.1</span>
        <span>SECURE HANDSHAKE: IN PROGRESS</span>
      </div>
    </div>
  );
};

export default BootLoader;
