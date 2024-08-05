import { format, parseISO } from "date-fns"
import { es } from 'date-fns/locale'

const formatBopDate = (date) => {
  const isoDate = parseISO(date)

  const formattedDate = format(isoDate, 
  "EEEE, dd 'de' MMMM 'de' yyyy", { locale: es })

  return formattedDate
}

export default formatBopDate