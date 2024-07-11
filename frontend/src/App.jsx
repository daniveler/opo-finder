import Bocyl from "./components/bocyl/Bocyl.jsx"
import Bops from "./components/bops/Bops.jsx"
import Boe from "./components/boe/Boe.jsx"
import { Navigate, Route, Routes } from "react-router-dom"
import { useStore } from "zustand"
import Header from "./components/header/Header.jsx"

function App() {
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
