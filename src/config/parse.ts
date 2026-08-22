import { defaults } from './defaults'
import { merge } from './merge'
import type { DeepPartial, SoonConfig } from './types'

export function parseConfig(raw: unknown): SoonConfig {
  if (!raw || typeof raw !== 'object') return defaults
  return merge(defaults, raw as DeepPartial<SoonConfig>)
}
