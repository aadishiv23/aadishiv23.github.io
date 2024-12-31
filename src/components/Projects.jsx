import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

export default function Projects() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
            },
          }
        );
      });
    }
  }, []);

  const projects = [
    {
      id: 'radius',
      title: 'Radius',
      description: 'Real-time location tracking with AR capabilities',
      tech: ['Swift', 'ARKit', 'CoreLocation'],
      video: '/videos/Radius_beta.mp4',
      color: '#FF2D55',
    },
    {
      id: 'macBoard',
      title: 'macBoard',
      description: 'SwiftUI based MacOS clipboard manager',
      tech: ['Swift', 'SwiftUI', 'AppKit'],
      video: '/images/macboard_img.png',
      color: '#5856D6',
    },
  ];

  return (
    <section id="projects" className="section-padding bg-dark">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl md:text-6xl font-bold gradient-text mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              id={project.id}
              className="project-card group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <div className="aspect-w-16 aspect-h-9 bg-white/10 overflow-hidden">
                {project.video.endsWith('.mp4') ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={project.video}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-sm text-white/80">{project.description}</p>
                <div className="flex gap-2 mt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-white/10 text-white px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
