import React, { useState, useEffect } from "react";
import { soundManager } from "../utils/soundManager";
import { Play, Download, MessageSquare, Crosshair, Terminal as TermIcon, Shield, Radio } from "lucide-react";

const HeroHUD = () => {
  const [subIdx, setSubIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const subtitles = [
    "ASPIRING GAME DEVELOPER",
    "SOFTWARE ENGINEER",
    "INTERACTIVE SYSTEMS ENGINEER"
  ];

  // Subtitle Typewriter
  useEffect(() => {
    let currentText = subtitles[subIdx];
    let charIdx = 0;
    let isDeleting = false;
    let timer;

    const tick = () => {
      if (!isDeleting) {
        setTypedText(currentText.substring(0, charIdx + 1));
        charIdx++;
        if (charIdx === currentText.length) {
          isDeleting = true;
          timer = setTimeout(tick, 2200); // pause on complete word
        } else {
          timer = setTimeout(tick, 50);
        }
      } else {
        setTypedText(currentText.substring(0, charIdx - 1));
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          setSubIdx((prev) => (prev + 1) % subtitles.length);
          timer = setTimeout(tick, 400); // pause before next
        } else {
          timer = setTimeout(tick, 25);
        }
      }
    };

    tick();
    return () => clearTimeout(timer);
  }, [subIdx]);

  const handleActionClick = (targetId) => {
    soundManager.playClick();
    if (targetId === "resume") {
      alert("Initializing secure download link for: Nagula_Chetan_Sai_Resume.pdf...");
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 font-mono select-none"
    >
      {/* Decorative Grid telemetry coords */}
      <div className="absolute top-24 left-4 text-[9px] text-cyber-cyan/35 hidden xl:block">
        <div>CORE_RENDER: ACTIVE</div>
        <div>SYS_GRID: [COORD_7A]</div>
      </div>

      <div className="absolute top-24 right-4 text-[9px] text-cyber-cyan/35 text-right hidden xl:block">
        <div>DIRECTIVE: EA_INTERVIEW</div>
        <div>TELEMETRY: OPTIMAL</div>
      </div>

      {/* Hero Layout: Three columns */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 py-10">
        
        {/* LEFT COLUMN: Hologram Telemetry alignment bounds */}
        <div className="hidden md:flex md:col-span-3 flex-col justify-center space-y-4 p-5 border border-cyber-cyan/10 bg-cyber-card/65 rounded-sm clip-cyber-sm min-h-[260px] shadow-lg">
          <div className="flex items-center gap-2 text-[10px] text-cyber-cyan font-bold tracking-widest uppercase">
            <Radio className="w-4 h-4 text-cyber-cyan animate-pulse" />
            <span>HOLOGRAM PROJECTOR</span>
          </div>
          <div className="text-[10px] text-cyber-dim space-y-1.5 border-t border-cyber-cyan/15 pt-3">
            <div className="flex justify-between">
              <span>AVATAR COORD:</span>
              <span className="text-cyber-cyan">[-3.0, 0.8]</span>
            </div>
            <div className="flex justify-between">
              <span>EMISSION STATE:</span>
              <span className="text-cyber-success text-glow-success animate-pulse">STABLE</span>
            </div>
            <div className="flex justify-between">
              <span>SKILL BUFFERS:</span>
              <span className="text-white font-semibold">4 DETECTED</span>
            </div>
            <div className="flex justify-between">
              <span>REFRESH TARGET:</span>
              <span className="text-cyber-cyan font-bold">60.0 FPS</span>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-cyber-cyan/20 to-transparent my-1" />
          <div className="flex justify-center pt-2">
            <div className="w-16 h-16 rounded-full border border-cyber-cyan/20 flex items-center justify-center relative animate-pulse">
              <span className="absolute inset-1 rounded-full border border-cyber-cyan/10 animate-ping" />
              <Crosshair className="w-5 h-5 text-cyber-cyan/35 animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: Large Headline & Primary triggers */}
        <div className="col-span-12 md:col-span-6 text-center space-y-6">
          
          {/* HUD Header */}
          <div className="inline-flex items-center gap-2 border border-cyber-cyan/20 px-3 py-1 bg-cyber-cyan/5 text-cyber-cyan text-[10px] tracking-widest uppercase rounded-sm glow-border-cyan">
            <Shield className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>CANDIDATE SECTOR LOADED</span>
          </div>

          {/* Huge Main Header (7rem+) */}
          <div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-orbitron tracking-wider leading-none text-white uppercase select-text">
              CHETAN <span className="text-cyber-cyan text-glow-cyan">SAI</span>
            </h1>
            <p className="text-[9px] text-cyber-dim tracking-widest mt-1">
              FILE REFERENCE: #41-NCS-2026
            </p>
          </div>

          {/* Typewriter Subtitle */}
          <div className="min-h-[44px] flex items-center justify-center">
            <div className="text-xs sm:text-sm font-bold tracking-widest text-slate-200 border-l-2 border-cyber-cyan pl-3.5 py-0.5">
              <span>{typedText}</span>
              <span className="w-2.5 h-4 bg-cyber-cyan inline-block ml-1 animate-pulse" />
            </div>
          </div>

          {/* Premium Game Studio CTA Triggers */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => handleActionClick("projects")}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto group px-7 py-3 border border-cyber-cyan text-cyber-cyan font-bold tracking-widest text-xs hover:text-cyber-dark bg-transparent hover:bg-cyber-cyan hover:shadow-[0_0_15px_#00e5ff] clip-cyber-sm transition-all duration-300 transform active:scale-95 cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2">
                <Play className="w-3.5 h-3.5 fill-cyber-cyan group-hover:fill-cyber-dark group-hover:text-cyber-dark text-cyber-cyan" />
                <span>LAUNCH MISSIONS</span>
              </div>
            </button>

            <button
              onClick={() => handleActionClick("resume")}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto group px-7 py-3 border border-cyber-purple text-cyber-purple font-bold tracking-widest text-xs hover:text-white bg-transparent hover:bg-cyber-purple hover:shadow-[0_0_15px_#8b5cf6] clip-cyber-sm transition-all duration-300 transform active:scale-95 cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2">
                <Download className="w-3.5 h-3.5 text-cyber-purple group-hover:text-white" />
                <span>DOSSIER DOWNLOAD</span>
              </div>
            </button>

            <button
              onClick={() => handleActionClick("contact")}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto group px-7 py-3 border border-white text-white font-bold tracking-widest text-xs hover:text-cyber-dark bg-transparent hover:bg-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] clip-cyber-sm transition-all duration-300 transform active:scale-95 cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-white group-hover:text-cyber-dark" />
                <span>SECURE COMMS</span>
              </div>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Recruiter Dashboard HUD Panel */}
        <div className="col-span-12 md:col-span-3 cyber-glass border border-cyber-cyan/15 p-5 clip-cyber-sm flex flex-col space-y-4 shadow-xl relative bg-cyber-card/65 glow-border-cyan">
          <div className="absolute top-0 right-0 p-1.5 bg-cyber-cyan/10 border-b border-l border-cyber-cyan/20">
            <Crosshair className="w-4 h-4 text-cyber-cyan/50" />
          </div>

          <div className="text-[10px] text-cyber-cyan font-bold tracking-widest border-b border-cyber-cyan/15 pb-2.5 uppercase flex items-center gap-1.5">
            <TermIcon className="w-3.5 h-3.5" />
            <span>RECRUITER DASHBOARD</span>
          </div>

          <div className="space-y-3.5 text-xs text-slate-200">
            <div className="flex justify-between items-center border-b border-cyber-cyan/5 pb-2">
              <span className="text-cyber-dim text-[10px] uppercase font-semibold">PROJECTS ACTIVE</span>
              <span className="text-white font-bold tracking-wider">3+ COMPLETE</span>
            </div>
            
            <div className="flex justify-between items-center border-b border-cyber-cyan/5 pb-2">
              <span className="text-cyber-dim text-[10px] uppercase font-semibold">VERIFIED CERTIFICATES</span>
              <span className="text-white font-bold tracking-wider">5+ COMPLETE</span>
            </div>

            <div className="flex justify-between items-center border-b border-cyber-cyan/5 pb-2">
              <span className="text-cyber-dim text-[10px] uppercase font-semibold">GITHUB REGISTRY</span>
              <span className="text-white font-bold tracking-wider">15+ INDEXED</span>
            </div>

            <div className="flex flex-col space-y-1.5 pt-1">
              <span className="text-cyber-dim text-[9px] uppercase font-semibold">TELEMETRY LINK STATUS</span>
              <div className="flex items-center gap-2 bg-cyber-success/10 border border-cyber-success/20 px-2.5 py-1.5 rounded-sm">
                <span className="w-1.5 h-1.5 bg-cyber-success rounded-full animate-ping" />
                <span className="text-[10px] text-cyber-success font-bold tracking-widest uppercase text-glow-success truncate">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroHUD;
