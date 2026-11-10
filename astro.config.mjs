import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = process.env.SITE_URL || (vercelProductionUrl ? `https://${vercelProductionUrl}` : 'http://confinedspace.lan');

export default defineConfig({
  site: siteUrl,
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});