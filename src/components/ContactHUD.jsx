import React, { useState, useEffect } from "react";
import { soundManager } from "../utils/soundManager";
import { MessageSquare, Mail, Send, ShieldAlert, Check, Terminal, FileText, Radio } from "lucide-react";

// Inline Github Icon Component
const Github = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Inline Linkedin Icon Component
const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ContactHUD = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, sending, success
  const [isHoveredLink, setIsHoveredLink] = useState(null);
  const [commsLog, setCommsLog] = useState("LINK_STANDBY: Awaiting transmission payload...");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      soundManager.playDenied();
      setCommsLog("TRANSMIT_ERROR: Secure channels require all fields filled.");
      alert("ERROR: Secure link requires all data fields to be filled before transmitting.");
      return;
    }

    soundManager.playClick();
    setStatus("sending");
    setCommsLog("ENCRYPTING PAYLOAD: Initiating AES-256 telemetry cipher...");

    // Simulate encryption and sending delay
    setTimeout(() => {
      setStatus("success");
      setCommsLog("TRANSMISSION_STABLE: Message loaded successfully into pipeline.");
      setFormData({ name: "", email: "", message: "" });
      soundManager.playBoot(); // Play success tone
      
      // Auto-reset message state after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setCommsLog("LINK_STANDBY: Ready for new instruction...");
      }, 5000);
    }, 2000);
  };

  const handleHoverLink = (id) => {
    setIsHoveredLink(id);
    if (id !== null) {
      soundManager.playHover();
    }
  };

  const channels = [
    {
      id: "email",
      label: "EMAIL ADDRESS",
      value: "chetansainagula143@gmail.com",
      url: "mailto:chetansainagula143@gmail.com",
      icon: Mail,
      isPurple: false,
    },
    {
      id: "github",
      label: "GITHUB DATABASE",
      value: "github.com/ChetanSai14",
      url: "https://github.com/ChetanSai14",
      icon: Github,
      isPurple: true,
    },
    {
      id: "linkedin",
      label: "LINKEDIN NETWORK",
      value: "linkedin.com/in/chetansai14",
      url: "https://linkedin.com/in/chetansai14",
      icon: Linkedin,
      isPurple: false,
    },
    {
      id: "resume",
      label: "DOSSIER ARCHIVE",
      value: "Download Resume.pdf",
      url: "#",
      icon: FileText,
      isPurple: true,
    },
  ];

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 font-mono">
      {/* Title Header */}
      <div className="flex items-center gap-3 mb-12 border-b border-cyber-cyan/20 pb-4">
        <MessageSquare className="w-8 h-8 text-cyber-cyan text-glow-cyan animate-pulse" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white uppercase tracking-wider">
            TACTICAL COMMS
          </h2>
          <p className="text-[10px] text-cyber-cyan">ESTABLISH SECURE CONNECTION MODULES</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Column: Direct Links */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="border border-cyber-cyan/15 bg-cyber-deep/60 p-5 rounded-sm clip-cyber-sm">
              <div className="flex items-center gap-2 text-cyber-cyan font-bold text-xs tracking-wider mb-2">
                <ShieldAlert className="w-4 h-4 text-cyber-cyan" />
                <span>COMMS SECURE ENCRYPT</span>
              </div>
              <p className="text-xs text-cyber-dim leading-relaxed font-sans font-medium">
                Initiating connection to candidate database. Recruiters can access direct archives or route transmissions through the AES-256 encrypted portal console.
              </p>
            </div>

            {/* Social channels tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {channels.map((chan) => {
                const Icon = chan.icon;
                const active = isHoveredLink === chan.id;
                return (
                  <a
                    key={chan.id}
                    href={chan.url}
                    onClick={(e) => {
                      if (chan.id === "resume") {
                        e.preventDefault();
                        soundManager.playClick();
                        alert("Downloading Resume: Nagula_Chetan_Sai_Resume.pdf...");
                      } else {
                        soundManager.playClick();
                      }
                    }}
                    onMouseEnter={() => handleHoverLink(chan.id)}
                    onMouseLeave={() => handleHoverLink(null)}
                    className={`block border p-4 transition-all duration-300 rounded-sm clip-cyber-sm relative overflow-hidden ${
                      active
                        ? chan.isPurple
                          ? "border-cyber-purple bg-cyber-purple/5 shadow-[0_0_12px_rgba(124,58,237,0.22)] -translate-y-0.5"
                          : "border-cyber-cyan bg-cyber-cyan/5 shadow-[0_0_12px_rgba(0,229,255,0.22)] -translate-y-0.5"
                        : "border-cyber-cyan/10 bg-cyber-deep/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 border rounded-sm transition-colors ${
                        active 
                          ? chan.isPurple ? "border-cyber-purple bg-cyber-purple/10 text-cyber-purple" : "border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan"
                          : "border-cyber-cyan/20 bg-cyber-dark/40 text-cyber-dim"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left font-mono">
                        <div className={`text-[8px] font-bold tracking-widest leading-none mb-1 ${
                          chan.isPurple ? "text-cyber-purple" : "text-cyber-cyan"
                        }`}>
                          {chan.label}
                        </div>
                        <div className="text-white text-xs font-bold truncate max-w-[150px] sm:max-w-xs">
                          {chan.value}
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <div className="text-[8px] text-cyber-dim border-t border-cyber-cyan/10 pt-4 flex items-center justify-between">
            <span>SECURE HANDSHAKE: ACTIVE</span>
            <span className="text-cyber-cyan">AES-256 STABLE</span>
          </div>
        </div>

        {/* Right Column: Encrypted Form */}
        <div className="lg:col-span-7 cyber-glass border border-cyber-cyan/15 clip-cyber p-6 sm:p-8 flex flex-col justify-between shadow-xl relative min-h-[420px] bg-cyber-deep/80 glow-border-cyan">
          
          {/* Laser line status indicator */}
          {status === "sending" && <div className="laser-line top-0 left-0 animate-scanline opacity-60" />}

          <div className="absolute top-0 right-0 p-1.5 bg-cyber-cyan/10 border-b border-l border-cyber-cyan/20">
            <Radio className="w-4 h-4 text-cyber-cyan animate-pulse" />
          </div>

          <div className="text-xs text-cyber-cyan font-bold tracking-widest border-b border-cyber-cyan/15 pb-2.5 mb-6 uppercase flex items-center gap-2">
            <Terminal className="w-4 h-4" /> TRANSMIT DATA COMMS CHANNEL
          </div>

          {status === "success" ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 font-mono">
              <div className="w-16 h-16 border-2 border-cyber-success rounded-full flex items-center justify-center bg-cyber-success/10 shadow-[0_0_15px_#00ff9d] animate-bounce">
                <Check className="w-8 h-8 text-cyber-success" />
              </div>
              <h4 className="text-cyber-success font-bold uppercase tracking-widest text-lg text-glow-success">
                TRANSMISSION ENCRYPTED & LOGGED
              </h4>
              <p className="text-xs text-slate-300 max-w-sm leading-relaxed font-sans font-medium">
                [ OK ] Message successfully loaded into telemetry pipeline. Chetan will decrypt and establish a return link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs sm:text-sm flex-1 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-cyber-cyan font-bold uppercase tracking-wider block">
                      SENDER IDENTIFIER [NAME]
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={status === "sending"}
                      placeholder="ENTER SENDER NAME..."
                      className="w-full bg-cyber-dark/95 border border-cyber-cyan/20 hover:border-cyber-cyan focus:border-cyber-cyan outline-none rounded-sm px-4 py-2.5 text-white placeholder-cyber-cyan/15 tracking-wider uppercase transition-all"
                    />
                  </div>
                  
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-cyber-cyan font-bold uppercase tracking-wider block">
                      RETURN CHANNEL [EMAIL]
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={status === "sending"}
                      placeholder="ENTER RETURN EMAIL..."
                      className="w-full bg-cyber-dark/95 border border-cyber-cyan/20 hover:border-cyber-cyan focus:border-cyber-cyan outline-none rounded-sm px-4 py-2.5 text-white placeholder-cyber-cyan/15 tracking-wider uppercase transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[9px] text-cyber-cyan font-bold uppercase tracking-wider block">
                    TRANSMISSION PAYLOAD [MESSAGE]
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={status === "sending"}
                    placeholder="WRITE DETAILS OR STRATEGIC PROPOSAL..."
                    className="w-full bg-cyber-dark/95 border border-cyber-cyan/20 hover:border-cyber-cyan focus:border-cyber-cyan outline-none rounded-sm px-4 py-2.5 text-white placeholder-cyber-cyan/15 tracking-wider uppercase transition-all resize-none"
                  />
                </div>
              </div>

              {/* Status Log Readout */}
              <div className="bg-cyber-dark/95 border border-cyber-cyan/10 p-2.5 rounded-sm text-[8px] text-cyber-dim tracking-wider uppercase">
                <span className="text-cyber-cyan font-bold animate-pulse">&gt;&gt; </span>
                {commsLog}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={status === "sending"}
                onMouseEnter={() => soundManager.playHover()}
                className="w-full group py-3 border border-cyber-cyan text-cyber-cyan font-bold tracking-widest text-xs hover:text-cyber-dark hover:bg-cyber-cyan hover:shadow-[0_0_15px_#00e5ff] clip-cyber-sm transition-all duration-300 transform active:scale-95 cursor-pointer relative overflow-hidden flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-cyber-cyan group-hover:text-cyber-dark" />
                <span>
                  {status === "sending" ? "TRANSMITTING DATA..." : "TRANSMIT PAYLOAD [ENTER]"}
                </span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactHUD;
