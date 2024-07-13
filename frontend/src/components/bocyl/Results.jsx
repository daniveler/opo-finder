import Links from "../buttons/Links"

const Results = (props) => {

  return (
    props.bocyl.results.map((result, index) => (
      <div key={index}>
        <p className="text-2xl mb-2">{result.organismo}</p>
        <li className="text-base md:text-lg text-justify ml-2">{result.titulo}</li>
        <div className="mt-2">
          <Links key={index + "-links"} pdf={result.enlace_fichero_pdf} html={result.enlace_fichero_html} />
        </div>
      </div>
    ))
  )
}

export default Results