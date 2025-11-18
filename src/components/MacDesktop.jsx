import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Content Components
import ProjectGallery from './ProjectGallery';
import ExperienceContent from './content/ExperienceContent';
import ContactContent from './content/ContactContent';
import FinderContent from './content/FinderContent';
import NotesContent from './content/NotesContent';
import TerminalContent from './content/TerminalContent';

// --- Updated Experience Data ---
const experiencesData = [
  {
    id: 'fetch-l3',
    company: 'Fetch',
    icon: '/images/logos/fetch-logo.png',
    logoSrc: '/images/logos/fetch-logo.png',
    role: 'iOS Software Engineer (L3)',
    period: 'Sep 2025 - Present',
    location: 'Remote · Birmingham, MI',
    focus: ['Personalization Platform', 'Mobile Analytics', 'Shortcuts & Spotlight'],
    highlights: [
      'Developing new features on mobile for over 14 million MAU and working on personalization at scale using Swift, SwiftUI, and Swift Concurrency',
      'Implementing standardized strongly typed mobile analytics library using Swift, Wire, and Protobuf for over >$170 billion GMV consumer insights',
      'DRI for Shortcuts, App Intents, and Spotlight integration for Fetch app leading to increase in offer and brand impressions by ~10% in experiment',
      'Developing Claude Code & OpenAI Codex agents & helpers to aid engineers and non-technical roles with developer experience and productivity',
    ],
    tools: ['Swift', 'SwiftUI', 'Swift Concurrency', 'Wire', 'Protobuf', 'Claude', 'OpenAI'],
    media: [
      { type: 'image', src: '/images/fetch/fetch_web_1.PNG', shortCaption: 'Fetch Home', longCaption: 'Personalized home experience.' },
      { type: 'image', src: '/images/fetch/fetch_web_2.PNG', shortCaption: 'Search', longCaption: 'Shop cards in search.' },
      { type: 'video', src: '/videos/fetch/demo.mp4', shortCaption: 'Shortcuts', longCaption: 'App Intents demo.' },
    ],
    color: '#7C3AED',
    darkColor: '#5B21B6',
    textColor: '#ffffff',
  },
  {
    id: 'apple-proactive',
    company: 'Apple',
    subtitle: 'Proactive Intelligence',
    icon: '/images/icons/apple_logo.svg',
    logoSrc: '/images/logos/apple-logo.png',
    role: 'Software Engineering Intern',
    period: 'May 2025 - Aug 2025',
    location: 'Cupertino, CA',
    focus: ['Shortcuts', 'Spotlight', 'System Frameworks'],
    highlights: [
      'Worked on Shortcuts product and infrastructure to implement new features with stringent memory and performance guidelines',
      'Developed and converged features for new tentpole macOS Spotlight experience that allows users to take actions in-context using Swift',
      'Worked on system-level tool infrastructure and features for infrastructure clients such as Shortcuts, Spotlight, Siri etc.',
      'Developed internal tools to improve debugging and bug reporting experience',
      'Contributed towards tentpole-level Shortcuts features and associated convergence using Swift, SwiftUI, Objective-C and UIKit',
      'Prototyped conceptual project with Widgets and Shortcuts, presenting to wider organization and showcasing technical and design challenges',
    ],
    tools: ['Swift', 'SwiftUI', 'Objective-C', 'UIKit', 'Shortcuts', 'Spotlight'],
    media: [],
    color: '#1d1d1f',
    darkColor: '#000000',
    textColor: '#ffffff',
  },
  {
    id: 'fetch-intern',
    company: 'Fetch',
    icon: '/images/logos/fetch-logo.png',
    logoSrc: '/images/logos/fetch-logo.png',
    role: 'Software Engineering Intern',
    period: 'May 2024 - Aug 2024',
    location: 'Madison, WI',
    focus: ['App Intents', 'Search', 'Augmented Reality'],
    highlights: [
      'Implemented App Intents and Shortcuts to support App Shortcuts, navigation through Spotlight and Siri, and interactive widgets',
      'Implemented retailer shop feature in search, developed infrastructure and architected the system to be robust to support 14 million MAU',
      'Created a card-based UI element for product offerings in Search, driving incremental revenue on overhauled Search feature',
      'Redeveloped carousel ad system with SwiftUI, adding features requested by Fetch\'s CPG partners with annual revenue gain of $3 million/yr',
      'Won internal hackathon with \'FetchLens\', an augmented reality (AR) based shopping experience by using Swift, UIKit, ARKit, and RealityKit',
      'Helped fixed concurrency issues, refactored 20 remaining Objective-C files to Swift, and converted tests to XCTest',
    ],
    tools: ['Swift', 'SwiftUI', 'UIKit', 'ARKit', 'RealityKit', 'App Intents'],
    media: [
      { type: 'image', src: '/images/fetch/fetch_web_1.PNG', shortCaption: 'Fetch Home', longCaption: 'New Fetch home screen design.' },
      { type: 'image', src: '/images/fetch/fetch_web_2.PNG', shortCaption: 'Search', longCaption: 'Shop cards in search results.' },
      { type: 'video', src: '/videos/fetch/demo.mp4', shortCaption: 'App Intents Demo', longCaption: 'App Intents demo video.' },
      { type: 'image', src: '/images/fetch/fetch_web_4.PNG', shortCaption: 'Shortcuts Integration', longCaption: 'iOS Shortcuts integration.' },
    ],
    color: '#7C3AED',
    darkColor: '#5B21B6',
    textColor: '#ffffff',
  },
  {
    id: 'henry-ford',
    company: 'Henry Ford Innovation Institute',
    icon: '/images/logos/hfhs-logo.png',
    logoSrc: '/images/logos/hfhs-logo.png',
    role: 'Research & Software Engineering Intern',
    period: 'Jun 2023 - Aug 2023',
    location: 'Detroit, MI',
    focus: ['Computer Vision', 'Accessibility', 'CoreML'],
    highlights: [
      'Developed "CrossWalk Buddy," using Swift, UIKit, and on-device machine learning to assist visually impaired individuals in navigating roads',
      'Leveraged Apple\'s Vision framework and CoreML, resulting in a 40% improvement in real-time object detection accuracy',
      'Employed advanced iOS performance optimization techniques, including Swift Concurrency and memory management best practices, boosting overall app performance by 25% and achieving a consistent 60 FPS for AR features on the latest iPhone models',
    ],
    tools: ['Swift', 'UIKit', 'Vision', 'CoreML', 'Swift Concurrency'],
    media: [],
    color: '#0066CC',
    darkColor: '#004C99',
    textColor: '#ffffff',
  },
  {
    id: 'ljungman-lab',
    company: 'Ljungman Lab',
    subtitle: 'KLIPP Therapy Team',
    icon: '/images/icons/projects.png',
    logoSrc: null,
    role: 'Research Assistant',
    period: 'Oct 2021 - May 2025',
    location: 'Ann Arbor, MI',
    focus: ['Computational Genomics', 'Web Platform', 'Pipeline Development'],
    highlights: [
      'Developing a computational pipeline to identify structural variations in whole genome sequencing for future clinical applications',
      'Created a web platform to allow researchers to find targets rapidly and iterate on RNA designs by using ReactJS, TypeScript, and Go',
    ],
    tools: ['React', 'TypeScript', 'Go', 'PostgreSQL'],
    media: [],
    color: '#0F766E',
    darkColor: '#0E4F4A',
    textColor: '#ffffff',
  },
];

