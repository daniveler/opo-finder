import express from 'express'
import cors from 'cors'
import bopsRouter from './controllers/bopsRouter.js'
import boeRouter from './controllers/boeRouter.js'

const app = express()

app.use(cors())

app.use('/api/bops', bopsRouter)
app.use('/api/boe', boeRouter)

export default app