import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import MyOrders from "/pages/MyOrders";


axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/users/profile");
        setUser(response.data);
         
      } catch (err) {
        setError("Failed to fetch profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Logout functionality
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:9000/api/users/logout", {}, { withCredentials: true });
      localStorage.removeItem("userInfo");
      navigate("/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>User data is not available.</p>;

  return (
    <div className="min-h-screen flex flex-col py-12">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{user.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{user.email}</p>

            {/* Logout button */}
            <button
              className="w-1/2 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-800"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          {/* Right Section: Orders table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
          <MyOrders userId={user._id} />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
