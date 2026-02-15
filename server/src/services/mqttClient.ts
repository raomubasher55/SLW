import mqtt from 'mqtt'
import { env } from '../config/env'
import { resolveSubscriptionKey, subscriptions } from './mqtt/subscriptions'
import type { MqttClientOptions } from './mqtt/types'

type ParsedPayload = Record<string, string>

function parsePayload(raw: string): ParsedPayload | null {
  try {
    return JSON.parse(raw) as ParsedPayload
  } catch {
    return null
  }
}

export function startMqttClient(options: MqttClientOptions = {}) {
  const client = mqtt.connect(env.mqttBrokerUrl)

  client.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log(`MQTT connected: ${env.mqttBrokerUrl}`)
    const topics = subscriptions.map((item) => item.topic)
    client.subscribe(topics, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(`MQTT subscribe error: ${err.message}`)
        return
      }
      // eslint-disable-next-line no-console
      console.log(`MQTT subscribed: ${topics.join(', ')}`)
    })
  })

  client.on('reconnect', () => {
    // eslint-disable-next-line no-console
    console.log('MQTT reconnecting...')
  })

  client.on('close', () => {
    // eslint-disable-next-line no-console
    console.log('MQTT connection closed')
  })

  client.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error(`MQTT error: ${err.message}`)
  })

  client.on('message', (topic, message) => {
    const raw = message.toString()
    const payload = parsePayload(raw)

    if (!payload) {
      const error = new Error('MQTT payload parse error')
      options.onError?.(error, { topic, raw })
      // eslint-disable-next-line no-console
      console.error('MQTT payload parse error', { topic, raw })
      return
    }

    const source = resolveSubscriptionKey(topic)
    const mqttMessage = {
      topic,
      source,
      payload,
      receivedAt: new Date().toISOString(),
    }

    options.onMessage?.(mqttMessage)
    // eslint-disable-next-line no-console
    console.log(`MQTT payload received [${topic}]`, payload)
  })

  return client
}
