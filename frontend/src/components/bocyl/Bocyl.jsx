import { useEffect, useState } from "react"
import useStore from "../../useStore"
import Results from "./Results"
import { format } from "date-fns/format"
import bocylService from "../../services/bocyl"
import getBocylUrl from "../../utils/getBocylUrl"

const Bocyl = () => {
  const [bocyl, setBocyl] = useState(null)

  const { date } = useStore(state => ({
    date: state.date,
  }))

  const bocylUrl = getBocylUrl(date)

  useEffect(() => {
    const fetchData = async() => {
      const bocylParsedDate = format(date, 'yyyy/MM/dd')

      const bocylJson = await bocylService.getBocylFromDate(bocylParsedDate)

      setBocyl(bocylJson)
    }

    fetchData()
  }, [date])

  return bocyl && bocyl.total_count > 0 
    ? (
      <div>
        <h1 className="flex text-5xl justify-center my-4">
          BOCYL
        </h1>
        <Results bocyl={bocyl} />
      </div>
    ) 
    : (
      <div>
        <h1 className="text-xl mb-4">No hay datos disponibles sobre este día</h1>
        { bocylUrl && 
          <a target="_blank" className="text-blue-950 underline" href={bocylUrl}>Haz click aquí para acceder a la página oficial</a>
        }
        <div>

        </div>
      </div>
      
    )
}

export default Bocyl