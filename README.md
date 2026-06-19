# ⚡ CYBERPUNK 3D HUD DEVELOPER PORTFOLIO
### 🚀 Systems Engineering & Game Development Mission Interface
Developed by **Nagula Chetan Sai**

[![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![React](https://img.shields.io/badge/React-19.2.6-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r184-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.3.1-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40.0-FF00C1?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)

Welcome to **EA Portfolio Link Gate**, a premium, high-fidelity developer portfolio styled after a futuristic gaming Heads-Up Display (HUD) and tactical control console. Tailored specifically for game mechanics, logic, and systems engineering tracks, this interactive dashboard showcases a seamless combination of 3D graphics, procedural audio synthesis, and interactive CLI components.

---

## 🎮 Live System Features

### 1. **Reactive 3D Holographic Canvas**
* **Dynamic Backdrop**: A live 3D coordinate system built in **Three.js** with real-time mouse parallax camera movements.
* **Particle Fields & Cursor Push**: Over 1,200 particle streams flowing down the screen that physically warp and scatter away from the user's cursor.
* **Holographic Core Geometry**: Orbiting rings, wireframe geodesic spheres, and connected nodes that dynamically recalculate and draw linking lines on each animation frame.

### 2. **Procedural Web Audio API Sound Synthesizer**
* **Zero Asset Size**: Rather than loading bulky `.mp3` or `.wav` sound files over the network, sounds are generated **procedurally** using the browser's Web Audio API.
* **Futuristic Effects**: Custom oscillator wave sweeps and frequency envelopes mimic system boots, click triggers, hover blips, and folder access denials.

### 3. **Interactive Secure CLI Console**
* **Tabbed Summary BIOS**: Switch between profile dossiers, system metrics charts, and an interactive terminal.
* **Interactive Terminal Commands**: Input console directives like `help`, `dossier`, `stats`, `ea`, `secret`, and `clear` to explore hidden easter eggs, stats, and objectives.

### 4. **Modern Gamer HUD Sections**
* **Skills Arsenal**: A responsive weapons-loadout grid displaying technical competencies in Programming, Development, and Gaming-Relevant areas with 3D hover tilting card components.
* **Project Operations**: Visual cards representing complete project metrics, featuring a live **Dijkstra Path Finding Solver** animation utilizing SVGs and custom tick cycles.
* **Licensing & Credentials Grid**: Verified credentials display styled as security authorization cards with hover-sensitive scanlines.
* **Journey Chronology Pathway**: A clean step-by-step progress logging tracking development milestones and future targets.

---

## 🛠️ Tactical Weapons Loadout (Tech Stack)

* **Core Engine**: React 19.2.6 (Hooks, state routers, refs, conditional lifecycle events)
* **3D Renderer**: Three.js r184 (WebGL scenes, fog layers, point lights, mathematical orbital projections)
* **Aesthetics & Interface**: Tailwind CSS v4.3.1 (CSS variables, custom grid themes, glowing text, glassmorphism filters, laser sweep animations)
* **Animation Sequencer**: Framer Motion 12.40.0 (Layout transition matrices, micro-animations, physical ease sweeps)
* **Icon Core**: Lucide React (Cyber-themed visual symbols)

---

## 🧬 Architectural Overview

```
portfolio gd/
├── src/
│   ├── assets/              # Static SVG and image assets
│   ├── components/
│   │   ├── BootLoader.jsx   # Interactive system initializing loader
│   │   ├── ThreejsCanvas.jsx# 3D interactive particle scene and hologram
│   │   ├── NavbarHUD.jsx    # Sound control and sector header HUD
│   │   ├── HeroHUD.jsx      # Home landing layout and profile metrics
│   │   ├── AboutConsole.jsx # Bio information and interactive terminal emulator
│   │   ├── SkillsArsenal.jsx# Loadout skills grids with tilt-card physics
│   │   ├── ProjectsShowcase.jsx # Tilting project items with Dijkstra solver visualizer
│   │   ├── CertificationsGrid.jsx # Authorized licensing badge gallery
│   │   ├── JourneyTimeline.jsx # Progress sector logs timeline
│   │   └── ContactHUD.jsx   # Form communication relay node
│   ├── utils/
│   │   └── soundManager.js  # Procedural Audio Synth module (Web Audio API)
│   ├── App.jsx              # Main assembly layout container
│   ├── index.css            # Custom CSS themes, animations, scrollbars
│   └── main.jsx             # React DOM bootstrap
├── vite.config.js           # Vite bundle configuration with Tailwind v4
└── package.json             # Manifest specifications & dependencies
```

---

## ⚙️ Local Boot Sequence (Installation)

To deploy the dashboard locally:

### 1. **Acquire Assets**
Clone the repository to your local terminal:
```bash
git clone https://github.com/ChetanSai14/portfolio-gd.git
cd portfolio-gd
```

### 2. **Load Dependencies**
Install standard Node modules:
```bash
npm install
```

### 3. **Initiate Development Server**
Launch the local environment:
```bash
npm run dev
```

### 4. **Analyze Production Build**
Create and preview the production bundle:
```bash
npm run build
npm run preview
```

---

## 🛡️ License & Mission Directive
Developed as a showcase portfolio by **Nagula Chetan Sai**. 
All intellectual rights to designs, shaders, and synthesize profiles are maintained by the developer.

> **CHALLENGE EVERYTHING.** Target Objective: Gameplay & Core Software Engineering at Electronic Arts.

