import React, { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router";
import GoogleSignIn from "./GoogleSignIn";
import { toast } from "sonner";
import { storeToken } from "../../utils/tokenStore";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      toast.success(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });

      storeToken("accessToken", data.data.token);

      navigate("/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="absolute top-6 left-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2 rounded-full">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl border bg-background/80 backdrop-blur-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to continue managing your tasks
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSignIn}>
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 rounded-xl"
              name="email"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-12 rounded-xl pr-12"
                name="password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link to={"/forgot-password"}>
              <button
                type="button"
                className="text-sm text-primary hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-base font-semibold cursor-pointer"
          >
            Sign In
          </Button>
        </form>

        <div className="relative text-center text-sm text-muted-foreground my-5">
          <div className="absolute inset-0 top-1/2 border-t" />
          <span className="relative bg-background px-3">or</span>
        </div>

        {/* <Button
          onClick={signinWithEmail}
          variant="outline"
          className="w-full h-12 rounded-xl text-base font-medium cursor-pointer"
        >
          Continue with Google
        </Button> */}

        <GoogleSignIn />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"}>
            <button className="text-primary font-medium hover:underline cursor-pointer">
              Sign Up
            </button>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignInPage;
