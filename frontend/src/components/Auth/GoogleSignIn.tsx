import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { storeToken } from "../../utils/tokenStore";
import { useNavigate } from "react-router";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleSigninWithEmail = async () => {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const { displayName, email } = user;

    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/auth/signin-with-google`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: displayName,
          email,
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
    <Button
      onClick={handleSigninWithEmail}
      variant="outline"
      className="w-full h-12 rounded-xl text-base font-medium cursor-pointer"
    >
      Continue with Google
    </Button>
  );
};

export default GoogleSignIn;
