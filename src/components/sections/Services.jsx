import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../data/portfolioData';
import SectionHeading from '../common/SectionHeading';
import TiltCard from '../common/TiltCard';
import { FaCode, FaPalette, FaGlobe, FaVideo, FaCheck, FaArrowRight } from 'react-icons/fa';

export default function Services() {
  const iconMap = {
    Code: FaCode,
    Palette: FaPalette,
    Globe: FaGlobe,
    Video: FaVideo
  };

  return (
    <section id="services" className="py-20 md:py-28 relative overflow-hidden bg-dark-900/40">
      {/* Ambient lighting */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Specialized Services"
          title="High Quality"
          highlight="Solutions & Craft"
          subtitle="Combining technical precision and creative visual mastery to deliver complete end-to-end digital assets."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon] || FaCode;
            const isGold = service.accent === 'gold';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="h-full"
              >
                <TiltCard
                  maxRotation={12}
                  scaleOnHover={1.03}
                  glowColor={isGold ? 'rgba(244, 176, 68, 0.3)' : 'rgba(224, 104, 14, 0.3)'}
                  className="h-full p-6 sm:p-7 flex flex-col justify-between group hover:border-gold/50"
                >
                  <div>
                    {/* Icon header */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                          isGold
                            ? 'bg-gold/15 text-gold border border-gold/30 shadow-gold-sm group-hover:scale-110'
                            : 'bg-orange/15 text-orange border border-orange/30 shadow-orange-sm group-hover:scale-110'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-black text-slateBlue/20 group-hover:text-gold/40 transition-colors">
                        0{service.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-soft/80 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Feature bullet list */}
                    <ul className="space-y-2 mb-6 pt-4 border-t border-slateBlue/15">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slateBlue">
                          <FaCheck className={`w-3 h-3 flex-shrink-0 ${isGold ? 'text-gold' : 'text-orange'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card footer CTA */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold group-hover:text-orange transition-colors pt-2"
                  >
                    <span>Request Quote</span>
                    <FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </a>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
