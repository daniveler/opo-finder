import { format } from 'date-fns'
import { xml2js } from "xml-js"
import boeService from '../services/boe'

// Gets the desired sections of the BOE
// Now only personal section is returned
const getBoeSections = async(date) => {
  const parsedDate = new Date(date)
  if(parsedDate.getDay() === 0) {
    return []
  }

  const boeParsedDate = format(date, 'yyyyMMdd')

  const boeXml = await boeService.getBoeFromId(`BOE-S-${boeParsedDate}`)

  const boeJson = xml2js(boeXml, { compact: true, spaces: 2 })

  const personalSection = boeJson.sumario.diario.seccion.filter(s => s._attributes.num === '2B')

  return personalSection
}

export default getBoeSections