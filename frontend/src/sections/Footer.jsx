import { copyrightSign } from "../assets/icons"
import { footerLogo } from "../assets/images"
import { footerLinks, socialMedia } from "../constants"

const Footer = () => {
  return (
    <footer className="max-container flex flex-col justify-center items-center">
  <div className="max-w-sm"> {/* Adjust max-width here */}
    <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
      <div className="flex items-center gap-5 mt-8">
        {socialMedia.map((icon, index) => (
          <div key={index} className="flex justify-center items-center w-12 h-12 bg-white rounded-full cursor-pointer">
            <img src={icon.src} alt={icon.alt} height={24} width={24} />
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
      <div className="flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer">
        <img src={copyrightSign} alt="copyright" width={20} height={20} className="rounded-full m-0" />
        <p>
          2024 AcademIQ. 
        </p>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer