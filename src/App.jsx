import { useEffect, useState } from "react"
import bocylService from './services/bocyl'
import Section from "./components/boe/Section"
import { format } from "date-fns"
import DatePicker from "./components/boe/DatePicker"
import Bocyl from "./components/bocyl/Bocyl.jsx"
import getBoeSections from "./utils/getBoeSections"
import Header from "./components/Header"
import Boe from "./components/boe/Boe.jsx"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {
  let actualDate = format(new Date(), 'yyyy-MM-dd')

  const [date, setDate] = useState(actualDate)
  const [bocyl, setBocyl] = useState(null)
  const [sections, setSections] = useState([])

  useEffect(() => {
    const fetchData = async() => {
      setSections(await getBoeSections(date))

      const bocylParsedDate = format(date, 'yyyy/MM/dd')

      const bocylJson = await bocylService.getBocylFromDate(bocylParsedDate)

      setBocyl(bocylJson)
    }

    fetchData()
  }, [])

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const handleSearchButton = async (e) => {
    e.preventDefault()

    if (!date) {
      alert('Por favor, introduzca una fecha')
    }
    else {
      setSections(await getBoeSections(date))

      const bocylParsedDate = format(date, 'yyyy/MM/dd')

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

        <Header /> 

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

      <div className="flex flex-col mb-12 min-w-[400px] max-w-[800px]">
      <Routes>
        <Route path="/" element={ <Navigate replace to="/boe" /> } />
        <Route path="/boe" element={ <Boe sections={sections} /> } />
        <Route path="/bocyl" element={ <Bocyl bocyl={bocyl} /> } />
      </Routes>
      


      {/* BOCYL */}
      {/* { bocyl && bocyl.total_count > 0 && <Bocyl bocyl={bocyl} /> } */}

      {/* BOE */}
      {/* { sections.length > 0 && <Boe sections={sections} /> } */}

      </div>
    </div>
  )
}

export default App
