import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";


const Navbar = () => {
    return (
        <>
        <nav className="container mx-auto flex items-center justify-between py-4 px-6">
           {/*Left Logo */}
            <div>
                <Link to="/" className="text-2xl font-medium">
                RealEstateCo.
                </Link>
            </div>
            {/* Center Navigation List */}
            <div className="md:flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-black text-sm font-medium uppercase">
                Buy
                </Link>
            </div>
            {/* Right - List */}
            <div className="flex items-center space-x-4">
                <Link to="/admin" className="block bg-black px-2 rounded text-sm text-white">
                Admin
                </Link>
                <Link to="/login" className="hove:text-black">
                    <HiOutlineUser className="h-6 w-6 text-gray-700"/>
                </Link>
            
                
            </div>
        </nav>
        </>
    )
  }
  
  export default Navbar;
  