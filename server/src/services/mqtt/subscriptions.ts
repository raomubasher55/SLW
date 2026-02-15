import { env } from '../../config/env'

export type MqttSubscription = {
  key: string
  topic: string
}

const fallbackTopics = env.mqttTopics.length > 0 ? env.mqttTopics : [env.mqttTopic]

export const subscriptions: MqttSubscription[] = fallbackTopics.map((topic, index) => {
  const parts = topic.split('/')
  const rawKey = parts[2] ?? `topic-${index + 1}`
  return { key: rawKey.toLowerCase(), topic }
})

function matchesTopic(filter: string, topic: string): boolean {
  const filterLevels = filter.split('/')
  const topicLevels = topic.split('/')
  const maxLen = Math.max(filterLevels.length, topicLevels.length)

  for (let i = 0; i < maxLen; i += 1) {
    const filterLevel = filterLevels[i]
    const topicLevel = topicLevels[i]

    if (filterLevel === '#') return true
    if (filterLevel === '+') continue
    if (filterLevel === undefined || topicLevel === undefined) return false
    if (filterLevel !== topicLevel) return false
  }

  return filterLevels.length === topicLevels.length
}

export function resolveSubscriptionKey(topic: string): string {
  const match = subscriptions.find((item) => matchesTopic(item.topic, topic))
  return match?.key ?? 'unknown'
}
