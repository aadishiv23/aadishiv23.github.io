import React from 'react'; // Keep React import if needed
import { motion } from 'framer-motion'; // Keep framer-motion if used within the content

// Extracted content rendering logic from your ORIGINAL Experience.jsx (NOT MacExperience.jsx)
// OR adapted from MacExperience's inner content part.
// This component ONLY renders the content, not the window frame/controls.

export default function ExperienceContent({ experience, isDarkMode, onMediaClick }) {
    if (!experience) return null; // Handle case where no experience data is passed

    return (
        <div className={`p-4 overflow-y-auto h-full ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            <div className="flex items-start space-x-4 mb-4">
                {/* Use experience data passed via props */}
                {experience.logoSrc ? (
                    <img
                        src={experience.logoSrc}
                        alt={`${experience.company} logo`}
                        className="w-12 h-12 object-contain rounded-lg flex-shrink-0 bg-gray-100 dark:bg-gray-700 p-1 shadow-sm"
                    />
                ) : (
                     <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                       {/* Fallback if no logo */}
                       <span className="text-2xl font-bold" style={{ color: experience.textColor || '#000' }}>
                         {experience.company?.charAt(0)}
                       </span>
                    </div>
                )}
                <div>
                    <h3 className="text-xl font-bold">{experience.role}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{experience.period}</p>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <h4 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Highlights:
                </h4>
                {experience.highlights.map((point, idx) => (
                    <p key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="mr-2 text-blue-500 dark:text-blue-400">•</span>
                        <span>{point}</span>
                    </p>
                ))}
            </div>

            {/* Media Gallery - Adapted from MacExperience */}
            {experience.media && experience.media.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3">Gallery</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {experience.media.map((media, idx) => (
                            <div
                                key={idx}
                                className="relative group cursor-pointer aspect-square bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden"
                                onClick={() => onMediaClick(experience.media, idx)} // Call prop function
                            >
                                {media.type === 'video' ? (
                                     <div className="w-full h-full flex items-center justify-center">
                                         {/* Simple play icon or thumbnail */}
                                          <svg className="w-10 h-10 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path></svg>
                                     </div>
                                ) : (
                                    <img
                                        src={media.src}
                                        alt={media.shortCaption}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                )}
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center p-2">
                                    <p className="text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {media.shortCaption}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}