# Soonkit — Claude instructions

Follow `AGENTS.md` in this repo. Summary:

- Customize by editing `public/soon.config.json` only, unless the user asks for layout or animation changes.
- Dev: `npm install` then `npm run dev` in the background. Verify with `npm run build`.
- Before launch: set `"editor": false`.
- Deploy static `dist/`. Default host is Vercel: `npx vercel --yes --prod`.
- Do not rewrite the flip clock or add a backend unless asked.
