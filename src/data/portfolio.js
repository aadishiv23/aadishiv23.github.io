export const profile = {
  name: 'Aadi Shiv Malhotra',
  initials: 'ASM',
  role: 'Software Engineer at Apple',
  intro: 'B.S. in Computer Science and Cognitive Science from the University of Michigan. Experience in native Apple-platform software, AI/ML, and computational biology research.',
  location: 'Cupertino, California',
  email: 'aadishiv@umich.edu',
  linkedin: 'https://www.linkedin.com/in/aadi-shiv-malhotra/',
  github: 'https://github.com/aadishiv23',
  languages: ['English', 'Hindi', 'Spanish'],
  interests: ['Apple platforms', 'Applied AI/ML', 'Human-computer interaction', 'Computational biology'],
};

export const experiences = [
  {
    company: 'Apple',
    role: 'Software Engineer · Special Projects',
    period: '2026 — Present',
    location: 'Cupertino, CA',
    kind: 'Full-time',
    description: 'Software engineer on Apple’s Special Projects team, working on AI/ML experiences and technology.',
    highlights: [],
    logo: '/images/icons/apple_logo.svg',
  },
  {
    company: 'Fetch',
    role: 'iOS Software Engineer',
    period: 'Sep 2025 — Dec 2025',
    location: 'United States',
    kind: 'Full-time',
    description: 'Returned to Fetch as a full-time iOS software engineer after completing internships at Fetch and Apple.',
    highlights: [],
    logo: '/images/logos/fetch-logo.png',
  },
  {
    company: 'Apple',
    role: 'Software Engineering Intern',
    period: 'May 2025 — Aug 2025',
    location: 'Cupertino, CA',
    kind: 'Internship',
    description: 'Software engineering intern on the Shortcuts and App Intents engineering team.',
    highlights: ['Worked with technologies across Shortcuts and App Intents.'],
    logo: '/images/icons/apple_logo.svg',
  },
  {
    company: 'Fetch',
    role: 'iOS Software Engineering Intern',
    period: 'May 2024 — Aug 2024',
    location: 'United States',
    kind: 'Internship',
    description: 'Worked across Search, the New Discover Experience, App Intents, and Shortcuts.',
    highlights: [
      'Built Shop in Search UI that surfaced Fetch Shop cards in retailer search results.',
      'Implemented data-driven carousels for the redesigned Discover home screen.',
      'Contributed native App Intents and Shortcuts integrations.',
      'Co-built FetchAR during a company-wide hackathon; the project won the People’s Choice award.',
    ],
    gallery: [
      { src: '/images/fetch/fetch_web_1.PNG', label: 'Discover home' },
      { src: '/images/fetch/fetch_web_2.PNG', label: 'Shop in Search' },
      { src: '/images/fetch/fetch_web_3.PNG', label: 'App Intents' },
      { src: '/images/fetch/fetch_web_4.PNG', label: 'Shortcuts' },
    ],
    logo: '/images/logos/fetch-logo.png',
  },
  {
    company: 'Henry Ford Innovation Institute',
    role: 'Research & Software Engineering Intern',
    period: 'Jun 2023 — Aug 2023',
    location: 'Detroit, MI',
    kind: 'Internship',
    description: 'Built CrossWalk Buddy, an iOS navigation prototype for people with visual impairments.',
    highlights: [
      'Used Swift and Core ML for real-time crosswalk detection.',
      'Improved object-detection accuracy by 40% through model optimization and data augmentation.',
      'Improved application performance by 25% through code and state-management changes.',
    ],
    logo: '/images/logos/henry_logo_fr.webp',
  },
];

export const projects = [
  {
    title: 'Radius',
    kicker: 'Location game · iOS',
    description: 'A location-based social game that turns leaving your daily zone into a friendly competition with friends.',
    tech: ['Swift', 'Core Location', 'Go'],
    features: ['Daily location-zone challenges', 'Friends and competitive leaderboards', 'Sign in with Apple and player profiles'],
    media: '/videos/Radius_beta.mp4',
    type: 'video',
    link: 'https://apps.apple.com/us/app/radius-get-moving/id6504736869',
    linkLabel: 'View on the App Store',
  },
  {
    title: 'Traace',
    kicker: 'Health & fitness · iOS',
    description: 'A private workout-route visualizer for exploring walking, running, hiking, and cycling activity on an interactive map.',
    tech: ['SwiftUI', 'HealthKit', 'MapKit', 'Core Data', 'Swift Concurrency'],
    features: ['HealthKit route syncing', 'Search, filters, and detailed route statistics', 'On-device data with no accounts or ads'],
    media: '/videos/plorerecording.mp4',
    type: 'video',
    link: 'https://apps.apple.com/us/app/traace/id6744664984',
    linkLabel: 'View on the App Store',
  },
  {
    title: 'macBoard',
    kicker: 'Productivity · macOS',
    description: 'A native macOS clipboard manager with persistent, searchable clipboard history.',
    tech: ['SwiftUI', 'AppKit', 'Core Data'],
    features: ['Persistent clipboard history', 'Full-text search', 'Configurable global shortcut', 'Direct copy and paste actions'],
    media: '/images/macboard_img.png',
    type: 'image',
    link: 'https://github.com/aadishiv23/macBoard',
    linkLabel: 'View source on GitHub',
  },
];

