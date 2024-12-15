/**============================================
 *               IMPORTS
 *=============================================**/
import { useEffect, useState } from "react";
import axios from "axios";
/**============================================
 *               COMPONENTS
 *=============================================**/
import Logout from "../components/Logout";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Send api to fetch user
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/current-user", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        console.log("a");
        setUser(response.data.user);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          console.log("User is not logged in.");
          setLoading(false);
        } else {
          console.error("Error fetching user data: " + err);
          setLoading(false);
        }
      });
  }, []);

  return (
    <div>
      Dashboard
      <br />
      Welcome {user ? user.name.first : ""}
      <br />
      <Logout />
    </div>
  );
};

export default Dashboard;
