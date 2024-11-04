// Imports
import axios from "axios";

// Main

const Login = () => {
  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    // Attempt login
    axios
      .post("http://localhost:3000/login")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>Login</p>
      <form onSubmit={submitForm}>
        <label htmlFor="email">
          <h2>Email</h2>
        </label>
        <input
          name="email"
          type="email"
          id="email"
          placeholder="Enter email address"
        />
        <br />
        <label htmlFor="password">
          <h2>Password</h2>
        </label>
        <input
          name="password"
          type="password"
          id="password"
          placeholder="Enter password"
        />
        <br />
        <button type="submit">Submit</button>
        <br />
        <p></p>
      </form>
    </div>
  );
};

export default Login;
