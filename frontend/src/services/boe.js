import axios from 'axios'
import { format } from 'date-fns'
const baseUrl = 'https://boe.es/diario_boe/xml.php'

const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/boe`

const getBoeFromId = async(id) => {
  const request = await axios.get(`${baseUrl}?id=${id}`)
  return request.data
}

const getBoeFromDate = async(date, section) => {
  const formattedDate = format(date, 'yyyyMMdd')
  const request = await axios.get(apiBaseUrl, {
    params: {
      date: formattedDate,
      section
    }
  })
  return request.data
}

export default { getBoeFromId, getBoeFromDate }
