import LinkButton from "../buttons/LinkButton"

const ZamoraBop = ({ bop }) => {
  return (
    <div>
      <h1 className="flex flex-col text-5xl justify-center items-center py-4">
        BOP ZAMORA
      </h1>
      <h2 className="text-2xl mt-2 mb-4">Fecha: {bop.date}</h2>
      <ul>
        {bop.content.map((item, index) => (
          <li key={`bop-zamora-${index}`}>
            <h1 className="text-2xl mb-2 mt-4">{item.subHeader}</h1>
            <h2 className="text-xl mb-2">{item.organismo}</h2>
            <p>{item.text}</p>
            <div className="flex flex-row items-center justify-center mt-4 mb-8">
              <LinkButton style='pdf' link={item.pdfLink}></LinkButton>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default ZamoraBop