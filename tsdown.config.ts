import { defineConfig } from 'tsdown';
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';

const ENTRIES: Record<string, string> = {
	'react/index': 'src/react.ts',
	'react/button': 'src/components/button/button.tsx',
}

export default defineConfig({
	entry: ENTRIES,
	format: 'esm',
	dts: true,
	clean: true,
	external: ['react', 'react-dom'],
	outDir: 'dist',

	async onSuccess() {
		await handleCSS();
	},
});

async function handleCSS(): Promise<void> {
	const cssDir = 'dist/css';
	await mkdir(cssDir, { recursive: true });

	const styleCss = await readFile('src/style.css', 'utf-8');
	const importPaths = [...styleCss.matchAll(/@import\s+['"]([^'"]+)['"]/g)]
		.map((m) => m[1]);

	for (const importPath of importPaths) {
		const srcPath = join('src', importPath);
		const destName = basename(importPath);
		await copyFile(srcPath, `${cssDir}/${destName}`).catch(() => {});
	}

	const indexCss = styleCss.replace(/@import\s+['"]([^'"]+)['"]/g, (_, p) => {
		return `@import './${basename(p)}'`;
	});

	await writeFile(`${cssDir}/index.css`, indexCss);
}
