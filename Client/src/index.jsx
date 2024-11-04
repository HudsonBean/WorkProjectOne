import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Routes
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import Error from "./routes/Error";
import Login from "./routes/Login";
import Register from "./routes/Register";

// test
const user = true;

const router = createBrowserRouter([
  {
    path: "/",
    element: user ? <Dashboard /> : <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
