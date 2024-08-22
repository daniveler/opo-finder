import { format } from "date-fns"
import useStore from "../../useStore"
import { Link, Navigate, NavLink, useLocation } from "react-router-dom"
import Tab from "./Tab"

const Header = () => {
  const { date, setDate } = useStore(state => ({
    date: state.date,
    setDate: state.setDate
  }))

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const actualDate = format(new Date(), 'yyyy-MM-dd')

  const location = useLocation()

  return (
    <div className="flex flex-col mt-8 md:mt-16 mb-4 md:mb-8">
      <div className="flex flex-row items-center justify-center">
        <h1 className='text-4xl font-medium md:text-6xl text-center text-pink-500'>
          Opo Finder
        </h1>
      </div>

      <header className="flex flex-row justify-center items-center ">
        <nav className="flex flex-row justify-center items-stretch mt-4 md:mt-8 w-[350px] sm:w-[600px] md:w-[750px] text-xl font-poppins font-medium text-gray-600">
          <Tab route='/boe'>BOE</Tab>
          <Tab route='/bocyl'>BOCyL</Tab>
          <Tab route='/bops'>BOP ZAMORA</Tab>
        </nav>
      </header>

      {location.pathname !== '/bops' && (
        <form className="flex flex-col justify-center items-center mt-8">
          <label className="mb-2 text-lg" htmlFor="dateInput">Selecciona una fecha:</label>

          <div className="">
            <input className="text-lg p-1" id="dateInput" type="date" max={actualDate} value={date} onChange={handleDateChange}></input>
          </div>
        </form>
      )}
    </div>
  )
}

export default Header