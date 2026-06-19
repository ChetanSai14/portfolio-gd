import React, { useState, useEffect, useRef } from "react";
import { soundManager } from "../utils/soundManager";
import { ExternalLink, Code, Compass, Terminal, Cpu, Play } from "lucide-react";

// Inline Github Icon Component
const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// --- Live Graph Solver Animation Component ---
const GraphSolver = () => {
  const [activeStep, setActiveStep] = useState(0); 
  const nodes = [
    { id: "A", x: 40, y: 80, label: "HUB A (SOURCE)" },
    { id: "B", x: 120, y: 40, label: "HUB B" },
    { id: "C", x: 120, y: 120, label: "HUB C" },
    { id: "D", x: 200, y: 80, label: "HUB D (SINK)" },
  ];

  const edges = [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "C", weight: 2 },
    { from: "B", to: "D", weight: 3 },
    { from: "C", to: "D", weight: 1 },
    { from: "B", to: "C", weight: 1 },
  ];

  // Visual solver cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  const getNodeColor = (id) => {
    if (activeStep === 0) return "stroke-cyber-dim fill-cyber-dark";
    if (activeStep === 1) {
      if (id === "A") return "stroke-cyber-cyan fill-cyber-cyan/20";
      if (id === "B" || id === "C") return "stroke-cyber-purple fill-cyber-purple/20 animate-pulse";
      return "stroke-cyber-dim fill-cyber-dark";
    }
    if (id === "A" || id === "C" || id === "D") {
      return "stroke-cyber-success fill-cyber-success/20 shadow-[0_0_10px_#00ff9d]";
    }
    return "stroke-cyber-dim fill-cyber-dark";
  };

  const getEdgeColor = (from, to) => {
    if (activeStep === 0) return "stroke-cyber-dim/20";
    if (activeStep === 1) {
      if ((from === "A" && to === "B") || (from === "A" && to === "C")) {
        return "stroke-cyber-purple stroke-[2.5px] animate-pulse";
      }
      return "stroke-cyber-dim/20";
    }
    if (activeStep >= 2) {
      if ((from === "A" && to === "C") || (from === "C" && to === "D")) {
        return "stroke-cyber-success stroke-[3px] shadow-[0_0_8px_#00ff9d]";
      }
      return "stroke-cyber-dim/10";
    }
    return "stroke-cyber-dim/20";
  };

  return (
    <div className="w-full h-36 bg-cyber-dark rounded-sm border border-cyber-cyan/15 relative overflow-hidden flex flex-col justify-between p-2">
      <div className="flex justify-between items-center text-[8px] text-cyber-cyan/50 tracking-widest font-mono">
        <span>[ DIJKSTRA PIPELINE SOLVER ]</span>
        <span className="animate-pulse">
          {activeStep === 0 && "STATUS: IDLE"}
          {activeStep === 1 && "STATUS: SOLVING FRONTIERS..."}
          {activeStep === 2 && "STATUS: PATH VERIFIED"}
          {activeStep === 3 && "STATUS: PIPELINE FLOW ACTIVE"}
        </span>
      </div>

      <svg className="w-full h-24" viewBox="0 0 240 160">
        {edges.map((edge, idx) => {
          const fromNode = nodes.find((n) => n.id === edge.from);
          const toNode = nodes.find((n) => n.id === edge.to);
          return (
            <g key={idx}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className={`transition-all duration-500 ${getEdgeColor(edge.from, edge.to)}`}
                strokeWidth="1.5"
              />
              <text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 - 3}
                fill="rgba(0, 229, 255, 0.4)"
                fontSize="6"
                textAnchor="middle"
              >
                w:{edge.weight}
              </text>
            </g>
          );
        })}

        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="7"
              className={`transition-all duration-500 stroke-[2] ${getNodeColor(node.id)}`}
            />
            <text
              x={node.x}
              y={node.y + 2}
              fill="#ffffff"
              fontSize="6"
              fontWeight="bold"
              textAnchor="middle"
            >
              {node.id}
            </text>
            <text
              x={node.x}
              y={node.y - 10}
              fill="rgba(148, 163, 184, 0.6)"
              fontSize="5"
              textAnchor="middle"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// --- Interactive 3D Tilting Project Card ---
