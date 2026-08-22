import { useEffect, useRef, useState } from 'react'

type Unit = { key: string; label: string; value: number }

function partsUntil(target: Date, now: Date): Unit[] {
  const ms = Math.max(0, target.getTime() - now.getTime())
  const totalSec = Math.floor(ms / 1000)
  const days = Math.floor(totalSec / 86400)
  const hours = Math.floor((totalSec % 86400) / 3600)
  const minutes = Math.floor((totalSec % 3600) / 60)
  const seconds = totalSec % 60
  return [
    { key: 'days', label: 'Days', value: days },
    { key: 'hours', label: 'Hours', value: hours },
    { key: 'minutes', label: 'Minutes', value: minutes },
    { key: 'seconds', label: 'Seconds', value: seconds },
  ]
}

function digitPair(value: number): [number, number] {
  const n = Math.max(0, Math.floor(value))
  return [Math.floor(n / 10) % 10, n % 10]
}

function useReducedMotion() {
  const [reduce, setReduce] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mq.matches)
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduce
}

function FlipDigit({ digit, reduce }: { digit: number; reduce: boolean | null }) {
  const shown = useRef(digit)
  const [from, setFrom] = useState(digit)
  const [to, setTo] = useState(digit)
  const [flipping, setFlipping] = useState(false)
  const [flipKey, setFlipKey] = useState(0)

  useEffect(() => {
    if (digit === shown.current) return

    if (reduce) {
      shown.current = digit
      setFrom(digit)
      setTo(digit)
      setFlipping(false)
      return
    }

    let cancelled = false
    const prev = shown.current
    shown.current = digit

    setFrom(prev)
    setTo(digit)
    setFlipping(true)
    setFlipKey((k) => k + 1)

    const done = window.setTimeout(() => {
      if (cancelled) return
      setFrom(digit)
      setFlipping(false)
    }, 700)

    return () => {
      cancelled = true
      window.clearTimeout(done)
    }
  }, [digit, reduce])

  return (
    <span className="flip-card">
      <span className="flip-card__static flip-card__static--top">
        <span className="flip-card__glyph">{to}</span>
      </span>
      <span className="flip-card__static flip-card__static--bottom">
        <span className="flip-card__glyph">{flipping ? from : to}</span>
      </span>
      <span className="flip-card__hinge" aria-hidden="true" />
      {flipping ? (
        <span key={flipKey} className="flip-card__leaves" aria-hidden="true">
          <span className="flip-card__leaf flip-card__leaf--front">
            <span className="flip-card__glyph">{from}</span>
          </span>
          <span className="flip-card__leaf flip-card__leaf--back">
            <span className="flip-card__glyph">{to}</span>
          </span>
        </span>
      ) : null}
    </span>
  )
}

function FlipUnit({
  value,
  label,
  reduce,
}: {
  value: number
  label: string
  reduce: boolean | null
}) {
  const [tens, ones] = digitPair(value)
  return (
    <div className="flip-unit">
      <div className="flip-unit__pair" aria-hidden="true">
        <FlipDigit digit={tens} reduce={reduce} />
        <FlipDigit digit={ones} reduce={reduce} />
      </div>
      <span className="flip-unit__label">{label}</span>
      <span className="sr-only">
        {value} {label}
      </span>
    </div>
  )
}

export default function FlipClock({
  launchAt,
  liveMessage,
  liveCta,
  liveHref,
}: {
  launchAt: string
  liveMessage: string
  liveCta: string
  liveHref: string
}) {
  const targetMs = new Date(launchAt).getTime()
  const reduce = useReducedMotion()
  const [units, setUnits] = useState<Unit[] | null>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const tick = () => {
      const next = partsUntil(new Date(targetMs), new Date())
      setUnits(next)
      setLive(next.every((u) => u.value === 0))
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  if (live) {
    return (
      <p className="mt-10 text-center font-display text-xl text-signal md:text-2xl">
        {liveMessage}{' '}
        <a href={liveHref} className="underline-offset-4 hover:underline">
          {liveCta}
        </a>
        .
      </p>
    )
  }

  if (!units) {
    return (
      <div
        className="flip-clock flip-clock--pending mt-10 h-[5.5rem] md:mt-12 md:h-[6.75rem]"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      className="flip-clock mt-10 flex flex-wrap items-start justify-center gap-3 sm:gap-4 md:mt-12 md:gap-5"
      role="timer"
      aria-live="off"
      aria-atomic="true"
    >
      {units.map((unit, i) => (
        <div key={unit.key} className="flex items-start gap-3 sm:gap-4 md:gap-5">
          <FlipUnit value={unit.value} label={unit.label} reduce={reduce} />
          {i < units.length - 1 ? (
            <span
              className="flip-clock__sep mt-5 hidden font-display text-2xl text-mute/40 sm:inline md:mt-6 md:text-3xl"
              aria-hidden="true"
            >
              :
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}
