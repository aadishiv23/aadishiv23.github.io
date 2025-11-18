import React from 'react';

export default function ExperienceContent({ experience, isDarkMode, onMediaClick }) {
  if (!experience) return null;

  const baseText = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const subText = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const badgeStyles = isDarkMode
    ? 'bg-white/10 text-white border border-white/10'
    : 'bg-gray-900/5 text-gray-700 border border-gray-900/10';

  return (
    <div className={`h-full overflow-y-auto p-5 space-y-5 ${baseText}`}>
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {experience.logoSrc ? (
          <img
            src={experience.logoSrc}
            alt={`${experience.company} logo`}
            className="w-14 h-14 rounded-xl object-contain bg-white/80 dark:bg-white/10 p-2 shadow-sm"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl font-semibold">
            {experience.company?.charAt(0)}
          </div>
        )}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{experience.period}</p>
          <h2 className="text-2xl font-semibold leading-tight">{experience.role}</h2>
          <p className={`text-sm ${subText}`}>
            {experience.company}
            {experience.location ? ` · ${experience.location}` : ''}
          </p>
          {experience.focus && (
            <div className="flex flex-wrap gap-2 pt-2">
              {experience.focus.map((pill) => (
                <span key={pill} className={`px-2.5 py-1 text-xs rounded-full ${badgeStyles}`}>
                  {pill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
          Highlights
        </h3>
        <ul className="space-y-2">
          {experience.highlights.map((point, index) => (
            <li key={index} className={`text-sm leading-relaxed ${baseText}`}>
              <span className="mr-2 text-blue-500 dark:text-blue-300">▹</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {experience.tools && experience.tools.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Stack & Tooling
          </h3>
          <div className="flex flex-wrap gap-2">
            {experience.tools.map((tool) => (
              <span key={tool} className={`text-xs px-2.5 py-1 rounded-full ${badgeStyles}`}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {experience.media && experience.media.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Gallery</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {experience.media.map((media, index) => (
              <button
                type="button"
                key={`${media.src}-${index}`}
                onClick={() => onMediaClick?.(experience.media, index)}
                className="relative group aspect-video rounded-lg overflow-hidden border border-gray-200/60 dark:border-white/10 bg-gray-100 dark:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {media.type === 'video' ? (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-700 dark:text-gray-200">
                    <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                ) : (
                  <img src={media.src} alt={media.shortCaption} className="w-full h-full object-cover" loading="lazy" />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center px-3">
                  <p className="text-xs text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {media.shortCaption}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
