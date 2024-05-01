import type { PlatformProxy } from 'wrangler';

export interface Env {
	SESSION_SECRET: string;
}

// You can generate the ENV type based on `wrangler.toml` and `.dev.vars`
// by running `npm run typegen`
type Cloudflare = Omit<PlatformProxy<Env>, 'dispose'>;
type LoadContext = {
	cloudflare: Cloudflare;
	Hyperdrive: Hyperdrive;
};

declare module '@remix-run/cloudflare' {
	interface AppLoadContext {
		env: Cloudflare['env'];
		connectionString: Hyperdrive['connectionString'];
	}
}

export function getLoadContext({
	context,
}: {
	request: Request;
	context: LoadContext;
}) {
	return {
		env: context.cloudflare.env,
		connectionString: context.Hyperdrive.connectionString,
	};
}
