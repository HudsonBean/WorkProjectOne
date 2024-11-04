// Imports
import axios from "axios";

// Main

const Login = () => {
  const submitForm = () => {};

  return (
    <div>
      <p>Login</p>
      <form>
        <label htmlFor="email">
          <h2>Email</h2>
        </label>
        <input type="email" id="email" placeholder="Enter email address" />
        <br />
        <label htmlFor="password">
          <h2>Password</h2>
        </label>
        <input type="password" id="password" placeholder="Enter password" />
        <br />
        <button type="submit" onClick={submitForm}>
          Submit
        </button>
        <br />
        <p>Test</p>
      </form>
    </div>
  );
};

export default Login;
