// Imports
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  // Variables
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    axios
      .post("http://localhost:3000/login", {
        email: payload.email,
        password: payload.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Oops an error ocurred!", err);
      });
  };
  return (
    <div>
      <form action="http://localhost:3000/login" method="post">
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
    </div>
  );
};

export default Login;
