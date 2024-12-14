/**============================================
 *               IMPORTS
 *=============================================**/
/**======================
 *    LIBRARIES
 *========================**/
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

/**======================
 *    COMPONENTS
 *========================**/
import Loading from "../components/Loading";

const Register = () => {
  //* States for loading and flash error messages; navigate for redirects
  const [loading, setLoading] = useState(false);
  const [errrorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  //* Form submit
  const onSubmit = (e) => {
    // Prevent reload
    e.preventDefault();
    setLoading(true);
    // Get form data
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    // Send request
    axios
      .post("http://localhost:3000/register", payload, {
        withCredentials: true,
      })
      .then((res) => {
        // If there is a redirect go to it
        if (res.data.redirect) {
          navigate(res.data.redirect);
        }
        setLoading(false);
      })
      .catch((error) => {
        // Display any error
        if (error.response && error.response.status === 401) {
          setErrorMessage(error.response.data.message); // Error is from flash
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
        setLoading(false);
      });
  };
  return (
    <div>
      {loading && <Loading />}
      <h1>{errrorMessage}</h1>
      <form onSubmit={onSubmit}>
        {/* Name */}
        <label
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2>Name</h2>
        </label>
        <input
          style={{ marginRight: "6.5px" }}
          id="first"
          type="text"
          name="first"
          placeholder="First Name"
        ></input>
        <input
          id="last"
          type="text"
          name="last"
          placeholder="Last Name"
        ></input>
        {/* Email */}
        <div>
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
          href="/login"
          style={{
            marginRight: "6.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Login
        </a>
        <p>Instead?</p>
      </div>
    </div>
  );
};

export default Register;
