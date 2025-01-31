import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen flex items-center justify-center text-center relative overflow-hidden bg-gradient-to-br from-gray-800 via-blue-900 to-gray-800"
    >
      {/* A creative overlay */}
      <div className="absolute inset-0 bg-black opacity-40" />
      <div ref={textRef} className="container mx-auto px-6 relative z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Aadi Shiv Malhotra
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          University of Michigan Undergraduate, studying Computer Science & Cognitive Science.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <a
            href="/projects"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-all"
          >
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}