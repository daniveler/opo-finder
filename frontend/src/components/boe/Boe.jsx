import React, { useEffect, useState } from 'react'
import useStore from '../../useStore.js'
import LoadingSpinner from '../common/LoadingSpinner.jsx'
import boeService from '../../services/boe.js'
import Results from './Results.jsx'

const Boe = () => {
  const [boe, setBoe] = useState(null)
  const [section, setSection] = useState('2B')
  const [loading, setLoading] = useState(true)

  const { date } = useStore(state => ({
    date: state.date,
  }))

  const initializeDate = useStore((state) => state.initializeDate)

  useEffect(() => {
    initializeDate()
  }, [initializeDate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await boeService.getBoeFromDate(date, section)
        setLoading(false)
        setBoe(response)
      }
      catch(e) {
        setLoading(false)
        setBoe(null)
      }
      
    }

    setLoading(true)
    fetchData()
  }, [date])

  if (loading) {
    return <LoadingSpinner /> 
  }

  return (
    boe
      ? (
        <div className="flex flex-col">
          <h1 className="flex text-5xl justify-center my-4">
            BOE
          </h1>

          <Results boe={boe}/>
        </div>
      )
      : <h1 className="text-xl mb-4">No hay datos disponibles sobre este día</h1>
  )
}

export default Boe