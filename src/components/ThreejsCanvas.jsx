import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreejsCanvas = () => {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050816, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Ambient Lights ---
    const ambientLight = new THREE.AmbientLight(0x050816, 1.5);
    scene.add(ambientLight);

    const baseDirectional = new THREE.DirectionalLight(0x7c3aed, 2);
    baseDirectional.position.set(-5, 5, 3);
    scene.add(baseDirectional);

    // --- Mouse-Reactive Spotlight ---
    const mouseLight = new THREE.PointLight(0x00e5ff, 5, 10);
    scene.add(mouseLight);

    // --- Background Particle System ---
    const particleCount = 1200;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30; // X
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15; // Z
      speeds[i] = 0.01 + Math.random() * 0.02;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom circle glowing particle texture
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.2, "rgba(0, 229, 255, 0.8)");
      grad.addColorStop(0.6, "rgba(124, 58, 237, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.14,
      map: createParticleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- Left-Aligned 3D Holographic Avatar Group ---
    const hologramGroup = new THREE.Group();

    // Outer Sphere (Wireframe Cyan)
    const outerGeom = new THREE.SphereGeometry(1.0, 16, 16);
    const cyanWireMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const outerSphere = new THREE.Mesh(outerGeom, cyanWireMat);
    hologramGroup.add(outerSphere);

    // Inner Core (Icosahedron Purple)
    const innerGeom = new THREE.IcosahedronGeometry(0.55, 1);
    const purpleWireMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      wireframe: true,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.55,
    });
    const innerCore = new THREE.Mesh(innerGeom, purpleWireMat);
    hologramGroup.add(innerCore);

    // Orbital Rings
    const ringGeom = new THREE.RingGeometry(1.4, 1.43, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });

    const ring1 = new THREE.Mesh(ringGeom, ringMat1);
    const ring2 = new THREE.Mesh(ringGeom, ringMat2);
    
    // Rotate ring orientations
    ring1.rotation.x = Math.PI / 2.5;
    ring2.rotation.y = Math.PI / 3;
    hologramGroup.add(ring1, ring2);

    // Orbiting Floating Skill Nodes
    const nodeGeom = new THREE.SphereGeometry(0.08, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true });
    
    const skillNodes = [];
    const skillNodeLines = [];
    const numNodes = 4;

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.15,
    });

    for (let i = 0; i < numNodes; i++) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      hologramGroup.add(node);
      skillNodes.push(node);

      // Line connecting to inner core
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        node.position
      ]);
      const line = new THREE.Line(lineGeom, lineMaterial);
      hologramGroup.add(line);
      skillNodeLines.push(line);
    }

    // Set position and add hologram to scene
    hologramGroup.position.set(-3, 0.8, 0);
    hologramGroup.scale.set(1.3, 1.3, 1.3);
    scene.add(hologramGroup);

    // --- Responsiveness Layout ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w < 768) {
        // Mobile Layout: Center small hologram behind title
        hologramGroup.position.set(0, 1.8, -1);
        hologramGroup.scale.set(0.85, 0.85, 0.85);
      } else if (w < 1024) {
        hologramGroup.position.set(-1.8, 0.8, 0);
        hologramGroup.scale.set(1.0, 1.0, 1.0);
      } else {
        hologramGroup.position.set(-3, 0.8, 0);
        hologramGroup.scale.set(1.3, 1.3, 1.3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // --- Mouse Parallax & Spotlight Listener ---
    const handleMouseMove = (event) => {
      mouse.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Render Loop ---
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Camera Parallax swing
      camera.position.x = mouse.current.x * 1.8;
      camera.position.y = mouse.current.y * 1.8 + 0.5;
      camera.lookAt(0, 0.5, 0);

      // Move mouse spotlight
      mouseLight.position.set(mouse.current.x * 6, mouse.current.y * 5, 3);

      // Rotate Hologram structures
      if (hologramGroup) {
        hologramGroup.rotation.y = elapsedTime * 0.15 + mouse.current.x * 0.2;
        
        outerSphere.rotation.x = elapsedTime * 0.1;
        outerSphere.rotation.y = elapsedTime * 0.18;

        innerCore.rotation.x = -elapsedTime * 0.3;
        innerCore.rotation.y = -elapsedTime * 0.2;

        ring1.rotation.z = -elapsedTime * 0.4;
        ring2.rotation.z = elapsedTime * 0.3;

        // Orbit nodes around the hologram
        skillNodes.forEach((node, idx) => {
          const orbitAngle = elapsedTime * 0.8 + (idx * Math.PI) / 2;
          const radius = 1.4 + Math.sin(elapsedTime * 2 + idx) * 0.1;
          
          node.position.x = Math.sin(orbitAngle) * radius;
          node.position.y = Math.cos(orbitAngle) * radius * 0.4;
          node.position.z = Math.sin(orbitAngle * 1.5) * 0.6;

          // Update connection line geometry vertices
          const positionsArr = new Float32Array([
            0, 0, 0, // start
            node.position.x, node.position.y, node.position.z // end
          ]);
          skillNodeLines[idx].geometry.setAttribute("position", new THREE.BufferAttribute(positionsArr, 3));
          skillNodeLines[idx].geometry.attributes.position.needsUpdate = true;
        });

        // Floating hover movement
        hologramGroup.position.y = (window.innerWidth < 768 ? 1.8 : 0.8) + Math.sin(elapsedTime * 1.5) * 0.08;
      }

      // Animate background stars & cursor wave
      const positionsAttr = particleGeometry.attributes.position.array;
      const mouse3D = new THREE.Vector3(mouse.current.x * 6, mouse.current.y * 5, 0);

      for (let i = 0; i < particleCount; i++) {
        // Drift downwards
        positionsAttr[i * 3 + 1] -= speeds[i] * 0.2;
        
        // Reset top if boundary crossed
        if (positionsAttr[i * 3 + 1] < -10) {
          positionsAttr[i * 3 + 1] = 10;
          positionsAttr[i * 3] = (Math.random() - 0.5) * 30;
        }

        // Horizontal drift waves
        positionsAttr[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.001;

        // Cursor push force
        const dx = positionsAttr[i * 3] - mouse3D.x;
        const dy = positionsAttr[i * 3 + 1] - mouse3D.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2.2) {
          const force = (2.2 - dist) * 0.02;
          positionsAttr[i * 3] += (dx / dist) * force;
          positionsAttr[i * 3 + 1] += (dy / dist) * force;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      outerGeom.dispose();
      cyanWireMat.dispose();
      innerGeom.dispose();
      purpleWireMat.dispose();
      ringGeom.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      nodeGeom.dispose();
      nodeMat.dispose();
      lineMaterial.dispose();
      skillNodeLines.forEach(l => l.geometry.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ minHeight: "100vh" }}
    />
  );
};

export default ThreejsCanvas;
