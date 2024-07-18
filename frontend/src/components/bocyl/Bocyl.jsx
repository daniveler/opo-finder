import { useEffect, useState } from "react"
import useStore from "../../useStore"
import Results from "./Results"
import { format, parse } from "date-fns"
import bocylService from "../../services/bocyl"
import getBocylUrl from "../../utils/getBocylUrl"
import LoadingSpinner from "../common/LoadingSpinner"
import ResultsFromScrape from "./ResultsFromScrape"

const Bocyl = () => {
  const [bocyl, setBocyl] = useState(null)
  const [loading, setLoading] = useState(true)

  const { date } = useStore(state => ({
    date: state.date,
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

      let bocylJson
      
      try {
        bocylJson = await bocylService.getBocylFromDate(bocylParsedDate)
      }
      catch(e) {
        bocylJson = { total_count: -1 }
      }

      if (bocylJson.total_count > 0) {
        setLoading(false)
        setBocyl({ isFromScrape: false, result: bocylJson })
      }
      else {
        let bocylApiResponse 
        try {
          bocylApiResponse = await bocylService.getBocylFromDateFromWeb(date, 'B. AUTORIDADES Y PERSONAL: B.2. OPOSICIONES Y CONCURSOS')

          setLoading(false)
          setBocyl({ isFromScrape: true, result: bocylApiResponse })
        }
        catch(e) {
          setLoading(false)
          setBocyl(null)
        }
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