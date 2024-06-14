import { format } from "date-fns"
import useStore from "../useStore"

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
    <div className="flex flex-col mt-16 mb-4">
      <h1 className='text-6xl text-center text-pink-500'>
        Opo Finder
      </h1>

      <header>
        <nav className="mt-8 font-medium text-pink-500 bg-pink-200">
          <div className="flex flex-row w-[800px] justify-center items-center">
            <a className="w-1/3 py-6 hover:bg-pink-100 text-center" href="/boe">BOE</a>
            <a className="w-1/3 py-6 hover:bg-pink-100 text-center" href="/bocyl">BOCyL</a>
            <a className="w-1/3 py-6 hover:bg-pink-100 text-center" href="/bops">BOPs</a>
          </div>
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