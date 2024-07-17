import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_BASE_URL

const getZamoraBop = async() => {
  const request = await axios.get(`${baseUrl}/bops/zamora`)
  return request.data
}

export default { getZamoraBop }
