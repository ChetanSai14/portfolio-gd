import React, { useState } from "react";
import { soundManager } from "../utils/soundManager";
import { Award, ShieldCheck, CheckCircle, Brain, Terminal } from "lucide-react";

const CertificationBadge = ({ name, authority, idVal, icon: Icon, isPurple }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.playHover();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`cyber-glass border p-5 transition-all duration-300 flex items-start gap-4 relative clip-cyber-sm overflow-hidden min-h-[140px] ${
        isHovered
          ? isPurple
            ? "border-cyber-purple bg-cyber-deep/90 shadow-[0_0_15px_rgba(124,58,237,0.22)] -translate-y-1"
            : "border-cyber-cyan bg-cyber-deep/90 shadow-[0_0_15px_rgba(0,229,255,0.22)] -translate-y-1"
          : "border-cyber-cyan/10 bg-cyber-deep/45"
      }`}
    >
      {/* Light sweep inside badge on hover */}
      {isHovered && <div className="laser-line top-0 left-0 animate-scanline opacity-20" />}

      {/* Verification Stamp */}
      <div className={`p-3 border rounded-sm transition-all duration-300 ${
        isHovered 
          ? isPurple ? "border-cyber-purple bg-cyber-purple/10" : "border-cyber-cyan bg-cyber-cyan/10"
          : "border-cyber-cyan/20 bg-cyber-dark/40"
      }`}>
        <Icon className={`w-6 h-6 ${
          isHovered 
            ? isPurple ? "text-cyber-purple animate-pulse" : "text-cyber-cyan animate-pulse" 
            : "text-cyber-dim"
        }`} />
      </div>

      {/* Text Details */}
      <div className="flex-1 min-w-0 font-mono text-xs">
        <div className={`flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase mb-1 ${
          isPurple ? "text-cyber-purple" : "text-cyber-cyan"
        }`}>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>AUTHORIZED LICENSE</span>
        </div>
        <h4 className="text-white font-bold text-sm tracking-wide uppercase truncate mb-0.5" title={name}>
          {name}
        </h4>
        <p className="text-cyber-dim text-[10px] uppercase tracking-wider mb-2 font-semibold">
          ISSUED BY: <span className="text-white">{authority}</span>
        </p>

        {/* Verification Status */}
        <div className="border-t border-cyber-cyan/10 pt-2 flex items-center justify-between text-[8px] text-cyber-dim/50 tracking-wider">
          <span>KEY_HASH: {idVal}</span>
          <span className="flex items-center gap-0.5 text-cyber-success font-bold">
            <CheckCircle className="w-2.5 h-2.5" /> SECURE_OK
          </span>
        </div>
      </div>
    </div>
  );
};

const CertificationsGrid = () => {
  const certifications = [
    {
      name: "Oracle AI Foundations",
      authority: "Oracle",
      idVal: "ORCL-AI-93821-X",
      icon: Brain,
      isPurple: false,
    },
    {
      name: "IBM React Development",
      authority: "IBM",
      idVal: "IBM-RCT-55319-Y",
      icon: Terminal,
      isPurple: true,
    },
    {
      name: "Google AI for App Building",
      authority: "Google",
      idVal: "GOOG-AI-20834-K",
      icon: Brain,
      isPurple: false,
    },
    {
      name: "Oracle Database Management Systems",
      authority: "Oracle",
      idVal: "ORCL-DBMS-77291-Q",
      icon: Terminal,
      isPurple: true,
    },
    {
      name: "Deloitte Data Analytics Experience",
      authority: "Deloitte",
      idVal: "DLT-DA-48201-P",
      icon: Award,
      isPurple: false,
    },
  ];

  return (
    <section id="certifications" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 font-mono">
      {/* Title Header */}
      <div className="flex items-center gap-3 mb-10 border-b border-cyber-cyan/20 pb-4">
        <Award className="w-8 h-8 text-cyber-cyan text-glow-cyan animate-pulse" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white uppercase tracking-wider">
            LICENSING & CREDENTIALS
          </h2>
          <p className="text-[10px] text-cyber-cyan">VERIFIED SECURITY CERTIFICATES</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, index) => (
          <CertificationBadge
            key={index}
            name={cert.name}
            authority={cert.authority}
            idVal={cert.idVal}
            icon={cert.icon}
            isPurple={cert.isPurple}
          />
        ))}
      </div>
    </section>
  );
};

export default CertificationsGrid;