// --- Projects Data ---
const projectsData = [
  {
    id: 'radius',
    name: 'Radius',
    tagline: 'Real-time location sharing with AR',
    description: 'A sophisticated real-time location sharing app with interactive maps, zone definitions, and AR capabilities.',
    highlights: [
      'Created a real-time location app, written in Swift and Go, with a PostgreSQL database, capable of handling up to 10,000 concurrent requests',
      'Implemented real-time location tracking, notification system, and social features capable of supporting over 500 live users per session',
      'Integrated interactive maps, allowing users to define zones by placing pins or entering addresses, and visualize these zones with adjustable radii',
      'Employed Swift Concurrency to streamline real-time communication allowing the app to distribute location and social updates in realtime',
      'Created an AR prototype using SwiftUI and RealityKit, enabling users to place and fix objects in 3D space with real-time camera interactions',
    ],
    tech: ['Swift', 'SwiftUI', 'Go', 'PostgreSQL', 'RealityKit', 'Swift Concurrency'],
    image: '/images/projects/radius.png', // TODO: Add project images
    github: 'https://github.com/aadishiv23', // TODO: Add actual repo link
    color: '#10B981',
    darkColor: '#059669',
  },
  {
    id: 'iris',
    name: 'Iris',
    tagline: 'Local AI assistant with system integration',
    description: 'A 3B-LLM powered personal assistant with local context and system tool access for iOS & macOS.',
    highlights: [
      'Developed a 3B-LLM, written in MLX, powered personal assistant with local context and access to system tools (iOS & macOS)',
      'Implemented multi-modal chat ability and integrated CSM-MLX 1B model for conversational abilities',
      'Reduced latency in tool call end-to-end execution from 10+ seconds to 5 seconds by removing JSON tool calls with custom tool specs',
    ],
    tech: ['Swift', 'MLX', 'Python', 'CoreML', 'App Intents'],
    image: '/images/projects/iris.png', // TODO: Add project images
    github: 'https://github.com/aadishiv23', // TODO: Add actual repo link
    color: '#8B5CF6',
    darkColor: '#7C3AED',
  },
  {
    id: 'pillpals',
    name: 'PillPals',
    tagline: 'Digital pill tracker for memory loss patients',
    description: 'An intuitive medication tracking app designed specifically for patients with memory loss conditions.',
    highlights: [
      'Developing \'PillPals,\' a digital pill tracker app for patients with memory loss using Swift, SwiftUI, HealthKit, WidgetKit, and App Intents',
      'Designed an intuitive UI achieving a 40% increase in usability scores based on user surveys when compared to existing apps',
    ],
    tech: ['Swift', 'SwiftUI', 'HealthKit', 'WidgetKit', 'App Intents'],
    image: '/images/projects/pillpals.png', // TODO: Add project images
    color: '#EF4444',
    darkColor: '#DC2626',
  },
];

// --- Contact Information ---
const contactInfo = {
  name: 'Aadi Shiv Malhotra',
  address: '180 Baldwin Rd, Birmingham, MI 48009',
  emails: ['aadishiv@umich.edu', 'aadishiv@outlook.com'],
  phone: '(248) 906-9401',
  github: 'https://github.com/aadishiv23',
  linkedin: 'https://www.linkedin.com/in/aadi-shiv-malhotra/',
};

// --- Skills Data ---
const skillsData = {
  languages: ['C/C++', 'Python', 'R', 'Swift (SwiftUI & UIKit)', 'JavaScript', 'TypeScript', 'Java', 'SQL', 'Ruby', 'Go'],
  frameworks: ['Swift Concurrency', 'Apple Frameworks', 'ReactJS', 'NodeJS'],
  tools: ['Figma', 'Xcode', 'Git'],
};

// --- App Configuration ---
const baseAppsConfig = {
  finder: {
    id: 'finder',
    name: 'Finder',
    icon: '/images/icons/finder_next.png',
    component: FinderContent,
    defaultSize: { width: 900, height: 600 },
    color: '#3b82f6',
    darkColor: '#2563eb',
    textColor: '#ffffff',
    getProps: ({ openApp }) => ({
      onOpenApp: openApp,
      experiences: experiencesData,
      projects: projectsData,
    }),
  },
  projects: {
    id: 'projects',
    name: 'Projects',
    icon: '/images/icons/projects_next.png',
    component: ProjectGallery,
    defaultSize: { width: 900, height: 650 },
    color: '#10B981',
    darkColor: '#059669',
    textColor: '#ffffff',
  },
  contact: {
    id: 'contact',
    name: 'Contact',
    icon: '/images/icons/contact_next.png',
    component: ContactContent,
    defaultSize: { width: 500, height: 450 },
    color: '#3B82F6',
    darkColor: '#2563EB',
    textColor: '#ffffff',
    getProps: () => ({ contactInfo }),
  },
  notes: {
    id: 'notes',
    name: 'Scratchpad',
    icon: '/images/icons/notes_next.png',
    component: NotesContent,
    defaultSize: { width: 500, height: 400 },
    color: '#FCD34D',
    darkColor: '#F59E0B',
    textColor: '#1F2937',
    darkTextColor: '#FEF3C7',
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: '/images/icons/terminal_next.png',
    component: TerminalContent,
    defaultSize: { width: 700, height: 450 },
    color: '#1F2937',
    darkColor: '#111827',
    textColor: '#10B981',
    getProps: ({ openApp, toggleTheme, closeApp }) => ({
      onOpenApp: openApp,
      onToggleTheme: toggleTheme,
      onRequestClose: () => closeApp('terminal'),
      contactInfo,
      skills: skillsData,
    }),
  },
  about: {
    id: 'about',
    name: 'About AadiOS',
    icon: '/images/icons/about_next.png',
    component: ({ isDarkMode }) => (
      <div className={`h-full flex flex-col items-center justify-center gap-6 p-8 text-center ${isDarkMode ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100' : 'bg-gradient-to-br from-slate-50 to-white text-slate-900'
        }`}>
        <div className="flex flex-col items-center gap-3">
          <img src="/images/icons/ASM.png" alt="AadiOS" className="w-24 h-24 rounded-2xl shadow-lg" />
          <h2 className="text-3xl font-bold">AadiOS 2.0</h2>
          <div className="text-sm opacity-75">Version 2.0.0 (Build 2025.01)</div>
        </div>
        <div className="max-w-md space-y-2 text-sm">
          <p>A macOS-inspired portfolio experience crafted with Astro, React, Framer Motion, and Tailwind CSS.</p>
          <p className="text-xs opacity-60">© 2025 Aadi Shiv Malhotra. All rights reserved.</p>
        </div>
        <div className="text-xs space-y-1 opacity-50">
          <p>🎨 Design: macOS-inspired interface</p>
          <p>⚡ Built with: Astro + React + Framer Motion</p>
          <p>🚀 Deployed with: Vercel</p>
        </div>
      </div>
    ),
    defaultSize: { width: 500, height: 500 },
    color: '#8B5CF6',
    darkColor: '#7C3AED',
    textColor: '#ffffff',
  },
  github: {
    id: 'github',
    name: 'GitHub',
    icon: '/images/icons/github-logo.png',
    externalUrl: 'https://github.com/aadishiv23',
    color: '#333333',
    darkColor: '#1F2937',
    textColor: '#ffffff',
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/images/icons/linkedin_logo.webp',
    externalUrl: 'https://www.linkedin.com/in/aadi-shiv-malhotra/',
    color: '#0A66C2',
    darkColor: '#0A66C2',
    textColor: '#ffffff',
  },
};

// Create experience apps dynamically
const experienceApps = experiencesData.reduce((acc, experience) => {
  const appId = `experience_${experience.id}`;
  acc[appId] = {
    id: appId,
    name: `${experience.company}${experience.subtitle ? ' · ' + experience.subtitle : ''}`,
    icon: experience.icon,
    component: ExperienceContent,
    data: experience,
    defaultSize: { width: 750, height: 550 },
    color: experience.color,
    darkColor: experience.darkColor || experience.color,
    textColor: experience.textColor || '#ffffff',
    darkTextColor: experience.darkTextColor || experience.textColor || '#ffffff',
  };
  return acc;
}, {});

const appsConfig = { ...baseAppsConfig, ...experienceApps };

