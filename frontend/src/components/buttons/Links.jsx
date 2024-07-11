import LinkButton from "./LinkButton"

const Links = ({ origin, pdf, html }) => {
  const baseUrl = 'https://boe.es'

  if(origin === 'boe') {
    pdf = `${baseUrl}${pdf}`
    html = `${baseUrl}${html}`
  }

  return (
    <div className="flex flex-row justify-center items-center gap-x-8 md:gap-x-16 mt-4 mb-8">
      <LinkButton style='pdf' link={pdf} text='PDF'/>
      <LinkButton style='web' link={html} text='Web'/>
    </div>
  )
  

}

export default Links