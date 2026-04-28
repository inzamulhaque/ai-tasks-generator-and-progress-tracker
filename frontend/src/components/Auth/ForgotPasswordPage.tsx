import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "react-router";

const ForgotPasswordPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="absolute top-6 left-6">
        <Link to="/signin">
          <Button variant="ghost" className="gap-2 rounded-full">
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl border bg-background/80 backdrop-blur-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-6 w-6 text-primary" />
          </div>

          <h1 className="text-3xl font-bold">Forgot Password?</h1>

          <p className="text-muted-foreground mt-2">
            Enter your email address below. We’ll send you a secure one-time
            password (OTP) to verify your identity and reset your password.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="text-sm font-medium mb-2 block">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-base font-semibold cursor-pointer"
          >
            Send OTP
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Remember your password?{" "}
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

export default ForgotPasswordPage;
