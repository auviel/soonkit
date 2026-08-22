import ComingSoon from './components/ComingSoon'
import Editor from './components/Editor'
import { useSoonConfig } from './hooks/useSoonConfig'

function showEditor(enabled: boolean) {
  if (enabled) return true
  const params = new URLSearchParams(window.location.search)
  return params.has('customize')
}

export default function App() {
  const { config, update, replace, reset } = useSoonConfig()

  if (!config) {
    return <div className="min-h-dvh bg-canvas" />
  }

  return (
    <div className="coming-soon-page min-h-dvh bg-canvas text-ink antialiased">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="sk-glow absolute inset-0" />
      </div>
      <ComingSoon config={config} />
      {showEditor(config.editor) ? (
        <Editor config={config} onUpdate={update} onReplace={replace} onReset={reset} />
      ) : null}
    </div>
  )
}
