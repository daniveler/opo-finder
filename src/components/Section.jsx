import Department from "./Department"

const Section = (props) => {
  return (
    <div>
      <h1 className="text-3xl uppercase mb-4">
        {props.section._attributes.nombre}
      </h1>
      {Array.isArray(props.section.departamento)
        ? props.section.departamento.map((dep, index) => <Department key={index} department={dep} />)
        : <Department department={props.section.departamento} />
      }
    </div>

  )
}

export default Section