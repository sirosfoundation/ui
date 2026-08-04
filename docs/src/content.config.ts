import { fileURLToPath } from 'node:url';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const componentsBase = fileURLToPath(new URL('../../src/components', import.meta.url));

const componentDocs = defineCollection({
	loader: glob({ pattern: '*/docs.mdx', base: componentsBase }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
	}),
});

const examples = defineCollection({
	loader: glob({ pattern: '*/examples/*.mdx', base: componentsBase }),
	schema: z.object({
		title: z.string().optional(),
		lang: z.string().optional(),
	}),
});

export const collections = { componentDocs, examples };
