const LinkButton = ({ link, style }) => {
  return (
    <div>
      {style === 'pdf' && (
        <a className="flex flex-row justify-center items-center text-red-400 hover:underline" href={link} target="_blank">
            <span className="icon-[streamline--convert-pdf-2-solid] size-6 text-red-400 mr-4" />
            <span className="text-lg">
              Ir al PDF
            </span>
        </a>

      )}

      {style === 'web' && (
        <a className="flex flex-row justify-center items-center text-blue-400 hover:underline" href={link} target="_blank">
            <span className="icon-[mdi--web] size-6 mr-3" />
            <span className="text-lg">
              Ir a la Web
            </span>
        </a>

      )}
    </div>


  )
}

export default LinkButton