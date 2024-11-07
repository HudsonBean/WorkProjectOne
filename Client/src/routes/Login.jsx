// Imports
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

const Login = () => {
  // Variables
  const navigate = useNavigate();
  const [errrorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    axios
      .post("http://localhost:3000/login", payload, { withCredentials: true })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.redirect) {
          navigate(response.data.redirect);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      });
  };
  return (
    <div>
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
    </div>
  );
};

export default Login;
