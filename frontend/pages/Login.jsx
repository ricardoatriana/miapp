import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Axios to integrate backend with frontend
import Cookies from "js-cookie"; // For handling cookies

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");  // To store error messages
    const navigate = useNavigate();  // Use the navigate function from useNavigate

    
    const handleSubmit = async (e) => { 
        e.preventDefault();

        try {
            // Sending POST request to the backend API
            const response = await axios.post("http://localhost:9000/api/users/login", {
                email,
                password,
            });

            // If login is successful
            if (response.status === 200) {
                Cookies.set("jwt", response.data.token, { expires: 7, path:"/" }); // Store token in cookies
                navigate("/profile"); 
                
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message);  // Get error message from server
            } else {
                setError("Server Error");
            }
        }
    };

    return (
        
            <form 
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg border py-12 w-96 shadow-lg">
                
                <h2 className="text-2xl text-center">Login</h2>  
                
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}  
    
                <div className="mb-4">
                    <label className="text-sm font-semibold mb-2">Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 w-full text-sm border rounded-lg"
                        placeholder="Enter your Email address"
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm font-semibold mb-2">Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-3 w-full text-sm border rounded-lg"
                        placeholder="Enter your password"
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition-all w-full">
                    Sign In
                </button>
                <p className="mt-6 text-center text-sm">
                    Don't have an account? 
                    <Link to="/register" className="text-blue-500"> Register</Link>
                </p>
            </form>
        
    );
    
};

export default Login;
