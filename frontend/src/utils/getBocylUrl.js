import { format } from "date-fns"

const getBocylUrl = (date) => {
    const formattedDate = format(date, 'dd/MM/yyyy')

    const url = `https://bocyl.jcyl.es/boletin.do?fechaBoletin=${formattedDate}`

    return url
}

export default getBocylUrl