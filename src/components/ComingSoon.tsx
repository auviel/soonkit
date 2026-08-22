import type { SoonConfig } from '../config/types'
import FlipClock from './FlipClock'

function EnvelopeIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 256 256"
      fill="currentColor"
      className="shrink-0 text-mute"
      aria-hidden="true"
    >
      <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM209.66,64,128,133.86,46.34,64ZM216,192H40V74.23l82.34,71.26a8,8,0,0,0,10.32,0L216,74.23Z" />
    </svg>
  )
}

export default function ComingSoon({ config }: { config: SoonConfig }) {
  const { brand, copy } = config

  return (
    <main className="shell flex min-h-dvh flex-col items-center justify-center px-5 py-16 text-center">
      <a href={brand.homeUrl} className="inline-flex" aria-label={`${brand.name} home`}>
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={brand.name}
            width="140"
            height="32"
            className="h-7 w-auto md:h-8"
            decoding="async"
          />
        ) : (
          <span className="font-display text-xl font-semibold tracking-[-0.03em] text-ink md:text-2xl">
            {brand.name}
          </span>
        )}
      </a>

      <p className="eyebrow mt-14 text-mute/80">{copy.eyebrow}</p>
      <h1 className="display mt-4 max-w-3xl text-4xl text-ink sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[1.05]">
        {copy.headline}
      </h1>
      <p className="mt-5 max-w-lg text-lg text-mute md:text-xl">{copy.subhead}</p>

      {config.showCountdown ? (
        <FlipClock
          launchAt={config.launchAt}
          liveMessage={copy.liveMessage}
          liveCta={copy.liveCta}
          liveHref={copy.liveHref}
        />
      ) : null}

      {config.showEmail && copy.email ? (
        <div className="mt-16 md:mt-20">
          <p className="eyebrow text-mute/80">{copy.emailLabel}</p>
          <a
            href={`mailto:${copy.email}`}
            className="mt-4 inline-flex items-center gap-2.5 text-base text-ink/90 transition-colors hover:text-signal md:text-lg"
          >
            <EnvelopeIcon />
            {copy.email}
          </a>
        </div>
      ) : null}
    </main>
  )
}
