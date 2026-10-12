// @ts-check
import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';

// Built and deployed by .github/workflows/deploy.yml; output goes to the
// default ./dist, which is not committed.
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  vite: {
    plugins: [yaml()],
  },
});
