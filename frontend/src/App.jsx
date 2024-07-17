import Bocyl from "./components/bocyl/Bocyl.jsx"
import Bops from "./components/bops/Bops.jsx"
import Boe from "./components/boe/Boe.jsx"
import { Navigate, Route, Routes } from "react-router-dom"
import useStore from './useStore.js'
import Header from "./components/header/Header.jsx"
import { act, useEffect } from "react"

function App() {
  const { localDataExpirationDate, setLocalDataExpirationDate, resetLocalData } = useStore(state => ({
    localDataExpirationDate: state.localDataExpirationDate,
    setLocalDataExpirationDate: state.setLocalDataExpirationDate,

    resetLocalData: state.resetLocalData
  }))

  useEffect(() => {
    const actualDate = new Date()
    // Expiration time: 30 days after the actual date
    const expirationTime = actualDate.getTime() + 30 * 24 * 60 * 30 * 1000

    if(!localDataExpirationDate) {
      setLocalDataExpirationDate(expirationTime)
    }
    else {
      if(actualDate.getTime() > localDataExpirationDate) {
        resetLocalData()
        setLocalDataExpirationDate(expirationTime) 
      }
    }
  }, [])

  return (
    <div className="flex flex-col justify-center items-center mx-4 font-normal font-poppins">
      <Header /> 
      
      <div className="flex flex-col mb-12 max-w-[800px]">
        <Routes>
          <Route path="/" element={ <Navigate replace to="/boe" /> } />
          <Route path="/boe" element={ <Boe /> } />
          <Route path="/bocyl" element={ <Bocyl /> } />
          <Route path="/bops" element={ <Bops /> } />
        </Routes>
      </div>
    </div>
  )
}

export default App
