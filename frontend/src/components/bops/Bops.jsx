import { useEffect, useState } from "react"
import bopsService from '../../services/bops'
import ZamoraBop from "./ZamoraBop"
import LoadingSpinner from "../common/LoadingSpinner"
import useStore from "../../useStore"
import normalizeZamoraBopDate from "../../utils/normalizeZamoraBopDate"
import { isSameDay, parse, parseISO } from "date-fns"
import isBopPublicationDate from "../../utils/isBopPublicationDate"
import getLastBopDate from "../../utils/getLastBopDate"

const Bops = () => {
  const bopUrl = 'https://www.diputaciondezamora.es/opencms/servicios/BOP/bop'

  const [zamoraBop, setZamoraBop] = useState()
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)

  const { date, bopArray, addBopArray } = useStore(state => ({
    date: state.date,
    bopArray: state.bopArray,
    addBopArray: state.addBopArray,
  }))

  const handleIncreaseIndex = () => {
    setIndex(index + 1)
  }

  const handleDecreaseIndex = () => {
    setIndex(index - 1)
  }

  useEffect(() => {
    const fetchData = async () => {
      let response
      try {
        response = await bopsService.getZamoraBop()
        setLoading(false)
        setZamoraBop(response.results)
      }
      catch (e) {
        setLoading(false)

        if (e.response) {
          res.status(e.response.status).json({ error: e.message })
        }
        else if (e.request) {
          res.status(500).json({ error: e.request })
        }
        else {
          res.status(500).json({ error: 'Internal Server Error' })
        }

        setLoading(false)
        return
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    zamoraBop
      ? (
        <div>
          <div className="flex flex-row w-full mb-8">
            {index < zamoraBop.length - 1 
              ?
                <div className="flex w-1/2 justify-start text-lg md:text-2xl">
                  <button className="flex items-center text-indigo-500" onClick={handleIncreaseIndex}>
                    <span className="icon-[teenyicons--left-solid] size-4 md:size-6 mr-3"></span>
                    <span>Ir al anterior</span>
                  </button>
                </div>
              :
                <div className="flex w-1/2 justify-start text-lg md:text-2xl"></div>
            }

            {index > 0 && 
              <div className="flex w-1/2 justify-end text-lg md:text-2xl">
                <button className="flex items-center text-indigo-500" onClick={handleDecreaseIndex}>
                  <span>Ir al siguiente</span>
                  <span className="icon-[teenyicons--right-solid] size-4 md:size-6 ml-3"></span>
                </button>
              </div>
            }
          </div>
          <ZamoraBop bop={zamoraBop.at(index)} />
        </div>
      )
      : <div>
        <h1 className="text-xl mb-4">No hay datos disponibles</h1 >
        <a target="_blank" className="text-blue-950 underline" href={bopUrl}>Haz click aquí para acceder a la página oficial</a>
      </div >
  )
}

export default Bops