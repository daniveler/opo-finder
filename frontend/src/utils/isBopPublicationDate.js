import { parse } from "date-fns"

// Checks if the date passed is a BOP publication date
// Publication dates: monday, wednesday and friday
const isBopPublicationDate = (date) => {
  const formattedDate = parse(date, 'yyyy-MM-dd', new Date())

  return formattedDate.getDay() === 1 || formattedDate.getDay() === 3 || formattedDate.getDay() === 5
}

export default isBopPublicationDate