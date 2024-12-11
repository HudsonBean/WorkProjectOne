// Global Variables
import { useEffect, useState } from "react";
import axios from "axios";

// Pages
import Home from "./Home";
import Dashboard from "./Dashboard";

// Components
import Loading from "../components/Loading";

const Main = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Send api to fetch user and decide what page to load
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/current-user", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {user ? <Dashboard /> : <Home />}
    </>
  );
};

export default Main;
