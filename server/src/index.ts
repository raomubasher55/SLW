import http from 'http'
import app from './app'
import { env } from './config/env'
import { startMqttClient } from './services/mqttClient'
import { setupWebSocketServer } from './services/websocketServer'

const server = http.createServer(app)

const ws = setupWebSocketServer(server)

server.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${env.port}`)
})

startMqttClient({
  onMessage: (message) => {
    ws.broadcastEvent('mqtt:update', message)
  },
})
