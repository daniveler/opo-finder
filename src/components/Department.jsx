import Epigraph from "./Epigraph"

const Department = (props) => {
  return (
    <div>
      <p className="text-lg mt-2 ml-4">
        {props.department._attributes.nombre}
      </p>
      {
        Array.isArray(props.department.epigrafe)
          ? props.department.epigrafe.map((epigraph, index) =>
              <Epigraph key={index} epigraph={epigraph} /> )
          : <Epigraph key="0" epigraph={props.department.epigrafe} />
      }

    </div>

  )
}

export default Department