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

  const { date, bopArray, addBopArray } = useStore(state => ({
    date: state.date,
    bopArray: state.bopArray,
    addBopArray: state.addBopArray,
  }))

  useEffect(() => {
    const fetchData = async () => {
      const foundBop = await bopArray.find(bop => {
        console.log(parseISO(normalizeZamoraBopDate(bop.date)))
        console.log(parseISO(date))

        return isSameDay(parseISO(normalizeZamoraBopDate(bop.date)), parseISO(date))
      }
      )

      // If there is no BOPs saved in local storage, we call the API
      if (!bopArray.length) {
        const response = await bopsService.getZamoraBop()

        setLoading(false)
        setZamoraBop(response)

        addBopArray(response)
      }
      else {
        if (isBopPublicationDate(date)) {
          // If it is publication date and we do not have today's BOP saved in local storage, we call the API
          if (!foundBop) {
            const response = await bopsService.getZamoraBop()

            setLoading(false)
            setZamoraBop(response)

            const lastBopDate = getLastBopDate(date)

            const lastBop = bopArray.find(bop => isSameDay(parseISO(normalizeZamoraBopDate(bop.date)), parseISO(lastBopDate)))

            // If we do not found the last BOP, we save it
            if (!lastBop) {
              addBopArray(response)
            }
          }
          // If we have today's BOP saved, we show it
          else {
            setLoading(false)
            setZamoraBop(foundBop)
          }
        }
        // If it is not publication date, we search for the last BOP
        else {
          const lastBopDate = getLastBopDate(date)

          const lastBop = bopArray.find(bop => isSameDay(parseISO(normalizeZamoraBopDate(bop.date)), parseISO(lastBopDate)))

          // If we do not found the last BOP, we call the API
          if (!lastBop) {
            const response = await bopsService.getZamoraBop()

            setLoading(false)
            setZamoraBop(response)
            addBopArray(response)
          }
          // If we find it, we show it
          else {
            setLoading(false)
            setZamoraBop(lastBop)
          }
        }
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    zamoraBop
      ? <ZamoraBop bop={zamoraBop} />
      : <div>
        <h1 className="text-xl mb-4">No hay datos disponibles sobre este día</h1 >
        <a target="_blank" className="text-blue-950 underline" href={bopUrl}>Haz click aquí para acceder a la página oficial</a>
      </div >
  )
}

export default Bops