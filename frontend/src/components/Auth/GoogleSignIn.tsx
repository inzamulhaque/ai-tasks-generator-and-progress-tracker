import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "../ui/button";

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
  const handleSigninWithEmail = async () => {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    console.log({ result, user });
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
