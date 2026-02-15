import type { WsEvent } from './types'

export function decodeEvent(raw: string): WsEvent | null {
  try {
    const parsed = JSON.parse(raw) as Partial<WsEvent>
    if (!parsed || typeof parsed.type !== 'string') return null
    return {
      type: parsed.type,
      payload: parsed.payload,
      timestamp: parsed.timestamp ?? new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function encodeEvent(event: WsEvent): string {
  return JSON.stringify(event)
}
