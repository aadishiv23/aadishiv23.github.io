import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (experience) => {
    setSelectedExperience(experience);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExperience(null);
  };

  const experiences = [
    {
      company: 'Apple',
      role: 'Software Engineering Intern',
      period: 'May 2025 - Aug 2025',
      highlights: [
        'Incoming Software Engineering Intern at Shortcuts & App Intents Engineering team.',
      ],
      media: [],
    },
    {
      company: 'Fetch',
      role: 'iOS Software Engineering Intern',
      period: 'May 2024 - Aug 2024',
      highlights: [
        'Worked on Search, New Discover Experience (Home page redesign), App Intents & Shortcuts',
        'Implemented Shop in Search feature.',
        'Implemented revised carousel for NDEX',
        'Created FetchAR during company-wide hackathon, winning People Choice award',
      ],
      media: [
        '/images/fetch/fetch_web_1.PNG',
        '/images/fetch/fetch_web_2.PNG',
        '/images/fetch/fetch_web_3.PNG',
        '/images/fetch/fetch_web_4.PNG',
      ],
    },
    {
      company: 'Henry Ford Innovation Institute',
      role: 'Research & Software Engineering Intern',
      period: 'Jun 2023 - Aug 2023',
      highlights: [
        'Built "CrossWalk Buddy" using Swift and CoreML for visually impaired navigation.',
        'Improved object detection accuracy by 40% and app performance by 25%.',
      ],
      media: [],
    },
    {
      company: 'Ljungman Lab',
      role: 'Research Assistant',
      period: 'Oct 2021 - Present',
      highlights: [
        'Working on computational side.',
        'Built a web platform for rapid RNA design iteration using React and Go.',
      ],
      media: [],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-dark text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-6xl font-bold gradient-text text-center mb-12">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white/10 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => openModal(exp)}
            >
              <h3 className="text-2xl font-bold">{exp.company}</h3>
              <p className="text-lg text-primary">{exp.role}</p>
              <p className="text-sm text-white/70 mb-4">{exp.period}</p>
              <ul className="list-disc list-inside text-white/80 space-y-2">
                {exp.highlights.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedExperience && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative bg-dark rounded-lg shadow-xl max-w-4xl w-full p-6">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-3xl z-10"
              >
                ✕
              </button>
              <h3 className="text-3xl font-bold text-white mb-2">
                {selectedExperience.company}
              </h3>
              <p className="text-lg text-primary mb-4">{selectedExperience.role}</p>
              <p className="text-sm text-white/70 mb-4">{selectedExperience.period}</p>
              <ul className="list-disc list-inside text-white/80 space-y-2 mb-6">
                {selectedExperience.highlights.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>

              {/* Media Carousel */}
              {selectedExperience.media.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedExperience.media.map((media, idx) => (
                    <motion.img
                      key={idx}
                      src={media}
                      alt={`Media ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.2 }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
