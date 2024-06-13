import Department from "./Department"

const Section = (props) => {
  return (
    <h1 className="text-xl mt-4 ml-4">
      {props.section._attributes.nombre}
      {Array.isArray(props.section.departamento) 
        ? props.section.departamento.map((dep, index) => <Department key={index} department={dep} /> )
        : <Department department={props.section.departamento} />
      }
    </h1>
  )
}

export default Section