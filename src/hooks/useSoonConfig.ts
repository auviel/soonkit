import { useCallback, useEffect, useState } from 'react'
import { merge } from '../config/merge'
import type { DeepPartial, SoonConfig } from '../config/types'
import { applyAppearance } from '../lib/appearance'
import {
  clearLocalConfig,
  loadFileConfig,
  readLocalConfig,
  writeLocalConfig,
} from '../lib/storage'

export function useSoonConfig() {
  const [config, setConfig] = useState<SoonConfig | null>(null)
  const [fileConfig, setFileConfig] = useState<SoonConfig | null>(null)

  useEffect(() => {
    let cancelled = false
    loadFileConfig().then((file) => {
      if (cancelled) return
      setFileConfig(file)
      setConfig(readLocalConfig() ?? file)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (config) applyAppearance(config)
  }, [config])

  const update = useCallback((patch: DeepPartial<SoonConfig>) => {
    setConfig((prev) => {
      if (!prev) return prev
      const next = merge(prev, patch)
      writeLocalConfig(next)
      return next
    })
  }, [])

  const replace = useCallback((next: SoonConfig) => {
    writeLocalConfig(next)
    setConfig(next)
  }, [])

  const reset = useCallback(() => {
    clearLocalConfig()
    if (fileConfig) setConfig(fileConfig)
  }, [fileConfig])

  return { config, update, replace, reset }
}
