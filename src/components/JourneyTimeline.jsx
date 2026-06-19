import React, { useState } from "react";
import { soundManager } from "../utils/soundManager";
import { Milestone, Target, Zap } from "lucide-react";

const TimelineNode = ({ step, title, description, isLast, status }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.playHover();
  };

  const isComplete = status === "COMPLETE";

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="flex gap-6 relative select-none font-mono text-xs sm:text-sm"
    >
      {/* Node Rail & Line */}
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 bg-cyber-dark ${
          isHovered
            ? isComplete
              ? "border-cyber-cyan shadow-[0_0_12px_#00e5ff] scale-110"
              : "border-cyber-purple shadow-[0_0_12px_#7c3aed] scale-110"
            : isComplete
            ? "border-cyber-cyan text-cyber-cyan"
            : "border-cyber-purple text-cyber-purple animate-pulse"
        }`}>
          {isComplete ? (
            <Zap className={`w-4 h-4 ${isHovered ? "text-cyber-cyan" : "text-cyber-cyan"}`} />
          ) : (
            <Target className="w-4 h-4 text-cyber-purple" />
          )}
        </div>
        {!isLast && (
          <div className={`w-[2px] flex-1 transition-colors duration-300 my-1 ${
            isHovered
              ? isComplete 
                ? "bg-cyber-cyan shadow-[0_0_8px_#00e5ff]"
                : "bg-cyber-purple shadow-[0_0_8px_#7c3aed]"
              : isComplete
              ? "bg-cyber-cyan/30"
              : "bg-dashed bg-cyber-purple/20"
          }`}
          style={{ minHeight: "80px" }} />
        )}
      </div>

      {/* Node Content Card */}
      <div className={`flex-1 pb-10 transition-all duration-300 ${isHovered ? "translate-x-2" : ""}`}>
        <div className={`cyber-glass border p-5 rounded-sm relative clip-cyber-sm ${
          isHovered 
            ? isComplete
              ? "border-cyber-cyan bg-cyber-deep/80 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
              : "border-cyber-purple bg-cyber-deep/80 shadow-[0_0_15px_rgba(124,58,237,0.15)]"
            : "border-cyber-cyan/10 bg-cyber-deep/30"
        }`}>
          
          <div className="absolute top-2 right-3 text-[8px] text-cyber-cyan/40">
            PHASE_REF: 0{step}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-sm ${
              isComplete 
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20" 
                : "bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20 animate-pulse"
            }`}>
              {status}
            </span>
            <span className="text-[10px] text-cyber-dim">SECTOR_STATUS</span>
          </div>

          <h4 className="text-white font-bold tracking-wider text-sm sm:text-base uppercase mb-2">
            {title}
          </h4>
          <p className="text-xs text-cyber-dim leading-relaxed font-sans font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

const JourneyTimeline = () => {
  const milestones = [
    {
      title: "Programming Fundamentals Calibrated",
      description: "Mastered the core primitives of software engineering. Solved structured problems, understood scopes, flow controls, logic tables, and computer memory management in C and Python.",
      status: "COMPLETE",
    },
    {
      title: "Data Structures & Algorithms Integration",
      description: "Optimized complex system bottlenecks. Built customized vectors, trees, heaps, and graph search systems. Analyzed runtime and memory complexities to program performant, high-efficiency logic layers.",
      status: "COMPLETE",
    },
    {
      title: "Full Stack Toolkits Deployed",
      description: "Engineered scalable client-server nodes. Integrated secure NoSQL document storage (MongoDB) with RESTful API web-services (Express/Node.js) and custom dynamic visual layers (React).",
      status: "COMPLETE",
    },
    {
      title: "Exploring Interactive Systems",
      description: "Investigating real-time visual logic. Integrating Web Audio API engines, custom camera matrix interpolation, 3D WebGL render matrices, and physical bounding particle meshes to map fluid user flows.",
      status: "COMPLETE",
    },
    {
      title: "Future Goal: AAA Game Engine Development @ EA",
      description: "Objective: Target game engineering tracks at Electronic Arts. Developing optimized gameplay logic, low-level mechanics, structural entity controllers, and state-machine managers.",
      status: "CRITICAL OBJECTIVE",
    },
  ];

  return (
    <section id="journey" className="max-w-4xl mx-auto px-4 sm:px-6 py-20 font-mono">
      {/* Title HUD Header */}
      <div className="flex items-center gap-3 mb-14 border-b border-cyber-cyan/20 pb-4">
        <Milestone className="w-8 h-8 text-cyber-cyan text-glow-cyan animate-pulse" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white uppercase tracking-wider">
            GAMING JOURNEY
          </h2>
          <p className="text-[10px] text-cyber-cyan">TACTICAL PROGRESS TIMELINE & ACHIEVEMENTS</p>
        </div>
      </div>

      {/* Timeline flow */}
      <div className="relative pl-2 sm:pl-6">
        {milestones.map((milestone, index) => (
          <TimelineNode
            key={index}
            step={index + 1}
            title={milestone.title}
            description={milestone.description}
            status={milestone.status}
            isLast={index === milestones.length - 1}
          />
        ))}
      </div>
    </section>
  );
};

export default JourneyTimeline;
