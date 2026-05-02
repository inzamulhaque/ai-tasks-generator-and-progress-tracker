import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ArrowLeft, Lock } from "lucide-react";
import { Input } from "../ui/input";
import { getToken } from "../../utils/tokenStore";
import { toast } from "sonner";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setError(null);
    setLoading(true);

    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken("accessToken") as string,
        },

        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      },
    );

    const data = await res.json();

    if (data.success) {
      setLoading(false);
      navigate("/dashboard");
      toast.success(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } else {
      setLoading(false);
      toast.error(data.message, {
        position: "top-right",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  return (
    <>
      <main className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
        </div>

        <div className="absolute top-6 left-6">
          <Link to="/dashboard">
            <Button variant="ghost" className="gap-2 rounded-full">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-md rounded-3xl border bg-background/80 backdrop-blur-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Lock className="h-10 w-10 text-primary mx-auto mb-3" />

            <h1 className="text-3xl font-bold">Change Password</h1>
            <p className="text-muted-foreground mt-2">
              Update your account password securely
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Old Password
              </label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                className="h-12 rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="h-12 rounded-xl"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Confirm New Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="h-12 rounded-xl"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full h-12 rounded-xl text-base font-semibold cursor-pointer"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ChangePassword;
