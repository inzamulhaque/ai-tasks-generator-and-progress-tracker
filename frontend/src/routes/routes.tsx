import SignUpPage from "../components/Auth/SignUpPage";
import SignInPage from "../components/Auth/SignInPage";
import HomePage from "../components/Home/HomePage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/signin",
    element: <SignInPage />,
  },

  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

export default router;
