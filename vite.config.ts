import mdx from '@mdx-js/rollup';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

const mdxPlugin = mdx() as Plugin;

export default defineConfig({
  plugins: [
    {
      ...mdxPlugin,
      enforce: 'pre',
    },
    react({
      include: /\.(mdx|js|jsx|ts|tsx)$/,
    }),
  ],
});
