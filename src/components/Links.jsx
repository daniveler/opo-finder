const Links = (props) => {
  const baseUrl = 'https://boe.es'

  return (
    <div>
      <a href={baseUrl + props.pdf} target="_blank" className="text-s ml-12 text-red-500 underline">Go to PDF</a>
      <a href={baseUrl + props.html} target="_blank"  className="text-s ml-12 text-blue-900 underline">Go to website</a>
    </div>
  )
  

}

export default Links