import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, PERSONAL_INFO } from '../../data/portfolioData';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import Button from '../common/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sectionIds = NAV_LINKS.map(link => link.href.replace('#', ''));
  const activeSection = useScrollSpy(sectionIds, 150);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-orange p-[1.5px] shadow-gold-sm group-hover:shadow-gold-md transition-shadow">
            <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
              <span className="font-bold text-gold text-lg tracking-wider">YR</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-base tracking-wide flex items-center gap-1 group-hover:text-gold transition-colors">
              {PERSONAL_INFO.name.split(' ')[0]}
              <span className="text-orange">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slateBlue">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-dark-700/60 p-1.5 rounded-full border border-slateBlue/15 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-slateBlue hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-gold/20 to-orange/20 border border-gold/40 rounded-full shadow-gold-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Let's Talk
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-xl bg-dark-700/80 border border-slateBlue/20 text-soft flex items-center justify-center hover:text-gold hover:border-gold transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <HiX className="w-6 h-6 text-gold" /> : <HiMenuAlt3 className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-dark-900/95 border-b border-slateBlue/20 backdrop-blur-xl px-4 pt-4 pb-6 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-gold/15 text-gold border border-gold/30'
                        : 'text-slateBlue hover:text-white hover:bg-dark-700/50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
                  </a>
                );
              })}
              
              <div className="pt-3 mt-2 border-t border-slateBlue/15">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  Contact Me
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
