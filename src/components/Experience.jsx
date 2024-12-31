import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [expandedMedia, setExpandedMedia] = useState(null);

  const openModal = (experience) => {
    setSelectedExperience(experience);
  };

  const closeModal = () => {
    setSelectedExperience(null);
    setExpandedMedia(null);
  };

  const expandMedia = (media) => {
    setExpandedMedia(media);
  };

  const experiences = [
    {
      company: 'Apple',
      role: 'Software Engineering Intern',
      period: 'May 2025 - Aug 2025',
      highlights: ['Incoming Software Engineering Intern at Shortcuts & App Intents Engineering team.'],
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
        { type: 'image', src: '/images/fetch/fetch_web_1.PNG', orientation: 'vertical', shortCaption: 'Fetch Home Screen', longCaption: 'This is the home screen of Fetch app, showcasing trending offers and products.' },
        { type: 'image', src: '/images/fetch/fetch_web_2.PNG', orientation: 'vertical', shortCaption: 'Search Results', longCaption: 'Search results in the Fetch app displaying various products and services.' },
        { type: 'image', src: '/images/fetch/fetch_web_3.PNG', orientation: 'vertical', shortCaption: 'Fetch Search Feature', longCaption: 'The Fetch search feature allowing users to find relevant results quickly.' },
        { type: 'image', src: '/images/fetch/fetch_web_4.PNG', orientation: 'vertical', shortCaption: 'Fetch Shortcuts Integration', longCaption: 'Integration with iOS Shortcuts for quicker app actions.' },
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
  ];

  return (
    <section id="experience" className="py-20 bg-dark text-white">
      {/* Experience Cards */}
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
              className="p-6 bg-white/10 rounded-lg shadow-lg cursor-pointer hover:bg-white/20 hover:brightness-125 transition-all duration-300"
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
        {selectedExperience && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-5xl w-full bg-dark rounded-lg shadow-lg overflow-hidden">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-3xl z-10"
              >
                ✕
              </button>

              {/* Experience Details */}
              <div className="p-6 text-white">
                <h3 className="text-3xl font-bold">{selectedExperience.company}</h3>
                <p className="text-lg text-primary">{selectedExperience.role}</p>
                <p className="text-sm text-white/70 mb-4">{selectedExperience.period}</p>
                <ul className="list-disc list-inside text-white/80 space-y-2">
                  {selectedExperience.highlights.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Media Display */}
              {selectedExperience.media.length > 0 && (
                <div className="p-4 bg-black/30 rounded-lg mt-4 flex gap-4 overflow-x-auto no-scrollbar">
                  {selectedExperience.media.map((media, idx) => (
                    <div
                      key={idx}
                      onClick={() => expandMedia(media)}
                      className="relative min-w-[200px] max-w-[300px] h-[500px] rounded-lg overflow-hidden cursor-pointer group"
                    >
                      <img src={media.src} alt={media.shortCaption} className="object-cover w-full h-full" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                        <p className="text-white text-sm">{media.shortCaption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Expanded Media */}
            {expandedMedia && (
              <motion.div
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                onClick={() => setExpandedMedia(null)}
              >
                <div className={`relative flex ${expandedMedia.orientation === 'vertical' ? 'flex-row' : 'flex-col'} gap-6 items-center`}>
                  <img src={expandedMedia.src} alt="Expanded Media" className="object-contain max-w-[70%] max-h-[90vh]" />
                  <div className={`text-white text-lg ${expandedMedia.orientation === 'vertical' ? 'self-center' : 'text-center'}`}>
                    {expandedMedia.longCaption}
                  </div>
                </div>
                <button
                  onClick={() => setExpandedMedia(null)}
                  className="absolute top-4 right-4 text-white text-3xl"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
