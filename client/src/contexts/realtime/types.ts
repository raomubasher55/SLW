export type WsEvent<T = unknown> = {
  type: string
  payload?: T
  timestamp: string
}

export type MqttPayload = Record<string, string> & {
  _terminalTime?: string
  _groupName?: string
}

export type MqttMessage = {
  topic: string
  source: string
  payload: MqttPayload
  receivedAt: string
}

export type RealtimeStatus = 'connecting' | 'open' | 'closed' | 'error'

export type RealtimeState = {
  status: RealtimeStatus
  lastEvent?: WsEvent
  messagesBySource: Record<string, MqttMessage>
}
