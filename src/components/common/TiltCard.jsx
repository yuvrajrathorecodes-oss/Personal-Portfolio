import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard({
  children,
  className = '',
  maxRotation = 14,
  scaleOnHover = 1.025,
  glowColor = 'rgba(244, 176, 68, 0.25)',
  onClick,
  ...props
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural recoil
  const springConfig = { damping: 20, stiffness: 220, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxRotation, -maxRotation]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxRotation, maxRotation]);
  
  // Dynamic specular glare position
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    // Convert to normalized range [-0.5, 0.5]
    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;
    
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ duration: 0.2 }}
        className={`relative overflow-hidden rounded-2xl border border-slateBlue/20 bg-dark-700/80 backdrop-blur-md transition-shadow duration-300 ${
          isHovered ? 'shadow-2xl' : 'shadow-lg'
        } ${className}`}
        {...props}
      >
        {/* Ambient border glow when hovered */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 70%)`,
          }}
        />

        {/* Specular Glare Layer */}
        <motion.div
          animate={{ opacity: isHovered ? 0.35 : 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute inset-0 rounded-2xl z-20"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.25) 0%, transparent 60%)`,
          }}
        />

        {/* Content with 3D depth */}
        <div style={{ transform: 'translateZ(20px)' }} className="relative z-10 h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
