'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import Image from 'next/image';
import { DataCenter, latLngToVector3 } from '@/data/data-centers';
import { pickBest } from '@/lib/imagery';

interface GlobeSceneProps {
  dataCenters: DataCenter[];
  selectedDataCenter?: DataCenter | null;
  onDataCenterClick?: (dataCenter: DataCenter) => void;
  animationPath?: THREE.Vector3[];
  showPulse?: boolean;
  className?: string;
}

// Earth component with texture
function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  
  // Try to get earth texture from imagery manifest, fallback to a solid color
  const earthTextureSrc = pickBest('earth/earth_daymap', 2400).src || '/images/earth_daymap.jpg';
  
  const earthTexture = useTexture(earthTextureSrc, (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  });

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002; // Slow rotation
    }
  });

  return (
    <Sphere ref={earthRef} args={[1, 64, 64]} position={[0, 0, 0]}>
      <meshPhongMaterial 
        map={earthTexture} 
        transparent={false}
        shininess={0.1}
      />
    </Sphere>
  );
}

// Cloud layer component
function Clouds() {
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.001; // Slower than earth
    }
  });

  return (
    <Sphere ref={cloudsRef} args={[1.01, 32, 32]} position={[0, 0, 0]}>
      <meshPhongMaterial 
        transparent 
        opacity={0.1}
        color="#ffffff"
        side={THREE.DoubleSide}
      />
    </Sphere>
  );
}

// Data center pin component
function DataCenterPin({ 
  dataCenter, 
  isSelected, 
  onClick 
}: { 
  dataCenter: DataCenter; 
  isSelected: boolean;
  onClick: () => void;
}) {
  const pinRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const position = useMemo(() => {
    const [lng, lat] = dataCenter.coordinates;
    const pos = latLngToVector3(lat, lng, 1.02);
    return [pos.x, pos.y, pos.z] as [number, number, number];
  }, [dataCenter.coordinates]);

  useFrame(() => {
    if (pinRef.current) {
      const scale = isSelected ? 1.5 : hovered ? 1.2 : 1.0;
      pinRef.current.scale.setScalar(scale);
    }
  });

  const color = useMemo(() => {
    if (isSelected) return '#ffd700'; // Gold for selected
    switch (dataCenter.provider) {
      case 'AWS': return '#ff9900';
      case 'Google Cloud': return '#4285f4';
      case 'Microsoft Azure': return '#0078d4';
      case 'Anthropic': return '#d4a574';
      case 'OpenAI': return '#10a37f';
      default: return '#ffffff';
    }
  }, [dataCenter.provider, isSelected]);

  return (
    <mesh
      ref={pinRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.01, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

// Raven sprite component (simplified as moving points for now)
function RavenSprite({ 
  index, 
  total 
}: { 
  index: number; 
  total: number;
}) {
  const ravenRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ravenRef.current) {
      const time = state.clock.elapsedTime;
      const speed = 0.5 + index * 0.1;
      const radius = 1.2;
      const inclination = (index / total) * Math.PI * 0.3; // Inclined orbits
      
      const x = Math.cos(time * speed) * radius * Math.cos(inclination);
      const y = Math.sin(inclination) * radius;
      const z = Math.sin(time * speed) * radius * Math.cos(inclination);
      
      ravenRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={ravenRef}>
      <sphereGeometry args={[0.005, 4, 4]} />
      <meshBasicMaterial color="#2c1810" />
    </mesh>
  );
}

// Pulse animation component
function PulseAnimation({ 
  path, 
  show 
}: { 
  path: THREE.Vector3[]; 
  show: boolean;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useFrame(() => {
    if (!show || !pulseRef.current || path.length === 0) return;
    
    const nextIndex = (currentIndex + 1) % path.length;
    const currentPos = path[currentIndex];
    const nextPos = path[nextIndex];
    
    // Interpolate between positions
    const alpha = (Date.now() % 1000) / 1000;
    const interpolated = currentPos.clone().lerp(nextPos, alpha);
    
    pulseRef.current.position.copy(interpolated);
    
    if (alpha > 0.9) {
      setCurrentIndex(nextIndex);
    }
  });

  if (!show || path.length === 0) return null;

  return (
    <mesh ref={pulseRef}>
      <sphereGeometry args={[0.008, 6, 6]} />
      <meshBasicMaterial color="#00ff88" />
    </mesh>
  );
}

// Main scene component
function Scene({ 
  dataCenters, 
  selectedDataCenter, 
  onDataCenterClick, 
  animationPath = [],
  showPulse = false 
}: Omit<GlobeSceneProps, 'className'>) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 0, 3);
  }, [camera]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />

      {/* Earth and clouds */}
      <Earth />
      <Clouds />

      {/* Data center pins */}
      {dataCenters.map((dataCenter) => (
        <DataCenterPin
          key={dataCenter.id}
          dataCenter={dataCenter}
          isSelected={selectedDataCenter?.id === dataCenter.id}
          onClick={() => onDataCenterClick?.(dataCenter)}
        />
      ))}

      {/* Ravens (simplified as orbiting points) */}
      {Array.from({ length: 3 }, (_, i) => (
        <RavenSprite key={i} index={i} total={3} />
      ))}

      {/* Pulse animation */}
      <PulseAnimation path={animationPath} show={showPulse} />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={1.5}
        maxDistance={5}
        autoRotate={false}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main GlobeScene component
export default function GlobeScene({
  dataCenters,
  selectedDataCenter,
  onDataCenterClick,
  animationPath = [],
  showPulse = false,
  className = ''
}: GlobeSceneProps) {
  const [isClient, setIsClient] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isClient) {
    return (
      <div className={`bg-black rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-white">Loading globe...</div>
      </div>
    );
  }

  if (!webGLSupported || prefersReducedMotion) {
    // Fallback to static image
    const fallbackImage = pickBest('starfields/reach_for_the_stars', 1200).src || '/images/reach_for_the_stars.png';
    
    return (
      <div className={`bg-black rounded-lg relative overflow-hidden ${className}`}>
        <Image 
          src={fallbackImage}
          alt="Starfield - Where Your Prompts Go"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-4 bg-black/50 rounded">
            <h3 className="text-lg font-semibold mb-2">Where Your Prompts Go</h3>
            <p className="text-sm opacity-80">
              {prefersReducedMotion 
                ? 'Interactive globe disabled due to motion preferences'
                : 'WebGL not supported - showing static view'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-black rounded-lg overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene
          dataCenters={dataCenters}
          selectedDataCenter={selectedDataCenter}
          onDataCenterClick={onDataCenterClick}
          animationPath={animationPath}
          showPulse={showPulse}
        />
      </Canvas>
    </div>
  );
}
