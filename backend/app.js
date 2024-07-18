import express from 'express'
import cors from 'cors'
import boeRouter from './controllers/boeRouter.js'
import bocylRouter from './controllers/bocylRouter.js'
import bopsRouter from './controllers/bopsRouter.js'

const app = express()

app.use(cors())

app.use('/api/boe', boeRouter)
app.use('/api/bocyl', bocylRouter)
app.use('/api/bops', bopsRouter)

export default app