import { format } from "date-fns"

const getBocylUrl = (date) => {
    const parsedDate = new Date(date)
    if (parsedDate.getDay() === 0 || parsedDate.getDay() === 6) {
        return null
    }

    const formattedDate = format(date, 'dd/MM/yyyy')

    const url = `https://bocyl.jcyl.es/boletin.do?fechaBoletin=${formattedDate}`

    return url
}

export default getBocylUrl