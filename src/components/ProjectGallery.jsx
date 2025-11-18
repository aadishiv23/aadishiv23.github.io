import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Github, ExternalLink, X, ChevronRight, ArrowRight } from 'lucide-react';

// --- Project Data (Enhanced) ---
const projects = [
  {
    id: 'radius',
    title: 'Radius',
    subtitle: 'Social AR Experience',
    description: 'Real-time location sharing with AR visualizations.',
    longDescription:
      'Radius reimagines social connection through spatial computing. By combining real-time location streaming with ARKit, it allows users to see their friends\' locations anchored in the real world. The backend, built with Go and PostgreSQL, handles high-frequency updates for over 500 concurrent users, while the iOS client leverages Swift Concurrency for a buttery smooth experience.',
    tech: ['Swift', 'Go', 'PostgreSQL', 'ARKit', 'RealityKit'],
    image: '/videos/Radius_beta.mp4',
    mediaType: 'video',
    features: [
      'High-performance Go microservices',
      'Real-time AR location anchoring',
      'Proximity-based social circles',
      'Interactive 3D geofences',
    ],
    accent: '#0ea5e9', // Sky blue
    links: {
      live: 'https://apps.apple.com/us/app/radius-get-moving/id6504736869',
    },
  },
  {
    id: 'iris',
    title: 'Iris',
    subtitle: 'On-Device Intelligence',
    description: 'Personal assistant powered by a local 3B-parameter model.',
    longDescription:
      'Iris brings the power of Large Language Models directly to your device, ensuring total privacy. Running a custom distilled 3B parameter model via MLX, Iris can understand context, control system apps, and process multi-modal input—all without sending a single byte to the cloud. It represents the future of personal, private AI.',
    tech: ['Swift', 'MLX', 'Python', 'CoreML', 'App Intents'],
    image: '/images/projects/iris.png', // Assuming image exists, fallback handled
    mediaType: 'image',
    features: [
      'Local 3B parameter LLM inference',
      'System-wide App Intents control',
      'Multi-modal input (Text, Voice, Image)',
      '< 5s latency on Apple Silicon',
    ],
    accent: '#a855f7', // Purple
    links: {
      github: 'https://github.com/aadishiv23',
    },
  },
  {
    id: 'pillpals',
    title: 'PillPals',
    subtitle: 'Health & Accessibility',
    description: 'Medication tracker designed for memory loss patients.',
    longDescription:
      'Designed with empathy at its core, PillPals simplifies medication management for those who need it most. Its high-contrast interface, large touch targets, and gentle reminders are tailored for users with memory impairments. Deep integration with HealthKit and WidgetKit ensures that care circles stay informed and patients stay healthy.',
    tech: ['Swift', 'SwiftUI', 'HealthKit', 'WidgetKit'],
    image: '/images/projects/pillpals.png',
    mediaType: 'image',
    features: [
      'Accessibility-first design system',
      'Critical alert infrastructure',
      'Caregiver dashboard & sync',
      'Siri & Shortcuts integration',
    ],
    accent: '#f97316', // Orange
    links: {
      github: 'https://github.com/aadishiv23',
    },
  },
];

// --- 3D Tilt Card Component ---
const TiltCard = ({ project, onClick, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      className="relative h-[450px] w-[320px] md:w-[380px] flex-shrink-0 cursor-pointer group perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <motion.div
        layoutId={`card-container-${project.id}`}
        className="absolute inset-0 rounded-[32px] overflow-hidden bg-slate-900 shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Background Image/Video */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
          {project.mediaType === 'video' ? (
            <motion.video
              layoutId={`media-${project.id}`}
              src={project.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
          ) : (
            <motion.img
              layoutId={`media-${project.id}`}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end transform translate-z-20">
          <motion.div
            layoutId={`content-${project.id}`}
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <p className="text-sm font-medium text-white/70 mb-2 uppercase tracking-widest">
              {project.subtitle}
            </p>
            <h3 className="text-4xl font-bold text-white mb-3 tracking-tight">
              {project.title}
            </h3>
            <p className="text-white/80 line-clamp-2 mb-6 text-lg font-light">
              {project.description}
            </p>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              <span className="text-white font-medium">View Project</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Detail View Component ---
const ProjectDetail = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-container-${project.id}`}
        className="w-full max-w-5xl h-full max-h-[90vh] bg-white dark:bg-[#1c1c1e] rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-30 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left: Media Hero */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden bg-black">
          {project.mediaType === 'video' ? (
            <motion.video
              layoutId={`media-${project.id}`}
              src={project.image}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.img
              layoutId={`media-${project.id}`}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r" />

          <div className="absolute bottom-8 left-8 right-8 md:hidden">
            <motion.h2 layoutId={`title-${project.id}`} className="text-4xl font-bold text-white mb-2">
              {project.title}
            </motion.h2>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 h-full overflow-y-auto bg-white dark:bg-[#1c1c1e]">
          <div className="p-8 md:p-12 space-y-8">
            <div className="hidden md:block">
              <p className="text-sm font-bold text-blue-500 dark:text-blue-400 uppercase tracking-widest mb-2">
                {project.subtitle}
              </p>
              <motion.h2 layoutId={`title-${project.id}`} className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {project.title}
              </motion.h2>
            </div>

            <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>{project.longDescription}</p>
            </div>

            {/* Features List */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 flex flex-wrap gap-4">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-transform active:scale-95"
                >
                  <ExternalLink size={18} />
                  {project.links.live.includes('apple.com') ? 'App Store' : 'Open App'}
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-xl font-semibold transition-transform active:scale-95"
                >
                  <Github size={18} />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Gallery Component ---
export default function ProjectGallery() {
  const [selectedId, setSelectedId] = useState(null);
  const containerRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  const selectedProject = projects.find(p => p.id === selectedId);

  // Inject styles for hiding scrollbars
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="h-full w-full bg-slate-50 dark:bg-black overflow-hidden flex flex-col relative">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20 pointer-events-none" />

      {/* Header */}
      <div className="flex-shrink-0 px-8 pt-10 pb-4 z-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Projects
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          A collection of experiments and products.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-x-auto overflow-y-hidden flex items-center px-8 gap-8 pb-8 snap-x snap-mandatory no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {projects.map((project, index) => (
          <div key={project.id} className="snap-center py-10">
            <TiltCard
              project={project}
              index={index}
              onClick={(p) => setSelectedId(p.id)}
            />
          </div>
        ))}

        {/* Spacer for end of list */}
        <div className="w-8 flex-shrink-0" />
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800">
        <motion.div
          className="h-full bg-blue-500"
          style={{ scaleX: scrollXProgress, transformOrigin: '0%' }}
        />
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedId && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
