// Imports
import axios from "axios";
import { useNavigate } from "react-router";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/logout", {
        withCredentials: true, // Include cookies for session-based authentication
      });
      if (response.status === 200) {
        navigate("/"); // Redirect to login
      } else {
        console.error("Logout failed:", response.status, response.data);
      }
    } catch (error) {
      console.error(
        "Logout error:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  };
  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
