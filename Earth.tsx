'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface EarthProps {
  isInteractive?: boolean;
  dragRotation?: [number, number, number];
}

export default function Earth({ isInteractive = true, dragRotation }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [earthDayMap] = useTexture(['/images/earth_daymap.jpg']);
  
  useFrame(() => {
    if (meshRef.current && !isInteractive) {
      meshRef.current.rotation.y += 0.001;
    } else if (meshRef.current && isInteractive && dragRotation) {
      meshRef.current.rotation.x = dragRotation[0];
      meshRef.current.rotation.y = dragRotation[1];
      meshRef.current.rotation.z = dragRotation[2];
    }
  });

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0.41]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={earthDayMap} />
    </mesh>
  );
}
