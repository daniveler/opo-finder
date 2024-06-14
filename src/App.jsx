import { useEffect, useState } from "react"
import boeService from './services/boe'
import bocylService from './services/bocyl'
import { xml2js } from "xml-js"
import dateParser from "./utils/dateParser"
import Section from "./components/Section"
import { format } from "date-fns"
import DatePicker from "./components/DatePicker"
import Bocyl from "./components/bocyl/Bocyl"

function App() {
  let actualDate = format(new Date(), 'yyyy-MM-dd')

  const [date, setDate] = useState(actualDate)
  const [boeParsedDate, setBoeParsedDate] = useState(null)
  const [bocylParsedDate, setBocylParsedDate] = useState(null)
  const [boe, setBoe] = useState(null)
  const [bocyl, setBocyl] = useState(null)
  const [sections, setSections] = useState([])

  const handleDateChange = (e) => {
    setDate(e.target.value)
    setBoeParsedDate(dateParser(e.target.value))
    setBocylParsedDate(format(e.target.value, 'yyyy/MM/dd'))
  }

  const handleSearchButton = async (e) => {
    e.preventDefault()

    if (!date) {
      alert('Por favor, introduzca una fecha')
    }
    else {
      const boeXml = await boeService.getBoeFromId(`BOE-S-${boeParsedDate}`)

      const boeJson = xml2js(boeXml, { compact: true, spaces: 2 })

      setBoe(boeJson)

      const personalSection = boeJson.sumario.diario.seccion.find(s => s._attributes.num === '2B')

      setSections([personalSection])

      const bocylJson = await bocylService.getBocylFromDate(bocylParsedDate)
      setBocyl(bocylJson)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mx-4">
      <div className="flex flex-col mt-16 mb-16">
        <h1 className='text-6xl text-pink-500'>
          Opo Finder
        </h1>

        <form className="mt-8" onSubmit={handleSearchButton}>
          <label htmlFor="dateInput">Selecciona una fecha:</label>
          {/* <DatePicker max={actualDate} value={date} onChange={handleDateChange}/>  */}

          <div className="flex flex-row">
            <input id="dateInput" type="date" max={actualDate} value={date} onChange={handleDateChange}></input>
            <button
              className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 ml-16"
              type="submit">
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* BOCYL */}
      <div className="flex flex-col mb-12 min-w-[400px] max-w-[800px]">
        { bocyl && bocyl.total_count > 0 && (
          <div>
            <div>
              <h1 className="flex text-5xl justify-center my-4">
                BOCYL
              </h1>
            </div>
            <div>
              <Bocyl bocyl={bocyl} />
            </div>
          </div>
        )}

        {/* BOE */}
        <div className="flex flex-col mb-12 min-w-[400px] max-w-[800px]">
          <div>
            <h1 className="flex text-5xl justify-center my-4">
              BOE
            </h1>
          </div>
          <div>
            {sections.length > 0 && sections.map((section, index) =>
              <Section key={index} section={section} />
            )}
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default App
