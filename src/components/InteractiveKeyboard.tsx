import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { TECH_KEYS_DATA, TechKey } from '../data/portfolioData';
import { Terminal, Cpu, Code, Layers, Globe, Palette, Binary, Table, Eye, Zap, Box, GitBranch, Github, Cloud, X, Info, Sparkles } from 'lucide-react';

export const InteractiveKeyboard: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedKey, setSelectedKey] = useState<TechKey | null>(TECH_KEYS_DATA[0]);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(true);

  // Key mesh mapping for 3D clicks
  const keyMeshesRef = useRef<Map<THREE.Mesh, TechKey>>(new Map());

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 800;
    const height = Math.min(window.innerHeight * 0.55, 460);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 7.5, 9.5);
    camera.lookAt(0, -0.5, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.replaceChildren(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(5, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);

    // Colored rim lights (Cyberpunk accents)
    const orangeRimLight = new THREE.PointLight(0xff4f2a, 3.5, 20);
    orangeRimLight.position.set(-6, 3, 4);
    scene.add(orangeRimLight);

    const cyanRimLight = new THREE.PointLight(0x00d9ff, 3.5, 20);
    cyanRimLight.position.set(6, 3, -4);
    scene.add(cyanRimLight);

    // Keyboard Group
    const keyboardGroup = new THREE.Group();
    scene.add(keyboardGroup);

    // Keyboard Base Plate
    const baseGeo = new THREE.BoxGeometry(11, 0.6, 6.5);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.35,
      metalness: 0.85
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.3;
    baseMesh.receiveShadow = true;
    baseMesh.castShadow = true;
    keyboardGroup.add(baseMesh);

    // Orange chamfered accent rim around keyboard
    const rimGeo = new THREE.BoxGeometry(11.15, 0.1, 6.65);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xff4f2a,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0xff4f2a,
      emissiveIntensity: 0.3
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.position.y = -0.05;
    keyboardGroup.add(rimMesh);

    // Generate Keycaps
    const keyGeo = new THREE.BoxGeometry(1.2, 0.55, 1.2);

    // Layout grid: 3 rows
    const layout = [
      ['PY', 'C', 'JS', 'RCT', 'H5'],
      ['CS3', 'NP', 'PD', 'CV', 'FST'],
      ['3JS', 'GIT', 'GH', 'AWS']
    ];

    const keyMeshMap = new Map<THREE.Mesh, TechKey>();
    const originalPositions = new Map<THREE.Mesh, number>();

    layout.forEach((row, rowIndex) => {
      const rowOffsetZ = (rowIndex - 1) * 1.55;
      const count = row.length;
      const startX = -((count - 1) * 1.55) / 2;

      row.forEach((keyId, colIndex) => {
        const techData = TECH_KEYS_DATA.find((k) => k.key === keyId);
        if (!techData) return;

        // Custom canvas texture for Keycap Top (Key label)
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#1c1c1c';
          ctx.fillRect(0, 0, 256, 256);

          // Subtle border
          ctx.strokeStyle = techData.color;
          ctx.lineWidth = 10;
          ctx.strokeRect(8, 8, 240, 240);

          // Key symbol
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 74px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(techData.key, 128, 110);

          // Subtitle
          ctx.fillStyle = '#00D9FF';
          ctx.font = 'bold 28px JetBrains Mono, monospace';
          ctx.fillText(techData.name.split(' ')[0].toUpperCase(), 128, 185);
        }

        const texture = new THREE.CanvasTexture(canvas);
        const topMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.4,
          metalness: 0.5
        });

        const sideMaterial = new THREE.MeshStandardMaterial({
          color: 0x181818,
          roughness: 0.3,
          metalness: 0.6
        });

        // 6 materials for BoxGeometry: right, left, top, bottom, front, back
        const materials = [
          sideMaterial,
          sideMaterial,
          topMaterial,
          sideMaterial,
          sideMaterial,
          sideMaterial
        ];

        const keyMesh = new THREE.Mesh(keyGeo, materials);
        const posX = startX + colIndex * 1.55;
        const posY = 0.35;
        const posZ = rowOffsetZ;

        keyMesh.position.set(posX, posY, posZ);
        keyMesh.castShadow = true;
        keyMesh.receiveShadow = true;

        keyboardGroup.add(keyMesh);
        keyMeshMap.set(keyMesh, techData);
        originalPositions.set(keyMesh, posY);
      });
    });

    keyMeshesRef.current = keyMeshMap;

    // Raycasting for Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredMesh: THREE.Mesh | null = null;

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(keyMeshMap.keys());
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clicked = intersects[0].object as THREE.Mesh;
        const tech = keyMeshMap.get(clicked);
        if (tech) {
          setSelectedKey(tech);
          setPressedKey(tech.key);

          // Animate key depression
          const origY = originalPositions.get(clicked) ?? 0.35;
          clicked.position.y = origY - 0.22;
          setTimeout(() => {
            clicked.position.y = origY;
            setPressedKey(null);
          }, 180);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousemove', onPointerMove);
    domElement.addEventListener('click', onClick);

    // Drag to rotate keyboard
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
    };
    const onMouseMoveDrag = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      keyboardGroup.rotation.y += deltaX * 0.008;
      keyboardGroup.rotation.x = Math.max(-0.2, Math.min(0.6, keyboardGroup.rotation.x + deltaY * 0.006));
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMoveDrag);

    // Touch support
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      isDragging = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      keyboardGroup.rotation.y += deltaX * 0.008;
      keyboardGroup.rotation.x = Math.max(-0.2, Math.min(0.6, keyboardGroup.rotation.x + deltaY * 0.006));
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    domElement.addEventListener('touchstart', onTouchStart);
    domElement.addEventListener('touchend', onTouchEnd);
    domElement.addEventListener('touchmove', onTouchMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Subtle floating and ambient rotation when not dragging
      if (isRotating && !isDragging) {
        keyboardGroup.position.y = Math.sin(elapsed * 1.5) * 0.12;
        keyboardGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.12;
      }

      // Check raycaster hover
      raycaster.setFromCamera(mouse, camera);
      const meshes = Array.from(keyMeshMap.keys());
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hoveredMesh !== hit) {
          if (hoveredMesh) {
            const origY = originalPositions.get(hoveredMesh) ?? 0.35;
            hoveredMesh.position.y = origY;
          }
          hoveredMesh = hit;
          const origY = originalPositions.get(hit) ?? 0.35;
          hit.position.y = origY + 0.08;
          domElement.style.cursor = 'pointer';
        }
      } else {
        if (hoveredMesh) {
          const origY = originalPositions.get(hoveredMesh) ?? 0.35;
          hoveredMesh.position.y = origY;
          hoveredMesh = null;
        }
        domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = Math.min(window.innerHeight * 0.55, 460);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMoveDrag);
      domElement.removeEventListener('mousemove', onPointerMove);
      domElement.removeEventListener('click', onClick);
      domElement.removeEventListener('mousedown', onMouseDown);
      domElement.removeEventListener('touchstart', onTouchStart);
      domElement.removeEventListener('touchend', onTouchEnd);
      domElement.removeEventListener('touchmove', onTouchMove);
      renderer.dispose();
    };
  }, [isRotating]);

  const getTechIcon = (name: string) => {
    switch (name) {
      case 'Terminal': return Terminal;
      case 'Cpu': return Cpu;
      case 'Code': return Code;
      case 'Layers': return Layers;
      case 'Globe': return Globe;
      case 'Palette': return Palette;
      case 'Binary': return Binary;
      case 'Table': return Table;
      case 'Eye': return Eye;
      case 'Zap': return Zap;
      case 'Box': return Box;
      case 'GitBranch': return GitBranch;
      case 'Github': return Github;
      case 'Cloud': return Cloud;
      default: return Code;
    }
  };

  return (
    <div className="w-full">
      {/* Three.js Canvas Container */}
      <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#101010] to-[#090909] border border-white/10 shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#121212]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4F2A] animate-pulse" />
            <span className="font-mono text-xs text-neutral-300 uppercase tracking-widest font-semibold">
              HARDWARE EMULATION // 3D MECHANICAL MATRIX
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-3 py-1 rounded bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
            >
              {isRotating ? 'FLOAT: ON' : 'FLOAT: OFF'}
            </button>
            <span className="hidden sm:inline text-neutral-400">
              [DRAG TO ROTATE • CLICK KEY TO INSPECT]
            </span>
          </div>
        </div>

        {/* 3D Canvas Mount */}
        <div ref={mountRef} className="w-full h-[400px] sm:h-[450px] relative touch-none cursor-grab active:cursor-grabbing" />

        {/* Quick Select Key Badges for Mobile/Direct Touch */}
        <div className="p-4 bg-[#0A0A0A] border-t border-white/5 flex flex-wrap gap-1.5 justify-center">
          {TECH_KEYS_DATA.map((tk) => (
            <button
              key={tk.key}
              onClick={() => setSelectedKey(tk)}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all border ${
                selectedKey?.key === tk.key
                  ? 'bg-[#FF4F2A] text-white border-[#FF4F2A] shadow-md shadow-[#FF4F2A]/40'
                  : 'bg-neutral-900/90 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
              }`}
            >
              <span className="font-bold">{tk.key}</span>
              <span className="ml-1 opacity-70 hidden md:inline">{tk.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Key Details Card */}
      {selectedKey && (
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-white/10 shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center font-mono text-2xl font-black text-white shadow-lg shrink-0"
                style={{ backgroundColor: selectedKey.color }}
              >
                {selectedKey.key}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {selectedKey.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/10 text-neutral-300 border border-white/10">
                    {selectedKey.category}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#00D9FF] mt-0.5">
                  PROFICIENCY LEVEL: {selectedKey.proficiency}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
                ACTIVE KEY TELEMETRY
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed max-w-3xl">
              {selectedKey.description}
            </p>

            <button
              onClick={() => {
                const el = document.getElementById('code-playground');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800/80 hover:bg-[#FF4F2A] text-white text-xs font-mono tracking-wider transition-all duration-200 border border-neutral-700 shrink-0"
            >
              <Sparkles size={14} />
              EXPLORE CODE USAGE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
