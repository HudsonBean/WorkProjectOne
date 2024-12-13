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

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    axios
      .post("http://localhost:3000/register", payload, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.redirect) {
          navigate(response.data.redirect);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage(error.response.data.message); // Error is not from flash
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
