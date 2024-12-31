import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    {
      id: 'radius',
      title: 'Radius',
      description: 'Real-time location tracking with AR capabilities',
      tech: ['Swift', 'ARKit', 'CoreLocation'],
      video: '/videos/Radius_beta.mp4',
    },
    {
      id: 'macBoard',
      title: 'macBoard',
      description: 'SwiftUI based MacOS clipboard manager',
      tech: ['Swift', 'SwiftUI', 'AppKit'],
      video: '/images/macboard_img.png',
    },
  ];

  return (
    <section id="projects" className="section-padding">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Media */}
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700 overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-sm text-white/80">{project.description}</p>
                <div className="flex gap-2 mt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-white/20 text-white px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
