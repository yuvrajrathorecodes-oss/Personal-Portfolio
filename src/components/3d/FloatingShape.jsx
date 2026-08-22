import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

export default function FloatingShape() {
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const groupRef = useRef();

  // Create subtle floating particles
  const particleCount = 70;
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sc = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sc[i] = Math.random() * 0.06 + 0.02;
    }
    return [pos, sc];
  }, []);

  const particlesRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    // Smooth mouse parallax interpolation
    if (groupRef.current) {
      const targetRotationX = pointer.y * 0.35;
      const targetRotationY = pointer.x * 0.45;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }

    // Outer wireframe rotation
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x += delta * 0.25;
      outerMeshRef.current.rotation.y += delta * 0.35;
    }

    // Inner glowing core counter-rotation
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.x -= delta * 0.3;
      innerMeshRef.current.rotation.z += delta * 0.2;
      // Subtle pulse scale
      const scale = 1 + Math.sin(t * 2) * 0.05;
      innerMeshRef.current.scale.set(scale, scale, scale);
    }

    // Orbital rings rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4;
      ring1Ref.current.rotation.y = t * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.35;
      ring2Ref.current.rotation.z = t * 0.25;
    }

    // Slow drift of particle starfield
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Gentle floating wrapper */}
      <Float
        speed={2.2}
        rotationIntensity={0.6}
        floatIntensity={1.2}
        floatingRange={[-0.15, 0.15]}
      >
        {/* Outer Geometric Wireframe (Icosahedron with Gold accents) */}
        <mesh ref={outerMeshRef} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#F4B044"
            wireframe={true}
            wireframeLinewidth={2}
            emissive="#F4B044"
            emissiveIntensity={0.35}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Inner Solid Shimmer Core (Dark Blue / Burnt Orange reflective) */}
        <mesh ref={innerMeshRef} scale={1.1}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial
            color="#162E3D"
            emissive="#E0680E"
            emissiveIntensity={0.25}
            roughness={0.15}
            metalness={0.9}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Inner Geometric Point Light for localized glow */}
        <pointLight position={[0, 0, 0]} color="#F4B044" intensity={2.5} distance={5} />
        <pointLight position={[1, 1, 1]} color="#E0680E" intensity={2.0} distance={4} />

        {/* Orbital Ring 1 - Warm Gold */}
        <mesh ref={ring1Ref} scale={2.3}>
          <torusGeometry args={[1, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#F4B044"
            emissive="#F4B044"
            emissiveIntensity={0.5}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Orbital Ring 2 - Burnt Orange / Slate */}
        <mesh ref={ring2Ref} scale={2.6}>
          <torusGeometry args={[1, 0.01, 16, 64]} />
          <meshStandardMaterial
            color="#88A5B7"
            emissive="#E0680E"
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* Floating Starfield Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#F4B044"
          transparent
          opacity={0.65}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
