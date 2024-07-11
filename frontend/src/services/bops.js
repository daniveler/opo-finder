import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/bops'

const getZamoraBop = async() => {
  const request = await axios.get(`${baseUrl}/zamora`)
  return request.data
}

export default { getZamoraBop }
