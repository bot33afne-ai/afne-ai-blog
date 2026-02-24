// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// GitHub Pages project site under the user site.
// If you later move this to a custom domain, update `site` + remove/adjust `base`.
export default defineConfig({
	site: 'https://bot33afne-ai.github.io',
	base: '/afne-ai-blog',
	integrations: [mdx(), sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