// Dock configuration
const dockApps = [
  appsConfig.finder,
  appsConfig.projects,
  ...experiencesData.map(exp => appsConfig[`experience_${exp.id}`]),
  appsConfig.contact,
  { isSeparator: true },
  appsConfig.notes,
  appsConfig.terminal,
  { isSeparator: true },
  appsConfig.about,
  appsConfig.github,
  appsConfig.linkedin,
];
const dockIconCount = dockApps.filter(app => !app?.isSeparator).length;

const MENU_BAR_HEIGHT = 28;
const DOCK_HEIGHT = 96;
const WINDOW_MARGIN = 20;
const DOCK_BASE_ICON_SIZE = 56;
const DOCK_SIZE_GROWTH = 26;
const DOCK_ICON_MAX_SIZE = DOCK_BASE_ICON_SIZE + DOCK_SIZE_GROWTH;
const DOCK_BUTTON_PADDING = 14;
const DOCK_BASE_SLOT_WIDTH = DOCK_BASE_ICON_SIZE + DOCK_BUTTON_PADDING;

// --- Main Desktop Component ---
export default function MacDesktop() {
  const initialAppId = 'finder';
  const [openApps, setOpenApps] = useState([initialAppId]);
  const [activeWindow, setActiveWindow] = useState(initialAppId);
  const [windowPositions, setWindowPositions] = useState({
    [initialAppId]: { x: 100, y: 80 },
  });
  const [windowSizes, setWindowSizes] = useState({
    [initialAppId]: appsConfig[initialAppId].defaultSize,
  });
  const [minimizedWindows, setMinimizedWindows] = useState({});
  const [fullScreenWindows, setFullScreenWindows] = useState({});
  const [windowZIndices, setWindowZIndices] = useState({ [initialAppId]: 10 });
  const [zIndexCounter, setZIndexCounter] = useState(11);
  const [spawnCount, setSpawnCount] = useState(1);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedPref = localStorage.getItem('darkMode');
      if (storedPref !== null) return storedPref === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [previewData, setPreviewData] = useState(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const [editMenuOpen, setEditMenuOpen] = useState(false);
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const [windowMenuOpen, setWindowMenuOpen] = useState(false);
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [focusEnabled, setFocusEnabled] = useState(false);
  const [wifiOn, setWifiOn] = useState(true);
  const [hoveredDockItemId, setHoveredDockItemId] = useState(null);
  const [dockPointerX, setDockPointerX] = useState(null);

  // Easter egg states
  const [konami, setKonami] = useState([]);
  const [shakeCount, setShakeCount] = useState(0);
  const [lastShakeTime, setLastShakeTime] = useState(0);

  const windowContainerRef = useRef(null);
  const dockRef = useRef(null);
  const dockIconRefs = useRef({});
  const isAnyWindowFullscreen = Object.values(fullScreenWindows).some(Boolean);

  const registerDockIcon = useCallback((id, node) => {
    if (node) {
      dockIconRefs.current[id] = node;
    } else {
      delete dockIconRefs.current[id];
    }
  }, []);

  const getDockHoverIntensity = useCallback(
    (appId) => {
      if (dockPointerX === null) return 0;
      const node = dockIconRefs.current[appId];
      if (!node) return 0;
      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(dockPointerX - centerX);
      const influenceRadius = 110;
      if (distance >= influenceRadius) return 0;
      return 1 - distance / influenceRadius;
    },
    [dockPointerX]
  );

  // Clock timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Dark mode handling
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode.toString());

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
      }
    };
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, [isDarkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl+Cmd+Space for Spotlight (macOS standard)
      if (event.ctrlKey && event.metaKey && event.code === 'Space') {
        event.preventDefault();
        setIsSpotlightOpen(prev => !prev);
        if (isSpotlightOpen) setSpotlightQuery('');
        dismissFloatingChrome();
      }

      // Cmd+K alternative for Spotlight
      if (event.metaKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsSpotlightOpen(true);
        setSpotlightQuery('');
        dismissFloatingChrome();
      }

      // Escape closes everything
      if (event.key === 'Escape') {
        setIsSpotlightOpen(false);
        dismissFloatingChrome();
      }

      // Easter egg: Konami code
      setKonami(prev => {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        const newSeq = [...prev, event.key].slice(-10);
        if (newSeq.join(',') === konamiCode.join(',')) {
          triggerKonamiEasterEgg();
          return [];
        }
        return newSeq;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSpotlightOpen]);

  // Easter egg: Shake to toggle dark mode
  useEffect(() => {
    const handleMotion = (event) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const threshold = 15;
      const shake = Math.abs(acceleration.x) > threshold ||
        Math.abs(acceleration.y) > threshold ||
        Math.abs(acceleration.z) > threshold;

      if (shake) {
        const now = Date.now();
        if (now - lastShakeTime > 1000) {
          setShakeCount(prev => prev + 1);
          setLastShakeTime(now);

          if (shakeCount >= 2) {
            setIsDarkMode(prev => !prev);
            setShakeCount(0);
          }
        }
      }
    };

    window.addEventListener('devicemotion', handleMotion);
    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [shakeCount, lastShakeTime]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  const dismissFloatingChrome = useCallback(() => {
    setAppleMenuOpen(false);
    setFileMenuOpen(false);
    setEditMenuOpen(false);
    setViewMenuOpen(false);
    setWindowMenuOpen(false);
    setHelpMenuOpen(false);
    setIsControlCenterOpen(false);
  }, []);

  // Easter egg function
  const triggerKonamiEasterEgg = () => {
    // Flash screen and show secret message
    document.body.style.transition = 'filter 0.5s';
    document.body.style.filter = 'hue-rotate(180deg) saturate(200%)';
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 2000);

    openApp('about');
    setTimeout(() => {
      alert('🎮 Konami Code Activated! You found the secret! 🎉');
    }, 500);
  };

  // Window management
  const bringToFront = useCallback((appId) => {
    if (!appId) return;
    const newZIndex = zIndexCounter;
    setActiveWindow(appId);
    setZIndexCounter(prev => prev + 1);
    setWindowZIndices(prev => ({ ...prev, [appId]: newZIndex }));
    if (minimizedWindows[appId]) {
      setMinimizedWindows(prev => {
        const newState = { ...prev };
        delete newState[appId];
        return newState;
      });
    }
  }, [zIndexCounter, minimizedWindows]);

  const openApp = useCallback((appId) => {
    const appConfig = appsConfig[appId];
    if (!appConfig) return;

    if (appConfig.externalUrl) {
      window.open(appConfig.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    dismissFloatingChrome();
    setIsSpotlightOpen(false);
    setSpotlightQuery('');

    if (minimizedWindows[appId]) {
      setMinimizedWindows(prev => {
        const next = { ...prev };
        delete next[appId];
        return next;
      });
    }

    if (!openApps.includes(appId)) {
      setOpenApps(prev => [...prev, appId]);

      const initialSize = appConfig.defaultSize || { width: 640, height: 440 };
      setWindowSizes(prev => {
        if (prev[appId]) return prev;
        return { ...prev, [appId]: initialSize };
      });

      const container = windowContainerRef.current;
      const containerWidth = container?.clientWidth || window.innerWidth;
      const fallbackHeight =
        window.innerHeight - (isAnyWindowFullscreen ? 0 : MENU_BAR_HEIGHT + DOCK_HEIGHT);
      const containerHeight = container?.clientHeight || Math.max(fallbackHeight, 300);
      const initialX = WINDOW_MARGIN + 40;
      const initialY = WINDOW_MARGIN + 40;
      const offset = 30;
      const safeWidth = Math.max(containerWidth - initialSize.width - WINDOW_MARGIN * 2, 1);
      const safeHeight = Math.max(containerHeight - initialSize.height - WINDOW_MARGIN * 2, 1);
      const spawnIndex = spawnCount;
      const newX = initialX + ((spawnIndex * offset) % safeWidth);
      const newY = initialY + ((spawnIndex * offset) % safeHeight);

      setWindowPositions(prev => {
        if (prev[appId]) return prev;
        const maxX = Math.max(WINDOW_MARGIN, containerWidth - initialSize.width - WINDOW_MARGIN);
        const maxY = Math.max(WINDOW_MARGIN, containerHeight - initialSize.height - WINDOW_MARGIN);
        return {
          ...prev,
          [appId]: {
            x: Math.min(Math.max(WINDOW_MARGIN, newX), maxX),
            y: Math.min(Math.max(WINDOW_MARGIN, newY), maxY),
          },
        };
      });
      setSpawnCount(prev => prev + 1);
    }

    bringToFront(appId);
  }, [openApps, minimizedWindows, spawnCount, bringToFront, dismissFloatingChrome, isAnyWindowFullscreen]);

  const closeApp = useCallback((appId) => {
    setOpenApps(prev => prev.filter(id => id !== appId));
    setWindowPositions(prev => {
      const newState = { ...prev };
      delete newState[appId];
      return newState;
    });
    setWindowSizes(prev => {
      const newState = { ...prev };
      delete newState[appId];
      return newState;
    });
    setMinimizedWindows(prev => {
      const newState = { ...prev };
      delete newState[appId];
      return newState;
    });
    setFullScreenWindows(prev => {
      const newState = { ...prev };
      delete newState[appId];
      return newState;
    });
    setWindowZIndices(prev => {
      const newState = { ...prev };
      delete newState[appId];
      return newState;
    });
    if (activeWindow === appId) {
      const remainingOpen = openApps.filter(id => id !== appId);
      if (remainingOpen.length > 0) {
        let topAppId = remainingOpen[0];
        let maxZ = -1;
        remainingOpen.forEach(id => {
          if ((windowZIndices[id] || 0) > maxZ) {
            maxZ = windowZIndices[id] || 0;
            topAppId = id;
          }
        });
        setActiveWindow(topAppId);
      } else {
        setActiveWindow(null);
      }
    }
  }, [openApps, activeWindow, windowZIndices]);

  const minimizeApp = useCallback((appId) => {
    const windowElement = document.querySelector(`[data-window-id="${appId}"]`);
    const dockIconElement = document.querySelector(`[data-dock-icon="${appId}"]`);

    if (windowElement && dockIconElement && dockRef.current) {
      const windowRect = windowElement.getBoundingClientRect();
      const iconRect = dockIconElement.getBoundingClientRect();

      const translateX = iconRect.left + iconRect.width / 2 - (windowRect.left + windowRect.width / 2);
      const translateY = iconRect.top + iconRect.height / 2 - (windowRect.top + windowRect.height / 2);

      windowElement.style.transition = 'all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)';
      windowElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`;
      windowElement.style.opacity = '0';
    } else if (windowElement) {
      windowElement.style.transition = 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.3s';
      windowElement.style.transform = 'scale(0.8) translateY(100px)';
      windowElement.style.opacity = '0';
    }

    setTimeout(() => {
      setMinimizedWindows(prev => ({ ...prev, [appId]: true }));
      if (activeWindow === appId) {
        const sortedWindows = Object.entries(windowZIndices)
          .filter(([id]) => id !== appId && !minimizedWindows[id] && openApps.includes(id))
          .sort(([, zA], [, zB]) => zB - zA);
        setActiveWindow(sortedWindows.length > 0 ? sortedWindows[0][0] : null);
      }
    }, 200);
  }, [activeWindow, windowZIndices, minimizedWindows, openApps]);

  const toggleFullScreen = useCallback((appId) => {
    const isCurrentlyFullScreen = !!fullScreenWindows[appId];
    dismissFloatingChrome();
    if (!isCurrentlyFullScreen) {
      bringToFront(appId);
    }
    setFullScreenWindows(prev => ({ ...prev, [appId]: !isCurrentlyFullScreen }));
  }, [bringToFront, fullScreenWindows, dismissFloatingChrome]);

  const handleWindowDragEnd = useCallback((event, info, appId) => {
    const container = windowContainerRef.current;
    const fallbackWidth = Math.max(window.innerWidth - WINDOW_MARGIN * 2, 200);
    const fallbackHeight = Math.max(
      window.innerHeight -
      (isAnyWindowFullscreen ? 0 : MENU_BAR_HEIGHT + DOCK_HEIGHT) -
      WINDOW_MARGIN * 2,
      200
    );

    const containerWidth = container?.clientWidth || fallbackWidth;
    const containerHeight = container?.clientHeight || fallbackHeight;

    setWindowPositions(prev => {
      const currentPos = prev[appId] || { x: WINDOW_MARGIN, y: WINDOW_MARGIN };
      const size =
        windowSizes[appId] ||
        appsConfig[appId]?.defaultSize || { width: 640, height: 420 };

      const minX = WINDOW_MARGIN;
      const minY = WINDOW_MARGIN;
      const maxX = Math.max(minX, containerWidth - size.width - WINDOW_MARGIN);
      const maxY = Math.max(minY, containerHeight - size.height - WINDOW_MARGIN);

      const nextX = Math.min(Math.max(currentPos.x + info.offset.x, minX), maxX);
      const nextY = Math.min(Math.max(currentPos.y + info.offset.y, minY), maxY);

      return {
        ...prev,
        [appId]: {
          x: nextX,
          y: nextY,
        },
      };
    });
  }, [windowSizes, isAnyWindowFullscreen]);

  const handleResize = useCallback((event, info, appId, constraintsRef) => {
    event.stopPropagation();
    setWindowSizes(prevSizes => {
      const currentSize = prevSizes[appId] || appsConfig[appId]?.defaultSize || { width: 600, height: 400 };
      const currentPos = windowPositions[appId] || { x: 50, y: 50 };
      const container = constraintsRef.current;
      if (!container) return prevSizes;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      let newWidth = currentSize.width + info.delta.x;
      let newHeight = currentSize.height + info.delta.y;
      const minWidth = 300;
      const minHeight = 200;
      newWidth = Math.max(minWidth, newWidth);
      newHeight = Math.max(minHeight, newHeight);
      const maxWidth = containerWidth - currentPos.x - WINDOW_MARGIN;
      const maxHeight = containerHeight - currentPos.y - WINDOW_MARGIN;
      newWidth = Math.min(newWidth, maxWidth);
      newHeight = Math.min(newHeight, maxHeight);
      if (newWidth < minWidth || newHeight < minHeight) return prevSizes;
      return { ...prevSizes, [appId]: { width: newWidth, height: newHeight } };
    });
  }, [windowPositions]);

  const handleMediaClick = useCallback((assets, index) => {
    setPreviewData({ assets, index });
  }, []);

  const formatTime = (date) => date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const formatDate = (date) => date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  // Spotlight entries
  const spotlightEntries = useMemo(() => {
    const internalApps = Object.values(appsConfig)
      .filter(app => !app.externalUrl)
      .map(app => ({
        id: app.id,
        label: app.name,
        kind: app.id.startsWith('experience_') ? 'Experience' : 'App',
        description: app.id.startsWith('experience_') ? app.data?.role : 'Open application window',
        action: () => openApp(app.id),
      }));

    const commandEntries = [
      {
        id: 'command-toggle-theme',
        label: isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        kind: 'Command',
        description: 'Toggle system appearance',
        action: toggleTheme,
      },
      {
        id: 'command-focus',
        label: focusEnabled ? 'Disable Focus Mode' : 'Enable Focus Mode',
        kind: 'Command',
        description: 'Toggle focus mode',
        action: () => setFocusEnabled(prev => !prev),
      },
    ];

    const externalEntries = [
      {
        id: 'external-github',
        label: 'Open GitHub',
        kind: 'Link',
        description: 'github.com/aadishiv23',
        action: () => openApp('github'),
      },
      {
        id: 'external-linkedin',
        label: 'Open LinkedIn',
        kind: 'Link',
        description: 'linkedin.com/in/aadi-shiv-malhotra',
        action: () => openApp('linkedin'),
      },
    ];

    return [...internalApps, ...commandEntries, ...externalEntries];
  }, [openApp, toggleTheme, isDarkMode, focusEnabled]);

  const filteredSpotlightEntries = useMemo(() => {
    if (!spotlightQuery.trim()) return spotlightEntries;
    const q = spotlightQuery.trim().toLowerCase();
    return spotlightEntries.filter(entry => {
      return (
        entry.label.toLowerCase().includes(q) ||
        (entry.description && entry.description.toLowerCase().includes(q)) ||
        (entry.kind && entry.kind.toLowerCase().includes(q))
      );
    });
  }, [spotlightEntries, spotlightQuery]);

  const appleMenuItems = useMemo(
    () => [
      {
        id: 'about',
        label: 'About This Mac',
        icon: '💻',
        action: () => openApp('about'),
      },
      {
        id: 'settings',
        label: 'System Settings…',
        icon: '⚙️',
        action: () => openApp('projects'),
      },
      {
        id: 'app-store',
        label: 'App Store…',
        icon: '🛍️',
        badge: '5 updates',
        action: () => {
          if (typeof window !== 'undefined') {
            window.open('https://apps.apple.com', '_blank', 'noopener,noreferrer');
          }
        },
      },
      { id: 'divider-1', type: 'divider' },
      {
        id: 'recent',
        label: 'Recent Items',
        icon: '🕓',
        trailing: '›',
        disabled: true,
      },
      {
        id: 'force-quit',
        label: 'Force Quit…',
        icon: '⛔️',
        action: () => alert('Force Quit menu coming soon.'),
      },
      { id: 'divider-2', type: 'divider' },
      {
        id: 'sleep',
        label: 'Sleep',
        icon: '🌙',
        action: () => alert('Good night! (Pretend sleep)'),
      },
      {
        id: 'restart',
        label: 'Restart…',
        icon: '⟲',
        action: () => alert('Restarting the imagination...'),
      },
      {
        id: 'shutdown',
        label: 'Shut Down…',
        icon: '⏻',
        action: () => alert('Shutting down virtual Mac...'),
        danger: true,
      },
      { id: 'divider-3', type: 'divider' },
      {
        id: 'lock',
        label: 'Lock Screen',
        icon: '🔒',
        hint: '^⌘Q',
        action: () => alert('Lock Screen coming soon.'),
      },
      {
        id: 'logout',
        label: 'Log Out Aadi Shiv…',
        icon: '↩︎',
        hint: '⇧⌘Q',
        action: () => alert('Logging out...'),
        danger: true,
      },
    ],
    [openApp]
  );

  // Window controls component
  const WindowControls = ({ appId }) => {
    const [hoveredControl, setHoveredControl] = useState(null);

    return (
      <div className="flex space-x-2 relative" onMouseLeave={() => setHoveredControl(null)}>
        <button
          onClick={e => {
            e.stopPropagation();
            closeApp(appId);
          }}
          onMouseEnter={() => setHoveredControl('close')}
          className="w-3 h-3 bg-[#ff5f57] hover:bg-[#ff453a] rounded-full focus:outline-none relative group transition-all duration-150"
          aria-label="Close"
        >
          {hoveredControl === 'close' && (
            <svg className="absolute inset-0 m-auto w-2 h-2 text-[#4d0000]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
              <path d="M2 2L10 10M10 2L2 10" />
            </svg>
          )}
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            minimizeApp(appId);
          }}
          onMouseEnter={() => setHoveredControl('minimize')}
          className="w-3 h-3 bg-[#ffbd2e] hover:bg-[#ffa500] rounded-full focus:outline-none relative group transition-all duration-150"
          aria-label="Minimize"
        >
          {hoveredControl === 'minimize' && (
            <svg className="absolute inset-0 m-auto w-2 h-[2px]" viewBox="0 0 8 2">
              <rect width="8" height="2" fill="#995700" />
            </svg>
          )}
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            toggleFullScreen(appId);
          }}
          onMouseEnter={() => setHoveredControl('maximize')}
          className="w-3 h-3 bg-[#28c840] hover:bg-[#30d158] rounded-full focus:outline-none relative group transition-all duration-150"
          aria-label="Fullscreen"
        >
          {hoveredControl === 'maximize' && (
            <svg className="absolute inset-0 m-auto w-2 h-2 text-[#004d00]" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
              <path d="M3 9L9 3M9 3H5M9 3V7" />
            </svg>
          )}
        </button>
      </div>
    );
  };

  // Resize handle component
  const ResizeHandle = ({ appId, constraintsRef }) => {
    const handleDragStart = event => {
      event.stopPropagation();
      bringToFront(appId);
    };
    return (
      <motion.div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-50 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        drag
        dragMomentum={false}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDrag={(event, info) => handleResize(event, info, appId, constraintsRef)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="14" y1="14" x2="2" y2="2" />
          <polyline points="14,8 14,14 8,14" />
          <polyline points="2,8 2,2 8,2" />
        </svg>
      </motion.div>
    );
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex flex-col font-sans text-sm ${isDarkMode ? 'dark' : ''
        }`}
    >
      {/* Wallpaper Background Layer - Absolute positioning, behind everything */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Background
            To add your own wallpaper:
            1. Add your image to public/images/ (e.g., public/images/my-wallpaper.jpg)
            2. Replace the backgroundImage URL below with your image path
            3. You can use different wallpapers for light/dark mode by changing the URL conditionally

            Note: Using optimized version (867KB vs 5.4MB original)
        */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: 'url("/images/DefaultAerial_Tahoe_Beach_optimized.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Subtle overlay for better text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: isDarkMode
              ? 'radial-gradient(circle at top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)'
              : 'radial-gradient(circle at top, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 75%)'
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="pointer-events-none absolute inset-x-0 top-[18vh] flex flex-col items-center gap-4 text-center z-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900/90 dark:text-white/90"
        >
          Aadi Shiv Malhotra
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-base md:text-lg text-slate-600/90 dark:text-slate-200/80"
        >
          iOS Engineer at Fetch crafting delightful Apple platform experiences
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 text-[11px] uppercase tracking-wide"
        >
          <span className="rounded-full border border-slate-300/60 bg-white/80 px-3 py-1 text-slate-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80">
            iOS Engineer @ Fetch
          </span>
          <span className="rounded-full border border-slate-300/60 bg-white/80 px-3 py-1 text-slate-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80">
            Swift · SwiftUI · App Intents
          </span>
          <span className="rounded-full border border-slate-300/60 bg-white/80 px-3 py-1 text-slate-600 dark:border-white/15 dark:bg-white/10 dark:text-white/80">
            UMich CS '25
          </span>
        </motion.div>
      </div>

      {/* Menu Bar */}
      <AnimatePresence>
        {!isAnyWindowFullscreen && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`relative flex-shrink-0 h-7 px-4 flex items-center justify-between z-[1500] border-b ${isDarkMode
              ? 'bg-[#1d1d1f]/80 text-white border-white/5 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
              : 'bg-[#f5f5f7]/80 text-slate-900 border-black/5 shadow-[0_1px_0_rgba(0,0,0,0.06)]'
              }`}
            style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
          >
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <button
                onClick={event => {
                  event.stopPropagation();
                  setAppleMenuOpen(prev => !prev);
                  setIsControlCenterOpen(false);
                }}
                className="flex items-center justify-center rounded px-1.5 py-0.5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                aria-label="AadiOS Menu"
              >
                <img src="/images/icons/ASM.png" alt="AadiOS menu" className="h-5 w-5" />
              </button>
              <span className="font-semibold">
                {activeWindow && appsConfig[activeWindow] ? appsConfig[activeWindow].name : 'Finder'}
              </span>
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setFileMenuOpen(prev => !prev);
                    setEditMenuOpen(false);
                    setViewMenuOpen(false);
                    setWindowMenuOpen(false);
                    setHelpMenuOpen(false);
                    setAppleMenuOpen(false);
                  }}
                  disabled={!activeWindow}
                  className="rounded px-1.5 py-0.5 hover:bg-white/20 dark:hover:bg-white/10 disabled:opacity-40 transition-colors"
                >
                  File
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setEditMenuOpen(prev => !prev);
                    setFileMenuOpen(false);
                    setViewMenuOpen(false);
                    setWindowMenuOpen(false);
                    setHelpMenuOpen(false);
                    setAppleMenuOpen(false);
                  }}
                  className="rounded px-1.5 py-0.5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setViewMenuOpen(prev => !prev);
                    setFileMenuOpen(false);
                    setEditMenuOpen(false);
                    setWindowMenuOpen(false);
                    setHelpMenuOpen(false);
                    setAppleMenuOpen(false);
                  }}
                  className="rounded px-1.5 py-0.5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                >
                  View
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setWindowMenuOpen(prev => !prev);
                    setFileMenuOpen(false);
                    setEditMenuOpen(false);
                    setViewMenuOpen(false);
                    setHelpMenuOpen(false);
                    setAppleMenuOpen(false);
                  }}
                  disabled={!activeWindow}
                  className="rounded px-1.5 py-0.5 hover:bg-white/20 dark:hover:bg-white/10 disabled:opacity-40 transition-colors"
                >
                  Window
                </button>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    setHelpMenuOpen(prev => !prev);
                    setFileMenuOpen(false);
                    setEditMenuOpen(false);
                    setViewMenuOpen(false);
                    setWindowMenuOpen(false);
                    setAppleMenuOpen(false);
                  }}
                  className="rounded px-1.5 py-0.5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                >
                  Help
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm">
              <div className="hidden sm:flex items-center gap-1 text-xs">
                <span>{focusEnabled ? '🌙' : '☀️'}</span>
                <span>{focusEnabled ? 'Focus' : 'Available'}</span>
              </div>
              <button
                onClick={event => {
                  event.stopPropagation();
                  toggleTheme();
                }}
                className="hidden sm:inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-white/10 transition"
                aria-label="Toggle appearance"
              >
                <span>{isDarkMode ? '🌙' : '☀️'}</span>
                <span>{isDarkMode ? 'Dark' : 'Light'}</span>
              </button>
              <button
                onClick={event => {
                  event.stopPropagation();
                  setIsControlCenterOpen(prev => !prev);
                  setAppleMenuOpen(false);
                  setIsSpotlightOpen(false);
                }}
                className="rounded px-1.5 py-0.5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                aria-label="Control Center"
              >
                <img src="/images/icons/control-center.svg" alt="Control Center" className="h-4 w-4" />
              </button>
              <button
                onClick={event => {
                  event.stopPropagation();
                  setIsSpotlightOpen(true);
                  setSpotlightQuery('');
                  setAppleMenuOpen(false);
                  setIsControlCenterOpen(false);
                }}
                className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
                aria-label="Spotlight"
              >
                <img src="/images/icons/spotlight.svg" alt="Spotlight" className="h-4 w-4" />
                <span className="hidden md:inline text-[10px] text-slate-600 dark:text-slate-300">^⌘ Space</span>
              </button>
              <span className="hidden md:inline">{formatDate(currentTime)}</span>
              <span>{formatTime(currentTime)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple Menu Dropdown */}
      <AnimatePresence>
        {appleMenuOpen && !isAnyWindowFullscreen && (
          <motion.div
            key="apple-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-9 left-4 w-64 rounded-2xl border shadow-2xl z-[1600] ${isDarkMode ? 'bg-zinc-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="py-2 text-sm">
              {appleMenuItems.map(item =>
                item.type === 'divider' ? (
                  <div key={item.id} className="my-1 border-t border-slate-200 dark:border-white/10" />
                ) : (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.disabled) return;
                      item.action?.();
                      setAppleMenuOpen(false);
                    }}
                    disabled={item.disabled}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition ${item.danger
                      ? 'text-red-500 hover:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20'
                      : 'hover:bg-blue-500/10 dark:hover:bg-blue-500/20'
                      } ${item.disabled ? 'opacity-40 cursor-default' : ''}`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium">{item.label}</p>
                      {item.subtitle && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">{item.subtitle}</p>
                      )}
                    </div>
                    {item.badge && (
                      <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold text-blue-500 dark:text-blue-300">
                        {item.badge}
                      </span>
                    )}
                    {item.hint && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-300">{item.hint}</span>
                    )}
                    {item.trailing && <span className="text-base text-slate-400">{item.trailing}</span>}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Menu Dropdown */}
      <AnimatePresence>
        {fileMenuOpen && !isAnyWindowFullscreen && (
          <motion.div
            key="file-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-9 left-[180px] w-56 rounded-2xl border shadow-2xl z-[1600] ${isDarkMode ? 'bg-zinc-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="py-2 text-sm">
              <button
                onClick={() => {
                  closeApp(activeWindow);
                  setFileMenuOpen(false);
                }}
                disabled={!activeWindow}
                className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20 disabled:opacity-40"
              >
                <span>Close Window</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">⌘W</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Menu Dropdown */}
      <AnimatePresence>
        {editMenuOpen && !isAnyWindowFullscreen && (
          <motion.div
            key="edit-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-9 left-[230px] w-56 rounded-2xl border shadow-2xl z-[1600] ${isDarkMode ? 'bg-zinc-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="py-2 text-sm">
              <button
                onClick={() => {
                  openApp('notes');
                  setEditMenuOpen(false);
                }}
                className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20"
              >
                <span>Open Scratchpad</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Menu Dropdown */}
      <AnimatePresence>
        {viewMenuOpen && !isAnyWindowFullscreen && (
          <motion.div
            key="view-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-9 left-[280px] w-56 rounded-2xl border shadow-2xl z-[1600] ${isDarkMode ? 'bg-zinc-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="py-2 text-sm">
              <button
                onClick={() => {
                  toggleTheme();
                  setViewMenuOpen(false);
                }}
                className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20"
              >
                <span>Toggle Appearance</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">⌘T</span>
              </button>
              <div className="my-1 border-t border-slate-200 dark:border-white/10" />
              <button
                onClick={() => {
                  if (activeWindow) toggleFullScreen(activeWindow);
                  setViewMenuOpen(false);
                }}
                disabled={!activeWindow}
                className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20 disabled:opacity-40"
              >
                <span>Enter Full Screen</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">^⌘F</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Window Menu Dropdown */}
      <AnimatePresence>
        {windowMenuOpen && !isAnyWindowFullscreen && (
          <motion.div
            key="window-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-9 left-[330px] w-56 rounded-2xl border shadow-2xl z-[1600] ${isDarkMode ? 'bg-zinc-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="py-2 text-sm">
              <button
                onClick={() => {
                  if (activeWindow) minimizeApp(activeWindow);
                  setWindowMenuOpen(false);
                }}
                disabled={!activeWindow}
                className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20 disabled:opacity-40"
              >
                <span>Minimize</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">⌘M</span>
              </button>
              <button
                onClick={() => {
                  if (activeWindow) toggleFullScreen(activeWindow);
                  setWindowMenuOpen(false);
                }}
                disabled={!activeWindow}
                className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20 disabled:opacity-40"
              >
                <span>Zoom</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Menu Dropdown */}
      <AnimatePresence>
        {helpMenuOpen && !isAnyWindowFullscreen && (
          <motion.div
            key="help-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.16 }}
            className={`absolute top-9 left-[385px] w-56 rounded-2xl border shadow-2xl z-[1600] ${isDarkMode ? 'bg-zinc-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="py-2 text-sm">
              <button
                onClick={() => {
                  openApp('about');
                  setHelpMenuOpen(false);
                }}
                className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20"
              >
                <span>About AadiOS</span>
              </button>
              <div className="my-1 border-t border-slate-200 dark:border-white/10" />
              <button
                onClick={() => {
                  setIsSpotlightOpen(true);
                  setHelpMenuOpen(false);
                }}
                className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20"
              >
                <span>Search</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">^⌘ Space</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Center */}
      <AnimatePresence>
        {isControlCenterOpen && !isAnyWindowFullscreen && (
          <motion.div
            key="control-center"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className={`absolute top-9 right-4 w-72 rounded-3xl border p-4 shadow-2xl z-[1600] ${isDarkMode ? 'bg-slate-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
              }`}
            onMouseDown={event => event.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-3 text-sm">
              <button
                onClick={() => setFocusEnabled(prev => !prev)}
                className={`rounded-2xl p-4 text-left transition ${focusEnabled
                  ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-400/30'
                  : 'bg-slate-100 dark:bg-slate-800 border border-transparent'
                  }`}
              >
                <p className="text-xs uppercase tracking-wide opacity-70">Focus</p>
                <p className="text-base font-semibold">{focusEnabled ? 'On' : 'Off'}</p>
              </button>
              <button
                onClick={toggleTheme}
                className="rounded-2xl p-4 text-left border border-slate-200/80 bg-slate-100/70 dark:bg-slate-800/60 dark:border-white/10 transition"
              >
                <p className="text-xs uppercase tracking-wide opacity-70">Appearance</p>
                <p className="text-base font-semibold">{isDarkMode ? 'Dark' : 'Light'}</p>
              </button>
              <button
                onClick={() => {
                  openApp('terminal');
                  setIsControlCenterOpen(false);
                }}
                className="rounded-2xl p-4 text-left border border-slate-200/80 bg-slate-100/70 dark:bg-slate-800/60 dark:border-white/10 transition"
              >
                <p className="text-xs uppercase tracking-wide opacity-70">Utility</p>
                <p className="text-base font-semibold">Terminal</p>
              </button>
              <button
                onClick={() => {
                  openApp('notes');
                  setIsControlCenterOpen(false);
                }}
                className="rounded-2xl p-4 text-left border border-slate-200/80 bg-slate-100/70 dark:bg-slate-800/60 dark:border-white/10 transition"
              >
                <p className="text-xs uppercase tracking-wide opacity-70">Notes</p>
                <p className="text-base font-semibold">Scratchpad</p>
              </button>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200/60 bg-slate-100/70 dark:bg-slate-800/60 dark:border-white/10 p-4 text-sm">
              <p className="text-xs uppercase tracking-wide opacity-70 mb-1">Tip</p>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Try the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Windows Container */}
      <div
        ref={windowContainerRef}
        className="flex-grow relative overflow-hidden"
        onMouseDown={(e) => {
          // Only trigger if clicking on the background (not on windows or other elements)
          if (e.target === e.currentTarget) {
            dismissFloatingChrome();
          }
        }}
        onDoubleClick={(e) => {
          // Only trigger if double-clicking on the background (not on windows)
          if (e.target === e.currentTarget) {
            toggleTheme();
          }
        }}
      >
        <AnimatePresence>
          {openApps.map(appId => {
            const appConfig = appsConfig[appId];
            if (!appConfig || minimizedWindows[appId]) return null;

            const AppContentComponent = appConfig.component;
            const isActive = activeWindow === appId;
            const isAppFullScreen = fullScreenWindows[appId];
            const zIndex = windowZIndices[appId] || 10;
            const targetPos = windowPositions[appId] || { x: 60, y: 80 };
            const targetSize = windowSizes[appId] || appConfig.defaultSize || { width: 640, height: 420 };

            let motionProps = {};
            if (isAppFullScreen) {
              motionProps = {
                initial: {
                  x: targetPos.x,
                  y: targetPos.y,
                  width: targetSize.width,
                  height: targetSize.height,
                  opacity: 0,
                  borderRadius: '0.5rem',
                },
                animate: {
                  x: 0,
                  y: 0,
                  width: '100vw',
                  height: '100vh',
                  zIndex: 2000,
                  opacity: 1,
                  borderRadius: '0px',
                },
                exit: {
                  x: targetPos.x,
                  y: targetPos.y,
                  width: targetSize.width,
                  height: targetSize.height,
                  opacity: 0,
                  scale: 0.95,
                  borderRadius: '0.5rem',
                },
                drag: false,
                transition: { type: 'spring', stiffness: 320, damping: 35, mass: 0.9 },
              };
            } else {
              motionProps = {
                initial: {
                  scale: 0.5,
                  opacity: 0,
                  x: targetPos.x,
                  y: targetPos.y + 50,
                  width: targetSize.width,
                  height: targetSize.height,
                },
                animate: {
                  scale: [0.5, 1.1, 0.95, 1.02, 1],
                  opacity: 1,
                  y: [targetPos.y + 50, targetPos.y - 10, targetPos.y + 5, targetPos.y - 2, targetPos.y],
                  zIndex,
                  x: targetPos.x,
                  width: targetSize.width,
                  height: targetSize.height,
                  borderRadius: '0.75rem',
                },
                exit: { scale: 0.9, opacity: 0, transition: { duration: 0.18 } },
                drag: true,
                dragMomentum: false,
                dragElastic: 0.05,
                dragConstraints: windowContainerRef,
                onDragEnd: (event, info) => handleWindowDragEnd(event, info, appId),
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  mass: 0.8,
                  duration: 0.6,
                },
              };
            }

            const windowBgClass = isDarkMode
              ? 'bg-slate-900/90 border-white/10 text-slate-100'
              : 'bg-white/95 border-slate-300/50 text-slate-900';

            const extraProps =
              appConfig.getProps?.({
                openApp,
                closeApp,
                toggleTheme,
              }) || {};

            const componentProps = {
              isDarkMode,
              ...extraProps,
              ...(appConfig.id.startsWith('experience_')
                ? { experience: appConfig.data, onMediaClick: handleMediaClick }
                : {}),
            };

            return (
              <motion.div
                key={appId}
                layoutId={`window-${appId}`}
                data-window-id={appId}
                className={`absolute flex flex-col backdrop-blur-3xl border ${windowBgClass}`}
                style={{
                  boxShadow: isActive
                    ? isDarkMode
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 20px -5px rgba(59, 130, 246, 0.3)'
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 20px -5px rgba(59, 130, 246, 0.2)'
                    : isDarkMode
                      ? '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03)'
                      : '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.03)',
                }}
                {...motionProps}
                onPointerDown={() => bringToFront(appId)}
              >
                <motion.div
                  layout="position"
                  className={`flex-shrink-0 h-8 px-3 flex items-center justify-between ${isAppFullScreen ? '' : 'rounded-t-lg'
                    } cursor-grab ${isActive ? '' : 'opacity-80'}`}
                  style={{
                    backgroundColor: isDarkMode ? appConfig.darkColor || '#444' : appConfig.color || '#ddd',
                    color: isDarkMode ? appConfig.darkTextColor || '#fff' : appConfig.textColor || '#000',
                  }}
                  onPointerDown={event => event.stopPropagation()}
                >
                  <WindowControls appId={appId} />
                  <span className="text-sm font-medium truncate px-2 pointer-events-none">{appConfig.name}</span>
                  <div className="w-14" />
                </motion.div>
                <div className={`flex-grow relative overflow-auto ${isAppFullScreen ? '' : 'rounded-b-lg'}`}>
                  {AppContentComponent && <AppContentComponent {...componentProps} />}
                </div>
                {!isAppFullScreen && <ResizeHandle appId={appId} constraintsRef={windowContainerRef} />}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Dock */}
      <AnimatePresence>
        {!isAnyWindowFullscreen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
            className="relative flex-shrink-0 flex justify-center z-[1500] pb-3 pt-6"
          >
            <div
              ref={dockRef}
              className={`px-4 md:px-6 py-2.5 md:py-3 rounded-[24px] md:rounded-[28px] flex items-end gap-3.5 md:gap-4 backdrop-blur-2xl border shadow-2xl overflow-visible ${isDarkMode
                ? 'bg-white/[0.08] border-white/[0.15]'
                : 'bg-white/[0.25] border-white/40'
                }`}
              style={{
                backdropFilter: 'blur(32px) saturate(180%)',
                minWidth: dockIconCount * (DOCK_ICON_MAX_SIZE + DOCK_BUTTON_PADDING) + 60,
              }}
              onMouseMove={event => setDockPointerX(event.clientX)}
              onMouseLeave={() => {
                setHoveredDockItemId(null);
                setDockPointerX(null);
              }}
            >
              {dockApps.map((app, index) => {
                if (app?.isSeparator) {
                  return (
                    <div
                      key={`sep-${index}`}
                      className={`h-12 md:h-14 w-px mx-2 md:mx-3 self-center ${isDarkMode ? 'bg-white/20' : 'bg-black/15'
                        }`}
                    />
                  );
                }
                if (!app) return null;
                const isOpen = openApps.includes(app.id);
                const isMinimized = minimizedWindows[app.id];
                const hoverIntensity = getDockHoverIntensity(app.id);
                const translateY = -14 * hoverIntensity;
                const isLabelVisible = hoveredDockItemId === app.id;
                return (
                  <motion.button
                    key={app.id}
                    ref={node => registerDockIcon(app.id, node)}
                    data-dock-icon={app.id}
                    animate={{
                      y: translateY,
                    }}
                    transition={{ type: 'spring', stiffness: 480, damping: 26, mass: 0.4 }}
                    className="relative flex flex-col items-center justify-end cursor-pointer overflow-visible pb-2"
                    onClick={() => openApp(app.id)}
                    onMouseEnter={() => {
                      setHoveredDockItemId(app.id);
                    }}
                    onMouseLeave={() => {
                      setHoveredDockItemId(prev => (prev === app.id ? null : prev));
                    }}
                    style={{
                      width: DOCK_BASE_SLOT_WIDTH,
                      minWidth: DOCK_BASE_SLOT_WIDTH,
                      minHeight: DOCK_BASE_ICON_SIZE + DOCK_BUTTON_PADDING,
                      transformOrigin: 'center bottom',
                    }}
                  >
                    <AnimatePresence>
                      {isLabelVisible && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.12, ease: 'easeOut' }}
                          className={`absolute -top-12 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none z-[1600] shadow-lg ${isDarkMode ? 'bg-zinc-800/95 text-white border border-white/10' : 'bg-zinc-900/95 text-white border border-black/5'
                            }`}
                          style={{ backdropFilter: 'blur(20px) saturate(180%)' }}
                        >
                          {app.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <motion.div
                      animate={{
                        scale: 1 + hoverIntensity * 0.55,
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 24, mass: 0.35 }}
                      className="rounded-[18px] md:rounded-[20px] flex items-center justify-center overflow-visible shadow-[0_8px_20px_rgba(0,0,0,0.25)] border border-white/40 dark:border-white/10"
                      style={{
                        width: DOCK_BASE_ICON_SIZE,
                        height: DOCK_BASE_ICON_SIZE,
                        background: isDarkMode
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(14px) saturate(180%)',
                        transformOrigin: 'center bottom',
                      }}
                    >
                      {app.icon ? (
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-full h-full object-cover rounded-[18px] md:rounded-[20px]"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          style={{
                            imageRendering: 'high-quality',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                          }}
                        />
                      ) : (
                        <span className="text-xl font-semibold">{app.name?.charAt(0)}</span>
                      )}
                    </motion.div>
                    <motion.div
                      className={`absolute -bottom-2 w-1 h-1 rounded-full ${isDarkMode ? 'bg-white/80' : 'bg-black/60'}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: isOpen && !isMinimized ? 1 : 0,
                        opacity: isOpen && !isMinimized ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight */}
      <AnimatePresence>
        {isSpotlightOpen && (
          <motion.div
            className="fixed inset-0 z-[1800] bg-black/40 backdrop-blur-md flex items-start justify-center pt-28 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsSpotlightOpen(false);
              setSpotlightQuery('');
            }}
          >
            <motion.div
              className={`w-full max-w-2xl rounded-2xl border shadow-2xl ${isDarkMode ? 'bg-slate-900/95 border-white/10 text-white' : 'bg-white/95 border-slate-200 text-slate-900'
                }`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={event => event.stopPropagation()}
            >
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 dark:border-white/10">
                <img src="/images/icons/spotlight.svg" alt="" className="h-5 w-5" />
                <input
                  className="flex-1 bg-transparent outline-none text-base md:text-lg"
                  placeholder="Search apps, experiences, commands…"
                  value={spotlightQuery}
                  onChange={event => setSpotlightQuery(event.target.value)}
                  autoFocus
                  onKeyDown={event => {
                    if (event.key === 'Enter' && filteredSpotlightEntries.length > 0) {
                      filteredSpotlightEntries[0].action();
                      setIsSpotlightOpen(false);
                      setSpotlightQuery('');
                    }
                  }}
                />
                <span className="rounded-md border border-slate-300/60 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-500 dark:border-white/20 dark:text-white/60">
                  esc
                </span>
              </div>
              <div className="max-h-64 overflow-y-auto py-2">
                {filteredSpotlightEntries.length === 0 ? (
                  <div className="px-5 py-6 text-sm text-slate-500 dark:text-slate-400 text-center">
                    No matches found. Try "projects" or "contact".
                  </div>
                ) : (
                  filteredSpotlightEntries.map(entry => (
                    <button
                      key={entry.id}
                      onClick={() => {
                        entry.action();
                        setIsSpotlightOpen(false);
                        setSpotlightQuery('');
                      }}
                      className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-blue-500/10 dark:hover:bg-blue-500/20 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium">{entry.label}</div>
                        {entry.description && (
                          <div className="text-xs text-slate-500 dark:text-slate-400">{entry.description}</div>
                        )}
                      </div>
                      <span className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                        {entry.kind}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Preview */}
      <AnimatePresence>
        {previewData && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[2000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewData(null)}
          >
            <motion.div
              className="relative w-[80vw] max-w-[1000px] h-[80vh] max-h-[800px] bg-black/70 rounded-2xl shadow-2xl flex flex-col items-center p-5"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={event => event.stopPropagation()}
              layout
            >
              <button
                onClick={() => setPreviewData(null)}
                className="absolute top-3 right-3 text-white/70 hover:text-white text-3xl leading-none"
                aria-label="Close media preview"
              >
                ×
              </button>
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {previewData.assets.length > 1 && (
                  <button
                    onClick={event => {
                      event.stopPropagation();
                      setPreviewData(prev => ({
                        ...prev,
                        index: (prev.index - 1 + prev.assets.length) % prev.assets.length,
                      }));
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl bg-black/30 rounded-full px-3 py-1"
                    aria-label="Previous media"
                  >
                    ‹
                  </button>
                )}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={previewData.assets[previewData.index].src}
                    className="w-full h-full flex flex-col items-center justify-center"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                  >
                    {previewData.assets[previewData.index].type === 'video' ? (
                      <video
                        src={previewData.assets[previewData.index].src}
                        controls
                        autoPlay
                        className="max-w-full max-h-[85%] object-contain rounded-xl"
                      />
                    ) : (
                      <img
                        src={previewData.assets[previewData.index].src}
                        alt={previewData.assets[previewData.index].shortCaption}
                        className="max-w-full max-h-[85%] object-contain rounded-xl"
                      />
                    )}
                    {previewData.assets[previewData.index].longCaption && (
                      <p className="mt-4 text-sm text-gray-300 text-center px-6">
                        {previewData.assets[previewData.index].longCaption}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
                {previewData.assets.length > 1 && (
                  <button
                    onClick={event => {
                      event.stopPropagation();
                      setPreviewData(prev => ({
                        ...prev,
                        index: (prev.index + 1) % prev.assets.length,
                      }));
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl bg-black/30 rounded-full px-3 py-1"
                    aria-label="Next media"
                  >
                    ›
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
