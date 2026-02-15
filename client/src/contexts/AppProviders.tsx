import type { PropsWithChildren } from 'react'
import { RealtimeProvider } from './realtime/RealtimeContext'
import { GridProvider } from './grid/GridContext'
import { GensetProvider } from './genset/GensetContext'
import { InvertersProvider } from './inverters/InvertersContext'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <RealtimeProvider>
      <GridProvider>
        <GensetProvider>
          <InvertersProvider>{children}</InvertersProvider>
        </GensetProvider>
      </GridProvider>
    </RealtimeProvider>
  )
}
