import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AdminSidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();  // Call the context's logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
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
  );
};

export default AdminSidebar;
