import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Content Components
import ProjectGallery from './ProjectGallery';
import ExperienceContent from './content/ExperienceContent';
import ContactContent from './content/ContactContent';

// --- Data Definitions (Keep as is) ---
const experiencesData = [
    { id: 'apple', company: 'Apple', icon: '/images/icons/apple_logo.svg', logoSrc: '/images/logos/apple_logo.svg', role: 'Software Engineering Intern', period: 'May 2025 - Aug 2025', highlights: ['Incoming Software Engineering Intern at Shortcuts & App Intents Engineering team.'], media: [], color: '#333333', textColor: '#ffffff' },
    { id: 'fetch', company: 'Fetch', icon: '/images/logos/fetch-logo.png', logoSrc: '/images/logos/fetch-logo.png', role: 'iOS Software Engineering Intern', period: 'May 2024 - Aug 2024', highlights: ['Worked on Search, New Discover Experience (Home page redesign), App Intents & Shortcuts','Implemented Shop in Search feature.','Implemented revised carousel for NDEX','Created FetchAR during company-wide hackathon, winning People Choice award'], media: [{ type: 'image', src: '/images/fetch/fetch_web_1.PNG', shortCaption: 'Fetch Home Screen', longCaption: 'New Fetch home screen design.' },{ type: 'image', src: '/images/fetch/fetch_web_2.PNG', shortCaption: 'Search', longCaption: 'Shop cards in search results.' },{ type: 'video', src: '/videos/fetch/demo.mp4', shortCaption: 'App Intents Demo', longCaption: 'App Intents demo video.' },{ type: 'image', src: '/images/fetch/fetch_web_4.PNG', shortCaption: 'Shortcuts Integration', longCaption: 'iOS Shortcuts integration.' }], color: '#7A3CF7', textColor: '#ffffff' },
    { id: 'henryford', company: 'Henry Ford Innovation Institute', icon: '/images/logos/henry_logo_fr.webp', logoSrc: '/images/logos//henry_logo_fr.webp', role: 'Research & Software Engineering Intern', period: 'Jun 2023 - Aug 2023', highlights: ['Built "CrossWalk Buddy" using Swift and CoreML for visually impaired navigation.','Improved object detection accuracy by 40% and app performance by 25%.'], media: [], color: '#0072CE', textColor: '#ffffff' }
].sort((a, b) => {
    const yearA = parseInt(a.period.split(' - ')[0].split(' ')[1] || '0');
    const yearB = parseInt(b.period.split(' - ')[0].split(' ')[1] || '0');
    return yearB - yearA;
});

// --- App Configuration (Updated colors for better light/dark contrast) ---
const appsConfig = {
  projects: { id: 'projects', name: 'Projects', icon: '/images/icons/projects.png', component: ProjectGallery, defaultSize: { width: 800, height: 600 }, color: '#3B82F6', darkColor: '#60A5FA', textColor: '#ffffff' }, // Separate dark color
  experience_apple: { id: 'experience_apple', name: 'Experience: Apple', icon: experiencesData.find(e => e.id === 'apple').icon, component: ExperienceContent, data: experiencesData.find(e => e.id === 'apple'), defaultSize: { width: 650, height: 500 }, color: '#A1A1AA', darkColor: '#333333', textColor: '#ffffff', darkTextColor: '#ffffff' }, // Light/Dark Grays
  experience_fetch: { id: 'experience_fetch', name: 'Experience: Fetch', icon: experiencesData.find(e => e.id === 'fetch').icon, component: ExperienceContent, data: experiencesData.find(e => e.id === 'fetch'), defaultSize: { width: 650, height: 550 }, color: '#7C3AED', darkColor: '#7A3CF7', textColor: '#ffffff' },
  experience_hf: { id: 'experience_hf', name: 'Experience: Henry Ford', icon: experiencesData.find(e => e.id === 'henryford').icon, component: ExperienceContent, data: experiencesData.find(e => e.id === 'henryford'), defaultSize: { width: 650, height: 500 }, color: '#007BFF', darkColor: '#0072CE', textColor: '#ffffff' },
  contact: { id: 'contact', name: 'Contact Me', icon: '/images/icons/contact.png', component: ContactContent, defaultSize: { width: 500, height: 350 }, color: '#EF4444', darkColor: '#DC2626', textColor: '#ffffff' },
  github: { id: 'github', name: 'GitHub', icon: '/images/icons/github-logo.png', externalUrl: 'https://github.com/aadishiv23', color: '#4B5563', darkColor: '#333333', textColor: '#ffffff' },
  linkedin: { id: 'linkedin', name: 'LinkedIn', icon: '/images/icons/linkedin_logo.webp', externalUrl: 'https://www.linkedin.com/in/aadi-shiv-malhotra/', color: '#0A66C2', darkColor: '#0A66C2', textColor: '#ffffff' },
  // Simple About App for Menu Bar
   about: { id: 'about', name: 'About This Portfolio', icon: '/images/icons/ASM.png', // Add an info icon
      component: () => ( // Simple inline component for About
          <div className="p-6 text-center flex flex-col items-center justify-center h-full dark:text-gray-200 text-gray-800">
               <h2 className="text-2xl font-bold mb-4">AadiOS v1.0</h2>
               <p className="mb-2">Built by Aadi Shiv Malhotra using Aadi Intelligence (AI)</p>
               <p className="mb-4">Using Astro, React, Framer Motion, and Tailwind CSS.</p>
               <p className="text-sm opacity-80">(Inspired by macOS)</p>
          </div>
      ),
      defaultSize: { width: 400, height: 300 }, color: '#8B5CF6', darkColor: '#6D28D9', textColor: '#ffffff'
   },
};

