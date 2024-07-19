import { useEffect, useState } from "react"
import useStore from "../../useStore"
import Results from "./Results"
import { format, isSameDay, parse, parseISO } from "date-fns"
import bocylService from "../../services/bocyl"
import getBocylUrl from "../../utils/getBocylUrl"
import LoadingSpinner from "../common/LoadingSpinner"
import ResultsFromScrape from "./ResultsFromScrape"

const Bocyl = () => {
  const [bocyl, setBocyl] = useState(null)
  const [loading, setLoading] = useState(true)

  const { date, bocylArray, addBocylArray } = useStore(state => ({
    date: state.date,
    bocylArray: state.bocylArray,
    addBocylArray: state.addBocylArray
  }))

  const initializeDate = useStore((state) => state.initializeDate)

  useEffect(() => {
    initializeDate()
  }, [initializeDate])

  const bocylUrl = getBocylUrl(date)

  useEffect(() => {
    const fetchData = async () => {
      const formattedDate = parse(date, 'yyyy-MM-dd', new Date())

      if (formattedDate.getDay() === 0 || formattedDate.getDay() === 6) {
        setLoading(false)
        setBocyl(null)
        return
      }

      const bocylParsedDate = format(date, 'yyyy/MM/dd')

      const foundBocyl = await bocylArray.find(bocyl => isSameDay(parseISO(bocyl.date), parseISO(date)))

      // If the bocyl is not in data storage, we call the APIs
      if (!foundBocyl) {
        let bocylJson

        try {
          bocylJson = await bocylService.getBocylFromDate(bocylParsedDate)
        }
        catch (e) {
          bocylJson = { total_count: -1 }
        }

        // If bocyl information of the date is in the API, we save it.
        if (bocylJson.total_count > 0) {
          setLoading(false)
          setBocyl({ isFromScrape: false, date: date, result: bocylJson })

          addBocylArray({
            date: date,
            isFromScrape: false,
            result: bocylJson
          })
        }
        // If bocyl information of the date is not in the API yet, 
        // we call our own API.
        else {
          let bocylApiResponse
          try {
            bocylApiResponse = await bocylService.getBocylFromDateFromWeb(date, 'B. AUTORIDADES Y PERSONAL: B.2. OPOSICIONES Y CONCURSOS')

            setLoading(false)
            setBocyl({ isFromScrape: true, date: date, result: bocylApiResponse })

            addBocylArray({
              date: date,
              isFromScrape: true,
              result: bocylApiResponse
            })
          }
          catch (e) {
            setLoading(false)
            setBocyl(null)
          }
        }
      }
      else {
        setLoading(false)
        setBocyl(foundBocyl)
      }
    }

    setLoading(true)
    fetchData()
  }, [date])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h1 className="flex text-5xl justify-center my-4">
        BOCYL
      </h1>

      {!bocyl
        ? (
          <div>
            <h1 className="text-xl mb-4">No hay datos disponibles sobre este día</h1>
            {bocylUrl &&
              <a target="_blank" className="text-blue-950 underline" href={bocylUrl}>Haz click aquí para acceder a la página oficial</a>
            }
            <div>

            </div>
          </div>
        )
        : bocyl.isFromScrape
          ? <ResultsFromScrape bocyl={bocyl.result} />
          : <Results bocyl={bocyl.result} />
      }
    </div>
  )
}

export default Bocyl