import { parse, format } from 'date-fns'

const dateParser = (inputDate) => {
  return format(inputDate, 'yyyyMMdd')
}

export default dateParser