// --- Dock Configuration (Keep as is) ---
const dockApps = [
    appsConfig.projects, appsConfig.experience_apple, appsConfig.experience_fetch, appsConfig.experience_hf, appsConfig.contact,
    { isSeparator: true },
    appsConfig.github, appsConfig.linkedin,
];

// --- Main Desktop Component ---
export default function MacDesktop() {
  const [openApps, setOpenApps] = useState(['projects']);
  const [activeWindow, setActiveWindow] = useState('projects');
  const [windowPositions, setWindowPositions] = useState({projects: {x: 60, y: 60}});
  const [windowSizes, setWindowSizes] = useState({projects: appsConfig.projects.defaultSize});
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [fullScreenWindows, setFullScreenWindows] = useState({});
  const [windowZIndices, setWindowZIndices] = useState({ projects: 10 });
  const [zIndexCounter, setZIndexCounter] = useState(11);
  const [spawnCount, setSpawnCount] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());
  // Default to system preference or light if no preference found
  const [isDarkMode, setIsDarkMode] = useState(() => {
       if (typeof window !== 'undefined') {
            const storedPref = localStorage.getItem('darkMode');
            if (storedPref !== null) return storedPref === 'true';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
       }
       return false; // Default for SSR
  });
  const [previewData, setPreviewData] = useState(null);

  const windowContainerRef = useRef(null);
  const isAnyWindowFullscreen = Object.values(fullScreenWindows).some(Boolean); // Check if any window is fullscreen

  // --- Effects ---

  useEffect(() => { // Clock Timer
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // --- Dark Mode Handling ---
  useEffect(() => {
    // Apply class based on state
    document.documentElement.classList.toggle('dark', isDarkMode);
    // Store preference
    localStorage.setItem('darkMode', isDarkMode.toString());

    // Listener for system changes (if user hasn't set preference)
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
        // Only sync if no explicit preference is stored
        if (localStorage.getItem('darkMode') === null) {
             setIsDarkMode(e.matches);
             // No need to toggle class here, state change triggers the effect again
        }
    };
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, [isDarkMode]); // Re-run when isDarkMode changes

  const toggleTheme = () => {
      setIsDarkMode(prevMode => !prevMode); // This triggers the useEffect above
  };

  // --- Window Management Callbacks (Mostly unchanged, ensure dependencies are correct) ---

  const bringToFront = useCallback((appId) => {
    if (!appId) return;
    const newZIndex = zIndexCounter;
    setActiveWindow(appId);
    setZIndexCounter(prev => prev + 1);
    setWindowZIndices(prev => ({ ...prev, [appId]: newZIndex }));
    if (minimizedWindows[appId]) {
      setMinimizedWindows(prev => { const newState = { ...prev }; delete newState[appId]; return newState; });
    }
  }, [zIndexCounter, minimizedWindows]);

  const openApp = useCallback((appId) => {
    const appConfig = appsConfig[appId];
    if (!appConfig) return;
    if (appConfig.externalUrl) { window.open(appConfig.externalUrl, '_blank', 'noopener,noreferrer'); return; }
    if (openApps.includes(appId)) { bringToFront(appId); return; }

    setOpenApps(prev => [...prev, appId]);
    const initialSize = appConfig.defaultSize || { width: 600, height: 400 };
    setWindowSizes(prev => ({ ...prev, [appId]: initialSize }));

    const container = windowContainerRef.current;
    const containerWidth = container?.clientWidth || window.innerWidth;
    const containerHeight = container?.clientHeight || window.innerHeight;
    const menuBarHeight = 28; const dockHeight = 80; const availableHeight = containerHeight - menuBarHeight - dockHeight;
    const initialX = 60; const initialY = menuBarHeight + 30; const offset = 30;
    const safeWidth = Math.max(containerWidth - initialSize.width - 40, 1);
    const safeHeight = Math.max(availableHeight - initialSize.height - 40, 1);
    const newX = initialX + ((spawnCount * offset) % safeWidth);
    const newY = initialY + ((spawnCount * offset) % safeHeight);

    setWindowPositions(prev => ({ ...prev, [appId]: { x: Math.max(20, newX), y: Math.max(menuBarHeight + 10, newY) } }));
    setSpawnCount(prev => prev + 1);
    bringToFront(appId);
  }, [openApps, spawnCount, bringToFront]);

  const closeApp = useCallback((appId) => {
    setOpenApps(prev => prev.filter(id => id !== appId));
    setWindowPositions(prev => { const newState = { ...prev }; delete newState[appId]; return newState; });
    setWindowSizes(prev => { const newState = { ...prev }; delete newState[appId]; return newState; });
    setMinimizedWindows(prev => { const newState = { ...prev }; delete newState[appId]; return newState; });
    setFullScreenWindows(prev => { const newState = { ...prev }; delete newState[appId]; return newState; });
    setWindowZIndices(prev => { const newState = { ...prev }; delete newState[appId]; return newState; });
    if (activeWindow === appId) {
      const remainingOpen = openApps.filter(id => id !== appId);
      if (remainingOpen.length > 0) {
        let topAppId = remainingOpen[0]; let maxZ = -1;
        remainingOpen.forEach(id => {
          if ((windowZIndices[id] || 0) > maxZ) { maxZ = windowZIndices[id] || 0; topAppId = id; }
        });
        setActiveWindow(topAppId);
      } else { setActiveWindow(null); }
    }
  }, [openApps, activeWindow, windowZIndices]);

  const minimizeApp = useCallback((appId) => {
      setMinimizedWindows(prev => ({ ...prev, [appId]: true }));
      if (activeWindow === appId) {
          const sortedWindows = Object.entries(windowZIndices)
              .filter(([id, z]) => id !== appId && !minimizedWindows[id] && openApps.includes(id))
              .sort(([, zA], [, zB]) => zB - zA);
           setActiveWindow(sortedWindows.length > 0 ? sortedWindows[0][0] : null);
      }
  }, [activeWindow, windowZIndices, minimizedWindows, openApps]);

 const toggleFullScreen = useCallback((appId) => {
    const isCurrentlyFullScreen = !!fullScreenWindows[appId];
    if (!isCurrentlyFullScreen) { bringToFront(appId); }
    setFullScreenWindows(prev => ({ ...prev, [appId]: !isCurrentlyFullScreen }));
 }, [bringToFront, fullScreenWindows]); // Updated dependency

  const handleWindowDrag = useCallback((event, info, appId) => {
    if (Math.abs(info.delta.x) < 0.1 && Math.abs(info.delta.y) < 0.1) return;
     setWindowPositions(prev => {
         const currentPos = prev[appId] || { x: 0, y: 0 };
         return { ...prev, [appId]: { x: currentPos.x + info.delta.x, y: currentPos.y + info.delta.y } }
     });
  }, [setWindowPositions]);

    const handleResize = useCallback((event, info, appId, constraintsRef) => {
        event.stopPropagation();
        setWindowSizes(prevSizes => {
            const currentSize = prevSizes[appId] || appsConfig[appId]?.defaultSize || { width: 600, height: 400 };
            const currentPos = windowPositions[appId] || { x: 50, y: 50 };
            const container = constraintsRef.current;
            if (!container) return prevSizes;
            const containerWidth = container.clientWidth; const containerHeight = container.clientHeight;
            const menuBarHeight = 28;
            let newWidth = currentSize.width + info.delta.x; let newHeight = currentSize.height + info.delta.y;
            const minWidth = 300; const minHeight = 200;
            newWidth = Math.max(minWidth, newWidth); newHeight = Math.max(minHeight, newHeight);
            const maxWidth = containerWidth - currentPos.x - 10;
            const maxHeight = containerHeight - currentPos.y - 10; // Allow resizing over dock area
            newWidth = Math.min(newWidth, maxWidth); newHeight = Math.min(newHeight, maxHeight);
            if (newWidth < minWidth || newHeight < minHeight) return prevSizes;
            return { ...prevSizes, [appId]: { width: newWidth, height: newHeight } };
        });
    }, [windowPositions, setWindowSizes]);

   // --- Menu Bar Actions ---
   const handleMenuFileQuit = useCallback(() => {
        if (activeWindow) {
            closeApp(activeWindow);
        } else {
            alert("No active application to quit.");
        }
   }, [activeWindow, closeApp]);

   const handleMenuEdit = useCallback(() => {
       alert("Edit functions (Undo, Redo, Cut, Copy, Paste) are not implemented in this portfolio simulation. Stop trying to break the simulation!!");
   }, []);

   const handleMenuViewToggleTheme = useCallback(() => {
       toggleTheme();
   }, [toggleTheme]); // Dependency on toggleTheme

   const handleWindowMinimize = useCallback(() => {
        if (activeWindow) {
            minimizeApp(activeWindow);
        } else {
            alert("No active window to minimize.");
        }
   }, [activeWindow, minimizeApp]);

   const handleWindowZoom = useCallback(() => {
        if (activeWindow) {
             toggleFullScreen(activeWindow);
        } else {
             alert("No active window to zoom.");
        }
   }, [activeWindow, toggleFullScreen]);

   const handleHelpAbout = useCallback(() => {
        openApp('about'); // Open the simple 'about' app
   }, [openApp]);

    // --- Sub Components ---

    const ResizeHandle = ({ appId, constraintsRef }) => { /* ... (Keep ResizeHandle as is) ... */
        const handleDragStart = (event) => { event.stopPropagation(); bringToFront(appId); };
        return ( <motion.div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white" drag dragMomentum={false} dragElastic={0} onDragStart={handleDragStart} onDrag={(event, info) => handleResize(event, info, appId, constraintsRef)}> <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"> <line x1="14" y1="14" x2="2" y2="2" /> <polyline points="14,8 14,14 8,14" /> <polyline points="2,8 2,2 8,2" /> </svg> </motion.div> );
    };
    const WindowControls = ({ appId }) => ( /* ... (Keep WindowControls as is) ... */
        <div className="flex space-x-1.5"> <button onClick={(e) => { e.stopPropagation(); closeApp(appId); }} className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none ring-1 ring-transparent focus:ring-red-700 focus:ring-offset-1 dark:focus:ring-offset-gray-700" aria-label={`Close ${appsConfig[appId]?.name || 'window'}`} /> <button onClick={(e) => { e.stopPropagation(); minimizeApp(appId); }} className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none ring-1 ring-transparent focus:ring-yellow-700 focus:ring-offset-1 dark:focus:ring-offset-gray-700" aria-label={`Minimize ${appsConfig[appId]?.name || 'window'}`} /> <button onClick={(e) => { e.stopPropagation(); toggleFullScreen(appId); }} className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none ring-1 ring-transparent focus:ring-green-700 focus:ring-offset-1 dark:focus:ring-offset-gray-700" aria-label={`Toggle Fullscreen ${appsConfig[appId]?.name || 'window'}`} /> </div>
    );
    const handleMediaClick = useCallback((assets, index) => { setPreviewData({ assets, index }); }, []);
    const formatTime = (date) => date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const formatDate = (date) => date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  // --- Render ---
  return (
    <div ref={windowContainerRef} className={`relative w-full h-full overflow-hidden flex flex-col font-sans text-sm ${isDarkMode ? 'dark bg-black' : 'bg-white'}`}> {/* Base text color handled by Tailwind dark: */}
      {/* Desktop Background */}
      <div
        className={`absolute inset-0 transition-colors duration-500 -z-10 ${
          isDarkMode
            ? 'bg-gradient-to-br from-gray-800 to-black' // Dark gradient
            : 'bg-[url("/images/macos-wallpaper-ventura-light.jpg")] bg-cover bg-center' // Light wallpaper
        }`}
      />
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0 pointer-events-none">
        <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${isDarkMode ? 'text-white/90' : 'text-black/80'} text-shadow-md`}>
            Aadi Shiv Malhotra
        </h1>
        <p className={`text-lg md:text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300/80' : 'text-gray-700/80'} text-shadow`}>
            Comp Sci & Cog Sci @ UMich | iOS Developer | Builder
        </p>
      </div>

      {/* Menu Bar - Conditionally hidden in true fullscreen */}
      <AnimatePresence>
          {!isAnyWindowFullscreen && (
              <motion.div
                 initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.2 }}
                 className={`relative flex-shrink-0 h-7 ${ isDarkMode ? 'bg-black/60 text-white' : 'bg-white/60 text-black' } backdrop-blur-md flex justify-between items-center px-4 z-[1500] border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'} shadow-sm`} // High z-index but below fullscreen windows
              >
                {/* Left side: Apple icon, App Name, Menus */}
                <div className={`flex items-center space-x-4`}>
                <img src="/images/icons/ASM.png" alt="Apple Logo" className="h-10 w-8 opacity-90" />
                  <span className="font-semibold">{activeWindow && appsConfig[activeWindow] ? appsConfig[activeWindow].name : 'Finder'}</span>
                  {/* Menu Items as Buttons */}
                  <button onClick={handleMenuFileQuit} className="hidden md:inline hover:bg-white/20 dark:hover:bg-black/20 px-1.5 rounded transition-colors" disabled={!activeWindow}>File</button>
                  <button onClick={handleMenuEdit} className="hidden md:inline hover:bg-white/20 dark:hover:bg-black/20 px-1.5 rounded transition-colors">Edit</button>
                  <button onClick={handleMenuViewToggleTheme} className="hidden md:inline hover:bg-white/20 dark:hover:bg-black/20 px-1.5 rounded transition-colors">View</button>
                  <button onClick={handleWindowMinimize} className="hidden md:inline hover:bg-white/20 dark:hover:bg-black/20 px-1.5 rounded transition-colors" disabled={!activeWindow}>Window</button>
                  <button onClick={handleHelpAbout} className="hidden md:inline hover:bg-white/20 dark:hover:bg-black/20 px-1.5 rounded transition-colors">Help</button>
                </div>
                {/* Right side: Controls, Clock */}
                <div className={`flex items-center space-x-3`}>
                  <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-500/20 focus:outline-none focus:ring-1 focus:ring-gray-500" aria-label="Toggle theme">{isDarkMode ? '🌙' : '☀️'}</button>
                  <span className='hidden sm:inline'>{formatDate(currentTime)}</span>
                  <span>{formatTime(currentTime)}</span>
                </div>
              </motion.div>
          )}
       </AnimatePresence>

      {/* Main Desktop Area (Windows) */}
      <div className="flex-grow relative overflow-hidden">
        <AnimatePresence>
          {openApps.map((appId) => {
            const appConfig = appsConfig[appId];
            if (!appConfig || minimizedWindows[appId]) return null;

            const AppContentComponent = appConfig.component;
            const isActive = activeWindow === appId;
            const isAppFullScreen = fullScreenWindows[appId]; // Use a different variable name
            const zIndex = windowZIndices[appId] || 10;

            // Define motion props based on state
            let motionProps = {};
            const targetPos = windowPositions[appId] || { x: 50, y: 50 };
            const targetSize = windowSizes[appId] || appConfig.defaultSize || { width: 600, height: 400 };

            if (isAppFullScreen) { // TRUE Fullscreen
                motionProps = {
                    initial: { x: targetPos.x, y: targetPos.y, width: targetSize.width, height: targetSize.height, opacity: 0, borderRadius: '0.5rem' },
                    animate: { x: 0, y: 0, width: '100vw', height: '100vh', zIndex: 2000, opacity: 1, borderRadius: '0px' }, // Covers everything
                    exit: { x: targetPos.x, y: targetPos.y, width: targetSize.width, height: targetSize.height, opacity: 0, scale: 0.9, borderRadius: '0.5rem' },
                    drag: false,
                    transition: { type: 'spring', stiffness: 300, damping: 35, mass: 0.9 } // Slightly adjusted transition
                };
            } else { // Normal Window
                motionProps = {
                    initial: { scale: 0.8, opacity: 0, x: targetPos.x, y: targetPos.y, width: targetSize.width, height: targetSize.height },
                    animate: { scale: 1, opacity: 1, zIndex: zIndex, x: targetPos.x, y: targetPos.y, width: targetSize.width, height: targetSize.height, borderRadius: '0.5rem' },
                    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
                    drag: true, dragMomentum: false, dragElastic: 0.05, dragConstraints: windowContainerRef,
                    onDrag: (event, info) => handleWindowDrag(event, info, appId),
                    transition: { type: 'spring', stiffness: 300, damping: 30 },
                };
            }

            // Determine window background and border based on mode
            const windowBgClass = isDarkMode ? 'bg-gray-800/85' : 'bg-white/85';
            const windowBorderClass = isDarkMode ? 'border-white/15' : 'border-black/15';
            const windowTextColorClass = isDarkMode ? 'text-gray-100' : 'text-gray-900'; // Base text color

            return (
              <motion.div
                key={appId} layoutId={`window-${appId}`}
                className={`absolute flex flex-col backdrop-blur-xl border ${windowBgClass} ${windowBorderClass} ${windowTextColorClass} ${ isActive ? 'shadow-2xl' : 'shadow-lg' }`}
                {...motionProps} onPointerDown={() => bringToFront(appId)}
              >
                {/* Title Bar */}
                <motion.div
                   layout="position"
                   className={`relative flex-shrink-0 h-8 px-3 flex justify-between items-center ${isAppFullScreen ? 'rounded-none' : 'rounded-t-lg'} cursor-grab ${isActive ? '' : 'opacity-80'}`}
                   style={{
                        backgroundColor: isDarkMode ? (appConfig.darkColor || '#444') : (appConfig.color || '#ddd'),
                        color: isDarkMode ? (appConfig.darkTextColor || '#fff') : (appConfig.textColor || '#000')
                    }}
                   onPointerDown={(e) => e.stopPropagation()} // Allow dragging only from title bar
                >
                   <WindowControls appId={appId} />
                   <span className="text-sm font-medium truncate px-2 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"> {appConfig.name} </span>
                   <div></div>{/* Spacer */}
                </motion.div>

                {/* Window Content */}
                <div className={`flex-grow relative overflow-auto h-full ${isAppFullScreen ? 'rounded-none' : 'rounded-b-lg'}`}>
                   {AppContentComponent && (
                     <AppContentComponent
                       isDarkMode={isDarkMode} // Pass the current mode
                       {...(appConfig.id.startsWith('experience_') && { experience: appConfig.data, onMediaClick: handleMediaClick })}
                       // Pass other props if needed by specific components
                     />
                   )}
                </div>

                {/* Resize Handle (only if not fullscreen) */}
                {!isAppFullScreen && <ResizeHandle appId={appId} constraintsRef={windowContainerRef} />}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock - Conditionally hidden in true fullscreen */}
      <AnimatePresence>
          {!isAnyWindowFullscreen && (
              <motion.div
                 initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
                 className="relative flex-shrink-0 flex justify-center z-[1500] pb-2 pt-1" // High z-index but below fullscreen windows
              >
                <div className={`px-2 py-1.5 rounded-xl flex items-end space-x-1.5 ${isDarkMode ? 'bg-white/10' : 'bg-black/5'} backdrop-blur-xl shadow-lg border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                  {dockApps.map((app, index) => {
                    if (app.isSeparator) { return <div key={`sep-${index}`} className="h-10 md:h-12 w-px bg-gray-500/30 mx-1 self-center"></div>; }
                    const isOpen = openApps.includes(app.id); const isMinimized = minimizedWindows[app.id];
                    const iconBg = isDarkMode ? 'bg-gray-700/50' : 'bg-white/70';
                    return (
                      <motion.div key={app.id} whileHover={{ y: -12, scale: 1.15 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="flex flex-col items-center group cursor-pointer" onClick={() => openApp(app.id)} title={app.name}>
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center overflow-hidden relative transition-transform duration-100 ease-out ${activeWindow === app.id && !isMinimized ? 'scale-105' : ''} ${iconBg} shadow`} >
                          {app.icon ? (<img src={app.icon} alt={app.name} className="w-full h-full object-contain p-1.5" />) : (<span className="text-xl font-bold" style={{ color: isDarkMode ? (app.darkTextColor || '#fff') : (app.textColor || '#000') }}>{app.name?.charAt(0)}</span>)}
                        </div>
                        <motion.div className={`w-1 h-1 rounded-full mt-1 transition-opacity duration-200 ${isOpen && !isMinimized ? (isDarkMode ? 'bg-gray-300' : 'bg-gray-600') : 'bg-transparent'}`} initial={{ scale: 0 }} animate={{ scale: (isOpen && !isMinimized) ? 1 : 0, opacity: (isOpen && !isMinimized) ? 1 : 0 }} />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
          )}
      </AnimatePresence>

      {/* Media Preview Modal (Keep as is) */}
      <AnimatePresence> {previewData && ( <motion.div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[3000]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPreviewData(null)}> <motion.div className="relative w-[80vw] max-w-[1000px] h-[80vh] max-h-[800px] bg-black/60 rounded-lg shadow-xl flex flex-col items-center p-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()} layout> <button onClick={() => setPreviewData(null)} className="absolute top-2 right-2 text-white/70 hover:text-white text-3xl z-10 bg-black/30 rounded-full w-8 h-8 flex items-center justify-center leading-none" aria-label="Close media preview">×</button> <div className="relative w-full h-full flex items-center justify-center overflow-hidden"> {previewData.assets.length > 1 && ( <button onClick={(e) => { e.stopPropagation(); setPreviewData(prev => ({ ...prev, index: (prev.index - 1 + prev.assets.length) % prev.assets.length })); }} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 bg-black/30 p-2 rounded-full" aria-label="Previous media">‹</button> )} <AnimatePresence mode="wait"> <motion.div key={previewData.assets[previewData.index].src} className="w-full h-full flex flex-col items-center justify-center" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.2 }}> {previewData.assets[previewData.index].type === 'video' ? ( <video src={previewData.assets[previewData.index].src} controls autoPlay className="max-w-full max-h-[85%] object-contain rounded" /> ) : ( <img src={previewData.assets[previewData.index].src} alt={previewData.assets[previewData.index].shortCaption} className="max-w-full max-h-[85%] object-contain rounded" /> )} {previewData.assets[previewData.index].longCaption && ( <p className="mt-3 text-gray-300 text-center text-sm px-4 line-clamp-2">{previewData.assets[previewData.index].longCaption}</p> )} </motion.div> </AnimatePresence> {previewData.assets.length > 1 && ( <button onClick={(e) => { e.stopPropagation(); setPreviewData(prev => ({ ...prev, index: (prev.index + 1) % prev.assets.length })); }} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white text-4xl z-10 bg-black/30 p-2 rounded-full" aria-label="Next media">›</button> )} </div> </motion.div> </motion.div> )} </AnimatePresence>
    </div>
  );
}