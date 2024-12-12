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
      if (response.status == 200) {
        navigate("/"); // Redirect to login
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Uh oh! An error occured during logout:", error);
    }
  };
  return <button onClick={handleLogout}>Log Out</button>;
};

export default Logout;
