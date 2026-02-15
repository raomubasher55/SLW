import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { decodeEvent, encodeEvent } from './events'
import type { MqttMessage, RealtimeState, WsEvent } from './types'

type RealtimeContextValue = RealtimeState & {
  url: string
  send: <T>(type: string, payload?: T) => void
}

const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:5000/ws'

export const RealtimeContext = createContext<RealtimeContextValue | null>(null)

const getNextDelay = (attempt: number) => Math.min(10000, 1000 * 2 ** attempt)

export function RealtimeProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<RealtimeState['status']>('connecting')
  const [lastEvent, setLastEvent] = useState<WsEvent | undefined>(undefined)
  const [messagesBySource, setMessagesBySource] = useState<Record<string, MqttMessage>>({})
  const socketRef = useRef<WebSocket | null>(null)
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reconnectAttempt = useRef(0)

  const cleanupSocket = () => {
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current)
      reconnectTimer.current = null
    }
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
    }
  }

  const scheduleReconnect = useCallback((connectFn: () => void) => {
    const delay = getNextDelay(reconnectAttempt.current)
    reconnectAttempt.current += 1
    reconnectTimer.current = setTimeout(() => {
      connectFn()
    }, delay)
  }, [])

  const connect = useCallback(() => {
    cleanupSocket()
    setStatus('connecting')

    const socket = new WebSocket(WS_URL)
    socketRef.current = socket

    socket.onopen = () => {
      reconnectAttempt.current = 0
      setStatus('open')
    }

    socket.onclose = () => {
      setStatus('closed')
      scheduleReconnect(connect)
    }

    socket.onerror = () => {
      setStatus('error')
      socket.close()
    }

    socket.onmessage = (event) => {
      const decoded = decodeEvent(event.data)
      if (!decoded) return

      setLastEvent(decoded)
      if (decoded.type === 'mqtt:update') {
        const payload = decoded.payload as MqttMessage
        const sourceKey = payload.source.toLowerCase()
        setMessagesBySource((prev) => ({
          ...prev,
          [sourceKey]: payload,
        }))
      }
    }
  }, [scheduleReconnect])

  useEffect(() => {
    connect()
    return () => cleanupSocket()
  }, [connect])

  const send = useCallback(
    <T,>(type: string, payload?: T) => {
      const socket = socketRef.current
      if (!socket || socket.readyState !== WebSocket.OPEN) return
      socket.send(
        encodeEvent({
          type,
          payload,
          timestamp: new Date().toISOString(),
        }),
      )
    },
    [],
  )

  const value = useMemo(
    () => ({
      status,
      lastEvent,
      messagesBySource,
      url: WS_URL,
      send,
    }),
    [status, lastEvent, messagesBySource, send],
  )

  return <RealtimeContext.Provider value={value}>
    {children}
  </RealtimeContext.Provider>
}
