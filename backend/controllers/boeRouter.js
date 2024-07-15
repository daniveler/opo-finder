import express from 'express'
import axios from 'axios'
import processBoe from '../utils/processBoe.js'

const boeRouter = express.Router()

boeRouter.get('/', async(req, res) => {
  const url = `https://www.boe.es/datosabiertos/api/boe/sumario/${req.query.date}`

  let response 

  try {
    response = await axios.get(url, { headers: { Accept: 'application/json' }})
  }
  catch(e) {
    if(e.response) {
      res.status(e.response.status).json({ error: e.message })
    }
    else if(e.request) {
      res.status(500).json({ error: e.request})
    }
    else {
      res.status(500).json({ error: 'Internal Server Error'})
    }
    
    return 
  }

  const boeData = processBoe(response.data.data.sumario.diario)

  res.status(200).json(boeData)
})

export default boeRouter
