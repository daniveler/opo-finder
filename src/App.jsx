import { useEffect, useState } from "react"
import boeService from './services/diarioBoe'
import { xml2js } from "xml-js"
import dateParser from "./utils/dateParser"

function App() {
  const [date, setDate] = useState('')
  const [parsedDate, setParsedDate] = useState('')
  const [boe, setBoe] = useState(null)

  const handleDateChange = (e) => {
    setDate(e.target.value)
    setParsedDate(dateParser(e.target.value))
  }

  const handleSearchButton = async(e) => {
    e.preventDefault()

    setBoe(await boeService.getBoeFromId(`BOE-S-${parsedDate}`))
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await boeService.getBoeFromId('BOE-S-20240612')
  //     console.log(xml2js(response, { compact: true, spaces: 2 }))
  //   }

  //   fetchData()
  // })

  return (
    <>
      <h1 className='text-5xl text-pink-500'>
        Opo Finder
      </h1>

      <form className="mt-8" onSubmit={handleSearchButton}>
        <label htmlFor="dateInput">Selecciona una fecha:</label>
        <input id="dateInput" type="date" value={date} onChange={handleDateChange}></input>
        <div>
          <button type="submit">Buscar</button>
        </div>
      </form>

      <p className="mt-8">Fecha seleccionada: {parsedDate}</p>

      { boe && <p>Boe: {boe}</p> }
      
    </>
  )
}

export default App
