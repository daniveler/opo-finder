import axios from 'axios'
import { format } from 'date-fns'

const officialBaseUrl = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/bocyl/records'
const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/bocyl`

const getBocylFromDate = async(date) => {
  const request = await axios.get(`${officialBaseUrl}?refine=fecha_publicacion:"${date}"&refine=apartado:"B.2. OPOSICIONES Y CONCURSOS"`)
  return request.data
}

const getBocylFromDateFromWeb = async(date, section) => {
  const formattedDate = format(date, 'dd/MM/yyyy')

  const request = await axios.get(apiBaseUrl, {
    params: {
      date: formattedDate,
      section
    }
  })

  return request.data
}

export default { getBocylFromDate, getBocylFromDateFromWeb }