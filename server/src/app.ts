import cors from 'cors'
import express from 'express'
import routes from './routes'
import { errorHandler } from './middlewares/errorHandler'
import { env } from './config/env'

const app = express()

app.use(cors({ origin: env.corsOrigin }))
app.use(express.json())

app.use(routes)

app.use(errorHandler)

export default app
