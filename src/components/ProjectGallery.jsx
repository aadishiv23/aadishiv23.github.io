import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Maximize2, Minimize2 } from 'lucide-react';

// --- Project Data (remains the same) ---
const projects = [
    { /* ... Radius data ... */
        id: 'radius',
        title: 'Radius',
        description: 'Real-time location tracking with AR capabilities',
        longDescription:
            'Radius is an innovative AR-powered location tracking application that helps users visualize and track locations in real-time using advanced augmented reality technology. Built natively for iOS.',
        tech: ['Swift', 'ARKit', 'CoreLocation', 'RealityKit'],
        image: '/videos/Radius_beta.mp4',
        mediaType: 'mobile',
        features: [
            'Real-time AR visualization of tracked locations',
            'Precise location tracking using CoreLocation',
            'Interactive AR annotations and distance display',
            'Customizable tracking parameters',
            'Integration with device compass and motion sensors',
        ],
        links: {
            // github: 'https://github.com/yourusername/radius',
            live: 'https://apps.apple.com/us/app/radius-get-moving/id6504736869',
        },
    },
    { /* ... macBoard data ... */
        id: 'macBoard',
        title: 'macBoard',
        description: 'SwiftUI-based MacOS clipboard manager',
        longDescription:
            'macBoard is a powerful, lightweight clipboard manager for MacOS designed to boost productivity. It keeps track of your copy history, allowing quick search and retrieval, all within a clean, native interface built using SwiftUI.',
        tech: ['Swift', 'SwiftUI', 'AppKit', 'CoreData'],
        image: '/images/macboard_img.png',
        mediaType: 'desktop',
        features: [
            'Persistent clipboard history tracking',
            'Fast full-text search across history items',
            'Configurable global hotkey for quick access',
            'Native MacOS look and feel with SwiftUI',
            'Low memory and CPU footprint',
            'Direct paste or copy to clipboard functionality',
        ],
        links: {
            github: 'https://github.com/aadishiv23/macBoard',
        },
    },
    { /* ... Plore data ... */
        id: 'plore',
        title: 'Plore',
        description: 'Visualize your fitness routes with HealthKit & MapKit',
        longDescription:
            'Plore is a SwiftUI fitness companion app that connects to Apple Health to visualize your walking, running, and cycling workouts on an interactive map. Fetches route data via HealthKit, simplifies it for performance, stores locally using Core Data, and leverages Swift Concurrency for smooth updates.',
        tech: ['Swift', 'SwiftUI', 'MapKit', 'HealthKit', 'CoreData', 'Swift Concurrency'],
        image: '/videos/plorerecording.mp4',
        mediaType: 'mobile',
        features: [
            'HealthKit integration for workout/route data retrieval',
            'Beautiful polyline map visualizations',
            'Core Data for local persistence & offline access',
            'Filtering routes by workout type',
            'Automatic background syncing with debouncing',
            'Dynamic map updates based on user location',
            'Performance optimizations using Swift Concurrency',
        ],
        links: {
            github: 'https://github.com/aadishiv23/Plore',
        },
    },
];


// --- Media Component (Handles rendering and layoutId) ---
const ProjectMediaDisplay = ({
  project,
  layoutId,
  objectFitClass = 'object-cover',
  className = '',
  inZoomView = false,
  onLoadSuccess, // <<< New prop to report dimensions
  ...props
}) => {
  const isVideo = project.image.endsWith('.mp4');
  const uniqueKey = `${layoutId}-${objectFitClass}-${inZoomView}`;

  // Memoize the handler using useCallback to prevent unnecessary re-renders
  const handleLoad = useCallback((event) => {
      if (onLoadSuccess) {
          const target = event.target;
          if (isVideo) {
              onLoadSuccess({ width: target.videoWidth, height: target.videoHeight });
          } else {
              onLoadSuccess({ width: target.naturalWidth, height: target.naturalHeight });
          }
      }
  }, [onLoadSuccess, isVideo]); // Dependencies for useCallback

  if (isVideo) {
      return (
          <motion.video
              key={uniqueKey}
              layoutId={layoutId}
              alt={`${project.title} ${inZoomView ? 'zoomed view' : 'preview'}`}
              className={`block ${objectFitClass} ${className}`}
              initial={false}
              playsInline
              onLoadedMetadata={handleLoad} // <<< Attach handler here
              {...props}
          >
              <source src={project.image} type="video/mp4" />
              Your browser does not support the video tag.
          </motion.video>
      );
  } else {
      return (
          <motion.img
              key={uniqueKey}
              layoutId={layoutId}
              src={project.image}
              alt={`${project.title} ${inZoomView ? 'zoomed view' : 'preview'}`}
              className={`block ${objectFitClass} ${className}`}
              initial={false}
              loading="lazy"
              onLoad={handleLoad} // <<< Attach handler here
              {...props}
          />
      );
  }
};


