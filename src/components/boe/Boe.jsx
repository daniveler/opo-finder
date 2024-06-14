import React, { useEffect, useState } from 'react'
import Section from './Section'
import getBoeSections from '../../utils/getBoeSections'
import useStore from '../../useStore'

function Boe() {
  const [sections, setSections] = useState([])

  const { date } = useStore(state => ({
    date: state.date,
  }))

  useEffect(() => {
    const fetchData = async() => {
      setSections(await getBoeSections(date))
    }

    fetchData()
  }, [date])

  return (
    sections.length > 0 && (
      <div className="flex flex-col mb-12 min-w-[400px] max-w-[800px]">
        <div>
          <h1 className="flex text-5xl justify-center my-4">
            BOE
          </h1>
          </div>
          <div>
            {sections.map((section, index) =>
              <Section key={index} section={section} />
            )}
        </div>
      </div>
    )
  )
}

export default Boe