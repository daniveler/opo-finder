import Results from "./Results"

const Bocyl = ({ bocyl }) => {
  return bocyl && bocyl.total_count > 0 
    ? (
      <div>
        <h1 className="flex text-5xl justify-center my-4">
          BOCYL
        </h1>
        <Results bocyl={bocyl} />
      </div>
    ) 
    : (
      <h1>No hay datos de este día</h1>
    )
}

export default Bocyl