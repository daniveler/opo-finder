const Results = (props) => {

  return (
    props.bocyl.results.map((result, index) => (
      <div key={index}>
        <p className="text-2xl mt-2 mb-2">{result.organismo}</p>
        <li>{result.titulo}</li>
        <div className="mt-2">
          <a href={result.enlace_fichero_pdf} target="_blank" className="text-s ml-12 text-red-500 underline">Go to PDF</a>
          <a href={result.enlace_fichero_html} target="_blank"  className="text-s ml-12 text-blue-900 underline">Go to website</a>
        </div>
      </div>
    ))
  )
}

export default Results