import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(savedTheme);
  }, []);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Home Link */}
        <a href="/" className="text-3xl font-bold text-gray-900 dark:text-white">
          ASM
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/"
            className="relative text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/projects"
            className="relative text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Projects
          </a>
          <a
            href="/experience"
            className="relative text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Experience
          </a>
          <a
            href="#contact"
            className="relative text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
          >
            Contact
          </a>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          {theme === 'light' ? (
            <span className="text-yellow-500">🌞</span>
          ) : (
            <span className="text-gray-200">🌜</span>
          )}
        </button>

        {/* Mobile Menu Toggle (for future implementation) */}
        <div className="md:hidden">
          <button className="text-gray-700 dark:text-gray-300 text-2xl">
            ☰
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
