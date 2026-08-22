# Soonkit

An open-source coming soon page with a paper-flip countdown and a live visual editor.

Click **Customize** on the page, restyle everything in the browser, then download `soon.config.json`. No rebuild required for copy, colors, fonts, or the launch date.

Originally designed for [Auviel](https://www.auviel.com).

## Use with AI

Open this repo in Cursor, Claude Code, Copilot, or ChatGPT and paste [prompts/starter.md](prompts/starter.md):

```
Brand this coming soon page for [Company].
Headline: …
Launch: …
Then deploy to Vercel.
```

Agents in this repo read `AGENTS.md` automatically. Prompt pack: [`prompts/`](prompts/). Machine-readable: [`llms.txt`](llms.txt).

## Quick start

```bash
git clone https://github.com/thevalentinedev/soonkit.git
cd soonkit
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use **Customize** in the corner.

## Two ways to customize

### 1. Visual editor (easiest)

The page is the preview. The panel on the right edits:

- Brand name or logo URL
- Headline, subhead, email
- Launch date
- Colors
- Font pairings
- Midnight / Paper / Neon / Noir presets

Edits persist in the browser. When it looks right:

1. Turn off **Show this editor on the live page**
2. Click **Download**
3. Replace `public/soon.config.json` with the file you downloaded

Need the editor after that? Visit `/?customize`.

### 2. Config file

Edit `public/soon.config.json` directly. That file is read at runtime, so you can change copy and theme without touching React.

```json
{
  "copy": {
    "headline": "We are going dark",
    "subhead": "And you are going to love it."
  },
  "launchAt": "2026-09-21T12:00:00-04:00",
  "theme": {
    "canvas": "#07080a",
    "ink": "#f4f1ea",
    "signal": "#5eead4"
  }
}
```

## Deploy

`npm run build` outputs static files in `dist/`. Drop that folder on any static host — or ask an agent using [prompts/deploy.md](prompts/deploy.md):

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [Cloudflare Pages](https://pages.cloudflare.com)
- GitHub Pages

Set `editor` to `false` in `soon.config.json` before a public launch.

## Stack

Vite, React, TypeScript, Tailwind CSS v4. No backend.

## License

MIT
