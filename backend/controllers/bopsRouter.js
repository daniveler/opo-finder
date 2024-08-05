import express from 'express'
import { load } from 'cheerio'
import puppeteer from 'puppeteer'
import axios from 'axios'
import convertZamoraBopDate from '../utils/convertZamoraBopDate.js'

const bopsRouter = express.Router()

bopsRouter.get('/zamora', async (request, response) => {
  const baseUrl = 'https://www.diputaciondezamora.es'
  const url = baseUrl + '/opencms/system/modules/alkacon.mercury.template/elements/list-ajax.jsp?contentpath=/servicios/BOP/.content/list-m/list_00001.xml&__locale=es'

  let result 

  try {
    result = await axios.get(url)
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

  const $ = load(result.data)

  const results = []

  const promises = $('li.list-entry').map(async(index, element) => {
    const title = $(element).find('.heading').text().trim()
    const date = $(element).find('.teaser-date').text().trim()
    let link = $(element).find('.heading').find('a').attr('href')

    link = baseUrl + link

    let linkResponse 

    try {
      linkResponse = await axios.get(link)
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
    
    const $2 = load(linkResponse.data)

    $2('#anuncio').each((index, element) => {
      const subHeader = $2(element).find('.sub-header')
      const origin = subHeader.next()
      const organism = origin.next().find('li').first('span')
      const text = $(element).find('.text')
      const pdfLink = $(element).find('.link').find('a').attr('href')

      results.push({
        date: convertZamoraBopDate(date),
        subHeader: subHeader.text().trim(), 
        origin: origin.text().trim(), 
        organism: organism.text().trim(), 
        text: text.text().trim(), 
        pdfLink: baseUrl + pdfLink
      })
    })
  })

  await Promise.all(promises)

  // Sorts all results descendently by date
  const sortedResults = results.sort((a, b) => new Date(b.date) - new Date(a.date))

  // Groups the results by date
  const groupedResults = sortedResults.reduce((acc, result) => {
    if (!acc[result.date]) {
      acc[result.date] = []
    }
    acc[result.date].push(result)
    return acc
  }, {})

  const groupedArray = Object.keys(groupedResults).map(date => ({
    date,
    announcements: groupedResults[date]
  }))

  response.status(200).json({ results: groupedArray })
})

export default bopsRouter