// --- Project Card Component (Refined UI) ---
const ProjectCard = ({ project, onClick }) => {
    const layoutId = `project-media-${project.id}`;

    return (
        <motion.div
            layout // Enable layout animations for the card itself
            className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg dark:shadow-black/30 overflow-hidden cursor-pointer group flex flex-col ring-1 ring-gray-200/50 dark:ring-gray-700/50"
            onClick={() => onClick(project)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -5,
                scale: 1.03,
                boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                // Optional: subtle border color change
                // ringColor: 'rgba(99, 102, 241, 0.5)' // Example: Indigo
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }} // Cubic bezier for smoother feel
        >
            {/* Media Container with Fixed Height & Background */}
            <div className={`relative w-full h-52 md:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700/40 dark:to-gray-800/60`}>
                <ProjectMediaDisplay
                    project={project}
                    layoutId={layoutId}
                    objectFitClass="object-contain" // Ensure full media is visible
                    className="absolute inset-0 w-full h-full p-1" // Padding within container
                    autoPlay
                    muted // Muted for grid preview
                    loop
                />
                {/* Subtle vignette effect */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/5 rounded-t-xl"></div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <motion.h3
                    layout="position"
                    className="text-lg font-semibold mb-1 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                >
                    {project.title}
                </motion.h3>
                <motion.p layout="position" className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                    {project.description}
                </motion.p>
                <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-100 dark:border-gray-700/50">
                    {project.tech.slice(0, 4).map((tech) => ( // Limit tags shown initially if desired
                        <span
                            key={tech}
                            className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 rounded text-xs font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                         <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700/60 text-gray-500 dark:text-gray-400 rounded text-xs font-medium">
                            +{project.tech.length - 4} more
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

// --- Project Modal Component (With Zoom Functionality) --
// --- Project Data (Assume it's defined above) ---
// --- ProjectMediaDisplay Component (Assume it's defined above - No changes needed) ---
// --- ProjectCard Component (Assume it's defined above - No changes needed) ---


// --- Project Modal Component (ADAPTIVE LAYOUT) ---
const ProjectModal = ({ project, onClose }) => {
  const [isMediaZoomed, setIsMediaZoomed] = useState(false);
  const [mediaDimensions, setMediaDimensions] = useState(null); // State for dimensions
  const layoutId = `project-media-${project.id}`;

  // Reset dimensions when project changes
  useEffect(() => {
      setMediaDimensions(null);
      setIsMediaZoomed(false); // Also reset zoom
  }, [project]);

  // Determine layout based on loaded dimensions
  // Default to 'false' (standard layout) until dimensions are loaded and height > width
  const isVerticalLayout = mediaDimensions
      ? mediaDimensions.height > mediaDimensions.width
      : false;

  // Handler passed to ProjectMediaDisplay
  const handleMediaLoadSuccess = useCallback((dimensions) => {
      setMediaDimensions(dimensions);
  }, []); // Empty dependency array, setMediaDimensions is stable

  // Effect for Escape key and scroll lock
  useEffect(() => {
      const handleEsc = (event) => {
         if (event.key === 'Escape') {
             if (isMediaZoomed) setIsMediaZoomed(false);
             else onClose();
         }
      };
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      return () => {
          window.removeEventListener('keydown', handleEsc);
           if (!document.querySelector('[data-modal-active="true"]:not([data-zoom-active="true"])')) {
               document.body.style.overflow = 'unset';
           }
      };
  }, [onClose, isMediaZoomed]);

  const handleZoomToggle = (e) => {
      e.stopPropagation();
      setIsMediaZoomed(!isMediaZoomed);
  };

  const stopPropagation = (e) => e.stopPropagation();

  // --- CONDITIONAL CLASSES based on isVerticalLayout ---
  const modalRootClasses = `
      bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative flex shadow-2xl ring-1 ring-black/5 dark:ring-white/10
      transition-all duration-300 ease-in-out // Add transition for potential layout shift
      ${isVerticalLayout ? 'flex-row' : 'flex-col'}
  `;
  const mediaContainerClasses = `
      relative bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out
      ${isVerticalLayout
          ? 'w-2/5 flex-shrink-0' // Fixed width column
          : 'w-full min-h-[250px] sm:min-h-[350px] md:min-h-[400px] rounded-t-xl' // Default: Full width row
      }
  `;
   const mediaElementWrapperClasses = `
      relative max-w-full max-h-full p-2  // Add padding around media
      ${isVerticalLayout ? 'h-full' : ''} // Allow height to fill in vertical layout
   `;
  const contentContainerClasses = `
      flex-1 flex flex-col transition-all duration-300 ease-in-out
      ${isVerticalLayout
          ? 'overflow-y-auto h-full' // Allow scroll, ensure full height
          : '' // Default: takes remaining space
      }
  `;
  const contentPaddingClasses = "p-6 md:p-8 space-y-6 flex-1 flex flex-col";


  return (
      <>
          {/* --- Modal Backdrop and Container --- */}
          <motion.div
              data-modal-active="true"
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              // ... (rest of backdrop props)
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              transition={{ duration: 0.3 }}
          >
              {/* Modal Content Box */}
              <motion.div
                  layout // Animate layout changes smoothly
                  className={modalRootClasses} // Use dynamic classes
                  // ... (rest of modal container props)
                  initial={{ scale: 0.9, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.95, y: 20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8, layout: { duration: 0.3 } }} // Add layout transition duration
                  onClick={stopPropagation}
              >
                  {/* Close Button */}
                  <button
                      // ... (close button props)
                      onClick={onClose}
                      className="absolute top-3 right-3 z-30 bg-gray-100/60 dark:bg-gray-900/60 backdrop-blur-sm text-gray-600 dark:text-gray-400 rounded-full p-1.5 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 hover:text-gray-900 dark:hover:text-gray-100 transition-all"
                      aria-label="Close project details"
                  >
                      <X size={20} />
                  </button>

                  {/* ===== Media Column/Row ===== */}
                  {/* Animate this container's layout changes */}
                  <motion.div layout className={mediaContainerClasses}>
                      {/* Wrapper to handle padding and centering */}
                      <div className={mediaElementWrapperClasses}>
                           {!isMediaZoomed && (
                              <ProjectMediaDisplay
                                  project={project}
                                  layoutId={layoutId}
                                  objectFitClass="object-contain"
                                  // Max height needed for both layouts
                                  className="max-w-full max-h-[85vh] w-auto h-auto rounded-lg shadow-md"
                                  controls
                                  autoPlay
                                  onLoadSuccess={handleMediaLoadSuccess} // <<< Pass handler
                              />
                          )}
                      </div>
                      {/* Zoom Button (positioned relative to media container) */}
                      {!isMediaZoomed && (
                           <button
                              onClick={handleZoomToggle}
                              className="absolute bottom-3 right-3 z-10 bg-gray-900/50 backdrop-blur-sm text-white rounded-full p-2 hover:bg-gray-900/80 transition-all"
                              aria-label="Zoom media"
                          >
                              <Maximize2 size={18} />
                          </button>
                       )}
                  </motion.div>

                  {/* ===== Content Column/Row ===== */}
                   {/* Animate this container's layout changes */}
                  <motion.div layout className={contentContainerClasses}>
                       {/* Inner div for padding and content */}
                      <div className={contentPaddingClasses}>
                          {/* Title */}
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-0">
                              {project.title}
                          </h2>

                          {/* Long Description */}
                           <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                              <p>{project.longDescription}</p>
                          </div>

                          {/* Features */}
                          {project.features?.length > 0 && (
                              <div>
                                  <h3 className="text-lg font-semibold mb-2.5 text-gray-800 dark:text-gray-200">Key Features</h3>
                                  <ul className="list-disc list-outside pl-5 space-y-1.5 text-gray-600 dark:text-gray-400 text-sm">
                                      {project.features.map((feature, index) => (
                                          <li key={index}>{feature}</li>
                                      ))}
                                  </ul>
                              </div>
                          )}

                           {/* Tech Stack */}
                          <div>
                              <h3 className="text-lg font-semibold mb-2.5 text-gray-800 dark:text-gray-200">Technologies</h3>
                              <div className="flex flex-wrap gap-2">
                                  {project.tech.map((tech) => (
                                      <span key={tech} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-200 rounded-full text-xs sm:text-sm font-medium">
                                          {tech}
                                      </span>
                                  ))}
                              </div>
                          </div>

                          {/* Buttons - mt-auto pushes to bottom */}
                          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700/60 mt-auto">
                             {project.links.github && ( /* ... github link ... */
                                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-500 transition-colors text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800">
                                      <Github size={16} /> Code
                                  </a>
                              )}
                              {project.links.live && ( /* ... live link ... */
                                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                                      <ExternalLink size={16} /> { project.links.live.includes('apple.com') ? 'App Store' : 'Live Demo' }
                                  </a>
                              )}
                          </div>
                      </div>
                  </motion.div>
              </motion.div>
          </motion.div>

          {/* --- Zoomed Media Overlay (No change) --- */}
          <AnimatePresence>
              {isMediaZoomed && (
                  <motion.div
                      // ... zoom overlay props ...
                      data-modal-active="true"
                      data-zoom-active="true"
                      className="fixed inset-0 bg-black/90 z-[60] flex flex-col items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsMediaZoomed(false)}
                      transition={{ duration: 0.2 }}
                  >
                       {/* Minimize Button */}
                       <button
                          // ... minimize button props ...
                          onClick={handleZoomToggle}
                          className="absolute top-4 right-4 z-10 bg-gray-100/10 backdrop-blur-sm text-white/70 rounded-full p-2 hover:bg-gray-100/20 hover:text-white transition-all"
                          aria-label="Minimize media"
                      >
                          <Minimize2 size={24} />
                      </button>

                       {/* Zoomed media container */}
                      <motion.div
                           // ... zoomed container props ...
                          className="relative"
                           onClick={stopPropagation}
                           initial={{ scale: 0.8 }}
                           animate={{ scale: 1 }}
                           exit={{ scale: 0.8 }}
                           transition={{ type: "spring", stiffness: 300, damping: 25 }}
                       >
                          <ProjectMediaDisplay
                              // ... zoomed media props ...
                              project={project}
                              layoutId={layoutId}
                              objectFitClass="object-contain"
                              className="max-w-[95vw] max-h-[85vh] w-auto h-auto rounded-lg shadow-xl"
                              controls
                              autoPlay
                              loop={project.image.endsWith('.mp4')}
                              inZoomView={true}
                              // No need for onLoadSuccess here, layout is fixed
                          />
                          {/* Caption */}
                           <motion.p
                               // ... caption props ...
                              className="text-center text-gray-300 mt-3 text-sm bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full inline-block absolute bottom-4 left-1/2 -translate-x-1/2"
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.1 }}
                           >
                              {project.title}
                          </motion.p>
                      </motion.div>
                  </motion.div>
              )}
          </AnimatePresence>
      </>
  );
};


// --- Main Project Gallery Component (Enhanced styles) ---
const ProjectGallery = () => {
    const [selectedProject, setSelectedProject] = useState(null);

     // Add global scrollbar styling (optional, targets WebKit browsers)
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            ::-webkit-scrollbar { width: 8px; height: 8px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background-color: rgba(150, 150, 150, 0.4); border-radius: 4px; }
            ::-webkit-scrollbar-thumb:hover { background-color: rgba(150, 150, 150, 0.6); }
            body.dark ::-webkit-scrollbar-thumb { background-color: rgba(100, 100, 100, 0.5); }
            body.dark ::-webkit-scrollbar-thumb:hover { background-color: rgba(100, 100, 100, 0.7); }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);


    return (
        // Nicer gradient, ensure text color contrast
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-black dark:to-indigo-950 pt-24 pb-20 text-gray-900 dark:text-gray-200 selection:bg-indigo-500 selection:text-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 md:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400 pb-2"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }} // Smoother elastic ease
                >
                    Project Showcase
                </motion.h1>

                {/* Grid View */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={setSelectedProject}
                        />
                    ))}
                </div>
            </div>

            {/* Modal & Zoom Logic */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectGallery;