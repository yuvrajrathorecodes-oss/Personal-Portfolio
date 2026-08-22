import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingShape from './FloatingShape';

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center pointer-events-auto">
      {/* Subtle background radial light glow behind 3D shape */}
      <div className="absolute inset-0 bg-radial-gradient from-gold/10 via-orange/5 to-transparent blur-3xl rounded-full pointer-events-none transform -translate-y-4" />

      <Canvas
        camera={{ position: [0, 0, 5.8], fov: isMobile ? 50 : 42 }}
        dpr={[1, 2]} // Crisp rendering on high-DPI screens without overtaxing GPU
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full"
      >
        {/* Soft Ambient Light */}
        <ambientLight intensity={0.8} />

        {/* Directional Lights emphasizing Gold and Burnt Orange highlights */}
        <directionalLight position={[5, 5, 4]} intensity={1.5} color="#F4B044" />
        <directionalLight position={[-5, -4, -2]} intensity={1.2} color="#E0680E" />
        <pointLight position={[0, 4, 3]} intensity={1.0} color="#88A5B7" />

        <Suspense fallback={null}>
          <FloatingShape />
        </Suspense>
      </Canvas>

      {/* Decorative Corner Coordinate Accents */}
      <div className="absolute bottom-2 right-4 hidden sm:flex items-center gap-2 text-[10px] text-slateBlue/60 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
        <span>3D R3F ENGINE // 60 FPS</span>
      </div>
    </div>
  );
}
