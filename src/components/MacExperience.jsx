import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Experience() {
  const [openApps, setOpenApps] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [windowPositions, setWindowPositions] = useState({});
  const [windowSizes, setWindowSizes] = useState({});
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [fullScreenWindows, setFullScreenWindows] = useState({});
  // previewData now holds { assets: [...], index: number }
  const [previewData, setPreviewData] = useState(null);
  const [spawnCount, setSpawnCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  const windowRefs = useRef({});

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const experiences = [
    {
      id: 'apple',
      company: 'Apple',
      icon: '/images/icons/apple.svg',
      role: 'Software Engineering Intern',
      period: 'May 2025 - Aug 2025',
      highlights: [
        'Incoming Software Engineering Intern at Shortcuts & App Intents Engineering team.'
      ],
      media: [],
      color: '#333333',
      textColor: '#ffffff'
    },
    {
      id: 'fetch',
      company: 'Fetch',
      icon: '/images/icons/fetch.svg',
      role: 'iOS Software Engineering Intern',
      period: 'May 2024 - Aug 2024',
      highlights: [
        'Worked on Search, New Discover Experience (Home page redesign), App Intents & Shortcuts',
        'Implemented Shop in Search feature.',
        'Implemented revised carousel for NDEX',
        'Created FetchAR during company-wide hackathon, winning People Choice award'
      ],
      media: [
        {
          type: 'image',
          src: '/images/fetch/fetch_web_1.PNG',
          orientation: 'vertical',
          shortCaption: 'Fetch Home Screen',
          longCaption: 'This is the new design of the Fetch home screen, showcasing trending offers and products.'
        },
        {
          type: 'image',
          src: '/images/fetch/fetch_web_2.PNG',
          orientation: 'vertical',
          shortCaption: 'Search',
          longCaption: 'Implemented Fetch Shop cards when a user searches for a retailer in Fetch Shop.'
        },
        {
          type: 'video',
          src: '/videos/fetch/demo.mp4',
          orientation: 'vertical',
          shortCaption: 'Fetch App Intents Demo',
          longCaption: 'A demo video showcasing the App Intents implementation.'
        },
        {
          type: 'image',
          src: '/images/fetch/fetch_web_4.PNG',
          orientation: 'vertical',
          shortCaption: 'Fetch Shortcuts Integration',
          longCaption: 'Integration with iOS Shortcuts for quicker app actions.'
        }
      ],
      color: '#7A3CF7',
      textColor: '#ffffff'
    },
    {
      id: 'henryford',
      company: 'Henry Ford Innovation Institute',
      icon: '/images/icons/lab.svg',
      role: 'Research & Software Engineering Intern',
      period: 'Jun 2023 - Aug 2023',
      highlights: [
        'Built "CrossWalk Buddy" using Swift and CoreML for visually impaired navigation.',
        'Improved object detection accuracy by 40% and app performance by 25%.'
      ],
      media: [],
      color: '#0072CE',
      textColor: '#ffffff'
    }
  ];

  const systemApps = [
    { id: 'finder', name: 'Finder', icon: '/images/icons/finder.svg' },
    { id: 'safari', name: 'Safari', icon: '/images/icons/safari.svg' },
    { id: 'mail', name: 'Mail', icon: '/images/icons/mail.svg' },
    { id: 'notes', name: 'Notes', icon: '/images/icons/notes.svg' },
    { id: 'calendar', name: 'Calendar', icon: '/images/icons/calendar.svg' }
  ];

  // Opens an app. New apps spawn at a position based on the spawn counter.
  const openApp = (appId) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
      if (!windowSizes[appId]) {
        setWindowSizes({ ...windowSizes, [appId]: { width: 600, height: 400 } });
      }
      if (!windowPositions[appId]) {
        const maxX = window.innerWidth - 320; // leaving room for minimum width and padding
        const maxY = window.innerHeight - 220; // leaving room for minimum height and padding
        const newX = 40 + ((spawnCount * 30) % maxX);
        const newY = 40 + ((spawnCount * 30) % maxY);
        setWindowPositions((prev) => ({ ...prev, [appId]: { x: newX, y: newY } }));
        setSpawnCount(spawnCount + 1);
      }
    }
    if (minimizedWindows[appId]) {
      setMinimizedWindows((prev) => ({ ...prev, [appId]: false }));
    }
    setActiveWindow(appId);
  };

  const bringToFront = (appId) => {
    setActiveWindow(appId);
    if (minimizedWindows[appId]) {
      setMinimizedWindows((prev) => ({ ...prev, [appId]: false }));
    }
  };

  const handleWindowDrag = (appId, info) => {
    setWindowPositions((prev) => ({
      ...prev,
      [appId]: { x: info.point.x, y: info.point.y }
    }));
  };

  // Resize handle: clamps size so windows don't exceed viewport edges
  const ResizeHandle = ({ appId }) => {
    const handleResize = (e, info) => {
      e.stopPropagation();
      setWindowSizes((prev) => {
        const current = prev[appId] || { width: 600, height: 400 };
        const pos = windowPositions[appId] || { x: 0, y: 0 };
        const newWidth = current.width + info.delta.x;
        const newHeight = current.height + info.delta.y;
        const maxWidth = window.innerWidth - pos.x - 20;
        const maxHeight = window.innerHeight - pos.y - 20;
        return {
          ...prev,
          [appId]: {
            width: Math.min(Math.max(300, newWidth), maxWidth),
            height: Math.min(Math.max(200, newHeight), maxHeight)
          }
        };
      });
    };

    return (
      <motion.div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50"
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={(e) => e.stopPropagation()}
        onDrag={handleResize}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path
            d="M11 11L16 16M6 11L16 11M11 6L16 6M16 11L16 16"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </motion.div>
    );
  };

  const closeApp = (appId) => {
    setOpenApps((prev) => prev.filter((id) => id !== appId));
    if (activeWindow === appId) {
      setActiveWindow(openApps.filter((id) => id !== appId)[0] || null);
    }
  };

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = (date) =>
    date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  // Window controls: red closes, yellow minimizes, green toggles “maximized” mode.
  const WindowControls = ({ appId }) => {
    return (
      <div className="flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeApp(appId);
          }}
          className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMinimizedWindows((prev) => ({ ...prev, [appId]: true }));
            if (activeWindow === appId) setActiveWindow(null);
          }}
          className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setFullScreenWindows((prev) => ({ ...prev, [appId]: !prev[appId] }));
          }}
          className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600"
        />
      </div>
    );
  };

  return (
    <section
      id="experience"
      className={`relative w-full h-screen overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-blue-50'
      }`}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          isDarkMode ? 'from-gray-800 to-gray-900' : 'from-blue-300 to-purple-300'
        } transition-colors duration-500`}
      />

      {/* Menu Bar */}
      <div
        className={`absolute top-20 left-0 right-0 h-8 ${
          isDarkMode ? 'bg-black/50' : 'bg-white/50'
        } backdrop-blur-md flex justify-between items-center px-4 z-10`}
      >
        <div className={`flex items-center space-x-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <span className="font-bold">Experience</span>
        </div>

        <div className={`flex items-center space-x-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
          <span>{formatDate(currentTime)}</span>
          <span>{formatTime(currentTime)}</span>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-1 rounded-full hover:bg-gray-200/20"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Windows / App Content */}
      <div className="absolute inset-0 pt-8">
        <AnimatePresence>
          {openApps.map((appId) => {
            if (minimizedWindows[appId]) return null;
            const experience = experiences.find((exp) => exp.id === appId);
            if (!experience) return null;
            const isActive = activeWindow === appId;
            const isFullScreen = fullScreenWindows[appId];
            const pos = windowPositions[appId] || { x: 0, y: 0 };
            const size = windowSizes[appId] || { width: 600, height: 400 };

            // If full screen, fill 80% of viewport and center the window.
            let windowStyle;
            if (isFullScreen) {
              const vw = window.innerWidth;
              const vh = window.innerHeight;
              const width = 0.8 * vw;
              const height = 0.8 * vh;
              windowStyle = { width, height, x: 50, y: 50 };
            } else {
              windowStyle = { width: size.width, height: size.height, x: pos.x, y: pos.y };
            }

            return (
              <motion.div
                key={appId}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, zIndex: isActive ? 30 : 20 }}
                exit={{ scale: 0.8, opacity: 0 }}
                drag={!isFullScreen}
                dragMomentum={false}
                dragElastic={0.1}
                onDrag={(_, info) => {
                  if (!isFullScreen) handleWindowDrag(appId, info);
                }}
                style={windowStyle}
                onPointerDown={() => bringToFront(appId)}
                className="absolute relative bg-white dark:bg-gray-800 rounded-lg shadow-xl"
                ref={(el) => (windowRefs.current[appId] = el)}
              >
                {/* Title Bar with Controls */}
                <div
                  className="p-3 flex justify-between items-center rounded-t-lg"
                  style={{ backgroundColor: experience.color, color: experience.textColor }}
                >
                  <div className="flex items-center space-x-2">
                    <WindowControls appId={appId} />
                    <h3 className="ml-4 font-medium">{experience.company}</h3>
                  </div>
                </div>

                {/* Window Content */}
                <div
                  className="p-4 overflow-y-auto relative"
                  style={{ maxHeight: isFullScreen ? 'none' : 'calc(100% - 60px)' }}
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold">{experience.company.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold dark:text-white">{experience.role}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{experience.period}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    {experience.highlights.map((point, idx) => (
                      <p key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>

                  {/* Media Gallery */}
                  {experience.media.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold mb-3 dark:text-white">Gallery</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {experience.media.map((media, idx) => (
                          <div
                            key={idx}
                            className="relative group cursor-pointer"
                            onClick={() =>
                              setPreviewData({ assets: experience.media, index: idx })
                            }
                          >
                            {media.type === 'video' ? (
                              <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-md">
                                <span className="text-xl">▶️</span>
                              </div>
                            ) : (
                              <img
                                src={media.src}
                                alt={media.shortCaption}
                                className="w-full h-48 object-cover rounded-md"
                              />
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-md flex items-center justify-center">
                              <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-sm p-2">
                                {media.shortCaption}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {/* Resize Handle (hidden in maximized mode) */}
                {!isFullScreen && <ResizeHandle appId={appId} />}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-40">
        <motion.div
          className={`px-2 py-1 rounded-2xl flex items-end space-x-1 ${
            isDarkMode ? 'bg-white/20' : 'bg-black/20'
          } backdrop-blur-xl shadow-lg`}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', bounce: 0.5 }}
        >
          {/* System Apps */}
          <div className="flex items-end space-x-1 pr-6 border-r border-gray-400/30">
            {systemApps.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ y: -10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="flex flex-col items-center group"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
                  <span className="text-2xl">
                    {app.id === 'finder'
                      ? '🔍'
                      : app.id === 'safari'
                      ? '🌐'
                      : app.id === 'mail'
                      ? '✉️'
                      : app.id === 'notes'
                      ? '📝'
                      : '📅'}
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: openApps.includes(app.id) ? 1 : 0,
                    scale: openApps.includes(app.id) ? 1 : 0
                  }}
                  className="w-1 h-1 bg-gray-400 rounded-full mt-1"
                />
              </motion.div>
            ))}
          </div>

          {/* Experience Apps */}
          <div className="flex items-end space-x-1">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                whileHover={{ y: -10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => openApp(exp.id)}
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: exp.color }}
                >
                  <span className="text-2xl text-white font-bold">{exp.company.charAt(0)}</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: openApps.includes(exp.id) ? 1 : 0,
                    scale: openApps.includes(exp.id) ? 1 : 0
                  }}
                  className="w-1 h-1 bg-gray-400 rounded-full mt-1"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Preview Modal */}
      {previewData && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={() => setPreviewData(null)}
        >
          <div className="relative w-[80vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewData(null)}
              className="absolute top-0 right-0 m-2 text-white text-2xl z-10"
            >
              &times;
            </button>
            {/* Left arrow */}
            {previewData.assets.length > 1 && previewData.index > 0 && (
              <button
                onClick={() =>
                  setPreviewData((prev) => ({ ...prev, index: prev.index - 1 }))
                }
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
              >
                &#8592;
              </button>
            )}
            {/* Right arrow */}
            {previewData.assets.length > 1 && previewData.index < previewData.assets.length - 1 && (
              <button
                onClick={() =>
                  setPreviewData((prev) => ({ ...prev, index: prev.index + 1 }))
                }
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
              >
                &#8594;
              </button>
            )}
            {previewData.assets[previewData.index].type === 'video' ? (
              <video
                src={previewData.assets[previewData.index].src}
                controls
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={previewData.assets[previewData.index].src}
                alt={previewData.assets[previewData.index].shortCaption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            {previewData.assets[previewData.index].longCaption && (
              <p className="mt-2 text-white text-center">
                {previewData.assets[previewData.index].longCaption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
