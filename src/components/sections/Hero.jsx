import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../data/portfolioData';
import HeroScene from '../3d/HeroScene';
import Button from '../common/Button';
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp, FaDiscord, FaTwitter, FaArrowRight, FaEnvelope, FaChevronDown } from 'react-icons/fa';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const iconMap = {
    FaGithub,
    FaLinkedinIn,
    FaInstagram,
    FaWhatsapp,
    FaDiscord,
    FaTwitter
  };

  // Rotating Typewriter Effect for roles
  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[roleIndex];
    let typingSpeed = isDeleting ? 45 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 lg:py-0 overflow-hidden bg-grid-pattern"
    >
      {/* Dynamic Background Light Spots */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-orange/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Intro text and CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dark-700/80 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-6 shadow-gold-sm"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              <span>Available for Freelance & Internships</span>
            </motion.div>

            {/* Main Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
              Hi, I'm{' '}
              <span className="text-gold text-glow-gold relative inline-block">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Rotating Role Tagline */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slateBlue mr-2">
                I'm a
              </span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange text-glow-orange flex items-center">
                {displayedText}
                <span className="w-0.5 h-6 sm:h-8 bg-orange ml-1 inline-block animate-pulse" />
              </span>
            </div>

            {/* Subtitle Intro Line */}
            <p className="text-soft text-base sm:text-lg max-w-xl leading-relaxed mb-8 font-normal">
              {PERSONAL_INFO.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleScrollTo('projects')}
                icon={FaArrowRight}
              >
                View Projects
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleScrollTo('contact')}
                icon={FaEnvelope}
              >
                Contact Me
              </Button>
            </div>

            {/* Social Icons Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2">
              <span className="text-xs uppercase tracking-widest text-slateBlue font-medium">
                Follow Me:
              </span>
              <div className="flex items-center gap-2.5">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = iconMap[item.icon] || FaGithub;
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="w-10 h-10 rounded-xl bg-dark-700/80 border border-slateBlue/25 flex items-center justify-center text-soft hover:text-gold hover:border-gold hover:shadow-gold-sm transition-all duration-300 hover:-translate-y-1"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Focal Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <HeroScene />
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        onClick={() => handleScrollTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 cursor-pointer text-slateBlue hover:text-gold transition-colors z-20"
      >
        <span className="text-[11px] uppercase tracking-widest font-medium">Scroll Down</span>
        <FaChevronDown className="w-3.5 h-3.5 text-gold" />
      </motion.div>
    </section>
  );
}
