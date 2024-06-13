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
    <>
      <h1 className='text-5xl text-pink-500'>
        Opo Finder
      </h1>

      <form className="mt-8" onSubmit={handleSearchButton}>
        <label htmlFor="dateInput">Selecciona una fecha:</label>
        {/* <DatePicker max={actualDate} value={date} onChange={handleDateChange}/>  */}

        <input id="dateInput" type="date" max={actualDate} value={date} onChange={handleDateChange}></input>
        <div>
          <button type="submit">Buscar</button>
        </div>
      </form>

      <div className="mb-12">
        {sections.length > 0 && sections.map((section, index) => 
          <Section key={index} section={section} /> 
        )}
      </div>
      

    </>
  )
}

export default App
