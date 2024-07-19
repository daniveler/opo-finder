const normalizeZamoraBopDate = (date) => {
  const onlyDateStringES = date.split(', ')
  const arrayDateES = onlyDateStringES[1].split(' de ')

  if(arrayDateES[0].length < 2) {
    arrayDateES[0] = '0' + arrayDateES[0]
  }

  arrayDateES[1] = monthToNumber(arrayDateES[1])

  const normalizedDate = `${arrayDateES[2]}-${arrayDateES[1]}-${arrayDateES[0]}`

  return normalizedDate
}

const monthToNumber = (month) => {
  const monthsES =
  {
    "enero": "01",
    "febrero": "02",
    "marzo": "03",
    "abril": "04",
    "mayo": "05",
    "junio": "06",
    "julio": "07",
    "agosto": "08",
    "septiembre": "09",
    "octubre": "10",
    "noviembre": "11",
    "diciembre": "12"
  }

  return monthsES[month.toLowerCase()] || null
}

export default normalizeZamoraBopDate