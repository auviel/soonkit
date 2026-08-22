export type SoonTheme = {
  canvas: string
  canvasElevated: string
  ink: string
  mute: string
  stroke: string
  signal: string
  accent: string
}

export type SoonFonts = {
  display: string
  sans: string
  mono: string
}

export type SoonConfig = {
  brand: {
    name: string
    logo: string
    homeUrl: string
  }
  copy: {
    eyebrow: string
    headline: string
    subhead: string
    emailLabel: string
    email: string
    liveMessage: string
    liveCta: string
    liveHref: string
  }
  launchAt: string
  showCountdown: boolean
  showEmail: boolean
  editor: boolean
  seo: {
    title: string
    description: string
  }
  theme: SoonTheme
  fonts: SoonFonts
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}
