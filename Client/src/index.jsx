// Imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Pages
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
// Use for main page
const a = true;
const Router = createBrowserRouter([
  {
    path: "/",
    element: a == true ? <Dashboard /> : <Home />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);
