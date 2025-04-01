import { motion } from 'framer-motion';

export default function ContactContent({ isDarkMode }) {
  return (
    <div className={`p-6 text-center flex flex-col items-center justify-center h-full ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold mb-4"
      >
        Contact Me
      </motion.h2>
      <motion.p
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg mb-6 opacity-80"
      >
        Feel free to reach out anytime.
      </motion.p>
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.2 }}
         className="flex flex-col sm:flex-row items-center justify-center gap-4"
       >
        <a
          href="mailto:aadishiv@umich.edu"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow hover:shadow-md"
        >
          Send Email
        </a>
        <a
          href="https://github.com/aadishiv23"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white rounded-lg font-medium transition-all shadow hover:shadow-md"
        >
          Visit GitHub
        </a>
      </motion.div>
    </div>
  );
}