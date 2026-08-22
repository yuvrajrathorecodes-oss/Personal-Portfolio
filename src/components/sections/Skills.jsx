import React from 'react';
import { motion } from 'framer-motion';
import { TECHNICAL_SKILLS, PROFESSIONAL_SKILLS, OTHER_TOOLS } from '../../data/portfolioData';
import SectionHeading from '../common/SectionHeading';
import { SiPython, SiHtml5, SiTailwindcss, SiNodedotjs, SiJavascript, SiReact } from 'react-icons/si';

export default function Skills() {
  const iconMap = {
    SiPython,
    SiHtml5,
    SiTailwindcss,
    SiNodedotjs,
    SiJavascript,
    SiReact
  };

  // Circular progress component for Professional Skills
  const RadialProgress = ({ skill, index }) => {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="p-6 rounded-2xl bg-dark-700/60 border border-slateBlue/15 flex flex-col items-center text-center hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 group"
      >
        <div className="relative w-28 h-28 flex items-center justify-center mb-4">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="text-dark-900 stroke-current"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Animated progress ring */}
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              stroke={skill.color}
              strokeWidth="7"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.2 + index * 0.15, ease: 'easeOut' }}
              strokeLinecap="round"
              fill="transparent"
              style={{
                filter: `drop-shadow(0 0 6px ${skill.color}80)`
              }}
            />
          </svg>

          {/* Percentage value in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-white group-hover:text-gold transition-colors">
              {skill.level}%
            </span>
          </div>
        </div>

        <h4 className="text-base font-bold text-white mb-1 group-hover:text-gold transition-colors">
          {skill.name}
        </h4>
        <p className="text-xs text-slateBlue max-w-[160px]">
          {skill.description}
        </p>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Technical & Soft Skills"
          title="Skills &"
          highlight="Expertise"
          subtitle="Continuous learning and deliberate practice across modern web engineering, programming, and creative collaboration."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Technical Skills Linear Progress */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 bg-dark-700/60 p-6 sm:p-8 rounded-3xl border border-slateBlue/20 backdrop-blur-md"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slateBlue/15">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Technical Proficiency
                </h3>
                <p className="text-xs text-slateBlue mt-0.5">
                  Core languages, frameworks & developer tools
                </p>
              </div>
              <span className="px-3 py-1 bg-gold/15 text-gold text-xs font-semibold rounded-full border border-gold/30">
                Code Stack
              </span>
            </div>

            <div className="space-y-6">
              {TECHNICAL_SKILLS.map((skill, index) => {
                const Icon = iconMap[skill.icon] || SiJavascript;

                return (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 font-medium text-white">
                        <Icon className="w-4 h-4" style={{ color: skill.color }} />
                        <span>{skill.name}</span>
                        <span className="text-[11px] text-slateBlue font-normal ml-1">
                          ({skill.category})
                        </span>
                      </div>
                      <span className="font-bold text-gold font-mono">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Track */}
                    <div className="relative h-2.5 w-full bg-dark-900 rounded-full overflow-hidden border border-slateBlue/10 p-[1px]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-gold via-orange to-gold-light relative shadow-gold-sm"
                      >
                        {/* Shimmer light tip */}
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 rounded-full blur-[1px]" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Professional Skills (Radial Dials) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slateBlue/15">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Professional Qualities
                  </h3>
                  <p className="text-xs text-slateBlue mt-0.5">
                    Problem solving, teamwork and creativity
                  </p>
                </div>
                <span className="px-3 py-1 bg-orange/15 text-orange text-xs font-semibold rounded-full border border-orange/30">
                  Soft Skills
                </span>
              </div>

              {/* 2x2 Grid of Radial Dials */}
              <div className="grid grid-cols-2 gap-4">
                {PROFESSIONAL_SKILLS.map((skill, index) => (
                  <RadialProgress key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </div>

            {/* Other Tools & Technologies Pills */}
            <div className="mt-8 p-6 rounded-2xl bg-dark-700/40 border border-slateBlue/15">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                Tools, Libraries & Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {OTHER_TOOLS.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-dark-800 text-soft text-xs font-medium border border-slateBlue/20 hover:border-gold/50 hover:text-gold transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
