import SignUpPage from "../components/Auth/SignUpPage";
import SignInPage from "../components/Auth/SignInPage";
import HomePage from "../components/Home/HomePage";
import { createBrowserRouter } from "react-router";
import ForgotPasswordPage from "../components/Auth/ForgotPasswordPage";
import OtpVerifyPage from "../components/Auth/OTPVerifyPage";

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
]);

export default router;
