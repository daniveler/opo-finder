import Department from "./Department"

const Section = (props) => {
  return (
    <div>
      {Array.isArray(props.section.departamento)
        ? props.section.departamento.map((dep, index) => <Department key={index} department={dep} />)
        : <Department department={props.section.departamento} />
      }
    </div>

  )
}

export default Section