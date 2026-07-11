# joelryerson.design

Portfolio of Joel Ryerson, Design Engineer. Custom-built — this repo is part of the portfolio.

## Stack

- [Astro](https://astro.build) with MDX content collections (typed frontmatter, validated at build)
- CSS custom properties as a two-layer token system (primitives → semantic), documented in [src/styles/tokens.css](src/styles/tokens.css)
- No client-side JS by default; islands only where interactivity earns it

## Structure

```
src/
  content/work/    case studies (MDX, schema in src/content.config.ts)
  layouts/         base HTML shell, per-page meta/OG
  pages/           routes (/, /work/[slug])
  styles/          tokens.css (design tokens), global.css (base styles)
content/raw/       raw case-study material, not published
```

## Develop

```sh
npm install
npm run dev      # localhost:4321
npm run build    # static build to dist/
```
