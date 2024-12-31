import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="h-screen relative flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-dark opacity-70" />

      <div
        ref={textRef}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.h1 
          className="text-7xl md:text-9xl font-bold gradient-text mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Aadi Shiv Malhotra
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          University of Michigan Undergraduate, studying Computer Science & Cognitive Science.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-primary hover:bg-primary/80 rounded-full font-medium transition-colors duration-300"
          >
            View My Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
