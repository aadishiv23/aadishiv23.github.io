import { motion } from 'framer-motion';

// Simplified Hero content suitable for a window or background element
export default function HeroContent({ isDarkMode }) { // Accept isDarkMode if needed for styling
  // We'll render this directly onto the "desktop" in MacDesktop.jsx
  // Or it could be an "About Me" app window content.
  // For simplicity, let's assume it's text that appears on the desktop background.
  // If you want it in a window, you'd structure it like ExperienceContent below.

  // Returning null here because we'll integrate the Hero text directly onto the desktop background
  // in MacDesktop.jsx for a cleaner look. If you prefer an "About Me" window,
  // you would return JSX here similar to ExperienceContent.
  return null;

  /*
  // --- Example if you wanted it in a window ---
  return (
    <div className={`p-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
       <motion.h1
          className="text-3xl md:text-4xl font-bold mb-3"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
       >
          Aadi Shiv Malhotra
       </motion.h1>
       <motion.p
         className="text-md md:text-lg max-w-xl mx-auto mb-6"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
       >
         University of Michigan Undergraduate, studying Computer Science & Cognitive Science.
         Builder on Apple Platforms, Computational Biology Explorer, Systems Designer & Creator.
       </motion.p>
       // Add buttons if needed, adapted from original Hero
    </div>
  );
  */
}