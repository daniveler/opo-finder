const LinkButton = ({ text, link, style }) => {
  return (
    <div>
      {style === 'pdf' && (
        <button className="flex flex-row  p-4 font-medium text-white bg-red-400 hover:bg-red-300 rounded-xl">
          <a className="flex flex-row justify-center items-center" href={link} target="_blank">
            <span className="icon-[streamline--convert-pdf-2-solid] size-6 mr-4" />
            <span className="text-lg">
              {text}
            </span>
          </a>
        </button>
      )}

      {style === 'web' && (
        <button className="flex flex-row  p-4 font-medium text-white bg-blue-400 hover:bg-blue-300 rounded-xl">
          <a className="flex flex-row justify-center items-center" href={link} target="_blank">
            <span className="icon-[mdi--web] size-6 mr-3" />
            <span className="text-lg">
              {text}
            </span>
          </a>
        </button>
      )}
    </div>


  )
}

export default LinkButton