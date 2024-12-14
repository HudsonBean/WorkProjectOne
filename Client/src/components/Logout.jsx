/**============================================
 *               IMPORTS
 *=============================================**/
import axios from "axios";
import { useNavigate } from "react-router";

const Logout = () => {
  //* useNavigate to rediret
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/logout",
        {}, // No data in the body
        { withCredentials: true } // Ensure cookies are included
      );
      if (res.status === 200) {
        if (res.data.redirect == "/") {
          window.location.reload();
        } else {
          navigate(res.data.redirect); // Go to where the server sends to redirect
        }
      } else {
        console.error("Logout failed:", res.status, res.data);
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
