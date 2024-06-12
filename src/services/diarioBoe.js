import axios from 'axios'
const baseUrl = 'https://boe.es/diario_boe/xml.php'

const getBoeFromId = async(id) => {
  const request = await axios.get(`${baseUrl}?id=${id}`)
  return request.data
}

export default { getBoeFromId }