const ProjectCard = ({ title, tech, description, role, github, link, metrics, isAlgorithm, blueprint: Blueprint }) => {
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

  const rotateX = coords.y * -15; 
  const rotateY = coords.x * 15;

  const glowStyle = isAlgorithm 
    ? "border-cyber-purple shadow-[0_0_20px_rgba(139,92,246,0.25)]" 
    : "border-cyber-cyan shadow-[0_0_20px_rgba(0,229,255,0.22)]";

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
      className="h-[460px] transition-all duration-150 ease-out cursor-default select-none"
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d",
          borderColor: isHovered ? "" : "rgba(255, 255, 255, 0.05)",
          backgroundColor: "#111827" // strictly Cards color #111827
        }}
        className={`w-full h-full p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between relative clip-cyber ${
          isHovered ? glowStyle : "shadow-md"
        }`}
      >
        {/* Glowing sweep scanner */}
        {isHovered && <div className="laser-line top-0 left-0 animate-scanline opacity-30" />}

        {/* HUD Corners */}
        <span className={`absolute top-0 left-0 w-2.5 h-2.5 border-t border-l ${
          isHovered ? isAlgorithm ? "border-cyber-purple" : "border-cyber-cyan" : "border-white/10"
        }`} />
        <span className={`absolute top-0 right-0 w-2.5 h-2.5 border-t border-r ${
          isHovered ? isAlgorithm ? "border-cyber-purple" : "border-cyber-cyan" : "border-white/10"
        }`} />
        <span className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l ${
          isHovered ? isAlgorithm ? "border-cyber-purple" : "border-cyber-cyan" : "border-white/10"
        }`} />
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r ${
          isHovered ? isAlgorithm ? "border-cyber-purple" : "border-cyber-cyan" : "border-white/10"
        }`} />

        {/* Content sections */}
        <div style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase">
              <Cpu className={`w-4 h-4 ${isHovered ? isAlgorithm ? "text-cyber-purple animate-pulse" : "text-cyber-cyan animate-pulse" : "text-cyber-dim"}`} />
              <span className={isAlgorithm ? "text-cyber-purple" : "text-cyber-cyan"}>
                {isAlgorithm ? "ALGORITHM ENGINEERING" : "TACTICAL DEPLOYMENT"}
              </span>
            </div>
            <span className="text-[8px] text-cyber-dim tracking-wider font-mono">
              SYS_REF: #{title.replace(/\s+/g, "").toUpperCase()}
            </span>
          </div>

          {/* Visual Canvas screen */}
          <div className="mb-4">
            {isAlgorithm ? <GraphSolver /> : <Blueprint isHovered={isHovered} />}
          </div>

          {/* Project details */}
          <h3 className="text-lg font-bold font-orbitron text-white uppercase tracking-wider mb-1.5">
            {title}
          </h3>

          <div className={`inline-block border text-[8px] font-bold px-2 py-0.5 tracking-wider uppercase mb-2 rounded-sm ${
            isAlgorithm 
              ? "bg-cyber-purple/10 border-cyber-purple/25 text-cyber-purple" 
              : "bg-cyber-cyan/10 border-cyber-cyan/25 text-cyber-cyan"
          }`}>
            RESPONSIBILITY: {role}
          </div>

          <p className="text-xs text-cyber-dim leading-relaxed font-sans font-medium mb-3.5">
            {description}
          </p>

          {/* Spec tags */}
          <div className="grid grid-cols-2 gap-2 bg-cyber-dark/65 border border-cyber-cyan/5 p-2 rounded-sm text-[8px] text-cyber-dim tracking-wider uppercase mb-1">
            {metrics.map((met, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[7px] text-cyber-cyan/50">{met.label}</span>
                <span className="text-white font-bold truncate">{met.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Triggers */}
        <div style={{ transform: "translateZ(20px)" }}>
          <div className="border-t border-white/5 pt-4 mb-4">
            <div className="text-[8px] text-cyber-dim tracking-widest uppercase mb-2">
              SYSTEM FRAMEWORKS
            </div>
            <div className="flex flex-wrap gap-1">
              {tech.map((t, idx) => (
                <span
                  key={idx}
                  className={`border px-1.5 py-0.5 text-[8px] font-bold tracking-wider rounded-sm ${
                    isAlgorithm 
                      ? "bg-cyber-purple/5 border-cyber-purple/15 text-cyber-purple"
                      : "bg-cyber-cyan/5 border-cyber-cyan/15 text-cyber-cyan"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-3">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="text-cyber-dim hover:text-white transition-colors cursor-pointer"
                  title="View Codebase"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  onMouseEnter={() => soundManager.playHover()}
                  className="text-cyber-dim hover:text-cyber-cyan transition-colors cursor-pointer"
                  title="Launch Site"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                alert(`Loading visual diagnostic logs for ${title}...`);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`flex items-center gap-1 border px-3 py-1 rounded-sm text-[9px] hover:bg-white/5 transition-all cursor-pointer font-bold ${
                isAlgorithm ? "border-cyber-purple/30 text-cyber-purple" : "border-cyber-cyan/30 text-cyber-cyan"
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>DIAGNOSTICS</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Procedural SVG Blueprint Render Components ---
const BlueprintCivic = ({ isHovered }) => (
  <div className="w-full h-36 bg-cyber-dark border border-cyber-cyan/15 rounded-sm flex items-center justify-center p-2 relative overflow-hidden">
    <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:12px_12px] transition-all ${isHovered ? "opacity-100" : "opacity-40"}`} />
    <svg className="w-4/5 h-24" viewBox="0 0 200 100">
      <circle cx="100" cy="50" r="30" fill="none" stroke="rgba(0, 229, 255, 0.1)" strokeWidth="1" />
      <circle cx="100" cy="50" r="45" fill="none" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="100" y1="0" x2="100" y2="100" stroke="rgba(0, 229, 255, 0.08)" strokeWidth="1" />
      <line x1="0" y1="50" x2="200" y2="50" stroke="rgba(0, 229, 255, 0.08)" strokeWidth="1" />
      
      <line x1="100" y1="50" x2="140" y2="20" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="1.5" className={isHovered ? "origin-center rotate-[360deg] duration-[4000ms] ease-linear repeat-infinite transition-all" : ""} />
      
      <circle cx="70" cy="35" r="3" fill="#00ff9d" className="animate-ping" />
      <circle cx="70" cy="35" r="2" fill="#00ff9d" />
      <circle cx="130" cy="65" r="3" fill="#00e5ff" />
      <circle cx="130" cy="65" r="1.5" fill="#00e5ff" />
    </svg>
    <div className="absolute bottom-2 left-2 text-[6px] text-cyber-cyan/40">CIVICSENSE_GPS_GRID</div>
  </div>
);

const BlueprintStartup = ({ isHovered }) => (
  <div className="w-full h-36 bg-cyber-dark border border-cyber-cyan/15 rounded-sm flex items-center justify-center p-2 relative overflow-hidden">
    <div className={`absolute inset-0 bg-[linear-gradient(rgba(0,229,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.015)_1px,transparent_1px)] bg-[size:12px_12px] transition-all ${isHovered ? "opacity-100" : "opacity-40"}`} />
    <svg className="w-4/5 h-24" viewBox="0 0 200 100">
      <rect x="20" y="35" width="25" height="15" fill="none" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" />
      <text x="32" y="44" fill="rgba(0, 229, 255, 0.7)" fontSize="5" textAnchor="middle">DB_CL</text>
      
      <rect x="85" y="15" width="30" height="15" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" />
      <text x="100" y="24" fill="rgba(139, 92, 246, 0.8)" fontSize="5" textAnchor="middle">NODE_API</text>

      <rect x="85" y="55" width="30" height="15" fill="none" stroke="rgba(139, 92, 246, 0.5)" strokeWidth="1" />
      <text x="100" y="64" fill="rgba(139, 92, 246, 0.8)" fontSize="5" textAnchor="middle">WS_ENG</text>

      <rect x="155" y="35" width="25" height="15" fill="none" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" />
      <text x="167" y="44" fill="rgba(0, 229, 255, 0.7)" fontSize="5" textAnchor="middle">CLIENT</text>

      <path d="M 45 42 L 85 22 M 45 42 L 85 62 M 115 22 L 155 42 M 115 62 L 155 42" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
      
      {isHovered && (
        <circle cx="100" cy="22" r="2" fill="#00e5ff" className="animate-ping" />
      )}
    </svg>
    <div className="absolute bottom-2 left-2 text-[6px] text-cyber-cyan/40">NODE_WS_ARCH_MAP</div>
  </div>
);

const ProjectsShowcase = () => {
  const projects = [
    {
      title: "CivicSense",
      tech: ["React", "Node.js", "MongoDB", "Express.js", "GPS integration"],
      description:
        "Smart civic issue reporting platform featuring geographical GPS integration, custom analytics dashboard telemetry, and cloud deployment pipelines.",
      role: "Lead Full Stack Architect",
      github: "https://github.com/ChetanSai14/CivicSense",
      link: "https://github.com/ChetanSai14",
      metrics: [
        { label: "DEPLOYMENT", value: "CLOUD STABLE" },
        { label: "INTERACTIONS", value: "GPS LIVE REAL-TIME" },
      ],
      isAlgorithm: false,
      blueprint: BlueprintCivic,
    },
    {
      title: "Water Supply Tracker",
      tech: ["C++", "BFS", "DFS", "Dijkstra", "Graph Theory"],
      description:
        "Graph-based pipeline routing simulation demonstrating algorithmic optimization and shortest path analysis. Highlighted systems engineer portfolio.",
      role: "Core Systems Engineer",
      github: "https://github.com/ChetanSai14/Water-Supply-Tracker",
      link: null,
      metrics: [
        { label: "COMPLEXITY", value: "O(V + E) DIJKSTRA" },
        { label: "PIPELINES", value: "EFFICIENT ROUTING" },
      ],
      isAlgorithm: true,
      blueprint: null,
    },
    {
      title: "Startup Connect Hub",
      tech: ["React", "Node.js", "MongoDB", "Express.js", "WebSockets"],
      description:
        "Futuristic networking engine bridging early-stage startup collaborators and entrepreneurs with real-time WebSocket connection queues.",
      role: "Database & Backend Designer",
      github: "https://github.com/ChetanSai14/Startup-Connect-Hub",
      link: null,
      metrics: [
        { label: "CONCURRENCY", value: "WEBSOCKETS LINK" },
        { label: "DATABASE ARCH", value: "MONGODB CLUSTER" },
      ],
      isAlgorithm: false,
      blueprint: BlueprintStartup,
    },
  ];

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 font-mono">
      {/* Title Header */}
      <div className="flex items-center gap-3 mb-10 border-b border-cyber-cyan/20 pb-4">
        <Compass className="w-8 h-8 text-cyber-cyan text-glow-cyan animate-pulse" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white uppercase tracking-wider">
            PROJECT OPERATIONS
          </h2>
          <p className="text-[10px] text-cyber-cyan">MISSION CONTROL DIRECTIVES & CODE BASES</p>
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, index) => (
          <ProjectCard
            key={index}
            title={proj.title}
            tech={proj.tech}
            description={proj.description}
            role={proj.role}
            github={proj.github}
            link={proj.link}
            metrics={proj.metrics}
            isAlgorithm={proj.isAlgorithm}
            blueprint={proj.blueprint}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
