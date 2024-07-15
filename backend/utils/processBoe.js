import normalizeToArray from './normalizeToArray.js'

const processBoe = (data) => {
  const diarios = processDiarios(normalizeToArray(data))
  return diarios.at(0)
}

const processDiarios = (diarios) => {
  if (diarios && diarios.length > 0) {
    return diarios.map(diario => {
      return {
        number: diario.numero,
        sections: processSecciones(normalizeToArray(diario.seccion))
      }
    })
  }
  else {
    return []
  }
}

const processSecciones = (secciones) => {
  if (secciones && secciones.length > 0) {
    return secciones.map(seccion => {
      return {
        code: seccion.codigo,
        name: seccion.nombre,
        departments: processDepartamentos(normalizeToArray(seccion.departamento))
      }
    })
  }
  else {
    return []
  }
}

const processDepartamentos = (departamentos) => {
  if (departamentos && departamentos.length > 0) {
    return departamentos.map(departamento => {
      // If "departamento" has an "item" element
      if (departamento.item !== undefined) {
        return {
          code: departamento.codigo,
          name: departamento.nombre,
          items: processItems(normalizeToArray(departamento.item))
        }
      }
      else if (departamento?.texto?.item !== undefined) {
        return {
          code: departamento.codigo,
          name: departamento.nombre,
          items: processItems(normalizeToArray(departamento.texto.item))
        }
      }  
      else if (departamento?.texto?.epigrafe !== undefined) {
        return {
          code: departamento.codigo,
          name: departamento.nombre,
          ephigraphs: processEpigrafes(normalizeToArray(departamento.texto.epigrafe))
        }
      }  
      else {
        return {
          code: departamento.codigo,
          name: departamento.nombre,
          ephigraphs: processEpigrafes(normalizeToArray(departamento.epigrafe))
        }
      }
    })
  }
  else {
    return []
  }
}

const processEpigrafes = (epigrafes) => {
  if (epigrafes && epigrafes.length > 0) {
    return epigrafes.map(epigrafe => {
      return {
        items: processItems(normalizeToArray(epigrafe?.item))
      }
    })
  }
  else {
    return []
  }
}

const processItems = (items) => {
  if (items && items.length > 0) {
    return items.map(item => {
      return {
        id: item.identificador,
        title: item.titulo,
        linkPdf: item.url_pdf.texto,
        linkHtml: item.url_html
      }
    })
  }
  else {
    return []
  }
}

export default processBoe