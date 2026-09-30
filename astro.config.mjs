import { defineConfig } from 'astro/config';

// Garder en phase avec site.url dans src/config/site.ts.
export default defineConfig({
  site: 'https://sbasystem.ch',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
});
