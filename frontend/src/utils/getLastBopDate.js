import { parse, subDays } from "date-fns"

const getLastBopDate = (date) => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date())

  const publicationDates = [1, 3, 5]

  let prevDate = subDays(parsedDate, 1)
  
  while(!publicationDates.includes(prevDate.getDay())) {
    prevDate = subDays(prevDate, 1)
  }

  return prevDate
}

export default getLastBopDate