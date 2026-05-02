import SignUpPage from "../components/Auth/SignUpPage";
import SignInPage from "../components/Auth/SignInPage";
import HomePage from "../components/Home/HomePage";
import { createBrowserRouter } from "react-router";
import ForgotPasswordPage from "../components/Auth/ForgotPasswordPage";

import ResetPasswordPage from "../components/Auth/ResetPasswordPage";
import OtpVerifyPage from "../components/Auth/OtpVerifyPage";
import NotFoundPage from "../components/Shared/NotFound";
import ProtectedRoute from "../components/Dashboard/ProtectedRoute";
import DashboardPage from "../components/Dashboard/DashboardPage";
import GoalDetails from "../components/Dashboard/GoalDetails";
import CreateGoal from "../components/Dashboard/CreateGoal";
import DailyTask from "../components/Dashboard/DailyTask";
import Challenges from "../components/Dashboard/Challenges";
import ChangePassword from "../components/Dashboard/ChangePassword";

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
        element: <DashboardPage />,
      },

      {
        path: "goal/:id",
        element: <GoalDetails />,
      },

      {
        path: "create-goal",
        element: <CreateGoal />,
      },

      {
        path: "task/:id",
        element: <DailyTask />,
      },

      {
        path: "challenges/:id",
        element: <Challenges />,
      },

      {
        path: "profile/change-password",
        element: <ChangePassword />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
