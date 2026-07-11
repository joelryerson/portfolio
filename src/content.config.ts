import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Case study frontmatter schema (source of truth: CLAUDE.md > Tech Stack > Content).
// Every field here exists to serve a page requirement; don't add fields speculatively.
const work = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    timeframe: z.string(), // human-readable, e.g. "May–June 2026"
    outcome: z.string(), // the one headline metric/result, stated as a sentence fragment
    stack: z.array(z.string()).min(1),
    description: z.string().max(160), // meta description
    ogImage: z.string().optional(), // path under /public; optional until OG images exist
    date: z.coerce.date(), // drives sort order (most recent first)
    draft: z.boolean().default(true), // case studies ship only when Joel flips this
  }),
});

export const collections = { work };
