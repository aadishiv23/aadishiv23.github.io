import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Icons (Keep if needed for modal, though theme uses text mainly) ---
const radiusIcon = "/icons/radius-app.svg";
const macboardIcon = "/icons/macboard-app.svg";
const placeholderIcon = "/icons/placeholder-app.svg"; // For potential future use or data consistency

// --- Retro Tech Theme Component ---

// Configuration
const retroSpring = { type: "spring", stiffness: 180, damping: 25 };

// --- Component: Retro Display Window (Enhanced) ---
function RetroDisplay({ project, onSelect }) {
    const [glitchTrigger, setGlitchTrigger] = useState(0);

    const glitchVariants = {
        idle: { opacity: 1, x: 0, filter: 'contrast(1) brightness(1)' },
        glitch: {
            opacity: [1, 0.85, 1, 0.9, 1],
            x: [0, 1, -1, 2, 0], // Subtle horizontal glitch
            filter: ['contrast(1) brightness(1)', 'contrast(1.3) brightness(1.1)', 'contrast(1) brightness(1)'],
            transition: { duration: 0.1, times: [0, 0.2, 0.5, 0.8, 1] }
        }
    };

    const triggerGlitch = () => {
        setGlitchTrigger(prev => prev + 1);
    };

    // Fake progress bar animation
    const progressBarVariants = {
        load: {
            width: ["0%", "100%"],
            transition: { duration: 0.8, delay: 0.2, ease: "linear" }
        }
    };

    return (
        <motion.div
            layoutId={`project-retro-${project.id}`}
            className="relative w-full max-w-sm md:max-w-md aspect-[4/3] md:aspect-video bg-black border-2 border-green-500/60 p-3 rounded-sm shadow-[0_0_15px_rgba(50,255,50,0.3)] cursor-pointer group font-mono text-sm" // Adjusted aspect ratio slightly
            onClick={() => onSelect(project.id)}
            onHoverStart={triggerGlitch}
            whileHover={{ scale: 1.03, borderColor: 'rgb(50 255 50 / 0.9)', boxShadow: '0 0 25px rgba(50, 255, 50, 0.5)' }}
            transition={retroSpring}
        >
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.4)_1px,transparent_1px)] bg-[size:100%_3px] opacity-30 pointer-events-none z-10 animate-scanline"></div>
            {/* Subtle CRT Glow */}
            <div className="absolute -inset-1 rounded blur bg-green-500/10 opacity-60 pointer-events-none group-hover:opacity-80 transition-opacity"></div>
             {/* Noise Overlay */}
             <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none z-10 mix-blend-overlay"></div>


            {/* Content Area with Glitch */}
            <motion.div
                key={glitchTrigger} // Re-mount on trigger
                variants={glitchVariants}
                initial="idle"
                animate="glitch"
                className="relative z-0 text-green-400 h-full flex flex-col justify-between" // Use flex to position cursor
            >
                <div>
                    <p className='mb-1 text-green-300'>> Booting Sector: {project.title.toUpperCase()}</p>
                    <p className='mb-1 opacity-80'>> Desc: {project.description}</p>
                    {/* Fake Progress Bar */}
                    <div className="w-full h-2 bg-green-900/50 border border-green-700/50 my-2">
                        <motion.div
                            className="h-full bg-green-500"
                            variants={progressBarVariants}
                            initial={{ width: "0%" }} // Ensure it starts at 0 on re-trigger
                            animate="load"
                        ></motion.div>
                    </div>
                     <p className='opacity-70 text-xs'>> Tech modules: [{project.tech?.join(' ')}]</p>
                </div>
                <div className="self-end"> {/* Position cursor at bottom right */}
                    <span className="w-2 h-3.5 bg-green-400 animate-pulse"></span> {/* Blinking Cursor */}
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- Component: Modal for Retro Details (Enhanced) ---
function RetroDetailModal({ project, onClose }) {
    const modalRef = useRef(null);

    // ESC & Click Outside handling
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-[3px]" // Slightly stronger blur
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* Modal Window */}
            <motion.div
                ref={modalRef}
                layoutId={`project-retro-${project.id}`}
                className="crt-effect relative z-10 bg-[#0A100A] border-2 border-green-500/80 rounded-sm shadow-lg overflow-hidden
                           w-full max-w-3xl max-h-[90vh] flex flex-col text-green-400 font-mono" // Use slightly off-black bg
                transition={retroSpring}
                style={{ boxShadow: '0 0 30px rgba(50, 255, 50, 0.4), inset 0 0 20px rgba(50, 255, 50, 0.25)' }} // Enhanced glow
            >
                {/* Inner content fade wrapper */}
                <motion.div
                    className="flex-grow flex flex-col overflow-hidden"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                >
                    {/* Header / Title Bar */}
                    <div className="flex items-center justify-between p-1.5 px-2 bg-green-900/40 border-b-2 border-green-500/60">
                        <div className="flex items-center gap-1.5"> {/* Fake buttons */}
                             <div className="w-2.5 h-2.5 rounded-full bg-red-500/50 border border-red-700"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 border border-yellow-700"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-green-500/50 border border-green-700"></div>
                        </div>
                        <h2 className="text-sm md:text-base font-bold text-green-300 uppercase">
                            FILE: {project.title}.RUN
                        </h2>
                        <motion.button
                            onClick={onClose} className="text-sm text-green-400 hover:text-red-300 px-1.5 bg-red-800/60 border border-red-500/70 rounded-sm"
                            whileHover={{ scale: 1.1, filter: 'brightness(1.8)' }} whileTap={{ scale: 0.9 }}
                            title="Close" // Add title for accessibility
                        >_X_</motion.button> {/* Styled X */}
                    </div>

                    {/* Scanline Overlay inside modal */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.4)_1px,transparent_1px)] bg-[size:100%_4px] opacity-25 pointer-events-none z-10 animate-scanline"></div>
                     {/* Noise Overlay */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.04] pointer-events-none z-10 mix-blend-overlay"></div>

                    {/* Scrollable Content */}
                    <div className="relative z-0 flex-grow overflow-y-auto p-3 md:p-4 space-y-4 text-sm md:text-base">
                        {/* Media */}
                        <div className="mb-4 bg-black/30 border border-green-700/50 p-1 flex justify-center items-center aspect-video shadow-inner">
                             {/* Media rendering logic - slightly desaturated/blended */}
                            {!project.media && <div className="text-green-600 p-4 text-center">> SYSTEM OFFLINE // NO VISUAL FEED_</div>}
                            {project.media?.endsWith('.mp4') ?
                                <video autoPlay muted loop playsInline controls className="w-full h-full object-contain mix-blend-lighten opacity-90 filter saturate-[0.8] contrast-[1.1]">
                                    <source src={project.media} type="video/mp4" /> Video Load Error_
                                </video> : null}
                            {project.media && !project.media.endsWith('.mp4') ?
                                <img src={project.media} alt={project.title} className="w-full h-full object-contain mix-blend-lighten opacity-90 filter saturate-[0.8] contrast-[1.1]" /> : null}
                        </div>

                        {/* ASCII Separator */}
                        <p className='text-green-600 opacity-70'>========================================</p>

                        {/* Details Section */}
                        <div>
                            <p className='text-green-300 font-bold'>> EXECUTION_LOG:</p>
                            {/* Use the full 'details' field */}
                            <p className="text-green-400 pl-2 mt-1 whitespace-pre-wrap">{project.details || project.description}</p>
                        </div>

                        {/* ASCII Separator */}
                         <p className='text-green-600 opacity-70'>----------------------------------------</p>

                        {/* Tech Stack Section */}
                        <div>
                            <p className='text-green-300 font-bold'>> CORE_MODULES:</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 pl-2 mt-1">
                                {project.tech?.map(tech => (
                                    <span key={tech} className="text-green-400">{`* ${tech}`}</span>
                                ))}
                            </div>
                        </div>

                        {/* Blinking cursor at the end of content */}
                        <div className="pt-3">
                            <span className="w-2 h-4 bg-green-400 animate-pulse inline-block"></span>
                             <span className='text-green-600 ml-2'>READY.</span>
                        </div>
                    </div>
                </motion.div>
                 {/* CRT Vignette/Curvature Effect */}
                 <div className="crt-pseudo-elements"></div>
            </motion.div>
        </motion.div>
    );
}


