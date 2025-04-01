import {FaFacebook} from 'react-icons/fa'
import {IoLogoInstagram} from 'react-icons/io'
import {FaWhatsapp} from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="bg-emerald-500 text-black">
        <div className="container mx-auto flex justify-between items-center py-3 px-4"> {/* to center the content, py is for padding*/}
          <div className="flex items-center space-x-4 "> {/* So items are under the same line */}
            <a href="#" className="hover:text-gray-300">
              <FaFacebook className="h-5 w-5" />
            </a>
          
            <a href="#" className="hover:text-gray-300">
             <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaWhatsapp className="h-5 w-5" />
            </a>
          </div>
          <div className="text-sm text-center">
            <span>Reliable Tenants & Reliable Landlords</span>
          </div>  
          <div className="text-sm">
            <a href="Tel: 12345678" className="hover: text-gray-300">
              +1 98765432
            </a>
          </div> 
        </div>
      </div>
  )
}

export default Topbar