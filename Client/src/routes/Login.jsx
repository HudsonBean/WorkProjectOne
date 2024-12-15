/**============================================
 *               IMPORTS
 *=============================================**/
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

/**============================================
 *               COMPONENTS
 *=============================================**/
import Loading from "../components/Loading";

const Login = () => {
  // Navigate for redirects; Use state for error message and loading
  const navigate = useNavigate();
  const [errrorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Form submit
  const onSubmit = (e) => {
    // Prevent refresh and start loading component
    e.preventDefault();
    setLoading(true);
    // Get form data
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    axios
      .post("http://localhost:3000/login", payload, { withCredentials: true })
      .then((response) => {
        // Set error message
        setErrorMessage(response.data.message);
        if (response.data.redirect) {
          // Redirect if a pathname was supplied by server
          navigate(response.data.redirect);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
        setLoading(false);
      });
  };
  return (
    <div>
      {loading && <Loading />}
      <form onSubmit={onSubmit}>
        {/* Email */}
        <div>
          <h1>{errrorMessage}</h1>
          <label htmlFor="email">
            <h2>Email</h2>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
          ></input>
        </div>
        {/* Password */}
        <div>
          <label htmlFor="password">
            <h2>Password</h2>
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          ></input>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <a
          href="/register"
          style={{
            marginRight: "6.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Register
        </a>
        <p>Instead?</p>
      </div>
    </div>
  );
};

export default Login;
