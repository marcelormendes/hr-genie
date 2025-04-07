import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  // Your Astro configuration
  site: 'https://hrgenie.com', // Replace with your actual domain
  output: 'static',
  integrations: [
    react({
      // Enable React 19 features
      include: ['**/*.{jsx,tsx}'],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});