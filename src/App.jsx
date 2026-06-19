import React, { useState, useEffect } from "react";
import { soundManager } from "./utils/soundManager";
import BootLoader from "./components/BootLoader";
import ThreejsCanvas from "./components/ThreejsCanvas";
import NavbarHUD from "./components/NavbarHUD";
import HeroHUD from "./components/HeroHUD";
import AboutConsole from "./components/AboutConsole";
import SkillsArsenal from "./components/SkillsArsenal";
import ProjectsShowcase from "./components/ProjectsShowcase";
import CertificationsGrid from "./components/CertificationsGrid";
import JourneyTimeline from "./components/JourneyTimeline";
import ContactHUD from "./components/ContactHUD";
import { Shield, Sparkles } from "lucide-react";

function App() {
  const [isBooted, setIsBooted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Sync mute state on launch
    setIsMuted(soundManager.isMuted);
  }, []);

  const handleMuteToggle = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    soundManager.setMute(newState);
  };

  const handleSystemBoot = () => {
    setIsBooted(true);
  };

  if (!isBooted) {
    return <BootLoader onConnect={handleSystemBoot} />;
  }

  return (
    <div className="min-h-screen bg-cyber-dark text-white relative overflow-hidden selection:bg-cyber-cyan selection:text-cyber-dark">
      
      {/* 3D Background Canvas Layer */}
      <ThreejsCanvas />

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none z-0" />

      {/* Volumetric Glowing Ambient Lights (Nebula blobs) */}
      <div className="absolute top-[10%] left-[10%] w-[380px] h-[380px] bg-cyber-cyan/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: "12s" }} />
      <div className="absolute bottom-[30%] right-[10%] w-[450px] h-[450px] bg-cyber-purple/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: "16s" }} />
      <div className="absolute top-[50%] left-[40%] w-[320px] h-[320px] bg-cyber-accent/5 rounded-full blur-[110px] pointer-events-none z-0" />

      {/* Floating command HUD Navbar */}
      <NavbarHUD isMuted={isMuted} onMuteToggle={handleMuteToggle} />

      {/* Main Content Layout Container */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Sections */}
        <HeroHUD />
        
        <div className="my-10 border-b border-cyber-cyan/5 w-full" />
        <AboutConsole />
        
        <div className="my-10 border-b border-cyber-cyan/5 w-full" />
        <SkillsArsenal />
        
        <div className="my-10 border-b border-cyber-cyan/5 w-full" />
        <ProjectsShowcase />
        
        <div className="my-10 border-b border-cyber-cyan/5 w-full" />
        <CertificationsGrid />
        
        <div className="my-10 border-b border-cyber-cyan/5 w-full" />
        <JourneyTimeline />
        
        <div className="my-10 border-b border-cyber-cyan/5 w-full" />
        <ContactHUD />

      </main>

      {/* Modern Gamer Footer HUD */}
      <footer className="relative z-10 border-t border-cyber-cyan/15 bg-cyber-dark/90 py-8 px-4 sm:px-6 font-mono text-xs text-cyber-dim">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyber-cyan animate-pulse" />
            <span>EA PORTFOLIO LINK GATE © 2026</span>
          </div>

          <div className="text-center md:text-left">
            <span>DEVELOPED BY NAGULA CHETAN SAI | </span>
            <span className="text-white font-bold uppercase tracking-wider">Game Developer applicant</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-cyber-cyan/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECH: REACT 18 + THREE.JS + TAILWIND v4</span>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

export default App;
