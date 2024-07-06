import axios from 'axios'
import express from 'express'
import cors from 'cors'
import { load } from 'cheerio'

const PORT = 3001

const app = express()

app.use(cors())

app.get('/api/bops', async (request, response) => {
  const url = 'https://www.diputaciondezamora.es/opencms/servicios/BOP/bop'

  const bop = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
    }
  })

  const $ = load(bop.data)
  //#li_0fd4d91b > ul > li:nth-child(1) > div > div > div.heading > a > h3 > span.headline
  const listEntries = $('.list-entries').children()
  let returnedData = []

  listEntries.each((index, element) => {
    returnedData.push(`List entry ${index}: ${$(element).html()}`)
  })

  response.status(200).json({ bop: returnedData })
})

app.listen(PORT, () => {
  console.log(`API running on port localhost:${PORT}/api`)
})