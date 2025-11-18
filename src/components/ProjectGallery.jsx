import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Maximize2, Minimize2 } from 'lucide-react';

// --- Project Data ---
const projects = [
  {
    id: 'radius',
    title: 'Radius',
    description: 'Real-time location sharing with AR visualizations and social presence.',
    longDescription:
      'Radius is a privacy-minded location sharing app that pairs realtime presence with spatial storytelling. Swift and Go services stream updates to 500+ concurrent users while RealityKit scenes anchor friends in AR, perfect for campus meetups.',
    tech: ['Swift', 'Go', 'PostgreSQL', 'Swift Concurrency', 'ARKit', 'RealityKit'],
    image: '/videos/Radius_beta.mp4',
    mediaType: 'mobile',
    features: [
      'Handles 10,000+ concurrent requests with Go microservices and PostgreSQL.',
      'Live location handoff to SwiftUI map, backed by Swift Concurrency pipelines.',
      'Presence-aware notifications and social circles that adapt to proximity.',
      'RealityKit prototype pins friends in AR with anchored coordinates.',
      'Interactive geofences created via map pins or address search.',
    ],
    accent: '#0ea5e9',
    links: {
      live: 'https://apps.apple.com/us/app/radius-get-moving/id6504736869',
    },
  },
  {
    id: 'iris',
    title: 'Iris',
    description: 'An on-device assistant powered by a custom 3B-parameter MLX model.',
    longDescription:
      'Iris is a local-first, privacy-respecting assistant that blends Apple Intelligence-style tooling with personal context. Built with MLX and CSM-MLX models, Iris keeps latency under five seconds while orchestrating Swift actions.',
    tech: ['Swift', 'MLX', 'CSM-MLX', 'Swift Concurrency', 'Vision'],
    image: null,
    fallback: {
      gradientClass: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-400',
      glyph: 'AI',
    },
    mediaType: 'desktop',
    features: [
      'Custom 3B-parameter model distilled for on-device inference.',
      'Tool calling architecture without JSON payload overhead.',
      'Multi-modal chat interface mixing text, voice, and screenshots.',
      'Latencies optimized from 10s+ down to ~5s with bespoke parsers.',
      'Runs fully locally across macOS + iOS with shared state.',
    ],
    accent: '#a855f7',
    links: {
      github: 'https://github.com/aadishiv23',
    },
  },
  {
    id: 'pillpals',
    title: 'PillPals',
    description: 'A medication companion tailored for patients experiencing memory loss.',
    longDescription:
      'PillPals is a SwiftUI app co-designed with caregivers to keep medication schedules approachable. App Intents and WidgetKit surface gentle reminders while HealthKit sync keeps clinicians looped in.',
    tech: ['Swift', 'SwiftUI', 'HealthKit', 'WidgetKit', 'App Intents'],
    image: null,
    fallback: {
      gradientClass: 'bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-200',
      glyph: 'RX',
    },
    mediaType: 'mobile',
    features: [
      'WidgetKit timeline cards with friendly, high-contrast reminders.',
      'HealthKit integration for medication adherence insights.',
      'App Intents for hands-free updates via Siri or Shortcuts.',
      'User testing improved usability scores by 40% versus baseline.',
      'Caregiver handoff view highlights trends and missed doses.',
    ],
    accent: '#f97316',
    links: {
      github: 'https://github.com/aadishiv23',
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
  const mediaSrc = project.image;
  const hasMedia = Boolean(mediaSrc);
  const isVideo = hasMedia ? mediaSrc.endsWith('.mp4') : false;
  const uniqueKey = `${layoutId}-${objectFitClass}-${inZoomView}`;
  const fallback = project.fallback;

  if (!hasMedia && fallback) {
    return (
      <motion.div
        key={`${layoutId}-fallback`}
        layoutId={`${layoutId}-fallback`}
        className={`flex items-center justify-center ${objectFitClass} ${className} ${fallback.gradientClass || 'bg-slate-400'}`}
        initial={false}
        {...props}
      >
        <span className="text-white text-3xl font-semibold tracking-wide">{fallback.glyph || project.title[0]}</span>
      </motion.div>
    );
  }

  if (!hasMedia) {
    return (
      <motion.div
        key={`${layoutId}-blank`}
        layoutId={`${layoutId}-blank`}
        className={`flex items-center justify-center ${objectFitClass} ${className} bg-slate-400`}
        initial={false}
        {...props}
      >
        <span className="text-white text-2xl font-semibold">{project.title?.charAt(0) || '?'}</span>
      </motion.div>
    );
  }

  // Memoize the handler using useCallback to prevent unnecessary re-renders
  const handleLoad = useCallback((event) => {
      if (onLoadSuccess) {
          const target = event.target;
          if (isVideo && target) {
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
const ProjectCard = ({ project, onClick, layout = 'standard' }) => {
    const layoutId = `project-media-${project.id}`;
    const isFeatured = layout === 'featured';
    const accent = project.accent || '#3b82f6';

    return (
      <motion.button
        layout
        onClick={() => onClick(project)}
        className={`group relative overflow-hidden rounded-[22px] border-2 bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl text-left transition-all ${
          isFeatured ? 'md:col-span-2 xl:col-span-2' : ''
        }`}
        style={{
          borderColor: `${accent}33`,
          boxShadow: `0 10px 35px -15px ${accent}66, inset 0 1px 0 rgba(255,255,255,.15)`,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          y: -6,
          scale: 1.01,
          boxShadow: `0 20px 45px -20px ${accent}, inset 0 1px 0 rgba(255,255,255,.3)`,
        }}
      >
        <div className="px-5 pt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.35em] text-slate-400">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-amber-300/80 shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-emerald-300/80 shadow-sm" />
          </div>
          <span>{project.mediaType === 'mobile' ? 'Mobile' : 'Desktop'}</span>
        </div>

        <div className={`relative mx-5 mt-4 ${isFeatured ? 'h-64' : 'h-52'} rounded-[18px] overflow-hidden`}>
          <div
            className="absolute inset-0 rounded-[18px]"
            style={{
              background: `linear-gradient(135deg, ${accent}22, transparent)`,
            }}
          />
          <ProjectMediaDisplay
            project={project}
            layoutId={layoutId}
            objectFitClass="object-contain"
            className="absolute inset-0 w-full h-full p-3"
            autoPlay
            muted
            loop
          />
        </div>

        <div className="p-5 flex flex-col gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Featured build</p>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.slice(0, 4).map(tech => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1 text-xs font-semibold"
                style={{ borderColor: `${accent}55`, color: accent }}
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-xs text-slate-400">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </motion.button>
    );
};

const ProjectHero = ({ projectCount }) => (
  <section className="text-center max-w-4xl mx-auto mb-16 space-y-6">
    <p className="text-[13px] uppercase tracking-[0.4em] text-slate-500 dark:text-slate-400">AadiOS Labs</p>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white">
      Delightful Apple platform experiments
    </h1>
    <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 px-4">
      A curated desk of {projectCount}+ projects spanning product engineering, on-device AI, App Intents,
      and SwiftUI craftsmanship. Double-click (or tap) to open a window and explore the build.
    </p>
    <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.3em]">
      {['SwiftUI', 'App Intents', 'RealityKit', 'MLX'].map(token => (
        <span
          key={token}
          className="rounded-full border border-white/60 bg-white/70 px-4 py-1 text-slate-600 dark:bg-white/10 dark:border-white/15 dark:text-white/80"
        >
          {token}
        </span>
      ))}
    </div>
  </section>
);


// --- Project Modal Component (ADAPTIVE LAYOUT) ---
const ProjectModal = ({ project, onClose }) => {
  const [isMediaZoomed, setIsMediaZoomed] = useState(false);
  const [mediaDimensions, setMediaDimensions] = useState(null); // State for dimensions
  const layoutId = `project-media-${project.id}`;
  const accent = project.accent || '#6366f1';

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
    const handleEsc = event => {
      if (event.key === 'Escape') {
        if (isMediaZoomed) setIsMediaZoomed(false);
        else onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose, isMediaZoomed]);

  const handleZoomToggle = (e) => {
      e.stopPropagation();
      setIsMediaZoomed(!isMediaZoomed);
  };

  const stopPropagation = (e) => e.stopPropagation();

  // --- CONDITIONAL CLASSES based on isVerticalLayout ---
  const modalRootClasses = `bg-white/95 dark:bg-slate-900/95 rounded-3xl w-full max-w-[95%] md:max-w-5xl max-h-[95%] overflow-hidden relative flex shadow-[0_25px_80px_rgba(15,23,42,0.45)] ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300 ease-in-out ${
    isVerticalLayout ? 'flex-col lg:flex-row' : 'flex-col'
  }`;
  const mediaContainerClasses = `relative bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden transition-all duration-300 ${
    isVerticalLayout ? 'lg:w-2/5 w-full min-h-[280px]' : 'w-full min-h-[260px] sm:min-h-[360px]'
  }`;
  const mediaElementWrapperClasses = `relative max-w-full max-h-full p-3 ${isVerticalLayout ? 'h-full w-full' : ''}`;
  const contentContainerClasses = `flex-1 flex flex-col ${
    isVerticalLayout ? 'overflow-y-auto lg:max-h-full' : ''
  }`;
  const contentPaddingClasses = 'p-6 md:p-8 space-y-6 flex-1 flex flex-col';


  return (
      <>
          {/* --- Modal Backdrop and Container --- */}
          <motion.div
              data-modal-active="true"
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-md z-30 flex items-center justify-center p-4"
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
                  style={{ borderColor: `${accent}33` }}
                  // ... (rest of modal container props)
                  initial={{ scale: 0.9, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 0.95, y: 20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8, layout: { duration: 0.3 } }} // Add layout transition duration
                  onClick={stopPropagation}
              >
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-3 right-3 z-30 rounded-full p-1.5 backdrop-blur bg-white/70 text-slate-600 shadow hover:bg-white"
                    aria-label="Close project details"
                    style={{ color: accent }}
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
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-0" style={{ color: accent }}>
                              {project.title}
                          </h2>

                          {/* Long Description */}
                           <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                              <p>{project.longDescription}</p>
                          </div>

                          {/* Features */}
                          {project.features?.length > 0 && (
                              <div>
                              <h3 className="text-lg font-semibold mb-2.5 text-gray-800 dark:text-gray-200" style={{ color: accent }}>
                                Key Features
                              </h3>
                                  <ul className="list-disc list-outside pl-5 space-y-1.5 text-gray-600 dark:text-gray-400 text-sm">
                                      {project.features.map((feature, index) => (
                                          <li key={index}>{feature}</li>
                                      ))}
                                  </ul>
                              </div>
                          )}

                           {/* Tech Stack */}
                          <div>
                              <h3 className="text-lg font-semibold mb-2.5 text-gray-800 dark:text-gray-200" style={{ color: accent }}>
                                Technologies
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                  {project.tech.map((tech) => (
                                      <span
                                        key={tech}
                                        className="rounded-full px-3 py-1 text-xs sm:text-sm font-medium"
                                        style={{ background: `${accent}15`, color: accent }}
                                      >
                                          {tech}
                                      </span>
                                  ))}
                              </div>
                          </div>

                          {/* Buttons - mt-auto pushes to bottom */}
                         <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700/60 mt-auto">
                             {project.links.github && (
                                  <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition shadow-sm"
                                    style={{ borderColor: accent, color: accent }}
                                  >
                                      <Github size={16} /> Code
                                  </a>
                              )}
                              {project.links.live && (
                                  <a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg transition hover:translate-y-0.5"
                                    style={{ background: accent, color: '#0f172a' }}
                                  >
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
                              loop={Boolean(project.image?.endsWith?.('.mp4'))}
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

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background-color: rgba(150,150,150,0.35); border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background-color: rgba(150,150,150,0.55); }
      body.dark ::-webkit-scrollbar-thumb { background-color: rgba(120,120,120,0.5); }
      body.dark ::-webkit-scrollbar-thumb:hover { background-color: rgba(120,120,120,0.7); }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative h-full min-h-full py-12 md:py-16 text-slate-900 dark:text-slate-100 selection:bg-sky-400 selection:text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-200 dark:from-[#030712] dark:via-[#0f172a] dark:to-[#020617]" />
      <div className="absolute inset-0 opacity-40 mix-blend-soft-light pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148,163,184,0.18) 1px, transparent 0)', backgroundSize: '22px 22px' }} />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-12">
        <ProjectHero projectCount={projects.length} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              layout={index === 0 ? 'featured' : 'standard'}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery;
