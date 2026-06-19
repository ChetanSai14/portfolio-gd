import React, { useState, useRef, useEffect } from "react";
import { soundManager } from "../utils/soundManager";
import { Shield, Database, ChevronRight, CornerDownLeft, Eye, Award, Terminal as TermIcon } from "lucide-react";

const AboutConsole = () => {
  const [activeTab, setActiveTab] = useState("dossier");
  const [inputVal, setInputVal] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "SECURE DIALOG TERMINAL V1.02 INITIALIZED.", type: "system" },
    { text: "TYPE 'help' TO QUERY AVAILABLE MODULES.", type: "prompt" },
  ]);
  
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const command = inputVal.trim().toLowerCase();
    if (!command) return;

    soundManager.playClick();
    const newHistory = [...terminalHistory, { text: `> ${inputVal}`, type: "user" }];
    
    switch (command) {
      case "help":
        newHistory.push({
          text: "AVAILABLE ACCESSIBLE DIRECTORY CODES:\n - dossier : General applicant summary\n - stats : Software and gaming attributes\n - ea : Electronic Arts mission file\n - secret : Run internal code block debug\n - clear : Purge console visual buffer",
          type: "system",
        });
        break;
      case "dossier":
        newHistory.push({
          text: "APPLICANT DOSSIER SUMMARY:\nName: Nagula Chetan Sai\nDepartment: Computer Science Engineering\nStatus: Aspiring Game Developer\nFocus: Algorithmic optimizations, C++, full-stack tools, and 3D systems. Highly motivated by physics simulation, interactive frameworks, and graph-based pathway systems.",
          type: "system",
        });
        break;
      case "stats":
        newHistory.push({
          text: "ATTRIBUTES METRICS:\n - Data Structures: 94/100\n - C++ Optimization: 90/100\n - Web Stack: 88/100\n - Problem Solving: 92/100\n - AI Foundations: 85/100",
          type: "system",
        });
        break;
      case "ea":
        newHistory.push({
          text: "ELECTRONIC ARTS INC. ACCESS CODES:\nEA SPORTS | CHALLENGE EVERYTHING | CAREER PORTAL\n\"Chetan aspires to develop game logic, design server architecture, and engineer gameplay algorithms at Electronic Arts to create next-generation interactive experiences.\"",
          type: "success",
        });
        break;
      case "secret":
        newHistory.push({
          text: "EASTER_EGG: Graph-based optimizations discovered. '// BFS, DFS, Dijkstra algorithms are calibrated for Water Supply Tracker. Optimal path mapping confirmed.'",
          type: "success",
        });
        break;
      case "clear":
        setTerminalHistory([]);
        setInputVal("");
        return;
      default:
        soundManager.playDenied();
        newHistory.push({
          text: `ACCESS DENIED: Command '${command}' not found in tactical directory. Type 'help' for directory codes.`,
          type: "error",
        });
        break;
    }

    setTerminalHistory(newHistory);
    setInputVal("");
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 font-mono">
      {/* Title Header */}
      <div className="flex items-center gap-3 mb-10 border-b border-cyber-cyan/20 pb-4">
        <Award className="w-8 h-8 text-cyber-cyan text-glow-cyan animate-pulse" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white uppercase tracking-wider">
            SYSTEM DOSSIER
          </h2>
          <p className="text-[9px] text-cyber-cyan">FILE: NAGULA_CHETAN_SAI.INI</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Visual Profile Badge */}
        <div className="lg:col-span-4 cyber-glass border border-cyber-cyan/15 p-6 clip-cyber flex flex-col justify-between shadow-lg relative min-h-[380px] bg-cyber-deep/80 glow-border-cyan">
          <div className="absolute top-0 right-0 p-1 bg-cyber-cyan/10 border-b border-l border-cyber-cyan/20">
            <Eye className="w-4 h-4 text-cyber-cyan" />
          </div>

          <div>
            {/* Avatar Frame */}
            <div className="w-32 h-32 mx-auto border border-cyber-cyan/30 rounded-full flex items-center justify-center p-1.5 bg-cyber-cyan/5 relative mb-6 shadow-[0_0_15px_rgba(0,229,255,0.15)] group hover:border-cyber-cyan transition-colors">
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan animate-pulse" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyber-cyan animate-pulse" />
              
              <div className="w-full h-full rounded-full bg-cyber-dark flex items-center justify-center relative overflow-hidden">
                {/* Visual laser scanner line inside container */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent w-full h-1/3 animate-scanline pointer-events-none" />
                <div className="text-center">
                  <div className="text-cyber-cyan text-2xl font-black font-orbitron tracking-wider text-glow-cyan">CS</div>
                  <div className="text-[7px] text-cyber-dim uppercase tracking-widest mt-0.5">APPLICANT</div>
                </div>
              </div>
            </div>

            {/* Profile Credentials */}
            <div className="space-y-3.5 text-xs border-t border-cyber-cyan/10 pt-5">
              <div className="flex justify-between">
                <span className="text-cyber-dim text-[10px]">NAME:</span>
                <span className="text-white font-bold">NAGULA CHETAN SAI</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyber-dim text-[10px]">ACADEMIC LEVEL:</span>
                <span className="text-cyber-cyan font-bold">CS ENGINEERING</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyber-dim text-[10px]">SPECIALIZATION:</span>
                <span className="text-white font-bold">GAME DEV & SOFTWARE ENG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyber-dim text-[10px]">CORE LANGUAGES:</span>
                <span className="text-cyber-cyan font-bold">C++ / JAVA / JS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyber-dim text-[10px]">TARGET DIRECTIVE:</span>
                <span className="text-cyber-success font-bold tracking-widest text-glow-success animate-pulse">ELECTRONIC ARTS</span>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-cyber-dim mt-6 border-t border-cyber-cyan/5 pt-3.5 flex justify-between items-center">
            <span>FILE SECURITY: LEVEL 4</span>
            <span className="text-cyber-success">VERIFIED PASS</span>
          </div>
        </div>

        {/* Right Column: Tabbed Console Terminal */}
        <div className="lg:col-span-8 cyber-glass border border-cyber-cyan/15 clip-cyber flex flex-col justify-between shadow-lg min-h-[400px] bg-cyber-deep/80 glow-border-cyan">
          
          {/* Tab Navigation header */}
          <div className="flex border-b border-cyber-cyan/15 bg-cyber-dark/65 text-[10px] tracking-widest font-bold">
            <button
              onClick={() => { soundManager.playClick(); setActiveTab("dossier"); }}
              onMouseEnter={() => soundManager.playHover()}
              className={`flex-1 py-3.5 text-center border-r border-cyber-cyan/10 transition-all cursor-pointer ${
                activeTab === "dossier" ? "text-cyber-cyan bg-cyber-cyan/5 text-glow-cyan" : "text-cyber-dim hover:text-white"
              }`}
            >
              [ BIOS SUMMARY ]
            </button>
            <button
              onClick={() => { soundManager.playClick(); setActiveTab("stats"); }}
              onMouseEnter={() => soundManager.playHover()}
              className={`flex-1 py-3.5 text-center border-r border-cyber-cyan/10 transition-all cursor-pointer ${
                activeTab === "stats" ? "text-cyber-purple bg-cyber-purple/5 text-glow-purple" : "text-cyber-dim hover:text-white"
              }`}
            >
              [ SYSTEM METRICS ]
            </button>
            <button
              onClick={() => { soundManager.playClick(); setActiveTab("terminal"); }}
              onMouseEnter={() => soundManager.playHover()}
              className={`flex-1 py-3.5 text-center transition-all cursor-pointer ${
                activeTab === "terminal" ? "text-cyber-cyan bg-cyber-cyan/5 text-glow-cyan" : "text-cyber-dim hover:text-white"
              }`}
            >
              [ INTERACTIVE TERMINAL ]
            </button>
          </div>

          {/* Dynamic Tab Content */}
          <div className="flex-1 p-6 text-sm text-slate-300 leading-relaxed overflow-y-auto max-h-[350px]">
            {activeTab === "dossier" && (
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-l-2 border-cyber-cyan pl-3 text-white uppercase font-bold tracking-wider mb-2">
                  Target Candidate Profile
                </div>
                <p className="font-sans">
                  As an engineering student majoring in Computer Science, Chetan focuses heavily on foundational engineering principles—mastering data structures, object-oriented concepts, and algorithmic optimizations that drive complex interactive software.
                </p>
                <p className="font-sans">
                  He possesses a deep interest in gaming, artificial intelligence, and interactive systems. Chetan has built diverse software modules, varying from full-stack platforms with cloud databases to simulation systems utilizing graph theory (BFS, DFS, Dijkstra) to map complex flows.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 bg-cyber-cyan/5 p-4 rounded-sm border border-cyber-cyan/10">
                  <div>
                    <h4 className="text-cyber-cyan font-bold text-xs uppercase mb-1">🎮 Gaming & Interactive systems</h4>
                    <p className="text-[11px] text-cyber-dim font-sans">Passionate about gameplay loops, AI entity behavior, and physical simulations.</p>
                  </div>
                  <div>
                    <h4 className="text-cyber-cyan font-bold text-xs uppercase mb-1">⚙️ Systems Engineering</h4>
                    <p className="text-[11px] text-cyber-dim font-sans font-medium">Optimizing resource loading, reducing algorithm complexities, and crafting scalable servers.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-5 text-xs sm:text-sm">
                <div className="border-l-2 border-cyber-purple pl-3 text-white uppercase font-bold tracking-wider mb-3">
                  System Attributes & Attributes Matrix
                </div>
                
                {/* Visual Attribute Bars */}
                {[
                  { name: "Object Oriented Programming (C++, Java)", val: 92, glow: "cyan" },
                  { name: "Data Structures & Algorithmic Optimization", val: 94, glow: "purple" },
                  { name: "Full Stack (React, Node, Express, MongoDB)", val: 88, glow: "cyan" },
                  { name: "Graph Simulation & Path Analysis (BFS/DFS/Dijkstra)", val: 90, glow: "purple" },
                  { name: "Problem Solving & System Logic", val: 92, glow: "cyan" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs tracking-wider">
                      <span className="text-slate-300 font-bold uppercase">{stat.name}</span>
                      <span className={stat.glow === "cyan" ? "text-cyber-cyan font-bold" : "text-cyber-purple font-bold"}>
                        {stat.val}%
                      </span>
                    </div>
                    <div className={`h-2 bg-cyber-dark/85 rounded-sm overflow-hidden p-[1px] border ${
                      stat.glow === "cyan" ? "border-cyber-cyan/20" : "border-cyber-purple/20"
                    }`}>
                      <div
                        className={`h-full rounded-sm transition-all duration-1000 ${
                          stat.glow === "cyan" 
                            ? "bg-gradient-to-r from-cyber-cyan to-cyber-accent shadow-[0_0_8px_#00e5ff]"
                            : "bg-gradient-to-r from-cyber-purple to-pink-500 shadow-[0_0_8px_#7c3aed]"
                        }`}
                        style={{ width: `${stat.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "terminal" && (
              <div className="h-full flex flex-col justify-between font-mono text-xs sm:text-sm">
                <div className="flex-1 space-y-2 overflow-y-auto max-h-[220px] mb-3 pr-2">
                  {terminalHistory.map((hist, i) => (
                    <div
                      key={i}
                      className={
                        hist.type === "error"
                          ? "text-red-500 font-bold animate-pulse"
                          : hist.type === "success"
                          ? "text-cyber-success font-semibold text-glow-success"
                          : hist.type === "system"
                          ? "text-cyber-cyan"
                          : hist.type === "user"
                          ? "text-white"
                          : "text-cyber-dim"
                      }
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {hist.text}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
                
                {/* Input Prompt Form */}
                <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-cyber-cyan/15 pt-3.5">
                  <ChevronRight className="w-5 h-5 text-cyber-cyan animate-pulse" />
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="ENTER COMMAND..."
                    className="flex-1 bg-transparent border-0 outline-none text-white placeholder-cyber-cyan/25 tracking-widest uppercase focus:ring-0 focus:ring-offset-0 p-0 text-xs sm:text-sm"
                    autoFocus={activeTab === "terminal"}
                  />
                  <button type="submit" className="text-cyber-cyan hover:text-white transition-colors cursor-pointer">
                    <CornerDownLeft className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="bg-cyber-cyan/5 border-t border-cyber-cyan/15 px-6 py-2 text-[10px] text-cyber-dim flex justify-between items-center">
            <span>DEX MONITOR: OK</span>
            <span>SYSTEM CONSOLE: V1.0</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutConsole;
