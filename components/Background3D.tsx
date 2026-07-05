"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const count = 350;
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Random coords in 3D box
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      
      // Random velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Rotate slowly based on mouse position
    const targetX = mouse.x * 0.15;
    const targetY = mouse.y * 0.15;
    pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;

    // Gentle constant drift
    pointsRef.current.rotation.z += 0.0004;
    
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (posAttr) {
      for (let i = 0; i < count; i++) {
        // Apply velocity
        posAttr.array[i * 3] += velocities[i * 3];
        posAttr.array[i * 3 + 1] += velocities[i * 3 + 1];
        posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

        // Boundary checks
        if (Math.abs(posAttr.array[i * 3]) > 8) velocities[i * 3] *= -1;
        if (Math.abs(posAttr.array[i * 3 + 1]) > 8) velocities[i * 3 + 1] *= -1;
        if (Math.abs(posAttr.array[i * 3 + 2]) > 8) velocities[i * 3 + 2] *= -1;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#00E5FF"
        transparent
        opacity={0.65}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = -2 + Math.sin(t * 0.5) * 0.3;
    meshRef.current.rotation.x = t * 0.05;
    meshRef.current.rotation.y = t * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[4, -2, -3]}>
      <sphereGeometry args={[1.6, 24, 24]} />
      <meshPhysicalMaterial
        color="#7C3AED"
        emissive="#7C3AED"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.9}
        transparent
        opacity={0.25}
        wireframe
      />
    </mesh>
  );
}

export default function Background3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050816]">
      {/* Dynamic Digital Grid */}
      <div className="absolute inset-0 digital-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 digital-grid-fine opacity-15 pointer-events-none" />

      {/* Radial overlay gradient for lighting depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,8,22,0.1)_0%,#050816_80%)] pointer-events-none" />
      
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 7], fof: 60 } as any} gl={{ antialias: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00E5FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#7C3AED" />
        <ParticleNetwork />
        <GlowingOrb />
      </Canvas>
    </div>
  );
}
