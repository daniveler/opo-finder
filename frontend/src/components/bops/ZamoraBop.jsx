import LinkButton from "../buttons/LinkButton"

const ZamoraBop = ({ bop }) => {
  return (
    <div>
      <h1 className="text-3xl mb-8">Fecha: {bop.date}</h1 >
      <ul>
        {bop.content.map(anuncio => (
          <li>
            <h1 className="text-2xl mb-2 mt-4">{anuncio.subHeader}</h1>
            <h2 className="text-xl mb-2">{anuncio.organismo}</h2>
            <p>{anuncio.text}</p>
            <div className="mt-4 mb-8">
              <LinkButton style='pdf' link={anuncio.pdfLink}></LinkButton>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default ZamoraBop