// --- Main Retro Tech Projects Component ---
export default function Projects() {
     const [selectedId, setSelectedId] = useState(null);

    // --- Using your project data structure ---
     const allProjects = [
         {
            id: 'radius',
            title: 'Radius',
            description: 'Location based social game', // Slightly more retro desc
            tech: ['MapKit', 'SwiftUI', 'PostgreSQL'], // Adjusted tech names
            media: '/videos/Radius_beta.mp4',
            icon: radiusIcon, // Keep for potential data use
            highlighted: true,
            details: 'System online. Real-time social game synchronised with CoreLocation data streams. Supabase utilized for multi-user coordinate sharing. Performance optimizations ongoing for efficiency and UI improvements. Shipped v1 to App Store Dec 2024. v2 coming Summer 2025.',
        },
        {
            id: 'macBoard',
            title: 'macBoard',
            description: 'Clipboard Manager', // Slightly more retro desc
            tech: ['SwiftUI', 'AppKit', 'Menu Bar'], // Adjusted tech names
            media: '/images/macboard_img.png',
            icon: macboardIcon,
            highlighted: true,
            details: 'Clipboard history manager initialized. CoreData module managing persistent storage. Simple SwiftUI interface. Supports text and image data formats. Ready for user input.',
        },
        // --- Placeholder Projects (won't be displayed via RetroDisplay) ---
        { id: 'p1', title: 'Project Gemini', description: 'Network Protocol', tech: ['TCP/IP', 'Sockets'], media: null, icon: null },
        { id: 'p2', title: 'MindLink', description: 'Neural Interface', tech: ['EEG', 'BioAmp'], media: null, icon: null },
        { id: 'p3', title: 'StealthOS', description: 'Secure Kernel', tech: ['Assembly', 'Crypto'], media: null, icon: placeholderIcon, },
        { id: 'p4', title: 'ChronoShift', description: 'Time Dilation Exp.', tech: ['Quantum'], media: null, icon: null, },
     ];

     const highlightedProjects = allProjects.filter(p => p.highlighted);
     const selectedProject = allProjects.find(p => p.id === selectedId);

    return (
        <section id="projects-retro" className="py-16 md:py-24 bg-black text-green-400 font-mono overflow-hidden relative">
            {/* Global Noise Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.025] pointer-events-none z-0 mix-blend-overlay"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    className="text-3xl md:text-5xl font-bold text-green-300 mb-12 md:mb-16 text-center uppercase tracking-widest" // Wider tracking
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                >
                    [ Project Directory ]
                </motion.h2>

                 {/* Highlighted Projects */}
                 <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-16">
                     {highlightedProjects.map((project, index) => (
                          <motion.div
                             key={project.id}
                             initial={{ opacity: 0, filter: 'blur(8px) brightness(0.5)' }} // Start more blurred/dim
                             animate={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
                             transition={{ delay: 0.3 + index * 0.2, duration: 0.5, ease: 'easeOut' }}
                          >
                             <RetroDisplay project={project} onSelect={setSelectedId} />
                          </motion.div>
                     ))}
                 </div>

                 {/* Link to All Projects */}
                 <div className="text-center">
                      <motion.a
                         href="/projects" // Make sure this path is correct
                         className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-900/70 border border-green-600/80 text-green-300
                                    rounded-sm hover:bg-green-800/80 hover:text-white hover:border-green-400 transition-all text-base uppercase shadow-[0_0_8px_rgba(50,255,50,0.2)]" // Subtle glow on button
                         whileHover={{ scale: 1.05, filter: 'brightness(1.3)', boxShadow: '0 0 15px rgba(50, 255, 50, 0.4)' }}
                         whileTap={{ scale: 0.95 }}
                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                     >
                         <span>>> Load Full Index</span> {/* Different prompt style */}
                     </motion.a>
                 </div>
            </div>

            <AnimatePresence>
                 {selectedId && selectedProject && (
                     <RetroDetailModal project={selectedProject} onClose={() => setSelectedId(null)} />
                 )}
             </AnimatePresence>

             {/* CSS for Scanline, CRT effects, Noise (Ensure noise.png is in /public) */}
             <style jsx global>{`
                @keyframes scanline {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(4px); } // Adjust distance (matches bg size Y in modal)
                }
                .animate-scanline {
                    animation: scanline 0.18s linear infinite; // Slightly slower scanline
                }
                /* CRT Vignette & Curvature Simulation */
                .crt-effect {
                    position: relative;
                }
                .crt-pseudo-elements::before,
                .crt-pseudo-elements::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: inherit; /* Match parent's border-radius */
                    pointer-events: none;
                    z-index: 20; /* Above content, below modal controls */
                }
                .crt-pseudo-elements::before {
                     /* Inner shadow for vignette */
                    box-shadow: inset 0 0 40px 15px rgba(0, 0, 0, 0.5);
                }
                 /* Optional: Add pseudo element for slight curvature if desired */
                /* .crt-pseudo-elements::after { */
                    /* background: radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 60%); */
                    /* transform: scale(1.1); */ /* Scale to simulate bulge */
                /* } */

                /* Noise background needs a noise texture */
                 /* Make sure you have a noise.png in your public folder */

                 /* Blinking cursor animation */
                 @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                 }
                 .animate-pulse { /* Tailwind uses pulse for opacity, let's override for solid blink */
                    animation: blink 1s step-end infinite;
                 }

             `}</style>
        </section>
    );
}