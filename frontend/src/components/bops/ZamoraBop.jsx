import LinkButton from "../buttons/LinkButton"
import formatBopDate from '../../utils/formatBopDate.js'

const ZamoraBop = ({ bop }) => {
  return (
    <div>
      <h1 className="flex flex-col text-5xl justify-center items-center py-4">
        BOP ZAMORA
      </h1>
      <ul>
        <h2 className="text-xl md:text-3xl mt-2 mb-4 text-center font-medium uppercase">{formatBopDate(bop.date)}</h2>
        {bop.announcements.map((announcement, index) => (
            <div key={index}>
              <h3 className="text-xl md:text-2xl mb-2 uppercase">{announcement.organism}</h3>
              <p className="text-justify">{announcement.text}</p>
              <div className="flex flex-row items-center justify-center mt-4 mb-8">
                <LinkButton style='pdf' link={announcement.pdfLink}></LinkButton>
              </div>
            </div>
          ))}

      </ul>

    </div>
  )
}

export default ZamoraBop