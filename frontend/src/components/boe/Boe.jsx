import React, { useEffect, useState } from 'react'
import Section from './Section'
import getBoeSections from '../../utils/getBoeSections'
import useStore from '../../useStore'
import LoadingSpinner from '../common/LoadingSpinner'

function Boe() {
  const [sections, setSections] = useState([])
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
      const response = await getBoeSections(date)
      setLoading(false)
      setSections(response)
    }

    setLoading(true)
    fetchData()
  }, [date])

  if (loading) {
    return <LoadingSpinner /> 
  }

  return (
    sections.length > 0
      ? (
        <div className="flex flex-col">
          <div>
            <h1 className="flex text-5xl justify-center my-4">
              BOE
            </h1>
          </div>
          <div>
            {
              sections.map((section, index) =>
                <Section key={index} section={section} />
              )
            }
          </div>
        </div>
      )
      : <p>No hay datos de este día</p>
  )
}

export default Boe