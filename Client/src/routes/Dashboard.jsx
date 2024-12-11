import axios from "axios";
import { useNavigate } from "react-router";
const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout", {
        withCredentials: true, // Include cookies for session-based authentication
      });
      if (response.status == 200) {
        navigate("/login"); // Redirect to login
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Uh oh! An error occured during logout:", error);
    }
  };
  return (
    <div>
      Dashboard
      <br />
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
