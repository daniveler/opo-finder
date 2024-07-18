import express from 'express'
import axios from 'axios'
import { load } from 'cheerio'
import { parse } from 'date-fns'

const bocylRouter = express.Router()

bocylRouter.get('/', async (req, res) => {
  if (!req.query.date) {
    return res.status(400).json({ error: 'Required query param date is missing' })
  }

  const formattedDate = parse(req.query.date, 'dd/MM/yyyy', new Date())

  if (formattedDate.getDay() === 0 || formattedDate.getDate() === 6 || formattedDate.getDate() > new Date().getDate()) {
    return res.status(404).json({ error: 'There are no data available for that day' })
  }

  const url = `https://bocyl.jcyl.es/boletin.do?fechaBoletin=${req.query.date}`

  let response

  try {
    response = await axios.get(url)
  }
  catch (e) {
    if (e.response) {
      return res.status(e.response.status).json({ error: e.message })
    }
    else if (e.request) {
      return res.status(500).json({ error: e.request })
    }
    else {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  const $ = load(response.data)

  const results = []

  $('h4.encabezado4, h4.encabezado4_sinlinea').each((index, element) => {
    const section = $(element).text().trim()

    const departments = []

    let nextElem = $(element).next()

    while (nextElem.length && !nextElem.is('h4.encabezado4, h4.encabezado4_sinlinea, h3.encabezado3_conlinea')) {
      if (nextElem.is('h5.encabezado6')) {
        const department = nextElem.text().trim()

        const titles = []

        nextElem = nextElem.next()

        while (nextElem.length && !nextElem.is('h5.encabezado6, h4.encabezado4, h4.encabezado4_sinlinea, h3.encabezado3_conlinea')) {
          if (nextElem.is('p')) {
            const title = nextElem.text().trim()

            const links = []

            nextElem.next('ul').find('li a').each((i, e) => {
              let link = $(e).attr('href')

              if (link.startsWith('html')) {
                const baseUrl = 'https://bocyl.jcyl.es/'
                link = baseUrl.concat(link)
              }

              links.push(link)
            })

            titles.push({ text: title, links })
          }
          nextElem = nextElem.next()
        }

        departments.push({ name: department, titles })
      }
      else {
        nextElem = nextElem.next()
      }
    }

    results.push({ section, departments })
  })

  const filteredResults = req.query.section
    ? results.filter(r => r.section === req.query.section)
    : results

  return res.status(200).json(filteredResults)
})

export default bocylRouter