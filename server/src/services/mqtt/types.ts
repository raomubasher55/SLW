export type MqttPayload = Record<string, string>

export type MqttMessage = {
  topic: string
  source: string
  payload: MqttPayload
  receivedAt: string
}

export type MqttClientOptions = {
  onMessage?: (message: MqttMessage) => void
  onError?: (error: Error, context?: { topic?: string; raw?: string }) => void
}
