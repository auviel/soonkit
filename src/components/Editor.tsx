import { useEffect, useId, useState } from 'react'
import { merge } from '../config/merge'
import { fontPairings, presets } from '../config/presets'
import type { DeepPartial, SoonConfig, SoonTheme } from '../config/types'
import { configToJson, downloadConfig } from '../lib/storage'

const THEME_FIELDS: { key: keyof SoonTheme; label: string }[] = [
  { key: 'canvas', label: 'Canvas' },
  { key: 'ink', label: 'Ink' },
  { key: 'mute', label: 'Mute' },
  { key: 'signal', label: 'Signal' },
  { key: 'accent', label: 'Accent' },
  { key: 'stroke', label: 'Stroke' },
  { key: 'canvasElevated', label: 'Elevated' },
]

function toDatetimeLocal(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fromDatetimeLocal(value: string): string {
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? value : d.toISOString()
}

function TextInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
}) {
  const id = useId()
  return (
    <label className="sk-field" htmlFor={id}>
      <span className="sk-field__label">{label}</span>
      <input
        id={id}
        className="sk-input"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  return (
    <label className="sk-field" htmlFor={id}>
      <span className="sk-field__label">{label}</span>
      <textarea
        id={id}
        className="sk-input sk-input--area"
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="sk-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  const id = useId()
  const hex = /^#([0-9a-f]{6})$/i.test(value) ? value : '#000000'
  return (
    <label className="sk-color" htmlFor={id}>
      <span className="sk-field__label">{label}</span>
      <span className="sk-color__row">
        <input
          type="color"
          value={hex}
          aria-label={label}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          id={id}
          className="sk-input sk-input--hex"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </span>
    </label>
  )
}

export default function Editor({
  config,
  onUpdate,
  onReplace,
  onReset,
}: {
  config: SoonConfig
  onUpdate: (patch: DeepPartial<SoonConfig>) => void
  onReplace: (next: SoonConfig) => void
  onReset: () => void
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [importText, setImportText] = useState('')
  const [importError, setImportError] = useState('')
  const [showImport, setShowImport] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const copyJson = async () => {
    await navigator.clipboard.writeText(configToJson(config))
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const applyImport = () => {
    try {
      const parsed = JSON.parse(importText) as DeepPartial<SoonConfig>
      onReplace(merge(config, parsed))
      setImportError('')
      setShowImport(false)
    } catch {
      setImportError('That JSON could not be parsed.')
    }
  }

  const activeFonts =
    fontPairings.find(
      (p) =>
        p.fonts.display === config.fonts.display &&
        p.fonts.sans === config.fonts.sans,
    )?.id ?? ''

  return (
    <>
      <button
        type="button"
        className="sk-fab"
        aria-expanded={open}
        aria-controls="sk-editor"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 6h16M4 12h10M4 18h13"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <circle cx="18" cy="12" r="2" fill="currentColor" />
          <circle cx="15" cy="18" r="2" fill="currentColor" />
        </svg>
        Customize
      </button>

      {open ? (
        <div className="sk-scrim" onClick={() => setOpen(false)} aria-hidden="true" />
      ) : null}

      <aside
        id="sk-editor"
        className={`sk-panel ${open ? 'sk-panel--open' : ''}`}
        aria-hidden={!open}
      >
        <header className="sk-panel__head">
          <div>
            <p className="eyebrow">Soonkit</p>
            <h2>Customize</h2>
          </div>
          <button type="button" className="sk-icon-btn" onClick={() => setOpen(false)} aria-label="Close">
            ×
          </button>
        </header>

        <div className="sk-panel__body">
          <section className="sk-section">
            <h3>Presets</h3>
            <div className="sk-presets">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="sk-preset"
                  onClick={() => onUpdate({ theme: preset.theme, fonts: preset.fonts })}
                >
                  <span
                    className="sk-preset__swatch"
                    style={{
                      background: `linear-gradient(135deg, ${preset.theme.canvas} 55%, ${preset.theme.signal} 55%)`,
                      borderColor: preset.theme.stroke,
                    }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
          </section>

          <section className="sk-section">
            <h3>Content</h3>
            <TextInput
              label="Brand"
              value={config.brand.name}
              onChange={(name) => onUpdate({ brand: { name } })}
            />
            <TextInput
              label="Logo URL"
              value={config.brand.logo}
              placeholder="Leave empty for a text mark"
              onChange={(logo) => onUpdate({ brand: { logo } })}
            />
            <TextInput
              label="Eyebrow"
              value={config.copy.eyebrow}
              onChange={(eyebrow) => onUpdate({ copy: { eyebrow } })}
            />
            <TextArea
              label="Headline"
              value={config.copy.headline}
              onChange={(headline) => onUpdate({ copy: { headline } })}
            />
            <TextArea
              label="Subhead"
              value={config.copy.subhead}
              onChange={(subhead) => onUpdate({ copy: { subhead } })}
            />
            <TextInput
              label="Email"
              type="email"
              value={config.copy.email}
              onChange={(email) => onUpdate({ copy: { email } })}
            />
            <TextInput
              label="Email label"
              value={config.copy.emailLabel}
              onChange={(emailLabel) => onUpdate({ copy: { emailLabel } })}
            />
            <div className="sk-toggles">
              <Toggle
                label="Countdown"
                checked={config.showCountdown}
                onChange={(showCountdown) => onUpdate({ showCountdown })}
              />
              <Toggle
                label="Email"
                checked={config.showEmail}
                onChange={(showEmail) => onUpdate({ showEmail })}
              />
            </div>
          </section>

          <section className="sk-section">
            <h3>Launch</h3>
            <TextInput
              label="Date & time"
              type="datetime-local"
              value={toDatetimeLocal(config.launchAt)}
              onChange={(value) => onUpdate({ launchAt: fromDatetimeLocal(value) })}
            />
            <TextInput
              label="Live message"
              value={config.copy.liveMessage}
              onChange={(liveMessage) => onUpdate({ copy: { liveMessage } })}
            />
            <TextInput
              label="Live link text"
              value={config.copy.liveCta}
              onChange={(liveCta) => onUpdate({ copy: { liveCta } })}
            />
            <TextInput
              label="Live URL"
              value={config.copy.liveHref}
              onChange={(liveHref) => onUpdate({ copy: { liveHref } })}
            />
          </section>

          <section className="sk-section">
            <h3>Theme</h3>
            <div className="sk-colors">
              {THEME_FIELDS.map((field) => (
                <ColorField
                  key={field.key}
                  label={field.label}
                  value={config.theme[field.key]}
                  onChange={(value) => onUpdate({ theme: { [field.key]: value } })}
                />
              ))}
            </div>
          </section>

          <section className="sk-section">
            <h3>Fonts</h3>
            <label className="sk-field">
              <span className="sk-field__label">Pairing</span>
              <select
                className="sk-input"
                value={activeFonts}
                onChange={(e) => {
                  const pairing = fontPairings.find((p) => p.id === e.target.value)
                  if (pairing) onUpdate({ fonts: pairing.fonts })
                }}
              >
                {fontPairings.map((pairing) => (
                  <option key={pairing.id} value={pairing.id}>
                    {pairing.label}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="sk-section">
            <h3>Page</h3>
            <TextInput
              label="Title"
              value={config.seo.title}
              onChange={(title) => onUpdate({ seo: { title } })}
            />
            <TextArea
              label="Description"
              value={config.seo.description}
              onChange={(description) => onUpdate({ seo: { description } })}
            />
            <Toggle
              label="Show this editor on the live page"
              checked={config.editor}
              onChange={(editor) => onUpdate({ editor })}
            />
            <p className="sk-hint">
              Turn this off, download the JSON, and replace <code>public/soon.config.json</code> before you launch.
            </p>
          </section>

          <section className="sk-section">
            <button
              type="button"
              className="sk-link"
              onClick={() => setShowImport((v) => !v)}
            >
              {showImport ? 'Hide import' : 'Import JSON'}
            </button>
            {showImport ? (
              <>
                <textarea
                  className="sk-input sk-input--area sk-input--code"
                  rows={8}
                  value={importText}
                  placeholder='{ "copy": { "headline": "Hello" } }'
                  onChange={(e) => setImportText(e.target.value)}
                />
                {importError ? <p className="sk-error">{importError}</p> : null}
                <button type="button" className="sk-btn sk-btn--ghost" onClick={applyImport}>
                  Apply JSON
                </button>
              </>
            ) : null}
          </section>
        </div>

        <footer className="sk-panel__foot">
          <button type="button" className="sk-btn sk-btn--ghost" onClick={onReset}>
            Reset
          </button>
          <button type="button" className="sk-btn sk-btn--ghost" onClick={copyJson}>
            {copied ? 'Copied' : 'Copy JSON'}
          </button>
          <button type="button" className="sk-btn sk-btn--solid" onClick={() => downloadConfig(config)}>
            Download
          </button>
        </footer>
      </aside>
    </>
  )
}
