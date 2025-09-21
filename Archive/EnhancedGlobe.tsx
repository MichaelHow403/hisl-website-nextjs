'use client';

import { useRef, Suspense, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Sphere, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Atmospheric glow shader
const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  uniform vec3 glowColor;
  uniform float intensity;
  
  void main() {
    float glow = pow(1.2 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0) * intensity;
    gl_FragColor = vec4(glowColor, glow);
  }
`;

function Atmosphere() {
  const uniforms = useMemo(() => ({
    glowColor: { value: new THREE.Color(0.39, 0.84, 0.92) },
    intensity: { value: 0.8 }
  }), []);

  return (
    <Sphere args={[2.1, 32, 32]}>
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.BackSide}
      />
    </Sphere>
  );
}

function DataParticles() {
  const particles = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  const particleCount = 200;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 2.5 + Math.random() * 1.5;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#39d7c9"
        size={0.05}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
}

function EnhancedEarth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [earthDayMap] = useTexture(['/images/earth_daymap.jpg']);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <mesh ref={meshRef} rotation={[0, 0, 0.41]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthDayMap}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      <Atmosphere />
    </>
  );
}

function SparkleField() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sparkles
        count={100}
        scale={5}
        size={2}
        speed={0.4}
        color="#39d7c9"
        opacity={0.6}
      />
    </Float>
  );
}

export default function EnhancedGlobe({ className = '' }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`} aria-label="Enhanced 3D Earth visualization">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
          <div className="text-white text-sm">Loading enhanced globe...</div>
        </div>
      )}
      
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="w-full h-full"
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setIsLoaded(true)}
      >
        <color attach="background" args={['#0b1220']} />
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
        />
        
        <Suspense fallback={null}>
          <EnhancedEarth />
          <SparkleField />
          <DataParticles />
          <Stars radius={150} depth={60} count={8000} factor={6} saturation={0} fade />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={10}
          rotateSpeed={0.5}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

// SSR-compatible dynamic export
export const EnhancedGlobeSSR = dynamic(() => import('./EnhancedGlobe').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-lg">
      <div className="text-white text-sm">Loading enhanced globe...</div>
    </div>
  ),
});

import dynamic from 'next/dynamic';
