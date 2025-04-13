import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  //Axios to integrate backend with frontend

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("");  // To store error messages
    const [success, setSuccess] = useState("");  
    const navigate = useNavigate();  // Use the navigate function from useNavigate


    const handleSubmit = async (e) => {

    //console.log("User Registered:", { name, email, password })
    try {
        // Sending POST request to the backend API
        const response = await axios.post("http://localhost:9000/api/users/register", {
            name,
            email,
            password,
        });

        // If register is successful
        if (response.status === 200) {
            setSuccess("User successfully registered!");
            setTimeout(() => {
                navigate("/"); //redirect to index
            }, 500);  
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
    <div className="flex items-center justify-center">
        <form 
        onSubmit={handleSubmit}
        className="justify-center bg-white p-8 rounded-lg border py-12">
            
            <h2 className="text-2xl text-center">Sign Up</h2>  

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}  {/* Display error if exists */}
            {success && <div className="text-green-500 text-center mb-4">{success}</div>}  

            
            <div className="mb-4 items-center">
                <label className="text-sm font-semibold mb-2">Name: </label>
                <input
                    type="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 w-full text-sm"
                    placeholder="Enter your name"
                />
            </div>
            <div className="mb-4 items-center">
                <label className="text-sm font-semibold mb-2">Email: </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 w-full text-sm border rounded"
                    placeholder="Enter your email address"
                />
            </div>
            <div className="mb-4">
                <label className="text-sm font-semibold mb-2">Password: </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 w-full text-sm border-gray-300"
                    placeholder="Enter your password"
                />
            </div>
            <button 
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg text-sm hover:bg-gray-800 transition-all w-full "

            >Sign Up
            </button>
            <p className="mt-6 text-center text-sm">
                Have an account already? 
                <Link to="/login" className="!text-blue-500"> Login</Link>
            </p>
        </form>
    </div>
   );
}


export default Register