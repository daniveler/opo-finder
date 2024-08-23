import LinkButton from "./LinkButton.jsx"

const Links = ({ pdf, html }) => {
  return (
    <div className="flex flex-row justify-center items-center gap-x-8 md:gap-x-16 mt-4 md:mt-6 mb-4 md:mb-8">
      <LinkButton style='pdf' link={pdf} />
      <LinkButton style='web' link={html} />
    </div>
  )
  

}

export default Links