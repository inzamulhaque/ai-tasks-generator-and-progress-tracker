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
]);

export default router;
