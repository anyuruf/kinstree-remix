import type { Config } from 'drizzle-kit';


export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  verbose: true,
  strict: true,
} satisfies Config;
