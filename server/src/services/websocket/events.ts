import { WebSocket } from 'ws'

export type WsEvent<T = unknown> = {
  type: string
  payload?: T
  timestamp: string
}

export function createEvent<T>(type: string, payload?: T): WsEvent<T> {
  return { type, payload, timestamp: new Date().toISOString() }
}

export function encodeEvent(event: WsEvent): string {
  return JSON.stringify(event)
}

export function decodeEvent(raw: string): WsEvent | null {
  try {
    const parsed = JSON.parse(raw) as Partial<WsEvent>
    if (!parsed || typeof parsed.type !== 'string') {
      return null
    }
    return {
      type: parsed.type,
      payload: parsed.payload,
      timestamp: parsed.timestamp ?? new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export function sendEvent<T>(socket: WebSocket, type: string, payload?: T) {
  if (socket.readyState !== WebSocket.OPEN) return
  socket.send(encodeEvent(createEvent(type, payload)))
}
