import Links from "./Links"

const Epigraph = (props) => {

  return (
      Array.isArray(props.epigraph.item)
          ? props.epigraph.item.map((item, index) =>
            <div>
              <li key={index + "-li"} className="text-s ml-8">
                {item.titulo._text}
              </li>

              <Links key={index + "-links"} pdf={item.urlPdf._text} html={item.urlHtm._text} />
            </div>
            
          )
          : <div>
              <li key="0-li" className="text-s ml-8">
                {props.epigraph.item.titulo._text}
              </li>
              <Links key="0-links" pdf={props.epigraph.item.urlPdf._text} html={props.epigraph.item.urlHtm._text} />
            </div>
            
            
  )
}

export default Epigraph