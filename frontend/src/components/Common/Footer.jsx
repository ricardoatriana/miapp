import {FaFacebook} from 'react-icons/fa'
import {IoLogoInstagram} from 'react-icons/io'
import {FaWhatsapp} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return <footer className="border-t py-12">
    <div className="container mx-auto grid md:grid-cols-4 gap-8 lg:px-0"> {/*The grid has 4 columns, gap 8 add spacing between items and no padding*/}
        <div>
            <h6 className="text-lg font-bold mb-4">Newsletter</h6> {/*mb is bottom margin 16px*/}
            <p className="text-gray-500 mb-4">
                Suscribe for the latest news and tendencies on the market
            </p>

            {/* Newsletter form */}
            <form className="flex">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="p-3 w-full text-sm border-t border-l border-b border-gray-300"
                />
                <button 
                    type="submit"
                    className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
                >Suscribe</button>

            </form>
        </div>
        <div>
            <h6 className="text-lg font-bold mb-4">RealEstateCo. Offices</h6>
            <p className="text-gray-500 mb-4">The Black Chruch <br />Dublin 1 <br /> Ireland</p>
        </div> 
        <div>
            <h6 className="text-lg font-bold mb-4">Support</h6>
            <ul className="text-gray-600">
                <li>
                    <Link to="#" className="hover:text-gray-500">
                        Contact Us
                    </Link>
                </li>
                <li>
                    <Link to="#" className="hover:text-gray-500">
                        About Us
                    </Link>
                </li>
            </ul>
        </div> 
        <div>
            <h6 className="text-lg font-bold mb-4">Follow Us</h6>
            <div className="flex space-x-4">
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
            <br />
            <p className="mb-4">Call Us <br />+1 98765432s</p>  
        </div>    
    </div>
  </footer>
}

export default Footer