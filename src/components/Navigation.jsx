import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  return (
    <motion.nav className="fixed top-0 w-full bg-dark/70 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold gradient-text">ASM</a>
        <div className="flex items-center space-x-4">
          <a href="#projects" className="text-white/70 hover:text-white">Projects</a>
          <a href="#experience" className="text-white/70 hover:text-white">Experience</a>
          <a href="#contact" className="text-white/70 hover:text-white">Contact</a>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 bg-gray-800 text-yellow-300 rounded-full flex items-center justify-center"
          >
            {theme === 'light' ? '🌞' : '🌜'}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
