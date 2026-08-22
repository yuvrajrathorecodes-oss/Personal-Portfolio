import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = ''
}) {
  const alignmentClass = align === 'left' ? 'text-left items-start' : 'text-center items-center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex flex-col ${alignmentClass} mb-14 md:mb-20 ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-4 shadow-gold-sm">
          <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
          <span>{badge}</span>
        </div>
      )}
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
        {title}{' '}
        {highlight && (
          <span className="text-gold text-glow-gold relative inline-block">
            {highlight}
            {/* Subtle underline wave */}
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold via-orange to-transparent rounded-full opacity-80" />
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-slateBlue max-w-2xl text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
