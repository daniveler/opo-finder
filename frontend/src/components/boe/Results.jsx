import Links from "../common/buttons/Links.jsx"

const Results = ({ boe }) => {

  return (
    <div className="mb-4">
      {boe.departments.map(department => {
        return (
          <div key={department.code + '-div'}>
            <h2 className="text-2xl mt-2 mb-2">
              {department.name} 
            </h2>
            
            {department.ephigraphs.map(ephigraph => {
              return (
                ephigraph.items.map(item => {
                  return (
                    <div key={item.id + "-div"} className="mb-4">
                      <li className="text-base list-none md:text-lg text-justify">
                        {item.title}
                      </li>

                      <Links pdf={item.linkPdf} html={item.linkHtml} />
                    </div>
                  )

                })
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Results