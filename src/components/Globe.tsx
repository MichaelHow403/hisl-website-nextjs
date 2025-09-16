'use client';

import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { motion, useDragControls } from 'framer-motion';
import * as THREE from 'three';

function Earth({ isInteractive = true, dragRotation = [0, 0, 0.41] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [earthDayMap] = useTexture(['/images/earth_daymap.jpg']);
  
  useFrame(() => {
    if (meshRef.current && !isInteractive) {
      meshRef.current.rotation.y += 0.001;
    } else if (meshRef.current && isInteractive) {
      meshRef.current.rotation.x = dragRotation[0];
      meshRef.current.rotation.y = dragRotation[1];
      meshRef.current.rotation.z = dragRotation[2];
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={earthDayMap} />
    </mesh>
  );
}

function InteractiveGlobe({ onDrag }: { onDrag: (deltaX: number, deltaY: number) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [earthDayMap] = useTexture(['/images/earth_daymap.jpg']);
  const orbitControlsRef = useRef<any>(null);

  return (
    <>
      <OrbitControls
        ref={orbitControlsRef}
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={6}
        rotateSpeed={0.5}
      />
      <mesh
        ref={meshRef}
        rotation={[0, 0, 0.41]}
        aria-label="Interactive 3D Earth globe"
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={earthDayMap} />
      </mesh>
      <Stars radius={100} depth={50} count={5000} factor={4} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
    </>
  );
}

export default function Globe({ isInteractive = true, className = '' }) {
  const [rotation, setRotation] = useState([0, 0, 0.41]);
  const dragControls = useDragControls();

  const handleDrag = (event: any, info: any) => {
    const deltaX = info.delta.x / 100;
    const deltaY = info.delta.y / 100;
    setRotation(prev => [
      prev[0] + deltaY,
      prev[1] + deltaX,
      prev[2]
    ]);
  };

  return (
    <motion.div 
      className={`relative ${className}`} 
      aria-label="3D Earth visualization"
      drag={isInteractive}
      dragControls={dragControls}
      onDrag={handleDrag}
      dragElastic={0.2}
      dragConstraints={{
        left: -100,
        right: 100,
        top: -100,
        bottom: 100,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="w-full h-full"
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {isInteractive ? (
            <Earth isInteractive={true} dragRotation={rotation} />
          ) : (
            <Earth isInteractive={false} />
          )}
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

// SSR-compatible dynamic export
export const GlobeSSR = dynamic(() => import('./Globe').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-lg">
      <div className="text-white text-sm">Loading globe...</div>
    </div>
  ),
});

import dynamic from 'next/dynamic';
