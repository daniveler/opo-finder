import LinkButton from "../common/buttons/LinkButton.jsx"
import formatBopDate from '../../utils/formatBopDate.js'

const ZamoraBop = ({ bop }) => {
  return (
    <div>
      <ul>
        <h2 className="text-xl md:text-3xl mt-2 mb-8 text-center font-semibold uppercase">{formatBopDate(bop.date)}</h2>
        {bop.announcements.map((announcement, index) => (
          <div key={index}>
            <h3 className="text-2xl md:text-2xl mb-2 uppercase">{announcement.organism}</h3>
            <p className="text-base list-none md:text-lg text-justify">{announcement.text}</p>
            <div className="flex flex-row items-center justify-center mt-4 md:mt-6 mb-4 md:mb-8">
              <LinkButton style='pdf' link={announcement.pdfLink}></LinkButton>
            </div>
          </div>
        ))}

      </ul>

    </div>
  )
}

export default ZamoraBop