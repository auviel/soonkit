import { defaults } from '../config/defaults'
import { parseConfig } from '../config/parse'
import type { DeepPartial, SoonConfig } from '../config/types'

export const STORAGE_KEY = 'soonkit:config'

export async function loadFileConfig(): Promise<SoonConfig> {
  try {
    const res = await fetch('/soon.config.json', { cache: 'no-store' })
    if (!res.ok) return defaults
    return parseConfig(await res.json())
  } catch {
    return defaults
  }
}

export function readLocalConfig(): SoonConfig | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return parseConfig(JSON.parse(raw) as DeepPartial<SoonConfig>)
  } catch {
    return null
  }
}

export function writeLocalConfig(config: SoonConfig) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
}

export function clearLocalConfig() {
  localStorage.removeItem(STORAGE_KEY)
}

export function configToJson(config: SoonConfig): string {
  return `${JSON.stringify(config, null, 2)}\n`
}

export function downloadConfig(config: SoonConfig) {
  const blob = new Blob([configToJson(config)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'soon.config.json'
  a.click()
  URL.revokeObjectURL(url)
}
