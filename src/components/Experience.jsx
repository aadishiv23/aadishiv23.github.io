import React, { useState } from 'react'; // Import React for CSSProperties typing workaround
import { motion, AnimatePresence } from 'framer-motion';

// --- Icons (Replace with your actual library, e.g., react-icons) ---
const IconExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;
const IconX = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
const IconChevronLeft = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;
const IconChevronRight = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>;
const IconZoomIn = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>;
// --- End Icons ---

// Helper function for conditional dark mode accent color (adjust logic as needed)
const getAccentColor = (color, isDarkMode) => {
  // Example: Slightly lighten dark blue in dark mode for better text contrast
  if (isDarkMode && color === '#005EB8') {
    return '#3B82F6'; // Brighter blue (Tailwind's blue-500)
  }
  // Example: Desaturate Apple Grey slightly in dark mode if needed
  // if (isDarkMode && color === '#A2AAAD') {
  //   return '#9CA3AF'; // Tailwind's gray-400
  // }
  return color;
};


export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [expandedImageIndex, setExpandedImageIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // Basic state, ideally sync with theme

  // Effect to check for dark mode (simple example)
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handler = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);


  // --- Add logoSrc with actual paths ---
  const experiences = [
    {
      company: 'Apple',
      role: 'Software Engineering Intern',
      period: 'May 2025 - Aug 2025',
      logoSrc: '/images/logos/apple-logo.png', // Replace with actual path
      highlights: ['Incoming Software Engineering Intern for the Shortcuts & App Intents Engineering team.'],
      media: [],
      accentColor: '#A2AAAD', // Apple Grey
    },
    {
      company: 'Fetch',
      role: 'iOS Software Engineering Intern',
      period: 'May 2024 - Aug 2024',
      logoSrc: '/images/logos/fetch-logo.png', // Replace with actual path
      highlights: [
        'Spearheaded feature development across Search, New Discover Experience (NDEX), and App Intents & Shortcuts, impacting millions of daily active users.',
        'Engineered the "Shop in Search" UI, integrating retail partner data directly into search results.',
        'Implemented dynamic, data-driven carousels and interactive elements for the NDEX home screen redesign.',
        'Co-developed FetchAR during a company-wide hackathon, securing the People\'s Choice award for an innovative augmented reality shopping concept.',
        'Contributed to native iOS integrations using App Intents and Shortcuts framework for streamlined user actions.'
      ],
      media: [
        { type: 'image', src: '/images/fetch/fetch_web_1.PNG', orientation: 'vertical', shortCaption: 'NDEX Home Screen', longCaption: 'The redesigned Fetch home screen (NDEX) featuring dynamic offer carousels, personalized sections, and smooth interaction animations.' },
        { type: 'image', src: '/images/fetch/fetch_web_2.PNG', orientation: 'vertical', shortCaption: 'Shop in Search', longCaption: 'Enhanced Search results displaying integrated "Fetch Shop" cards for relevant retail partners, improving discoverability.' },
        { type: 'image', src: '/images/fetch/fetch_web_3.PNG', orientation: 'vertical', shortCaption: 'App Intents', longCaption: 'Native App Intents implementation allowing users to perform key actions like "Snap Receipt" or "Scan eReceipts" via Siri or Spotlight.' },
        { type: 'image', src: '/images/fetch/fetch_web_4.PNG', orientation: 'vertical', shortCaption: 'Shortcuts Integration', longCaption: 'Seamless integration with the iOS Shortcuts app, providing users quick access to core Fetch functionalities.' },
      ],
      accentColor: '#FF9F1C', // Fetch Orange
    },
    {
      company: 'Henry Ford Innovation Institute',
      role: 'Research & Software Engineering Intern',
      period: 'Jun 2023 - Aug 2023',
      logoSrc: '/images/logos/hfhs-logo.png', // Replace with actual path
      highlights: [
        'Developed "CrossWalk Buddy," an iOS application leveraging Swift and CoreML for real-time crosswalk detection to aid visually impaired individuals.',
        'Achieved a 40% increase in object detection accuracy through model optimization and data augmentation techniques.',
        'Improved overall application performance and responsiveness by 25% via targeted code refactoring and efficient state management.',
      ],
      media: [],
      accentColor: '#005EB8', // HFHS Blue
    },
  ].sort((a, b) => new Date(b.period.split(' - ')[0]) - new Date(a.period.split(' - ')[0]));


  const handleOpenModal = (exp) => setSelectedExperience(exp);
  const handleCloseModal = () => setSelectedExperience(null);
  const handleOpenImage = (index) => setExpandedImageIndex(index);
  const handleCloseImage = () => setExpandedImageIndex(null);

  const handleGalleryNavigation = (e, direction) => {
    e.stopPropagation();
    if (selectedExperience && expandedImageIndex !== null) {
      const totalMedia = selectedExperience.media.length;
      setExpandedImageIndex((prevIndex) => (prevIndex + direction + totalMedia) % totalMedia);
    }
  };

  const currentExpandedImage = selectedExperience?.media[expandedImageIndex] ?? null;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }, // Slightly slower stagger
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Start slightly lower
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 12 }, // Softer spring
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)', scale: 0.98, y: 10 },
    visible: { opacity: 1, backdropFilter: 'blur(8px)', scale: 1, y: 0, transition: { type: 'spring', duration: 0.5, bounce: 0.2 } },
    exit: { opacity: 0, backdropFilter: 'blur(0px)', scale: 0.98, y: 10, transition: { duration: 0.25 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }, // Slightly slower fade-in
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const imageModalContentVariants = { // Separate content animation for image modal
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', duration: 0.5, delay: 0.1 } }, // Add slight delay
    exit: { opacity: 0, scale: 0.92, transition: { duration: 0.25 } },
  };


  return (
    <section id="experience" className="relative py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
       {/* Optional: Subtle background pattern */}
       {/* <div className="absolute inset-0 bg-[url('/path/to/subtle-pattern.svg')] opacity-[0.03] dark:opacity-[0.02]"></div> */}

      <div className="container mx-auto px-4 relative z-10"> {/* Ensure content is above background patterns */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.6, 0.01, 0.05, 0.95] }} // Smoother easing
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 lg:mb-28"
        >
          <span className="text-gray-900 dark:text-gray-100">Career</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">Milestones</span>
        </motion.h2>

        {/* --- Enhanced Timeline Container --- */}
        <div className="relative max-w-3xl mx-auto">
          {/* --- Timeline Line (Thinner, Softer) --- */}
          <motion.div
             className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 dark:from-slate-700 dark:via-purple-800 dark:to-pink-800" // Thinner, adjusted dark colors
             style={{ transformOrigin: 'top' }}
             initial={{ scaleY: 0 }}
             whileInView={{ scaleY: 1 }}
             transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
             viewport={{ once: true, amount: 0.1 }}
           />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12 md:space-y-16" // Slightly less spacing on mobile
          >
            {experiences.map((exp, index) => {
                const currentAccent = getAccentColor(exp.accentColor || '#6366F1', isDarkMode);
                return (
                <motion.div
                    key={exp.company + exp.period}
                    variants={itemVariants}
                    className="relative pl-12 md:pl-16" // Adjust padding
                >
                    {/* --- Timeline Dot & Connector --- */}
                    <motion.div
                      className="absolute left-0 top-3 flex items-center" // Align with logo centerish
                      style={{ left: '1rem' }} // Position dot (4 * 0.25rem)
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {/* Dot */}
                      <motion.div
                        className="w-4 h-4 rounded-full border-2 bg-white dark:bg-slate-800 z-10"
                        style={{ borderColor: currentAccent }}
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2 }}
                      />
                      {/* Connector Line to Card */}
                      <div className="h-px w-4 md:w-8 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 dark:from-slate-700 dark:via-purple-800 dark:to-pink-800 ml-0.5"></div>
                    </motion.div>

                    {/* --- Enhanced Experience Card (Glassmorphism) --- */}
                    <motion.div
                      onClick={() => handleOpenModal(exp)}
                      whileHover={{
                        y: -5,
                        // Slightly more subtle shadow for hover
                        boxShadow: `0 12px 25px -4px rgba(0, 0, 0, 0.1), 0 6px 8px -5px rgba(0, 0, 0, 0.08)`,
                        // Dark mode hover shadow
                        // Use a variable or condition for dark mode shadows
                      }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                      className="group relative cursor-pointer rounded-xl border border-gray-200/80 dark:border-slate-700/60 bg-white/60 dark:bg-slate-800/50 backdrop-blur-lg shadow-md dark:shadow-slate-900/30 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 overflow-hidden"
                      style={{ '--accent-color': currentAccent }}
                    >
                        {/* Subtle gradient shine on hover */}
                        <span className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-400"></span>

                        <div className="p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                            {exp.logoSrc && (
                            <motion.img
                                src={exp.logoSrc}
                                alt={`${exp.company} logo`}
                                className="w-11 h-11 sm:w-12 sm:h-12 object-contain rounded-lg flex-shrink-0 bg-gray-50 dark:bg-slate-700 p-1 shadow-sm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.2 + 0.6, duration: 0.5, ease: 'easeOut' }}
                            />
                            )}
                            <div className="flex-grow">
                            <motion.h3
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + 0.7, duration: 0.4 }}
                                className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-0.5 flex items-center"
                            >
                                {exp.company}
                                <span className="ml-2 text-[var(--accent-color)] opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform group-hover:translate-x-1 motion-reduce:transform-none">
                                <IconExternalLink />
                                </span>
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + 0.8, duration: 0.4 }}
                                className="text-sm sm:text-md font-medium text-[var(--accent-color)]"
                            >
                                {exp.role}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 + 0.9, duration: 0.4 }}
                                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono tracking-tight" // Tighter tracking
                            >
                                {exp.period}
                            </motion.p>
                            </div>
                        </div>

                        <motion.ul
                            initial="hidden"
                            animate="visible"
                            variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: index * 0.2 + 1.0 } } }}
                            className="list-disc list-outside ml-5 text-gray-700 dark:text-gray-300 space-y-1.5 text-sm leading-relaxed mt-4" // Adjusted leading
                        >
                            {exp.highlights.map((point, idx) => (
                            <motion.li key={idx} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                                {point}
                            </motion.li>
                            ))}
                        </motion.ul>
                        </div>
                    </motion.div>
                </motion.div>
                );
            })}
          </motion.div>
        </div>
      </div>

      {/* --- Details Modal (Glassmorphism) --- */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            key="detailsBackdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseModal}
            className="fixed inset-0 bg-black/50 dark:bg-black/60 z-50 flex items-center justify-center p-4 cursor-pointer" // Slightly darker backdrop for dark mode
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              key="detailsModalContent"
              variants={modalVariants}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col cursor-default
                         rounded-xl shadow-2xl overflow-hidden border border-white/10
                         bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl" // More intense blur
              aria-labelledby="modal-title"
            >
              {/* Header Area */}
              <div className="relative flex-shrink-0 p-6 sm:p-8 pb-4 border-b border-black/10 dark:border-white/10">
                 <div className="flex items-center gap-4 sm:gap-5">
                   {selectedExperience.logoSrc && (
                     <img
                       src={selectedExperience.logoSrc}
                       alt={`${selectedExperience.company} logo`}
                       className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-lg flex-shrink-0 bg-white/60 dark:bg-slate-700/50 p-1.5 shadow"
                     />
                   )}
                   <div className="flex-grow">
                     <h3 id="modal-title" className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
                       {selectedExperience.company}
                     </h3>
                     <p className="text-md sm:text-lg font-medium" style={{ color: getAccentColor(selectedExperience.accentColor || '#6366F1', isDarkMode) }}>
                       {selectedExperience.role}
                     </p>
                     <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-mono tracking-tight">
                       {selectedExperience.period}
                     </p>
                   </div>
                 </div>
                 {/* Close Button */}
                 <motion.button
                   onClick={handleCloseModal}
                   className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 p-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-800"
                   aria-label="Close details"
                   whileHover={{ scale: 1.1, rotate: 90 }}
                   whileTap={{ scale: 0.9 }}
                 >
                   <IconX />
                 </motion.button>
              </div>

              {/* Scrollable Content Area */}
              <div className="flex-grow overflow-y-auto p-6 sm:p-8 pt-6">
                {/* Highlights */}
                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none mb-8 sm:mb-10 prose-li:marker:text-gray-500 dark:prose-li:marker:text-gray-400">
                  <h4 className="text-md font-semibold mb-3 text-gray-700 dark:text-gray-300 !mt-0 uppercase tracking-wider">Key Contributions:</h4>
                  <ul className="space-y-2">
                    {selectedExperience.highlights.map((point, idx) => (
                      <li key={idx} className="text-gray-800 dark:text-gray-200">{point}</li>
                    ))}
                  </ul>
                </div>

                {/* Media Gallery */}
                {selectedExperience.media.length > 0 && (
                  <div>
                    <h4 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Visuals:
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {selectedExperience.media.map((media, idx) => (
                        <motion.div
                          key={media.src}
                          className="relative group cursor-pointer overflow-hidden rounded-lg shadow aspect-w-9 aspect-h-16 sm:aspect-w-1 sm:aspect-h-1 bg-gray-100 dark:bg-slate-700"
                          onClick={(e) => { e.stopPropagation(); handleOpenImage(idx); }}
                          whileHover={{ y: -3, scale: 1.03, zIndex: 10, transition: { duration: 0.2 } }}
                          layoutId={`image-${media.src}`} // Optional shared layout ID
                        >
                          <img
                            src={media.src}
                            alt={media.shortCaption}
                            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <IconZoomIn />
                          </div>
                           <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                             <p className="text-white text-xs font-medium line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                               {media.shortCaption}
                             </p>
                           </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Expanded Image Modal (Lightbox) --- */}
      <AnimatePresence>
        {currentExpandedImage && selectedExperience && (
          <motion.div
            key="imageViewerBackdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleCloseImage}
            // Enhanced backdrop for lightbox: darker, maybe subtle gradient
            className="fixed inset-0 bg-gradient-to-br from-black/90 via-slate-950/95 to-black/90 z-[60] flex items-center justify-center p-4 cursor-pointer"
            aria-modal="true"
            role="dialog"
          >
            {/* Close Button */}
            <motion.button
               onClick={handleCloseImage}
               className="absolute top-4 right-4 text-white/70 hover:text-white z-[62] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
               aria-label="Close image viewer"
               whileHover={{ scale: 1.1, rotate: 90 }}
               whileTap={{ scale: 0.9 }}
             > <IconX /> </motion.button>

            {/* Navigation Buttons */}
            {selectedExperience.media.length > 1 && (
              <>
                <motion.button
                  onClick={(e) => handleGalleryNavigation(e, -1)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-white/5 hover:bg-white/15 p-2 sm:p-3 rounded-full transition-all z-[62] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Previous image"
                  whileHover={{ scale: 1.1, x: -3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }}
                > <IconChevronLeft /> </motion.button>
                <motion.button
                  onClick={(e) => handleGalleryNavigation(e, 1)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-white/5 hover:bg-white/15 p-2 sm:p-3 rounded-full transition-all z-[62] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  aria-label="Next image"
                   whileHover={{ scale: 1.1, x: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} whileTap={{ scale: 0.9 }}
                > <IconChevronRight /> </motion.button>
              </>
            )}

            {/* Image and Caption Container */}
            <motion.div
              key={currentExpandedImage.src} // Key for smooth transitions between images
              variants={imageModalContentVariants} // Use the dedicated content animation
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-5xl max-h-[90vh] w-auto flex flex-col items-center cursor-default"
              onClick={e => e.stopPropagation()}
              // layoutId={`image-${currentExpandedImage.src}`} // Optional shared layout ID
            >
               <img
                 src={currentExpandedImage.src}
                 alt={currentExpandedImage.shortCaption}
                 className="block max-w-full max-h-[70vh] sm:max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl mb-4" // Adjusted height limit
               />
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2, duration: 0.4 }} // Slightly longer delay for caption
                 className="text-center text-white/90 px-4 max-w-xl" // Slightly less bright white text
                >
                 <h4 className="text-lg sm:text-xl font-semibold mb-1.5">{currentExpandedImage.shortCaption}</h4>
                 <p className="text-sm sm:text-base text-white/70 leading-relaxed">{currentExpandedImage.longCaption}</p>
               </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}