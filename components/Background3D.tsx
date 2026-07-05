"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

// 1. Camera Flight Controller based on Scroll Progress + Mouse Parallax
function CameraController() {
  useFrame((state) => {
    if (typeof window === "undefined") return;
    const scrollY = window.scrollY || 0;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1;
    const currentScrollPercent = scrollY / maxScroll;
    
    // Smooth flight coordinates (fly downwards & slightly forwards)
    const targetZ = 7.8 - currentScrollPercent * 4.2;
    const targetY = -currentScrollPercent * 18.0;
    
    // Parallax mouse coordinates
    const targetX = state.pointer.x * 1.4;
    const targetMouseY = state.pointer.y * 1.0;
    
    // LERP camera vectors
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY + targetMouseY - state.camera.position.y) * 0.04;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.04;
    
    // Look ahead
    state.camera.lookAt(state.camera.position.x * 0.4, targetY, 0);
  });
  return null;
}

// 2. Large scale Particle Stars background
function ParticleStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 400;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35; // stretched along height
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Slow drifting rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
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
        size={0.04}
        color="#00E5FF"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

// 3. Floating Wireframe Cubes
function FloatingCubes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 10;
  const cubes = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 30 - 2,
          (Math.random() - 0.5) * 8
        ] as [number, number, number],
        size: 0.15 + Math.random() * 0.3,
        rotSpeed: [
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ] as [number, number, number],
        color: Math.random() > 0.5 ? "#00E5FF" : "#7C3AED"
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((mesh, index) => {
      const cube = cubes[index];
      mesh.rotation.x += cube.rotSpeed[0];
      mesh.rotation.y += cube.rotSpeed[1];
      mesh.rotation.z += cube.rotSpeed[2];
      // Gentle height modulation
      mesh.position.y = cube.position[1] + Math.sin(t * 0.3 + index) * 0.15;
    });
  });

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i} position={cube.position}>
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
          <meshBasicMaterial
            color={cube.color}
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

// 4. Connected Neural Network Nodes & Line Connectors
function NeuralNetwork() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const nodesCount = 45;
  
  // Scatter points in space
  const [nodes, velocities, pointsPos] = useMemo(() => {
    const nds: [number, number, number][] = [];
    const vels: [number, number, number][] = [];
    const pos = new Float32Array(nodesCount * 3);
    for (let i = 0; i < nodesCount; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 28 - 2;
      const z = (Math.random() - 0.5) * 8;
      
      nds.push([x, y, z]);
      vels.push([
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003,
        (Math.random() - 0.5) * 0.003
      ]);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return [nds, vels, pos];
  }, []);

  useFrame(() => {
    if (!lineRef.current || !pointsRef.current) return;
    
    // 1. Update node coordinates
    for (let i = 0; i < nodesCount; i++) {
      nodes[i][0] += velocities[i][0];
      nodes[i][1] += velocities[i][1];
      nodes[i][2] += velocities[i][2];
      
      // Box limits
      if (Math.abs(nodes[i][0]) > 8) velocities[i][0] *= -1;
      if (Math.abs(nodes[i][1] + 2) > 15) velocities[i][1] *= -1;
      if (Math.abs(nodes[i][2]) > 6) velocities[i][2] *= -1;
    }
    
    // 2. Refresh points attributes
    const pointsAttr = pointsRef.current.geometry.attributes.position;
    if (pointsAttr) {
      for (let i = 0; i < nodesCount; i++) {
        pointsAttr.array[i * 3] = nodes[i][0];
        pointsAttr.array[i * 3 + 1] = nodes[i][1];
        pointsAttr.array[i * 3 + 2] = nodes[i][2];
      }
      pointsAttr.needsUpdate = true;
    }

    // 3. Rebuild lines geometry dynamically matching thresholds
    const pointsArray: number[] = [];
    const thresholdDist = 3.2;
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < thresholdDist) {
          pointsArray.push(...nodes[i], ...nodes[j]);
        }
      }
    }
    
    const lineGeo = lineRef.current.geometry;
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pointsArray), 3)
    );
    if (lineGeo.attributes.position) {
      lineGeo.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Node vertices */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointsPos, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#00E5FF"
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>

      {/* Network connector lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
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
      {/* HUD digital grids */}
      <div className="absolute inset-0 digital-grid opacity-15 pointer-events-none" />
      <div className="absolute inset-0 digital-grid-fine opacity-10 pointer-events-none" />

      {/* Dynamic glow spotlight in back */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-cyan/5 rounded-full blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-purple/5 rounded-full blur-[140px] pointer-events-none" />
      
      {/* 3D R3F Engine */}
      <Canvas camera={{ position: [0, 0, 7.8], fov: 55 } as any} gl={{ antialias: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.2} />
        <pointLight position={[8, 12, 10]} intensity={1.2} color="#00E5FF" />
        <pointLight position={[-8, -12, -8]} intensity={0.6} color="#7C3AED" />
        <fog attach="fog" args={["#050816", 5, 13]} />
        
        <CameraController />
        <ParticleStars />
        <FloatingCubes />
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
