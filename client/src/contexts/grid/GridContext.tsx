import { createContext, useContext, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { gridBackendSample } from '../../data'
import { mapPayloadToBackendSample } from '../mqtt/mapping'
import { useRealtime } from '../realtime/useRealtime'

type GridContextValue = {
  data: typeof gridBackendSample
  lastUpdated?: string
}

const GridContext = createContext<GridContextValue | null>(null)

export function GridProvider({ children }: PropsWithChildren) {
  const { messagesBySource } = useRealtime()
  const message = messagesBySource.grid1
  const data = message
    ? (mapPayloadToBackendSample(message.payload, gridBackendSample) as typeof gridBackendSample)
    : gridBackendSample
  const lastUpdated = message?.payload?._terminalTime ?? message?.receivedAt

  const value = useMemo(() => ({ data, lastUpdated }), [data, lastUpdated])

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>
}

export function useGrid() {
  const context = useContext(GridContext)
  if (!context) {
    throw new Error('useGrid must be used within GridProvider')
  }
  return context
}
