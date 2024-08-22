import Links from "../buttons/Links"

const ResultsFromScrape = ({ bocyl }) => {

  return (
    bocyl.map(section => (
      section.departments.map((department, index) => (
        <div key={index + '-div'}>
          <p className="text-2xl mb-2">{department.name}</p>
          { department.titles.map((title, index) => (
          <div key={index + '-div-div'}>
            <li className="text-base list-none md:text-lg text-justify">{title.text}</li>
            <div className="mt-2">
              <Links key={index + "-links"} pdf={title.links.pdf} html={title.links.html} />
            </div>
          </div>
          ))}
        </div>
      ))
    ))
  )
}

export default ResultsFromScrape