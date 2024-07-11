import { useEffect, useState } from "react"
import bopsService from '../../services/bops'
import ZamoraBop from "./ZamoraBop"

const Bops = () => {
  const bopUrl = 'https://www.diputaciondezamora.es/opencms/servicios/BOP/bop'

  const [zamoraBop, setZamoraBop] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const response = await bopsService.getZamoraBop()
      setZamoraBop(response)
    }

    fetchData()
  }, [])

  return (
    zamoraBop
      ? <ZamoraBop bop={zamoraBop}/>
      : <div>
          <h1 className="text-xl mb-4">No hay datos disponibles sobre este día</h1 >
          <a target="_blank" className="text-blue-950 underline" href={bopUrl}>Haz click aquí para acceder a la página oficial</a>
      </div >



  )
}

export default Bops