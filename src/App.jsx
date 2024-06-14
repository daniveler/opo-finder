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
  }, [date])

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  return (
    <div className="flex flex-col justify-center items-center mx-4 w-[800]">
      <div className="flex flex-col mt-16 mb-4">
        <h1 className='text-6xl text-center text-pink-500'>
          Opo Finder
        </h1>

        <Header /> 

        <form className="flex flex-col justify-center items-center mt-8">
          <label className="mb-4" htmlFor="dateInput">Selecciona una fecha:</label>
          {/* <DatePicker max={actualDate} value={date} onChange={handleDateChange}/>  */}

          <div className="">
            <input id="dateInput" type="date" max={actualDate} value={date} onChange={handleDateChange}></input>
          </div>
        </form>
      </div>

      <div className="flex flex-col mb-12 min-w-[400px] max-w-[800px]">
        <Routes>
          <Route path="/" element={ <Navigate replace to="/boe" /> } />
          <Route path="/boe" element={ <Boe sections={sections} /> } />
          <Route path="/bocyl" element={ <Bocyl bocyl={bocyl} /> } />
        </Routes>
      </div>
    </div>
  )
}

export default App
