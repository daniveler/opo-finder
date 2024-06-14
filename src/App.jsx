import DatePicker from "./components/boe/DatePicker"
import Bocyl from "./components/bocyl/Bocyl.jsx"
import Header from "./components/Header"
import Boe from "./components/boe/Boe.jsx"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {
  return (
    <div className="flex flex-col justify-center items-center mx-4 w-[800]">
      <Header /> 
      
      <div className="flex flex-col mb-12 min-w-[400px] max-w-[800px]">
        <Routes>
          <Route path="/" element={ <Navigate replace to="/boe" /> } />
          <Route path="/boe" element={ <Boe /> } />
          <Route path="/bocyl" element={ <Bocyl /> } />
        </Routes>
      </div>
    </div>
  )
}

export default App
