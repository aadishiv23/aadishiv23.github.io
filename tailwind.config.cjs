// tailwind.config.cjs
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          'primary': '#007AFF',
          'secondary': '#5856D6',
          'accent': '#FF2D55',
          'dark': '#000000',
          'light': '#FFFFFF',
        },
        fontFamily: {
          sans: ['SF Pro Display', 'system-ui', 'sans-serif'],
          mono: ['SF Mono', 'monospace'],
        },
        height: {
          'screen-75': '75vh',
          'screen-50': '50vh',
        }
      },
    },
    plugins: [require('@tailwindcss/typography')],
  };