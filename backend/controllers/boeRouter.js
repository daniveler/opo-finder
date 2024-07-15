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

  if(!req.query.section) {
    return res.status(200).json(boeData)
  }

  const section = boeData.sections.filter(s => s.code.toLowerCase() === req.query.section.toLowerCase())

  if(section.length > 0) {
    return res.status(200).json(section.at(0))
  }
  else {
    return res.status(404).json({ error: 'Section requested was not found'})
  }
})

export default boeRouter
