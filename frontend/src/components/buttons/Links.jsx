import LinkButton from "./LinkButton"

const Links = ({ pdf, html }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-x-8 md:gap-x-16 mt-4 mb-4">
      <LinkButton style='pdf' link={pdf} />
      <LinkButton style='web' link={html} />
    </div>
  )
  

}

export default Links