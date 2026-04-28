import { useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground mt-2">
            Start managing your tasks with AI today
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              className="h-12 rounded-xl"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 rounded-xl"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="h-12 rounded-xl pr-12"
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

          <div>
            <label className="text-sm font-medium mb-2 block">
              Confirm Password
            </label>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="h-12 rounded-xl pr-12"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-base font-semibold cursor-pointer"
          >
            Sign Up
          </Button>

          <div className="relative text-center text-sm text-muted-foreground">
            <div className="absolute inset-0 top-1/2 border-t" />
            <span className="relative bg-background px-3">or</span>
          </div>

          <Button
            variant="outline"
            className="w-full h-12 rounded-xl text-base font-medium cursor-pointer"
          >
            Continue with Google
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-primary font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
