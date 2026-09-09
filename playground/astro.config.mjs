import { fileURLToPath } from 'node:url';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

const libSrc = fileURLToPath(new URL('../src', import.meta.url));
const libReact = fileURLToPath(new URL('../src/react.ts', import.meta.url));
const libCss = fileURLToPath(new URL('../src/style.css', import.meta.url));

// https://astro.build/config
export default defineConfig({
	site: 'https://sirosfoundation.github.io',
  	base: '/ui',
	integrations: [react(), mdx()],
	devToolbar: {
		enabled: false,
	},
	vite: {
		resolve: {
			alias: {
				'@lib': libSrc,
				// Resolve the public package specifiers to source so examples can be
				// authored with the same imports consumers use, without a build step.
				'@sirosfoundation/ui/react': libReact,
				'@sirosfoundation/ui/css': libCss,
			},
		},
	},
});
