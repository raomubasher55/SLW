import type { Server as HttpServer } from 'http'
import { WebSocket, WebSocketServer } from 'ws'
import { createEvent, decodeEvent, encodeEvent } from './websocket/events'

export type WebSocketHandle = {
  broadcast: (data: unknown) => void
  broadcastEvent: (type: string, payload?: unknown) => void
}

type WebSocketConfig = {
  onEvent?: (event: ReturnType<typeof decodeEvent>, socket: WebSocket) => void
}

export function setupWebSocketServer(
  server: HttpServer,
  config: WebSocketConfig = {}
): WebSocketHandle {
  const wss = new WebSocketServer({ server, path: '/ws' })

  wss.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('WS client connected')
    socket.send(encodeEvent(createEvent('welcome')))

    socket.on('message', (data) => {
      const raw = data.toString()
      const event = decodeEvent(raw)
      if (!event) return
      config.onEvent?.(event, socket)
    })

    socket.on('close', () => {
      // eslint-disable-next-line no-console
      console.log('WS client disconnected')
    })

    socket.on('error', (err) => {
      // eslint-disable-next-line no-console
      console.error(`WS error: ${err.message}`)
    })
  })

  const broadcast = (data: unknown) => {
    const payload = typeof data === 'string' ? data : JSON.stringify(data)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload)
      }
    })
  }

  const broadcastEvent = (type: string, payload?: unknown) => {
    const message = encodeEvent(createEvent(type, payload))
    // eslint-disable-next-line no-console
    console.log(`WS broadcast: ${type}`)
    broadcast(message)
  }

  return { broadcast, broadcastEvent }
}
