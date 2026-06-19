import React, { useState, useRef } from "react";
import { soundManager } from "../utils/soundManager";
import { Terminal, Cpu, Braces, Gamepad2, Award, Database } from "lucide-react";

// Reusable Tilt Card Component
const TiltCard = ({ name, icon: Icon, level, category, exp }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const rotateX = coords.y * -22;
  const rotateY = coords.x * 22;

  // Decide glow color styling based on category
  let glowColor = "rgba(0, 229, 255, 0.12)"; // default cyan
  let hoverGlow = "shadow-[0_0_20px_rgba(0,229,255,0.22)] border-cyber-cyan";
  let barColor = "bg-cyber-cyan shadow-[0_0_6px_#00e5ff]";
  
  if (category === "DEVELOPMENT") {
    glowColor = "rgba(124, 58, 237, 0.15)"; // purple
    hoverGlow = "shadow-[0_0_20px_rgba(124, 58, 237, 0.25)] border-cyber-purple";
    barColor = "bg-cyber-purple shadow-[0_0_6px_#7c3aed]";
  } else if (category === "GAMING-RELEVANT") {
    glowColor = "rgba(0, 255, 157, 0.15)"; // green
    hoverGlow = "shadow-[0_0_20px_rgba(0, 255, 157, 0.25)] border-cyber-success";
    barColor = "bg-cyber-success shadow-[0_0_6px_#00ff9d]";
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      className="h-36 transition-all duration-150 ease-out cursor-default select-none"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d",
          borderColor: isHovered ? "" : "rgba(255, 255, 255, 0.05)",
          backgroundColor: "#111827"
        }}
        className={`w-full h-full p-4 rounded-sm border transition-all duration-300 flex flex-col justify-between relative clip-cyber-sm ${
          isHovered ? hoverGlow : "shadow-md"
        }`}
      >
        {/* Glow corners */}
        <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l ${
          isHovered 
            ? category === "DEVELOPMENT" ? "border-cyber-purple" : category === "GAMING-RELEVANT" ? "border-cyber-success" : "border-cyber-cyan"
            : "border-white/10"
        }`} />
        <span className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r ${
          isHovered 
            ? category === "DEVELOPMENT" ? "border-cyber-purple" : category === "GAMING-RELEVANT" ? "border-cyber-success" : "border-cyber-cyan"
            : "border-white/10"
        }`} />
        <span className={`absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l ${
          isHovered 
            ? category === "DEVELOPMENT" ? "border-cyber-purple" : category === "GAMING-RELEVANT" ? "border-cyber-success" : "border-cyber-cyan"
            : "border-white/10"
        }`} />
        <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r ${
          isHovered 
            ? category === "DEVELOPMENT" ? "border-cyber-purple" : category === "GAMING-RELEVANT" ? "border-cyber-success" : "border-cyber-cyan"
            : "border-white/10"
        }`} />

        <div style={{ transform: "translateZ(30px)" }} className="flex justify-between items-start">
          <Icon className={`w-5 h-5 ${
            isHovered 
              ? category === "DEVELOPMENT" ? "text-cyber-purple" : category === "GAMING-RELEVANT" ? "text-cyber-success" : "text-cyber-cyan"
              : "text-cyber-dim"
          }`} />
          <span className={`text-[8px] font-bold tracking-widest ${
            category === "DEVELOPMENT" ? "text-cyber-purple" : category === "GAMING-RELEVANT" ? "text-cyber-success" : "text-cyber-cyan"
          }`}>{category}</span>
        </div>

        <div style={{ transform: "translateZ(20px)" }} className="space-y-1.5">
          <div className="flex justify-between items-end">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">{name}</h4>
            <span className="text-[9px] text-cyber-dim font-bold">{exp}</span>
          </div>
          
          {/* Cyber bar levels */}
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((step) => (
              <span
                key={step}
                className={`h-1.5 w-full rounded-sm ${
                  step <= level ? barColor : "bg-cyber-card"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsArsenal = () => {
  const [activeTab, setActiveTab] = useState("all");

  const skillsData = [
    // Programming (Cyan glows)
    { name: "C++", icon: Braces, level: 5, category: "PROGRAMMING", exp: "3+ YRS" },
    { name: "Java", icon: Braces, level: 4, category: "PROGRAMMING", exp: "2+ YRS" },
    { name: "JavaScript", icon: Braces, level: 4, category: "PROGRAMMING", exp: "2+ YRS" },
    { name: "Python", icon: Braces, level: 4, category: "PROGRAMMING", exp: "2+ YRS" },
    { name: "C", icon: Braces, level: 4, category: "PROGRAMMING", exp: "2+ YRS" },

    // Development (Purple glows)
    { name: "React.js", icon: Cpu, level: 4, category: "DEVELOPMENT", exp: "2+ YRS" },
    { name: "Node.js", icon: Cpu, level: 4, category: "DEVELOPMENT", exp: "2+ YRS" },
    { name: "Express.js", icon: Cpu, level: 4, category: "DEVELOPMENT", exp: "2+ YRS" },
    { name: "MongoDB", icon: Database, level: 4, category: "DEVELOPMENT", exp: "2+ YRS" },
    { name: "REST APIs", icon: Terminal, level: 4, category: "DEVELOPMENT", exp: "2+ YRS" },

    // Gaming-Relevant Skills (Green glows)
    { name: "OOP", icon: Gamepad2, level: 5, category: "GAMING-RELEVANT", exp: "EXPERT" },
    { name: "Data Structures", icon: Gamepad2, level: 5, category: "GAMING-RELEVANT", exp: "EXPERT" },
    { name: "Graph Algorithms", icon: Gamepad2, level: 5, category: "GAMING-RELEVANT", exp: "EXPERT" },
    { name: "Problem Solving", icon: Gamepad2, level: 5, category: "GAMING-RELEVANT", exp: "EXPERT" },
    { name: "Software Eng", icon: Gamepad2, level: 4, category: "GAMING-RELEVANT", exp: "ADVANCED" },
  ];

  const filteredSkills = activeTab === "all"
    ? skillsData
    : skillsData.filter(s => s.category.toLowerCase().includes(activeTab));

  return (
    <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 font-mono">
      {/* HUD Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 border-b border-cyber-cyan/20 pb-6">
        <div className="flex items-center gap-3">
          <Gamepad2 className="w-8 h-8 text-cyber-cyan text-glow-cyan animate-pulse" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white uppercase tracking-wider">
              SKILLS ARSENAL
            </h2>
            <p className="text-[10px] text-cyber-cyan">WEAPONS LOADOUT & CALIBRATION</p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 border border-cyber-cyan/15 bg-cyber-deep/50 p-1 rounded-sm">
          {["all", "programming", "development", "gaming-relevant"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-3.5 py-1.5 text-[9px] font-bold tracking-widest uppercase transition-all rounded-sm cursor-pointer ${
                activeTab === tab
                  ? "bg-cyber-cyan text-cyber-dark shadow-[0_0_10px_rgba(0,229,255,0.4)]"
                  : "text-cyber-dim hover:text-white"
              }`}
            >
              {tab.replace("-relevant", "")}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredSkills.map((skill, index) => (
          <TiltCard
            key={index}
            name={skill.name}
            icon={skill.icon}
            level={skill.level}
            category={skill.category}
            exp={skill.exp}
          />
        ))}
      </div>

      {/* Calibration message */}
      <div className="mt-8 border border-cyber-cyan/10 bg-cyber-deep/30 p-3.5 rounded-sm text-[9px] text-cyber-dim flex justify-between items-center clip-cyber-sm">
        <span className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyber-cyan" />
          <span>LOADOUT CONSOLE CONFIGURATION COMPLETE | CORE ATTRIBUTES UNLOCKED</span>
        </span>
        <span className="animate-pulse text-cyber-cyan font-bold tracking-widest">READY TO ENGAGE</span>
      </div>
    </section>
  );
};

export default SkillsArsenal;
