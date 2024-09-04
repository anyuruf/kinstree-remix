/// <reference types="vitest" />
/// <reference types="vite/client" />

import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import envOnly from 'vite-env-only';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { installGlobals } from '@remix-run/node';
import { remixDevTools } from 'remix-development-tools';

installGlobals();
export default defineConfig({
	ssr: {
		noExternal: [
			'drizzle-orm',
			'nanoid',
			'@radix-ui',
			'framer-motion',
			'remix-utils',
			'react-force-graph-2d',
			'lodash',
		],
	},
	test: {
		// See the list of config options in the Config Reference:
		// https://vitest.dev/config/'''i
		environment: 'jsdom',
		globals: true,
		setupFiles: ['app/_tests_/setup.ts'],
		includeSource: ['app/_tests_'],
		coverage: {
			reportsDirectory: './_tests_/coverage',
		},
	},
	plugins: [
		envOnly(),
		tsconfigPaths(),
		remixDevTools(),
		!process.env.VITEST
			? remix({
					future: {
						v3_fetcherPersist: true,
						v3_relativeSplatPath: true,
						v3_throwAbortReason: true,
					},
				})
			: react(),
	],
});
