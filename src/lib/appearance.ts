import type { SoonConfig, SoonFonts, SoonTheme } from '../config/types'

const WEIGHTS = 'wght@400;500;600;700'

function familyParam(name: string): string {
  return `family=${encodeURIComponent(name).replace(/%20/g, '+')}:${WEIGHTS}`
}

export function applyTheme(theme: SoonTheme) {
  const root = document.documentElement
  root.style.setProperty('--sk-canvas', theme.canvas)
  root.style.setProperty('--sk-canvas-elevated', theme.canvasElevated)
  root.style.setProperty('--sk-ink', theme.ink)
  root.style.setProperty('--sk-mute', theme.mute)
  root.style.setProperty('--sk-stroke', theme.stroke)
  root.style.setProperty('--sk-signal', theme.signal)
  root.style.setProperty('--sk-accent', theme.accent)
}

export function applyFonts(fonts: SoonFonts) {
  const href = `https://fonts.googleapis.com/css2?${familyParam(fonts.display)}&${familyParam(fonts.sans)}&${familyParam(fonts.mono)}&display=swap`
  let link = document.getElementById('sk-fonts') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.id = 'sk-fonts'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  if (link.href !== href) link.href = href

  const root = document.documentElement
  root.style.setProperty('--sk-font-display', `"${fonts.display}", ui-sans-serif, system-ui, sans-serif`)
  root.style.setProperty('--sk-font-sans', `"${fonts.sans}", ui-sans-serif, system-ui, sans-serif`)
  root.style.setProperty('--sk-font-mono', `"${fonts.mono}", ui-monospace, SFMono-Regular, Menlo, monospace`)
}

export function applySeo(config: SoonConfig) {
  document.title = config.seo.title
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', config.seo.description)
}

export function applyAppearance(config: SoonConfig) {
  applyTheme(config.theme)
  applyFonts(config.fonts)
  applySeo(config)
}
