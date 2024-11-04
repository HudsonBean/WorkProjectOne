const Login = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    console.log(payload);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
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
