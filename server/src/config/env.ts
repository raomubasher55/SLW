import dotenv from 'dotenv'

dotenv.config()

const mqttUrlInput = process.env.MQTT_BROKER_URL ?? 'mqtt://178.16.137.85'
const mqttBrokerUrl = mqttUrlInput.includes('://')
  ? mqttUrlInput
  : `mqtt://${mqttUrlInput}`
const mqttTopicsRaw = process.env.MQTT_TOPICS ?? ''
const mqttTopics = mqttTopicsRaw
  .split(',')
  .map((topic) => topic.trim())
  .filter(Boolean)

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 5000),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  mqttBrokerUrl,
  mqttTopic: process.env.MQTT_TOPIC ?? 'data/cobijaMainSLKT/grid1/#',
  mqttTopics,
}
