---
name: deploy-soonkit
description: Builds and deploys Soonkit as a static site to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Use when the user asks to deploy, ship, go live, host, or publish the coming soon page.
---

# Deploy Soonkit

## Before deploy

1. `public/soon.config.json` should have `"editor": false` for a public launch. If it is still `true`, set it to `false` and tell the user they can reopen the panel at `/?customize`.
2. `npm run build` must succeed. Output is `dist/`.

## Host

If the user does not name a host, use **Vercel**.

| Host | Steps |
|------|--------|
| Vercel | `npx vercel --yes --prod` (link first with `npx vercel link` if needed) |
| Netlify | `npx netlify-cli deploy --prod --dir=dist` (`netlify.toml` already sets publish dir) |
| Cloudflare Pages | `npx wrangler pages deploy dist` |
| GitHub Pages | Publish `dist/`. If the site is not at the domain root, set Vite `base` and rebuild |

## After

Give the user the live URL. Do not commit `.env`, `.vercel`, or `.netlify`. Do not force-push.
