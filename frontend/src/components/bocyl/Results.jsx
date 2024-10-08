import Links from "../common/buttons/Links.jsx"

const Results = (props) => {

  return (
    props.bocyl.results.map((result, index) => (
      <div key={index}>
        <p className="text-2xl mb-2">{result.organismo}</p>
        <li className="text-base list-none md:text-lg text-justify">{result.titulo}</li>
        <div className="mt-2">
          <Links key={index + "-links"} pdf={result.enlace_fichero_pdf} html={result.enlace_fichero_html} />
        </div>
      </div>
    ))
  )
}

export default Results