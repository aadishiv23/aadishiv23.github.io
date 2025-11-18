import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const SectionButton = ({ isActive, label, icon, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
      isActive
        ? 'bg-blue-500 text-white shadow-sm'
        : 'hover:bg-gray-200/80 dark:hover:bg-gray-700/70 text-gray-700 dark:text-gray-300'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="truncate">{label}</span>
  </button>
);

export default function FinderContent({ isDarkMode, experiences = [], onOpenApp }) {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = useMemo(
    () => [
      {
        id: 'profile',
        label: 'About',
        icon: '🧭',
        content: (
          <div className="space-y-4">
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-white/20 bg-white/40 dark:bg-white/5 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
              TODO: Replace with concise bio once final copy is ready.
            </div>
          </div>
        ),
      },
      {
        id: 'education',
        label: 'Education',
        icon: '🎓',
        content: (
          <div className="space-y-3">
            <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
              <h3 className="text-lg font-semibold">University of Michigan</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                B.S. Computer Science & Cognitive Science · College of LSA (2021 – 2025)
              </p>
              <ul className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 list-disc list-inside">
                <li>Leadership @ Michigan Hackers iOS Guild & Michigan Data Science Team</li>
                <li>Exploring human-computer collaboration and adaptive interfaces</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: 'skills',
        label: 'Toolkit',
        icon: '🛠️',
        content: (
          <div className="space-y-3">
            <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Apple Platforms</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">TODO: add toolkit bullet points</p>
            </div>
            <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Backend & Tools</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">TODO: outline supporting stack</p>
            </div>
            <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4">
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100">Design & Systems Thinking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">TODO: capture frameworks and process notes</p>
            </div>
          </div>
        ),
      },
      {
        id: 'shortcuts',
        label: 'Quick Links',
        icon: '✨',
        content: (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Preview recent roles and notebooks. Double-click an item to open the window.
            </p>
            <div className="divide-y divide-gray-200/70 dark:divide-white/10 rounded-xl border border-gray-200/70 dark:border-white/10 overflow-hidden bg-white/60 dark:bg-white/5">
              {experiences.map((exp) => {
                const appId = `experience_${exp.id}`;
                return (
                  <motion.button
                    key={exp.id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => onOpenApp && onOpenApp(appId)}
                    className="w-full text-left px-4 py-3 focus:outline-none focus-visible:ring-2 ring-blue-400/70 transition-colors hover:bg-blue-50/80 dark:hover:bg-blue-500/10"
                  >
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {exp.company}
                      <span className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 ml-2">
                        {exp.period}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{exp.role}</p>
                  </motion.button>
                );
              })}
            </div>
            <div className="rounded-lg bg-blue-500/10 dark:bg-blue-400/20 border border-blue-500/40 dark:border-blue-300/40 px-3 py-2 text-xs text-blue-700 dark:text-blue-100">
              Tip: Press ⌃⌥ + Space to summon Spotlight and search apps + easter eggs.
            </div>
          </div>
        ),
      },
    ],
    [experiences, onOpenApp]
  );

  const activeContent = sections.find((section) => section.id === activeSection)?.content;

  return (
    <div
      className={`h-full flex ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} ${
        isDarkMode ? 'bg-[#1f1f24]/80' : 'bg-white/80'
      }`}
    >
      <div
        className={`hidden md:flex flex-col w-48 lg:w-56 border-r ${
          isDarkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-white/70'
        } p-3 space-y-4`}
      >
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">Favorites</p>
          <div className="space-y-1.5">
            {sections.map((section) => (
              <SectionButton
                key={section.id}
                isActive={activeSection === section.id}
                label={section.label}
                icon={section.icon}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto space-y-4">{activeContent}</div>
      </div>
    </div>
  );
}