export const earlierWork = [
  {
    title: 'Nebula',
    description: 'A GPT-powered knowledge-management system with configurable interfaces and support for multiple AI models.',
    tech: ['AI/ML', 'Knowledge management'],
  },
  {
    title: 'PillPals',
    description: 'A medication tracker designed for people with memory loss.',
    tech: ['SwiftUI', 'App Intents', 'HealthKit'],
  },
  {
    title: 'StarChazer',
    description: 'An accessible AR fitness game designed for children with disabilities.',
    tech: ['Swift', 'ARKit', 'RealityKit'],
  },
];

export const interviews = [
  {
    year: '2021',
    title: 'The Future of Work: An Interview with Steve Cadigan',
    subject: 'Former LinkedIn Chief Human Resources Officer',
    venue: 'The Overachiever',
    url: 'https://theiaoverachiever.com/2021/06/10/the-future-of-work-an-interview-with-steve-cadigan/',
  },
  {
    year: '2021',
    title: 'Ford’s Electric Future: An Exclusive Interview with Ford’s EV Boss',
    subject: 'Darren Palmer · Ford General Manager of Battery Electric Vehicles',
    venue: 'The Overachiever',
    url: 'https://iaoverachiever.wordpress.com/2021/03/09/ford-electric-future/',
  },
];

export const education = {
  school: 'University of Michigan',
  degree: 'B.S., Computer Science & Cognitive Science',
  period: '2021 — 2025',
  note: 'University Honors',
  activities: ['Phi Delta Epsilon', 'Citizens’ Climate Lobby', 'IASA'],
};

export const research = {
  lab: 'Ljungman Lab',
  institution: 'University of Michigan Medical School',
  role: 'Undergraduate Researcher',
  location: 'Ann Arbor, MI',
  description: 'Contributed to the lab’s KLIPP research, a CRISPR-based approach designed to target cancer-specific structural variant junctions, including fusion genes and amplified oncogenes.',
  topics: ['CRISPR', 'Cancer genomics', 'Structural variants', 'Computational biology'],
  labUrl: 'https://medschool.umich.edu/profile/2659/mats-e-ljungman',
  grants: [
    {
      type: 'Lab funding · NIH R01',
      year: '2024',
      award: 'R01 CA285730',
      amount: '$3.7 million',
      title: 'Precision targeting of bladder cancer using CRISPR',
      agency: 'National Institutes of Health · National Cancer Institute',
      description: 'Supports continued development and in-vivo testing of KLIPP in bladder cancer models.',
      url: 'https://rna.umich.edu/mats-ljungman-ph-d-awarded-watershed-3-7-million-grant-from-nih-for-klipp-cancer-therapy-study/',
    },
  ],
  publications: [
    {
      type: 'Publication · Co-author',
      year: '2025',
      title: 'KLIPP: Precision targeting of fusions and amplified oncogenes using CRISPR',
      venue: 'Cancer Research · AACR Annual Meeting 2025 · Abstract 6371',
      description: 'A CRISPR platform designed to selectively target structural variant junctions found in cancer genomes.',
      url: 'https://aacrjournals.org/cancerres/article/85/8_Supplement_1/6371/761125/Abstract-6371-KLIPP-Precision-targeting-of-fusions',
      doi: '10.1158/1538-7445.AM2025-6371',
    },
    {
      type: 'Related coverage',
      year: '2026',
      title: 'Ljungman receives $500K for Ewing sarcoma gene-editing therapy',
      venue: 'University of Michigan Medical School',
      description: 'Michigan Medicine coverage of KLIPP and its application to the EWS::FLI1 fusion that drives Ewing sarcoma.',
      url: 'https://medschool.umich.edu/news-release/ljungman-receives-500k-little-warrior-foundation-ewing-sarcoma-gene-editing-therapy',
    },
  ],
};
