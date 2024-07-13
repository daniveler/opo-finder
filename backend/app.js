import express from 'express'
import cors from 'cors'
import bopsRouter from './controllers/bopsRouter.js'

const app = express()

app.use(cors())

app.use('/api/bops', bopsRouter)

export default app