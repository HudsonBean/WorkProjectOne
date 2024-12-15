/**============================================
 *               IMPORTS
 *=============================================**/
import { useEffect, useState } from "react";
import getUser from "../utils/getUser";
/**============================================
 *               COMPONENTS
 *=============================================**/
import Logout from "../components/Logout";
import Loading from "../components/Loading";

const Dashboard = () => {
  // Use states for: user data, loading component
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Send api to fetch user
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { user: fetchedUser } = await getUser();
      setUser(fetchedUser); // Should be `null` or a user object
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      Dashboard
      <br />
      Welcome {user ? user.name.first : ""}
      <br />
      <Logout />
    </div>
  );
};

export default Dashboard;
