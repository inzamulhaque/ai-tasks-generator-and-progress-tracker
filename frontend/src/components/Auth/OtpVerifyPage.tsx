import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const OtpVerifyPage = () => {
  const [value, setValue] = useState("");

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
      </div>

      <div className="absolute top-6 left-6">
        <Link to="/forgot-password">
          <Button variant="ghost" className="gap-2 rounded-full">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md rounded-3xl border bg-background/80 backdrop-blur-xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold">Verify OTP</h1>

        <p className="text-muted-foreground mt-2">
          Enter the 5-digit code sent to your email
        </p>

        <p className="mt-4 text-sm font-medium text-primary">
          Code expires in: {formatTime(timeLeft)}
        </p>

        <div className="flex justify-center mt-6">
          <InputOTP maxLength={5} value={value} onChange={setValue}>
            <InputOTPGroup className="gap-3">
              <InputOTPSlot
                index={0}
                className="h-14 w-12 text-lg rounded-xl border"
              />
              <InputOTPSlot
                index={1}
                className="h-14 w-12 text-lg rounded-xl border"
              />
              <InputOTPSlot
                index={2}
                className="h-14 w-12 text-lg rounded-xl border"
              />
              <InputOTPSlot
                index={3}
                className="h-14 w-12 text-lg rounded-xl border"
              />
              <InputOTPSlot
                index={4}
                className="h-14 w-12 text-lg rounded-xl border"
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button className="w-full h-12 rounded-xl mt-8 text-base font-semibold cursor-pointer">
          Verify OTP
        </Button>

        <p className="mt-6 text-sm text-muted-foreground">
          Didn’t receive code?{" "}
          <button
            disabled={timeLeft > 0}
            className={`font-medium hover:underline cursor-pointer ${
              timeLeft > 0 ? "text-gray-400 cursor-not-allowed" : "text-primary"
            }`}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </main>
  );
};

export default OtpVerifyPage;
