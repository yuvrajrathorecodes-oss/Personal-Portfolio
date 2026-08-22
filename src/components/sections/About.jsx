import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, STATS } from '../../data/portfolioData';
import SectionHeading from '../common/SectionHeading';
import TiltCard from '../common/TiltCard';
import Button from '../common/Button';
import { FaGraduationCap, FaCertificate, FaCode, FaLaptopCode, FaDownload, FaEnvelope } from 'react-icons/fa';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="About Me"
          title="Transforming Ideas Into"
          highlight="Digital Reality"
          subtitle="A blend of mathematical problem-solving, clean code architecture, and creative visual design."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: 3D Tilt Developer Showcase Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <TiltCard
              maxRotation={12}
              className="p-6 sm:p-8 bg-gradient-to-b from-dark-700 to-dark-900 border-gold/30 shadow-gold-sm hover:shadow-gold-md"
            >
              {/* Profile Illustration / Header container */}
              <div className="relative rounded-2xl overflow-hidden bg-dark-900 border border-slateBlue/20 p-6 flex flex-col items-center text-center">
                {/* Glowing Avatar Ring */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-gold via-orange to-gold-light shadow-gold-md mb-4">
                  <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center overflow-hidden border-2 border-dark-900">
                    {/* Stylized Developer Avatar Graphic */}
                    <div className="flex flex-col items-center justify-center text-gold">
                      <FaLaptopCode className="w-12 h-12 text-gold animate-bounce" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                  {/* Active dot */}
                  <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-400 border-2 border-dark-900 shadow-sm" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-gold font-semibold mb-4">
                  Frontend Developer | UI Designer | Content Creator
                </p>

                {/* Badges */}
                <div className="w-full space-y-2.5 pt-4 border-t border-slateBlue/15 text-left text-xs">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-dark-800/80 border border-slateBlue/15">
                    <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center text-gold flex-shrink-0">
                      <FaGraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slateBlue uppercase tracking-wider font-semibold">Education</div>
                      <div className="text-soft font-medium">{PERSONAL_INFO.education}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-dark-800/80 border border-slateBlue/15">
                    <div className="w-8 h-8 rounded-lg bg-orange/15 flex items-center justify-center text-orange flex-shrink-0">
                      <FaCertificate className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slateBlue uppercase tracking-wider font-semibold">Certification</div>
                      <div className="text-soft font-medium">{PERSONAL_INFO.certification}</div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column: Bio Narrative & Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-soft text-base leading-relaxed">
              <p className="text-lg font-medium text-white">
                Hello! I'm <span className="text-gold font-semibold">Yuvraj Rathaur</span>, a developer with a deep enthusiasm for creating elegant, responsive websites that combine interactive design with fast performance.
              </p>
              
              <p>
                {PERSONAL_INFO.bio}
              </p>
              
              <p className="text-slateBlue text-sm">
                My mathematical background hones my analytical thinking, algorithmic precision, and problem-solving tenacity. Whether developing Python tools, architecting interactive UI components in React, or producing compelling digital media content, I prioritize user delight and architectural clarity.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-dark-700/60 border border-slateBlue/15 text-center hover:border-gold/40 transition-colors"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-gold text-glow-gold">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slateBlue uppercase font-medium tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                variant="primary"
                href="#contact"
                icon={FaEnvelope}
              >
                Hire / Collaborate
              </Button>

              <Button
                variant="secondary"
                href="#projects"
                icon={FaCode}
              >
                Explore My Work
              </Button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
