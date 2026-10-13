import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { X, RotateCcw, Sun, Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';
import { Product } from '../../types';

interface Interactive3DViewerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string) => void;
  onOpenWhatsApp: (customMsg: string) => void;
}

export const Interactive3DViewer: React.FC<Interactive3DViewerProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenWhatsApp,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [lightingMode, setLightingMode] = useState<'quantum' | 'cyber' | 'midnight'>('quantum');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel] = useState<number>(3.5);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const lightsRef = useRef<{
    ambient: THREE.AmbientLight;
    main: THREE.DirectionalLight;
    point: THREE.PointLight;
  } | null>(null);

  useEffect(() => {
    if (!isOpen || !product || !mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, zoomLevel);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group for 3D Draped Form & Ornaments
    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    // 1. Draped Silk Cylinder with realistic folds
    const cylinderGeo = new THREE.CylinderGeometry(0.85, 1.25, 2.4, 64, 48, true);
    const pos = cylinderGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const theta = Math.atan2(pos.getZ(i), pos.getX(i));
      const y = pos.getY(i);
      const fold = Math.sin(theta * 10 + y * 2) * 0.08 + Math.cos(theta * 5) * 0.04;
      pos.setX(i, pos.getX(i) * (1 + fold));
      pos.setZ(i, pos.getZ(i) * (1 + fold));
    }
    cylinderGeo.computeVertexNormals();

    // Material in Royal Wine & Rose Gold Zari
    const fabricMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#421319'),
      emissive: new THREE.Color('#5E1821'),
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.4,
      clearcoat: 0.95,
      clearcoatRoughness: 0.15,
      sheen: 1.0,
      sheenRoughness: 0.25,
      sheenColor: new THREE.Color('#EBB8C0'),
      side: THREE.DoubleSide,
    });

    const fabricMesh = new THREE.Mesh(cylinderGeo, fabricMat);
    fabricMesh.position.y = -0.1;
    group.add(fabricMesh);

    // 2. Futuristic Rose Gold Zari Border Ring at bottom hem
    const borderRingGeo = new THREE.TorusGeometry(1.28, 0.06, 24, 64);
    const borderMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#EBB8C0'),
      emissive: new THREE.Color('#B96A73'),
      emissiveIntensity: 0.6,
      metalness: 0.95,
      roughness: 0.15,
    });
    const borderRing = new THREE.Mesh(borderRingGeo, borderMat);
    borderRing.rotation.x = Math.PI / 2;
    borderRing.position.y = -1.25;
    group.add(borderRing);

    // 3. Floating Quantum Sparks in Champagne & Rose
    const sparkCount = 45;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPositions = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount; i++) {
      const r = 1.3 + Math.random() * 0.6;
      const angle = Math.random() * Math.PI * 2;
      sparkPositions[i * 3] = Math.cos(angle) * r;
      sparkPositions[i * 3 + 1] = (Math.random() - 0.5) * 2.2;
      sparkPositions[i * 3 + 2] = Math.sin(angle) * r;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

    const sparkMat = new THREE.PointsMaterial({
      color: new THREE.Color('#FAF6F0'),
      size: 0.05,
      transparent: true,
      opacity: 0.9,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    group.add(sparks);

    // 4. Lighting Rig
    const ambient = new THREE.AmbientLight(0x2a121b, 1.5);
    const main = new THREE.DirectionalLight(0xebb8c0, 2.6);
    main.position.set(4, 5, 4);
    const point = new THREE.PointLight(0x731e1b, 4.0, 12);
    point.position.set(-3, -2, 2);

    scene.add(ambient);
    scene.add(main);
    scene.add(point);
    lightsRef.current = { ambient, main, point };

    // Interaction handlers
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x = Math.max(-0.6, Math.min(0.6, group.rotation.x + deltaY * 0.01));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x = Math.max(-0.6, Math.min(0.6, group.rotation.x + deltaY * 0.01));

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDragging) {
        group.rotation.y += delta * 0.45;
      }

      sparks.rotation.y += delta * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      window.removeEventListener('resize', handleResize);

      cylinderGeo.dispose();
      fabricMat.dispose();
      borderRingGeo.dispose();
      borderMat.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      renderer.dispose();
    };
  }, [isOpen, product, zoomLevel, isRotating]);

  // Handle Dynamic Lighting Mode
  useEffect(() => {
    if (!lightsRef.current) return;
    const { ambient, main, point } = lightsRef.current;

    if (lightingMode === 'quantum') {
      ambient.color.setHex(0x2a121b);
      ambient.intensity = 1.5;
      main.color.setHex(0xebb8c0);
      main.intensity = 2.6;
      point.color.setHex(0x731e1b);
    } else if (lightingMode === 'cyber') {
      ambient.color.setHex(0x351722);
      ambient.intensity = 1.8;
      main.color.setHex(0xffffff);
      main.intensity = 2.4;
      point.color.setHex(0xb96a73);
    } else {
      ambient.color.setHex(0x1a0a12);
      ambient.intensity = 0.9;
      main.color.setHex(0xb96a73);
      main.intensity = 2.8;
      point.color.setHex(0xebb8c0);
    }
  }, [lightingMode]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="glass-panel-futuristic rounded-3xl max-w-5xl w-full border border-[#B96A73]/40 overflow-hidden shadow-[0_0_50px_rgba(115,30,27,0.4)] relative flex flex-col lg:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0D0A10]/80 hover:bg-[#731E1B] text-[#EBB8C0] hover:text-white border border-[#B96A73]/30 flex items-center justify-center shadow-lg transition-all active:scale-95 cursor-pointer"
          aria-label="Close 3D View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: 3D Canvas Viewport */}
        <div className="lg:w-3/5 h-[340px] sm:h-[420px] lg:h-[540px] relative bg-radial from-[#2A1522] via-[#1A0E18] to-[#0A060C] flex items-center justify-center overflow-hidden">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Interactive 3D HUD Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0D0A10]/80 backdrop-blur-md border border-[#B96A73]/40 text-[11px] font-mono font-medium text-[#EBB8C0] shadow-[0_0_12px_rgba(185,106,115,0.3)]">
              <Sparkles className="w-3.5 h-3.5 text-[#EBB8C0]" /> 3D Spatial Hologram Matrix
            </span>
            <span className="text-[10px] text-[#9E9CA8] pl-1 font-mono">
              Drag to rotate 360° in spatial view
            </span>
          </div>

          {/* Lighting Mode Controls */}
          <div className="absolute bottom-4 left-4 bg-[#0D0A10]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B96A73]/30 flex items-center gap-1 shadow-sm font-mono">
            <Sun className="w-3.5 h-3.5 text-[#EBB8C0] mr-1" />
            <span className="text-[10px] text-[#EBB8C0] font-medium uppercase tracking-wider mr-1">Light:</span>
            {(['quantum', 'cyber', 'midnight'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setLightingMode(mode)}
                className={`px-2 py-0.5 text-[10px] rounded-full capitalize transition-colors cursor-pointer ${
                  lightingMode === mode
                    ? 'bg-gradient-to-r from-[#731E1B] to-[#B96A73] text-white font-semibold shadow-[0_0_8px_#B96A73]'
                    : 'text-[#9E9CA8] hover:bg-[#201426]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Auto-Rotation Toggle */}
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="absolute bottom-4 right-4 bg-[#0D0A10]/90 backdrop-blur-md p-2 rounded-full border border-[#B96A73]/30 text-[#EBB8C0] hover:bg-[#731E1B] hover:text-white shadow-sm transition-all active:scale-90 cursor-pointer"
            title={isRotating ? 'Pause Rotation' : 'Auto Rotate'}
          >
            <RotateCcw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
        </div>

        {/* Right Column: Specifications & Real Action */}
        <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#140D18]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#EBB8C0] font-bold">
                NEURAL CRAFT TELEMETRY
              </span>
              <div className="h-[1px] flex-1 bg-[#B96A73]/20" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white">
                {product.name}
              </h2>
              <p className="text-xl font-mono font-bold text-[#EBB8C0] mt-1">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Micro Fabric Specs */}
            <div className="space-y-2.5 text-xs text-[#E8DDD5] pt-2">
              <div className="p-3 bg-[#1C1220] rounded-2xl border border-[#B96A73]/20 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#9E9CA8] font-mono font-semibold block">
                  Textile Composition Matrix
                </span>
                <p className="font-medium text-white">{product.fabric}</p>
              </div>

              <div className="p-3 bg-[#1C1220] rounded-2xl border border-[#B96A73]/20 space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#9E9CA8] font-mono font-semibold block">
                  Weave Technique
                </span>
                <p className="font-medium text-white">{product.workType}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-mono">
                <div className="p-2.5 bg-[#1C1220] rounded-xl border border-[#B96A73]/20">
                  <span className="text-[#9E9CA8] block text-[10px]">Loom Density</span>
                  <span className="font-semibold text-[#EBB8C0]">12,400 strands/m</span>
                </div>
                <div className="p-2.5 bg-[#1C1220] rounded-xl border border-[#B96A73]/20">
                  <span className="text-[#9E9CA8] block text-[10px]">Zari Architecture</span>
                  <span className="font-semibold text-[#EBB8C0]">Metallic Micro-Thread</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 space-y-2.5">
            <button
              onClick={() => {
                onAddToCart(product, 1, product.sizes[0] || 'Free Size');
                onClose();
              }}
              className="w-full py-3 bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] hover:from-[#5C1614] hover:via-[#A25861] hover:to-[#D89EA7] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(185,106,115,0.45)] transition-all active:scale-98 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag (₹{product.price.toLocaleString('en-IN')})
            </button>

            <button
              onClick={() => {
                const msg = `Hi BOTEQ! I inspected the 3D hologram drape of "${product.name}" (₹${product.price.toLocaleString('en-IN')}). Can I see more photos or video call?`;
                onOpenWhatsApp(msg);
                onClose();
              }}
              className="w-full py-3 bg-[#1C1220] hover:bg-[#251829] text-[#EBB8C0] border border-[#B96A73]/40 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Video Consult on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
