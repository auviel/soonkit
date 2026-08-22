# Soonkit — agent instructions

Static Vite + React coming-soon page. **Config is the product.** Brand and launch by editing JSON, not by rewriting components.

## Read first

- `public/soon.config.json` — runtime config (copy, theme, date, editor)
- `src/config/types.ts` — field names and types
- `prompts/` — paste-ready user prompts

## Customize (default path)

Edit **only** `public/soon.config.json` unless the user asks to change layout, animation, or the editor UI.

- `launchAt` is ISO-8601 (`2026-09-21T12:00:00-04:00`)
- `brand.logo` empty = text wordmark; otherwise an image URL
- `editor: false` before a public launch (reopen later with `/?customize`)
- Presets live in `src/config/presets.ts` (Midnight, Paper, Neon, Noir) — copy theme/fonts from there if the user names one

Do not rewrite `FlipClock`, do not add a backend, do not add a waitlist API unless asked.

## Dev

```bash
npm install
npm run dev          # http://localhost:5173 — run in background
npm run build        # verify before deploy
```

Node 20+. After config-only edits, a refresh is enough; rebuild is only required for source changes.

## Deploy

Build output is `dist/` (static). Default to **Vercel** if the user does not name a host.

| Host | Command |
|------|---------|
| Vercel | `npx vercel --yes --prod` |
| Netlify | `npm run build && npx netlify-cli deploy --prod --dir=dist` |
| Cloudflare Pages | `npm run build && npx wrangler pages deploy dist` |
| GitHub Pages | `npm run build`, publish `dist/`; set Vite `base` if the site is not at the domain root |

Never commit `.env`, `.vercel`, or secrets. Do not force-push.

## Go-live checklist

1. Brand + copy + `launchAt` in `public/soon.config.json`
2. `"editor": false`
3. `npm run build` succeeds
4. Deploy
5. Give the user the live URL
