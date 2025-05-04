import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AdminSidebar = () => {
  const navigate = useNavigate();
  
    // Logout functionality
    const handleLogout = async () => {
      try {
        await axios.post("http://localhost:9000/api/users/logout", {}, { withCredentials: true });
        navigate("/"); // Redirect to login
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  return (
    <div className="p-6">
        <div className="mb-6">
            <Link to="/" className="text-2xl font-medium">
            RealEstateCo.
            </Link>
        </div>
        <button
        onClick={handleLogout}
        className="mt-4 bg-gray-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default AdminSidebar