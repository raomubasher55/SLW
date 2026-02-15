import { createContext, useContext, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { gensetBackendSample } from '../../data'
import { mapPayloadToBackendSample } from '../mqtt/mapping'
import { useRealtime } from '../realtime/useRealtime'

type GensetContextValue = {
  data: typeof gensetBackendSample
  lastUpdated?: string
}

const GensetContext = createContext<GensetContextValue | null>(null)

export function GensetProvider({ children }: PropsWithChildren) {
  const { messagesBySource } = useRealtime()
  const message = messagesBySource.gen2 ?? messagesBySource.gen1
  const data = message
    ? (mapPayloadToBackendSample(message.payload, gensetBackendSample) as typeof gensetBackendSample)
    : gensetBackendSample
  const lastUpdated = message?.payload?._terminalTime ?? message?.receivedAt

  const value = useMemo(() => ({ data, lastUpdated }), [data, lastUpdated])

  return <GensetContext.Provider value={value}>{children}</GensetContext.Provider>
}

export function useGenset() {
  const context = useContext(GensetContext)
  if (!context) {
    throw new Error('useGenset must be used within GensetProvider')
  }
  return context
}
