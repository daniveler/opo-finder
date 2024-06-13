import Links from "./Links"

const Epigraph = (props) => {

  return (
    Array.isArray(props.epigraph.item)
      ? props.epigraph.item.map((item, index) =>
        <div className="mb-4">
          <li key={index + "-li"} className="text-base text-justify ml-2">
            {item.titulo._text}
          </li>

          <Links key={index + "-links"} pdf={item.urlPdf._text} html={item.urlHtm._text} />
        </div>

      )
      : <div className="mb-4">
        <li key="0-li" className="text-base text-justify ml-2">
          {props.epigraph.item.titulo._text}
        </li>
        <Links key="0-links" pdf={props.epigraph.item.urlPdf._text} html={props.epigraph.item.urlHtm._text} />
      </div>


  )
}

export default Epigraph