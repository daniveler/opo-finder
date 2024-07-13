import app from './app.mjs'
import http from 'http'

const PORT = process.env.port || 3001

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`API running on port: ${PORT}`)
})