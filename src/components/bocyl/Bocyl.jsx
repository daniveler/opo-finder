import { useEffect, useState } from "react"
import useStore from "../../useStore"
import Results from "./Results"
import { format } from "date-fns/format"
import bocylService from "../../services/bocyl"

const Bocyl = () => {
  const [bocyl, setBocyl] = useState(null)

  const { date } = useStore(state => ({
    date: state.date,
  }))

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
      <h1>No hay datos de este día</h1>
    )
}

export default Bocyl