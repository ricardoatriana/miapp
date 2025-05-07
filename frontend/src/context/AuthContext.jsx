import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Auto-check if user is already authenticated
  useEffect(() => {
    axios
      .get("http://localhost:9000/api/users/auth", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // Login function to use in Login.jsx
  const login = async (email, password) => {
    const response = await axios.post(
      "http://localhost:9000/api/users/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(response.data.user); // Update the context with the logged-in user
    return response; // Make sure the caller can read the token or role
  };

  const logout = async () => {
    await axios.post("http://localhost:9000/api/users/logout", {}, { withCredentials: true });
    setUser(null);
  };
  

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
