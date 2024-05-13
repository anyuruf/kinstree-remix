import { createCookieSessionStorage } from '@remix-run/cloudflare';
import { createThemeSessionResolver } from 'remix-themes';

// When process.env.NODE_ENV has an invalid output, production is defaulted
// https://remix.run/docs/en/main/guides/envvars
const isProduction = process.env['NODE_ENV'] == 'production';

export function getSessionStorage() {
	return createCookieSessionStorage({
		cookie: {
			httpOnly: true,
			name: 'theme',
			path: '/',
			sameSite: 'lax',
			secrets: [process.env.SESSION_SECRET!],
			// Set domain and secure only if in production
			...(isProduction ? { domain: 'kinstree.com', secure: true } : {}),
		},
	});
}

export function getThemeSessionResolver() {
	return createThemeSessionResolver(getSessionStorage());
}
