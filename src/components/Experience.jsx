import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

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
        { type: 'image', src: '/images/fetch/fetch_web_1.PNG', orientation: 'vertical', shortCaption: 'Fetch Home Screen', longCaption: 'This is the new design of the Fetch home screen, showcasing trending offers and products. I worked on implementing the new carousel, liking animations, and other UIs' },
        { type: 'image', src: '/images/fetch/fetch_web_2.PNG', orientation: 'vertical', shortCaption: 'Search', longCaption: 'Implemented Fetch Shop cards, when user searches for a retailer that matches one in Fetch Shop along with other small UI for Search v2' },
        { type: 'image', src: '/images/fetch/fetch_web_3.PNG', orientation: 'vertical', shortCaption: 'Fetch App Intents', longCaption: 'Implemented four App Intents for major actions: Snap a Receipt, Scan eReceipts, Refer & Earn, and Show Social Feed.' },
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
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white text-center mb-12">
          Experience
        </h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedExperience(exp)}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.company}</h3>
              <p className="text-lg text-blue-600 dark:text-blue-400">{exp.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{exp.period}</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                {exp.highlights.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedExperience(null);
              setExpandedImage(null);
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedExperience.company}
                    </h3>
                    <p className="text-lg text-blue-600 dark:text-blue-400">
                      {selectedExperience.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedExperience.period}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedExperience(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    {selectedExperience.highlights.map((point, idx) => (
                      <p key={idx} className="text-gray-700 dark:text-gray-300">
                        • {point}
                      </p>
                    ))}
                  </div>

                  {selectedExperience.media.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Project Screenshots
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedExperience.media.map((media, idx) => (
                          <motion.div
                            key={idx}
                            className="relative group cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedImage(media);
                            }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <img
                              src={media.src}
                              alt={media.shortCaption}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-lg">
                              <p className="text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Click to expand
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4 dark:bg-black/95"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
            >
              <button
                onClick={() => setExpandedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 text-4xl"
              >
                ×
              </button>
              <img
                src={expandedImage.src}
                alt={expandedImage.shortCaption}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-white">
                <h4 className="text-xl font-semibold mb-2">{expandedImage.shortCaption}</h4>
                <p className="text-gray-300">{expandedImage.longCaption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}