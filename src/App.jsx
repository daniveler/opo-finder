import { useEffect, useState } from "react"
import boeService from './services/diarioBoe'
import { xml2js } from "xml-js"
import dateParser from "./utils/dateParser"
import Section from "./components/Section"
import { format } from "date-fns"
import DatePicker from "./components/DatePicker"

function App() {
  const [date, setDate] = useState('')
  const [parsedDate, setParsedDate] = useState()
  const [boe, setBoe] = useState(null)
  const [sections, setSections] = useState([])

  let actualDate = format(new Date(), 'yyyy-MM-dd')

  const handleDateChange = (e) => {
    setDate(e.target.value)
    setParsedDate(dateParser(e.target.value))
  }

  const handleSearchButton = async (e) => {
    e.preventDefault()

    if(!parsedDate) {
      alert('Por favor, introduzca una fecha')
    }
    else {
      const boeXml = await boeService.getBoeFromId(`BOE-S-${parsedDate}`)

      const boeJson = xml2js(boeXml, { compact: true, spaces: 2 })

      setBoe(boeJson)

      setSections([boeJson.sumario.diario.seccion[2]])
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
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


      <div className="flex mb-12 min-w-[400px] max-w-[800px]">
        {sections.length > 0 && sections.map((section, index) => 
          <Section key={index} section={section} /> 
        )}
      </div>
    </div>
  )
}

export default App
