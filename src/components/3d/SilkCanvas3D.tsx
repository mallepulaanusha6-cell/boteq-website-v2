import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SilkCanvas3DProps {
  interactive?: boolean;
}

export const SilkCanvas3D: React.FC<SilkCanvas3DProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 1. Undulating Royal Wine & Rose Gold Cyber Silk Plane
    const planeGeo = new THREE.PlaneGeometry(18, 11, 52, 40);
    const posAttr = planeGeo.attributes.position;
    const initialZ = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      initialZ[i] = posAttr.getZ(i);
    }

    // High-tech Deep Wine & Rose Silk Material
    const silkMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#421319'),
      emissive: new THREE.Color('#5E1821'),
      emissiveIntensity: 0.45,
      roughness: 0.35,
      metalness: 0.35,
      clearcoat: 0.95,
      clearcoatRoughness: 0.15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
    });

    const silkMesh = new THREE.Mesh(planeGeo, silkMat);
    silkMesh.rotation.x = -0.35;
    silkMesh.rotation.y = 0.12;
    silkMesh.position.set(1.0, 0.2, -1.2);
    scene.add(silkMesh);

    // 2. Quantum Cyber Grid Particle Points in Champagne Ivory & Dusty Rose
    const particleCount = prefersReducedMotion ? 45 : 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 9;
      particleScales[i] = Math.random() * 0.9 + 0.3;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    // Custom circular glowing rose & champagne particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(235, 184, 192, 0.9)');
      grad.addColorStop(0.7, 'rgba(185, 106, 115, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Rose & Wine Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x2d121c, 1.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xebb8c0, 2.6);
    dirLight1.position.set(5, 7, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.PointLight(0x731e1b, 4.5, 18);
    dirLight2.position.set(-5, -2, 3);
    scene.add(dirLight2);

    // Mouse & Scroll Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY * 0.0015;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.2 : 0.7;

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollY += (targetScrollY - scrollY) * 0.05;

      const pos = planeGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);

        const wave1 = Math.sin(u * 0.65 + elapsed * speed + mouseX * 1.6) * 0.45;
        const wave2 = Math.cos(v * 0.75 + elapsed * speed * 0.85 + mouseY * 1.6) * 0.35;
        const wave3 = Math.sin((u + v) * 0.45 + elapsed * speed * 1.1) * 0.2;

        pos.setZ(i, wave1 + wave2 + wave3);
      }
      pos.needsUpdate = true;
      planeGeo.computeVertexNormals();

      silkMesh.rotation.z = Math.sin(elapsed * 0.18) * 0.03 + mouseX * 0.08;
      silkMesh.position.y = 0.2 + Math.cos(elapsed * 0.28) * 0.1 - scrollY * 0.5;

      particles.rotation.y = elapsed * 0.05 + mouseX * 0.06;
      particles.rotation.x = Math.sin(elapsed * 0.04) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      planeGeo.dispose();
      silkMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
