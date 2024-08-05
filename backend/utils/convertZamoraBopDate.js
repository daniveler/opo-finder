import { format } from 'date-fns'

const convertZamoraBopDate = (date) => {
  const monthNames = {
    "ene.": 1,
    "feb.": 2,
    "mar.": 3,
    "abr.": 4,
    "may.": 5,
    "jun.": 6,
    "jul.": 7,
    "ago.": 8,
    "sep.": 9,
    "oct.": 10,
    "nov.": 11,
    "dic.": 12
  }

  const [month, day, year] = date.split(' ')
  const newDate = new Date(`${monthNames[month]} ${day.slice(0, -1)}, ${year}`)

  return format(newDate, 'yyyy-MM-dd')
}

export default convertZamoraBopDate