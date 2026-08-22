import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  onClick,
  href,
  target,
  rel,
  disabled = false,
  ...props
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 shine-sweep-wrapper cursor-pointer select-none overflow-hidden group";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary: "bg-orange text-white hover:bg-orange-light shadow-orange-sm hover:shadow-orange-md border border-orange-light/30 active:scale-95",
    secondary: "bg-dark-700/80 text-gold border border-gold/60 hover:bg-gold/10 hover:border-gold shadow-gold-sm hover:shadow-gold-md active:scale-95",
    outline: "bg-transparent text-slateBlue hover:text-gold border border-slateBlue/40 hover:border-gold/70 hover:bg-dark-600/40 active:scale-95",
    glow: "bg-gradient-to-r from-gold to-orange text-dark-900 font-semibold hover:from-gold-light hover:to-orange-light shadow-gold-md hover:shadow-orange-md active:scale-95"
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ y: -3 }}
      whileTap={{ y: 0 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Subtle background glow ripple */}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && iconPosition === 'left' && (
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            <Icon className="w-4 h-4" />
          </span>
        )}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            <Icon className="w-4 h-4" />
          </span>
        )}
      </span>
    </Component>
  );
}
