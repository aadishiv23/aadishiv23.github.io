import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projects = [
    {
      id: 'radius',
      title: 'Radius',
      description: 'Real-time location tracking with AR capabilities',
      longDescription:
        'Radius is an innovative AR-powered location tracking application that helps users visualize and track locations in real-time using advanced augmented reality technology.',
      tech: ['Swift', 'ARKit', 'CoreLocation'],
      image: '/videos/Radius_beta.mp4',
      mediaType: 'mobile',
      features: [
        'Real-time AR visualization',
        'Precise location tracking',
        'Interactive AR markers',
        'Custom distance calculations',
      ],
      links: {
        github: 'https://github.com/yourusername/radius',
        live: 'https://apps.apple.com/us/app/radius-get-moving/id6504736869',
      },
    },
    {
      id: 'macBoard',
      title: 'macBoard',
      description: 'SwiftUI-based MacOS clipboard manager',
      longDescription:
        'macBoard is a powerful clipboard manager for MacOS that helps users efficiently manage their clipboard history with a clean, native interface built using SwiftUI.',
      tech: ['Swift', 'SwiftUI', 'AppKit'],
      image: '/images/macboard_img.png',
      mediaType: 'desktop',
      features: [
        'Clipboard history tracking',
        'Quick search functionality',
        'Customizable hotkeys',
        'Native MacOS integration',
      ],
      links: {
        github: 'https://github.com/aadishiv23/macBoard',
      },
    },
  ];

  const getGridMediaClass = (mediaType) => {
    return mediaType === 'mobile'
      ? 'h-[300px] md:h-[400px]'
      : 'h-[250px] md:h-[300px]';
  };

  const getModalMediaClass = (mediaType) => {
    return mediaType === 'mobile'
      ? 'max-h-[80vh] w-auto mx-auto'
      : 'max-w-[90%] w-auto mx-auto';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Projects
        </motion.h1>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className={`relative ${getGridMediaClass(
                    project.mediaType
                  )} overflow-hidden bg-gray-100 dark:bg-gray-700`}
                >
                  {project.image.endsWith('.mp4') ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={project.image} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal View */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedProject(null)}
        >
          <div className="min-h-screen px-4 py-8 flex items-center justify-center">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 text-gray-500 text-2xl"
              >
                ×
              </button>

              <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-gray-600 mb-4">{selectedProject.description}</p>
              <p className="text-gray-600 mb-6">{selectedProject.longDescription}</p>

              {/* Media */}
              <div className="mb-6">
                <div className={`${getModalMediaClass(selectedProject.mediaType)} rounded-lg overflow-hidden`}>
                  {selectedProject.image.endsWith('.mp4') ? (
                    <video autoPlay muted loop playsInline className="w-full h-full object-contain">
                      <source src={selectedProject.image} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain" />
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mb-6">
                <a href={selectedProject.links.github} className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                  <Github size={20} /> View Code
                </a>
                {selectedProject.links.live && (
                  <a href={selectedProject.links.live} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <ExternalLink size={20} /> Live Demo
                  </a>
                )}
              </div>

              {/* Features */}
              <h3 className="text-xl font-semibold mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {selectedProject.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectGallery;
