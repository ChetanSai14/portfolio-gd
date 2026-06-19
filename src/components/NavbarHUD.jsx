import React, { useState, useEffect } from "react";
import { soundManager } from "../utils/soundManager";
import { Volume2, VolumeX, Menu, X, Activity, HardDrive } from "lucide-react";

const NavbarHUD = ({ isMuted, onMuteToggle }) => {
  const [time, setTime] = useState("");
  const [ping, setPing] = useState(12);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("TACTICAL");

  const navItems = [
    { label: "TACTICAL", target: "hero" },
    { label: "DOSSIER", target: "about" },
    { label: "ARSENAL", target: "skills" },
    { label: "OPERATIONS", target: "projects" },
    { label: "LICENSES", target: "certifications" },
    { label: "TIMELINE", target: "journey" },
    { label: "COMMS", target: "contact" },
  ];

  useEffect(() => {
    // Clock tick
    const tick = () => {
      const date = new Date();
      setTime(date.toTimeString().split(" ")[0]);
    };
    tick();
    const clockTimer = setInterval(tick, 1000);

    // Ping tracker
    const pingTimer = setInterval(() => {
      setPing((prev) => {
        const delta = Math.floor(Math.random() * 4) - 2;
        return Math.max(9, Math.min(prev + delta, 28));
      });
    }, 4500);

    return () => {
      clearInterval(clockTimer);
      clearInterval(pingTimer);
    };
  }, []);

  const handleNavClick = (label, targetId) => {
    soundManager.playClick();
    setActiveTab(label);
    setIsMobileMenuOpen(false);
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
    <nav className="fixed top-4 left-4 right-4 z-40 font-mono">
      <div className="max-w-7xl mx-auto cyber-glass clip-cyber-sm px-4 sm:px-6 py-3.5 flex justify-between items-center relative shadow-[0_0_25px_rgba(0,229,255,0.08)]">
        
        {/* Glow corners */}
        <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-cyber-cyan" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cyber-cyan" />
        <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-cyber-cyan" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-cyber-cyan" />

        {/* Brand LOGO */}
        <div className="flex items-center gap-2">
          <HardDrive className="w-5 h-5 text-cyber-cyan animate-pulse" />
          <div>
            <div className="text-xs sm:text-sm font-bold text-cyber-white tracking-widest leading-none font-orbitron">
              CHETAN SAI
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-cyber-success rounded-full animate-ping" />
              <span className="text-[7px] text-cyber-success font-bold uppercase tracking-wider">
                LINK: SECURE
              </span>
            </div>
          </div>
        </div>

        {/* Valorant Career Style Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.target)}
                onMouseEnter={() => soundManager.playHover()}
                className={`text-xs font-bold px-4 py-2 transition-all duration-300 tracking-widest cursor-pointer relative ${
                  isActive 
                    ? "text-cyber-cyan text-glow-cyan" 
                    : "text-cyber-dim hover:text-cyber-white"
                }`}
              >
                <span>{item.label}</span>
                {/* Active slider bar */}
                <span className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-cyber-cyan to-cyber-purple transition-all duration-300 transform ${
                  isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 hover:scale-x-50"
                }`} />
              </button>
            );
          })}
        </div>

        {/* Telemetry Clock & Audio HUD */}
        <div className="hidden sm:flex items-center gap-5 border-l border-cyber-cyan/15 pl-5">
          {/* Latency */}
          <div className="flex items-center gap-1.5 text-[9px] text-cyber-dim">
            <Activity className="w-4 h-4 text-cyber-cyan animate-pulse" />
            <span>RTT: <span className="text-cyber-cyan font-bold">{ping}MS</span></span>
          </div>

          {/* Time */}
          <div className="text-[9px] text-cyber-dim">
            <span>SYS_TIME: <span className="text-cyber-white font-bold">{time}</span></span>
          </div>

          {/* Audio controller */}
          <button
            onClick={() => {
              soundManager.playClick();
              onMuteToggle();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="text-cyber-dim hover:text-cyber-cyan transition-colors cursor-pointer p-0.5 rounded-sm hover:bg-cyber-cyan/5"
            title={isMuted ? "Activate Audio Feed" : "Deactivate Audio Feed"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyber-cyan animate-pulse" />
            )}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => {
              soundManager.playClick();
              onMuteToggle();
            }}
            className="p-1 text-cyber-dim hover:text-cyber-cyan transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyber-cyan" />
            )}
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className="p-1 text-cyber-dim hover:text-cyber-cyan transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-2 mx-1 py-4 px-6 cyber-glass clip-cyber-sm space-y-2 flex flex-col shadow-[0_8px_25px_rgba(0,0,0,0.5)] bg-cyber-dark/95 border-cyber-cyan/15 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.label, item.target)}
              onMouseEnter={() => soundManager.playHover()}
              className={`text-left text-xs font-bold py-2.5 border-b border-cyber-cyan/5 last:border-0 cursor-pointer ${
                activeTab === item.label ? "text-cyber-cyan" : "text-cyber-dim hover:text-cyber-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 flex justify-between items-center text-[9px] text-cyber-dim border-t border-cyber-cyan/10">
            <div className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyber-cyan" />
              <span>RTT: <span className="text-cyber-cyan font-bold">{ping}MS</span></span>
            </div>
            <span>SYS_TIME: <span className="text-cyber-white font-bold">{time}</span></span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarHUD;
