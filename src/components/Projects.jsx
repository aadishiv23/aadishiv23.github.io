import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Placeholder Icons (replace with your actual icon paths) ---
const placeholderIcon = "/icons/placeholder-app.svg";
const radiusIcon = "/icons/radius-app.svg";
const macboardIcon = "/icons/macboard-app.svg";

// --- Helper for random colors (if placeholderColor is not defined) ---
const generateFallbackColor = (id) => {
  // Simple hash function to get a somewhat consistent color based on ID
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 80%)`; // Use HSL for pleasant colors
  return color;
};

// --- AppIcon Component ---
function AppIcon({ project, onClick }) {
  const [imgError, setImgError] = useState(false);
  const canOpen = !!project.media; // Check if the project has media to display

  const effectiveIcon = project.icon || placeholderIcon;
  const fallbackColor = project.placeholderColor || generateFallbackColor(project.id);

  useEffect(() => {
    // Reset error state if the icon src changes
    setImgError(false);
  }, [effectiveIcon]);

  const handleClick = () => {
    if (canOpen) {
      onClick();
    }
  };

  return (
    <motion.div
      layoutId={`project-card-${project.id}`} // Connects to the detail view
      onClick={handleClick}
      className={`flex flex-col items-center text-center ${
        canOpen
          ? 'cursor-pointer group' // Add group for potential inner hover effects
          : 'opacity-60 cursor-default'
      }`}
      whileTap={canOpen ? { scale: 0.90 } : {}}
      transition={{ duration: 0.2 }} // Faster tap animation
    >
      <motion.div
        className={`w-16 h-16 md:w-20 md:h-20 rounded-[22.5%] // iOS-like rounding
                   overflow-hidden shadow-md mb-2 flex items-center
                   justify-center relative ${canOpen ? 'group-hover:scale-105 transition-transform duration-150 ease-in-out' : ''}`}
        style={imgError ? { backgroundColor: fallbackColor } : {backgroundColor: '#e5e7eb'}} // Default bg while loading
      >
        {!imgError ? (
          <img
            src={effectiveIcon}
            alt={`${project.title} icon`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy" // Improve initial load performance
          />
        ) : (
          // Optional: Display initials or a generic icon on color background
          <span className="font-bold text-xl text-white opacity-70">
            {project.title?.[0]?.toUpperCase() || '?'}
          </span>
        )}
      </motion.div>
      <span className="text-xs md:text-sm dark:text-gray-200 text-gray-800 w-full px-1 truncate">
        {project.title}
      </span>
    </motion.div>
  );
}


// --- Main Projects Component ---
export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);
  const [isHoveringHomeArea, setIsHoveringHomeArea] = useState(false);

  const projects = [
    {
      id: 'radius',
      title: 'Radius',
      description: 'Real-time location tracking with AR capabilities',
      tech: ['Swift', 'ARKit', 'CoreLocation'],
      media: '/videos/Radius_beta.mp4',
      icon: radiusIcon,
      placeholderColor: '#a7f3d0', // Example color
    },
    {
      id: 'macBoard',
      title: 'macBoard',
      description: 'SwiftUI based MacOS clipboard manager',
      tech: ['Swift', 'SwiftUI', 'AppKit'],
      media: '/images/macboard_img.png',
      icon: macboardIcon,
      placeholderColor: '#bfdbfe', // Example color
    },
    // --- Placeholder Projects ---
    {
      id: 'placeholder1',
      title: 'Soon™',
      description: 'An exciting new project is coming.',
      tech: ['???'],
      media: null,
      icon: null, // Will use placeholder icon and generated color
    },
     {
      id: 'placeholder2',
      title: 'Ideas',
      description: 'Working on cool new concepts.',
      tech: ['Brain'],
      media: null,
       icon: null,
    },
     {
      id: 'placeholder3',
      title: 'Top Secret',
      description: 'Cannot disclose yet!',
      tech: ['Stealth'],
       media: null,
       icon: placeholderIcon, // Can explicitly use placeholder
       placeholderColor: '#fecaca',
    },
     {
      id: 'placeholder4',
      title: 'Project X',
      description: 'Exploratory phase.',
      tech: ['R&D'],
      media: null,
       icon: null,
    },
  ];

  const selectedProject = projects.find((p) => p.id === selectedId);

  const closeProject = () => {
    setSelectedId(null);
    setIsHoveringHomeArea(false); // Reset hover state on close
  };

  // Animation Variants for performance tuning
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cardVariants = {
     // hidden/visible implicitly handled by layoutId, but we can add fades
     hidden: { opacity: 0, scale: 0.95 },
     visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }, // Smoother ease
     exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.3 } }, // Slight delay for content
  };

  const dynamicIslandVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 10 },
    visible: { opacity: 1, scale: 1, y: -25, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    exit: { opacity: 0, scale: 0.5, y: 10, transition: { duration: 0.15 } },
  };


  return (
    <section id="projects" className="section-padding overflow-hidden">
      <div className="container mx-auto px-4 mt-5">
        <motion.h2
          className="text-4xl md:text-6xl font-bold gradient-text mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        {/* --- Home Screen Icon Grid --- */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-y-8 gap-x-4 justify-items-center mb-20">
          {projects.map((project) => (
            <AppIcon
              key={project.id}
              project={project}
              onClick={() => setSelectedId(project.id)}
            />
          ))}
        </div>

        {/* --- App Detail View (Animated Modal) --- */}
        {/* AnimatePresence initial={false} can sometimes help performance */}
        <AnimatePresence initial={false}>
          {selectedId && selectedProject && (
            <motion.div
              key="modal-backdrop" // Added key for AnimatePresence
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              variants={modalVariants} // Using variants
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.3, ease: "easeInOut" }} // Faster backdrop fade
            >
              {/* Background Overlay */}
               <motion.div
                   className="absolute inset-0 bg-black/60 backdrop-blur-md"
                   onClick={closeProject} // Close on overlay click
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.3 }}
               />

              {/* Card Content - uses layoutId */}
              <motion.div
                layoutId={`project-card-${selectedId}`} // Match the icon's layoutId
                className="relative z-10 bg-white dark:bg-gray-800 rounded-[2rem] // Larger, smoother radius
                           shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col"
                // Using variants for card *content* fade/scale, layout handles the morph
                // We apply cardVariants here to control the overall card appearance *during* the layout animation
                // Let layoutId handle the main transform/size animation
                 transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Match duration with layout
              >
                {/* Content Area - Animate content separately */}
                <motion.div
                    className="flex-grow overflow-y-auto p-4 md:p-6"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden" // Ensures content fades out on close
                >
                  {/* Media */}
                  <div className="mb-4 rounded-lg overflow-hidden bg-black flex justify-center items-center aspect-[16/9] md:aspect-video"> {/* Maintain aspect ratio more strictly if needed */}
                    {selectedProject.media.endsWith('.mp4') ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-contain" // Contain within the aspect ratio box
                        key={selectedProject.media} // Force re-render
                      >
                        <source src={selectedProject.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={selectedProject.media}
                        alt={selectedProject.title}
                        className="w-full h-full object-contain" // Contain within the aspect ratio box
                      />
                    )}
                  </div>

                  {/* Details */}
                  <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mb-2 px-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 px-2">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 px-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div> {/* End Content Area */}

                {/* --- Home Bar Area with Hover --- */}
                <div
                  className="relative flex-shrink-0 h-12 md:h-14 flex items-center justify-center mt-auto pb-2 md:pb-3"
                  onMouseEnter={() => setIsHoveringHomeArea(true)}
                  onMouseLeave={() => setIsHoveringHomeArea(false)}
                >
                  {/* The visible Home Bar */}
                  <motion.button
                    onClick={closeProject}
                    className="w-32 md:w-40 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full cursor-pointer"
                    aria-label="Close project details"
                    whileHover={{ backgroundColor: 'rgb(107 114 128)' }} // Use rgb for consistency
                    transition={{ duration: 0.1 }} // Quick hover feedback
                  />

                  {/* Dynamic Island Close Button */}
                  <AnimatePresence>
                    {isHoveringHomeArea && (
                      <motion.button
                        key="dynamic-close-button"
                        variants={dynamicIslandVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={closeProject}
                        className="absolute right-4 md:right-6 bottom-10 md:bottom-12 w-10 h-10 bg-gray-700/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
                        aria-label="Close project"
                      >
                         {/* Simple X icon */}
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div> {/* End Home Bar Area */}
              </motion.div> {/* End Card Content */}
            </motion.div> /* End Modal Backdrop */
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}