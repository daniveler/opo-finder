import React, { useEffect, useState } from 'react'
import useStore from '../../useStore.js'
import LoadingSpinner from '../common/LoadingSpinner.jsx'
import boeService from '../../services/boe.js'
import Results from './Results.jsx'
import { isSameDay, parseISO } from 'date-fns'

const Boe = () => {
  const [boe, setBoe] = useState(null)
  const [section, setSection] = useState('2B')
  const [loading, setLoading] = useState(true)

  const { date, initializeDate, boeArray, addBoeArray } = useStore(state => ({
    date: state.date,
    initializeDate: state.initializeDate,
    boeArray: state.boeArray,
    addBoeArray: state.addBoeArray,
  }))

  useEffect(() => {
    initializeDate()
  }, [initializeDate])

  useEffect(() => {
    const fetchData = async () => {

      const foundBoe = await boeArray.find(boe => isSameDay(parseISO(boe.date), date))

      // If the boe is not in data storage, we call the API
      if (!foundBoe) {
        try {
          const response = await boeService.getBoeFromDate(date, section)

          setLoading(false)
          setBoe(response)

          addBoeArray({
            date,
            result: response
          })
        }
        catch (e) {
          setLoading(false)
          setBoe(null)
          addBoeArray({
            date,
            result: null
          })
        }
      }
      // If the boe is in data storage, we do not call the API
      else {
        setLoading(false)
        setBoe(foundBoe.result)
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

          <Results boe={boe} />
        </div>
      )
      : <h1 className="text-xl mb-4">No hay datos disponibles sobre este día</h1>
  )
}

export default Boe