import axios from 'axios'

const baseUrl = 'https://analisis.datosabiertos.jcyl.es/api/explore/v2.1/catalog/datasets/bocyl/records'

const getBocylFromDate = async(date) => {
  const request = await axios.get(`${baseUrl}?refine=fecha_publicacion:"${date}"&refine=apartado:"B.2. OPOSICIONES Y CONCURSOS"`)
  return request.data
}

export default { getBocylFromDate }