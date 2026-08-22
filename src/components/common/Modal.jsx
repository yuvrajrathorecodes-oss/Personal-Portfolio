import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaCheckCircle } from 'react-icons/fa';
import Button from './Button';

export default function Modal({ isOpen, onClose, project }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-dark-700 border border-gold/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-soft"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-dark-900/80 border border-slateBlue/30 text-soft hover:text-gold hover:border-gold transition-colors flex items-center justify-center cursor-pointer shadow-lg"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {/* Project Image Banner */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-dark-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-700 via-dark-700/40 to-transparent" />
              
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-orange/90 text-white text-xs font-semibold uppercase tracking-wider shadow-orange-sm">
                  {project.tag}
                </span>
                <span className="text-xs font-medium text-slateBlue">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                {project.title}
              </h3>
              
              <p className="text-slateBlue text-sm sm:text-base leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Highlights */}
              {project.highlights && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                    Key Highlights & Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-soft/90 bg-dark-800/60 p-2.5 rounded-xl border border-slateBlue/10">
                        <FaCheckCircle className="text-gold w-3.5 h-3.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slateBlue mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-dark-800 text-gold-light text-xs font-medium rounded-lg border border-gold/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slateBlue/15">
                {project.liveUrl && project.liveUrl !== '#' ? (
                  <Button
                    variant="primary"
                    size="sm"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={FaExternalLinkAlt}
                  >
                    Live Demo
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => alert(`Opening preview demo for ${project.title}`)}
                    icon={FaExternalLinkAlt}
                  >
                    View Project
                  </Button>
                )}

                {project.githubUrl && (
                  <Button
                    variant="secondary"
                    size="sm"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={FaGithub}
                  >
                    Source Code
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
