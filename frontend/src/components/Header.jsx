import { format } from "date-fns"
import useStore from "../useStore"
import { Link, Navigate } from "react-router-dom"
import AppIcon from '../../public/opofinder-icon.jpg'

const Header = () => {
  const { date, setDate } = useStore(state => ({
    date: state.date,
    setDate: state.setDate
  }))

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const actualDate = format(new Date(), 'yyyy-MM-dd')

  return (
    <div className="flex flex-col mt-16 mb-16">
      <div className="flex flex-row items-center justify-center">
        {/* <img className="size-36 left-0" src={AppIcon} alt='Logo'/> */}
        <h1 className='text-6xl text-center text-pink-500'>
          Opo Finder
        </h1>
      </div>


      <header className="flex flex-row justify-center items-center ">
        <nav className="flex flex-row justify-center items-center mt-8 w-[300px] sm:w-[600px] md:w-[750px] text-xl font-poppins font-medium text-pink-500 bg-pink-200">
          <Link to='/boe' className="w-1/3 py-6 hover:bg-pink-100 text-center">BOE</Link>
          <Link to='/bocyl' className="w-1/3 py-6 hover:bg-pink-100 text-center">BOCyL</Link>
          <Link to='/bops' className="w-1/3 py-6 hover:bg-pink-100 text-center">BOPs</Link>
        </nav>
      </header>

      <form className="flex flex-col justify-center items-center mt-8">
        <label className="mb-4" htmlFor="dateInput">Selecciona una fecha:</label>
        {/* <DatePicker max={actualDate} value={date} onChange={handleDateChange}/>  */}

        <div className="">
          <input id="dateInput" type="date" max={actualDate} value={date} onChange={handleDateChange}></input>
        </div>
      </form>
    </div>
  )
}

export default Header