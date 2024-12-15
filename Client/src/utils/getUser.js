/**============================================
 *               IMPORTS
 *=============================================**/
import axios from "axios";

const getUser = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/current-user", {
      withCredentials: true,
    });
    return { user: response.data.user, message: "success!" }; // User object
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.error(err); // Debugging
      return { user: null, message: err.response.data }; // No user logged in
    } else {
      console.error("Error fetching user data:", err); // Debugging
      return { user: null, message: err.response.data }; // Handle unexpected errors
    }
  }
};

export default getUser;
