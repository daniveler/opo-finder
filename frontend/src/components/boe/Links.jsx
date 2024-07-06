import LinkButton from "../buttons/LinkButton"

const Links = (props) => {
  const baseUrl = 'https://boe.es'

  return (
    <div className="flex flex-row justify-center items-center gap-x-8 md:gap-x-16 mt-4 mb-8">
      <LinkButton style='pdf' link={baseUrl + props.pdf} text='PDF'/>
      <LinkButton style='web' link={baseUrl + props.html} text='Web'/>
      {/* <a href={baseUrl + props.pdf} target="_blank" className="text-s text-red-500 underline">Go to PDF</a>
      <a href={baseUrl + props.html} target="_blank"  className="text-s ml-12 text-blue-900 underline">Go to website</a> */}
    </div>
  )
  

}

export default Links