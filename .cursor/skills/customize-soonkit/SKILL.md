---
name: customize-soonkit
description: Brands the Soonkit coming soon page by editing public/soon.config.json (copy, colors, fonts, logo, launch date, SEO). Use when the user wants to customize, restyle, rebrand, set a launch date, hide the editor, or apply a Midnight/Paper/Neon/Noir preset.
---

# Customize Soonkit

## Do this

1. Read `public/soon.config.json` and `src/config/types.ts`.
2. If the user names a preset (Midnight, Paper, Neon, Noir), copy `theme` + `fonts` from `src/config/presets.ts`.
3. Patch **only** `public/soon.config.json` unless they asked to change layout or animation.
4. `launchAt` must be valid ISO-8601. `brand.logo` empty = text wordmark.
5. If they said they are launching or deploying, set `"editor": false`.
6. Refresh `npm run dev` (or start it in the background) so they can preview.

## Do not

- Rewrite `src/components/FlipClock.tsx`
- Add a backend, form handler, or waitlist API unless asked
- Commit downloaded editor JSON into source files other than `public/soon.config.json`
