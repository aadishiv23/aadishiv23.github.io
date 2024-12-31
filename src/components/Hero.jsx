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

  const projectsData = [
    { id: 'radius', title: 'Radius' },
    { id: 'macBoard', title: 'macBoard' },
    { id: 'nebula', title: 'Nebula' },
    { id: 'fetch', title: 'Fetch' }
  ];

  return (
    <section
      ref={heroRef}
      className="h-screen relative flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-dark opacity-70" />

      <div ref={textRef} className="container mx-auto px-4 relative z-10">
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

        {/* Call-to-action buttons */}
        <motion.div
          className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4"
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

          {/* Projects Dropdown */}
          <div className="relative group">
            <a
              href="/projects"
              className="px-8 py-4 bg-secondary hover:bg-secondary/80 rounded-full font-medium transition-colors duration-300"
            >
              Projects
            </a>
            <div className="absolute hidden group-hover:block bg-dark mt-2 w-48 rounded-lg shadow-lg z-50">
              <ul>
                {projectsData.map((project) => (
                  <li key={project.id}>
                    <a
                      href={`/projects/${project.id}`}
                      className="block px-4 py-2 hover:bg-gray-700 text-white"
                    >
                      {project.title}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-700 mt-2">
                <a
                  href="/projects"
                  className="block px-4 py-2 text-center font-bold hover:bg-gray-700 text-white"
                >
                  View All Projects
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
