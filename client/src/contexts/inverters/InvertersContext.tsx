import { createContext, useContext, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { inverters } from '../../data'
import { mergeInvertersWithMqtt } from '../mqtt/mapping'
import { useRealtime } from '../realtime/useRealtime'

type InvertersContextValue = {
  list: typeof inverters
  lastUpdated?: string
}

const InvertersContext = createContext<InvertersContextValue | null>(null)

export function InvertersProvider({ children }: PropsWithChildren) {
  const { messagesBySource } = useRealtime()
  const list = mergeInvertersWithMqtt(inverters, messagesBySource)
  const lastUpdated = Object.values(messagesBySource)
    .filter((message) => message.source.startsWith('inv'))
    .map((message) => message.payload?._terminalTime ?? message.receivedAt)
    .find(Boolean)

  const value = useMemo(() => ({ list, lastUpdated }), [list, lastUpdated])

  return <InvertersContext.Provider value={value}>{children}</InvertersContext.Provider>
}

export function useInverters() {
  const context = useContext(InvertersContext)
  if (!context) {
    throw new Error('useInverters must be used within InvertersProvider')
  }
  return context
}
