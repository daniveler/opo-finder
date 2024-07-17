import express from 'express'
import puppeteer from 'puppeteer'

const bopsRouter = express.Router()

bopsRouter.get('/zamora', async (request, response) => {
  const url = 'https://www.diputaciondezamora.es/opencms/servicios/BOP/bop'

  const puppeteerConfig = { 
    headless: true
  } 

  if(process.env.NODE_ENV === 'production') {
    puppeteerConfig = {
      headless: true,
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"
      ],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    }
  }

  const browser = await puppeteer.launch(puppeteerConfig)

  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2' })

  const firstBop = await page.evaluate(() => {
    const url = document.querySelector('.list-entry .heading a')
    const date = document.querySelector('.list-entry .teaser-date').textContent.trim()
    
    return  {
      url: url ? url.href : null,
      date
    }
  })

  if(firstBop) {
    await page.goto(firstBop.url, { waitUntil: 'networkidle2' })

    const bopEntry = await page.evaluate(() => {
      const anuncios = []

      document.querySelectorAll('#anuncio').forEach(element => {
        const subHeader = element.querySelector('.sub-header')?.textContent.trim()
        const organismo = element.querySelector('li span')?.textContent.trim()
        const text = element.querySelector('.text')?.textContent.trim()
        const pdfLink = element.querySelector('.link a')?.href

        anuncios.push({
          subHeader,
          organismo,
          text,
          pdfLink
        })
      })

      return anuncios
    })

    await page.close()
    await browser.close()
    
    response.status(200).json({ date: firstBop.date, content: bopEntry })
  }
  else {
    await page.close()
    await browser.close()

    response.status(404).json({ error: 'No data found' })
  }
})

export default bopsRouter

