// import { chromium } from "playwright"
import axios from "axios"
import { load } from "cheerio"

const Bops = () => {
  const url = 'https://www.diputaciondezamora.es/opencms/servicios/BOP/bop/index.html'

  const getH1 = async() => {
    const response = await axios.get(url, {
      : 'document'
    })
    const $ = load(response.data)
  
    const h1 = $("h1").text()

    return h1
  }

  const h1 = getH1()

  console.log(h1)
  

  return (
    <div>
      <p>Boletín</p>
    {/* <h1>{h1}</h1> */}
    </div>
    
  )

} 

export default Bops