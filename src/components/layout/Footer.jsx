import React from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from '../../data/portfolioData';
import { FaGithub, FaLinkedinIn, FaInstagram, FaWhatsapp, FaDiscord, FaTwitter, FaArrowUp, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const iconMap = {
    FaGithub,
    FaLinkedinIn,
    FaInstagram,
    FaWhatsapp,
    FaDiscord,
    FaTwitter
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-dark-900 border-t border-slateBlue/15 pt-16 pb-12 overflow-hidden text-soft">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slateBlue/10">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-orange p-[1.5px] shadow-gold-sm">
                <div className="w-full h-full bg-dark-900 rounded-[10px] flex items-center justify-center">
                  <span className="font-bold text-gold text-base">YR</span>
                </div>
              </div>
              <span className="text-white font-bold text-lg tracking-wide">
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p className="text-slateBlue text-sm max-w-md leading-relaxed">
              {PERSONAL_INFO.tagline}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-soft font-medium">
                {PERSONAL_INFO.status}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slateBlue hover:text-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span className="text-gold/60 text-xs">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Connect & Socials */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">
              Connect With Me
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((item) => {
                const IconComponent = iconMap[item.icon] || FaGithub;
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="w-9 h-9 rounded-xl bg-dark-700/80 border border-slateBlue/20 flex items-center justify-center text-soft hover:text-gold hover:border-gold hover:shadow-gold-sm transition-all duration-300 hover:-translate-y-1"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            <div className="mt-5 text-xs text-slateBlue">
              <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-gold hover:underline">{PERSONAL_INFO.email}</a></p>
              <p className="mt-1">Phone: <a href={`tel:${PERSONAL_INFO.phone}`} className="text-soft hover:underline">{PERSONAL_INFO.phone}</a></p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slateBlue">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Crafted with{' '}
            <FaHeart className="w-3 h-3 text-orange inline mx-0.5" /> using React, Three.js & Tailwind.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-700/80 border border-slateBlue/20 text-soft hover:text-gold hover:border-gold transition-all duration-300 group cursor-pointer shadow-sm"
          >
            <span>Back to top</span>
            <FaArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform text-gold" />
          </button>
        </div>
      </div>
    </footer>
  );
}
