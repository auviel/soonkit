import type { SoonFonts, SoonTheme } from './types'

export type Preset = {
  id: string
  name: string
  theme: SoonTheme
  fonts: SoonFonts
}

export const presets: Preset[] = [
  {
    id: 'midnight',
    name: 'Midnight',
    theme: {
      canvas: '#07080a',
      canvasElevated: '#101218',
      ink: '#f4f1ea',
      mute: '#8b8f98',
      stroke: '#1c1f27',
      signal: '#5eead4',
      accent: '#6b5cad',
    },
    fonts: {
      display: 'Space Grotesk',
      sans: 'DM Sans',
      mono: 'DM Mono',
    },
  },
  {
    id: 'paper',
    name: 'Paper',
    theme: {
      canvas: '#f4f1ea',
      canvasElevated: '#ece7dc',
      ink: '#14110c',
      mute: '#6b675f',
      stroke: '#ddd6c8',
      signal: '#0f766e',
      accent: '#6b5cad',
    },
    fonts: {
      display: 'Fraunces',
      sans: 'Source Sans 3',
      mono: 'IBM Plex Mono',
    },
  },
  {
    id: 'neon',
    name: 'Neon',
    theme: {
      canvas: '#050508',
      canvasElevated: '#12121a',
      ink: '#f8f7ff',
      mute: '#9a97b0',
      stroke: '#232333',
      signal: '#c4f542',
      accent: '#ff4ecd',
    },
    fonts: {
      display: 'Syne',
      sans: 'Outfit',
      mono: 'JetBrains Mono',
    },
  },
  {
    id: 'noir',
    name: 'Noir',
    theme: {
      canvas: '#0a0a0a',
      canvasElevated: '#161616',
      ink: '#e8e0d0',
      mute: '#8a8478',
      stroke: '#222222',
      signal: '#d4a574',
      accent: '#8a7355',
    },
    fonts: {
      display: 'Cormorant Garamond',
      sans: 'Karla',
      mono: 'IBM Plex Mono',
    },
  },
]

export const fontPairings: { id: string; label: string; fonts: SoonFonts }[] = [
  {
    id: 'grotesk',
    label: 'Space Grotesk / DM Sans',
    fonts: { display: 'Space Grotesk', sans: 'DM Sans', mono: 'DM Mono' },
  },
  {
    id: 'fraunces',
    label: 'Fraunces / Source Sans',
    fonts: { display: 'Fraunces', sans: 'Source Sans 3', mono: 'IBM Plex Mono' },
  },
  {
    id: 'syne',
    label: 'Syne / Outfit',
    fonts: { display: 'Syne', sans: 'Outfit', mono: 'JetBrains Mono' },
  },
  {
    id: 'cormorant',
    label: 'Cormorant / Karla',
    fonts: { display: 'Cormorant Garamond', sans: 'Karla', mono: 'IBM Plex Mono' },
  },
  {
    id: 'instrument',
    label: 'Instrument Serif / Inter',
    fonts: { display: 'Instrument Serif', sans: 'Inter', mono: 'IBM Plex Mono' },
  },
]
