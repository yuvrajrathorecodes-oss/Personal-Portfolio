import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../../data/portfolioData';
import SectionHeading from '../common/SectionHeading';
import TiltCard from '../common/TiltCard';
import Modal from '../common/Modal';
import { FaExternalLinkAlt, FaGithub, FaEye, FaLock } from 'react-icons/fa';

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Web Application', 'Interactive Web', 'UI/UX & Web', 'Full Stack / Web', 'IoT & Embedded'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category.toLowerCase().includes(selectedFilter.toLowerCase()) || p.category === selectedFilter);

  const handleOpenProject = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative overflow-hidden bg-dark-900/50">
      {/* Background Accent */}
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Featured Works"
          title="Recent"
          highlight="Projects & Builds"
          subtitle="Explore selected applications, interactive experiments, and creative UI engineering."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                selectedFilter === category
                  ? 'bg-gold text-dark-900 font-bold shadow-gold-sm'
                  : 'bg-dark-700/60 text-slateBlue hover:text-white border border-slateBlue/15 hover:border-gold/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const isPlaceholder = project.isPlaceholder;

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <TiltCard
                    maxRotation={10}
                    scaleOnHover={1.025}
                    glowColor={isPlaceholder ? 'rgba(136, 165, 183, 0.2)' : 'rgba(244, 176, 68, 0.3)'}
                    className={`h-full flex flex-col justify-between group overflow-hidden cursor-pointer ${
                      isPlaceholder ? 'border-dashed border-slateBlue/30 opacity-85' : 'hover:border-gold/60'
                    }`}
                    onClick={() => handleOpenProject(project)}
                  >
                    <div>
                      {/* Image Thumbnail with Overlay */}
                      <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-t-xl bg-dark-900">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-dark-800/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Top Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            isPlaceholder ? 'bg-slateBlue/80 text-dark-900' : 'bg-orange text-white shadow-orange-sm'
                          }`}>
                            {project.tag}
                          </span>
                        </div>

                        {/* Hover Overlay Action Icons */}
                        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-dark-950/60 backdrop-blur-[2px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenProject(project);
                            }}
                            aria-label="Preview details"
                            className="w-10 h-10 rounded-full bg-gold text-dark-900 flex items-center justify-center hover:scale-110 transition-transform shadow-gold-sm"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="View Github Repository"
                              onClick={(e) => e.stopPropagation()}
                              className="w-10 h-10 rounded-full bg-dark-700 border border-slateBlue/30 text-soft hover:text-gold hover:border-gold flex items-center justify-center hover:scale-110 transition-transform"
                            >
                              <FaGithub className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          {isPlaceholder && (
                            <span className="flex items-center gap-1 text-[10px] text-slateBlue font-medium">
                              <FaLock className="w-2.5 h-2.5 text-gold" /> In Progress
                            </span>
                          )}
                        </div>

                        <p className="text-soft/80 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                          {project.description}
                        </p>

                        {/* Tech Tag Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slateBlue/15">
                          {project.tech.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 rounded-md bg-dark-800 text-[11px] font-medium text-slateBlue border border-slateBlue/15"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md bg-dark-800 text-[10px] font-medium text-gold/80">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="px-5 sm:px-6 pb-5 pt-0 flex items-center justify-between text-xs font-semibold">
                      <span className="text-gold group-hover:text-orange transition-colors flex items-center gap-1">
                        <span>Details & Preview</span>
                        <FaExternalLinkAlt className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-slateBlue text-[11px] font-normal">
                        {project.category}
                      </span>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </section>
  );
}
