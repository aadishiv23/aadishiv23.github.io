import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    integrations: [react(), tailwind()],
    site: 'https://aadishiv23.github.io',
    vite: {
        ssr: {
          noExternal: ['gsap'], // Ensures GSAP is bundled in SSR builds
        },
        optimizeDeps: {
          include: ['gsap'],
        },
      },
  });
