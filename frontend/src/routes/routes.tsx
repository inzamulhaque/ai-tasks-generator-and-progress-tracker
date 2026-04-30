import SignUpPage from "../components/Auth/SignUpPage";
import SignInPage from "../components/Auth/SignInPage";
import HomePage from "../components/Home/HomePage";
import { createBrowserRouter } from "react-router";
import ForgotPasswordPage from "../components/Auth/ForgotPasswordPage";

import ResetPasswordPage from "../components/Auth/ResetPasswordPage";
import OtpVerifyPage from "../components/Auth/OtpVerifyPage";
import NotFoundPage from "../components/Shared/NotFound";
import ProtectedRoute from "../components/Dashboard/ProtectedRoute";

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

  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },

  {
    path: "/otp-verify",
    element: <OtpVerifyPage />,
  },

  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },

  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <>Dashboard</>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
