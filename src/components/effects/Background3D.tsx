import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useHack } from '../../context/HackContext';

// --- 3D Background (Three.js) ---
export const Background3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isHackMode } = useHack();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particles
    const isMobile = window.innerWidth < 768;
    const particlesCount = (isHackMode ? 2000 : 1500) * (isMobile ? 0.5 : 1);
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: isHackMode ? 0.006 : 0.005,
      color: isHackMode ? 0x00ffff : 0xD4AF37, // Cyan or Gold
      transparent: true,
      opacity: isHackMode ? 0.6 : 0.5,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isInteracting = true; // Start true to ensure initial render
    let interactionTimeout: NodeJS.Timeout;
    let frameId: number;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.5;
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.5;
      
      if (!isInteracting) {
        isInteracting = true;
        loop(); // Restart loop if it was paused
      }
      
      clearTimeout(interactionTimeout);
      interactionTimeout = setTimeout(() => {
        isInteracting = false;
      }, 2000); // Stop rendering 2s after last interaction
    };

    window.addEventListener('mousemove', handleMouseMove);

    const loop = () => {
        if (!isInteracting && Math.abs(mouseX - targetX) < 0.001 && Math.abs(mouseY - targetY) < 0.001) {
            // Stop loop if not interacting and movement has settled
            return;
        }

        frameId = requestAnimationFrame(loop);
        
        // Constant rotation (only when interacting/rendering)
        particlesMesh.rotation.y += isHackMode ? 0.005 : 0.001;
        particlesMesh.rotation.x += (isHackMode ? 0.005 : 0.001) * 0.5;

        // Mouse follow
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (-targetY - mouseY) * 0.05;
        
        particlesMesh.position.x = mouseX;
        particlesMesh.position.y = -mouseY;

        renderer.render(scene, camera);
    };
    
    // Initial render sequence
    loop();
    
    // Ensure we render at least once on mount even if no mouse move
    renderer.render(scene, camera);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isHackMode]);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};
