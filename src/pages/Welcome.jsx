import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { Icons } from "../assets";
import { auth } from "../config/firebase";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <main className="welcome">
      <p>Sign in with Google to chat with with your fellow React Developers.</p>
      <button className="sign-in">
        <img
          onClick={googleSignIn}
          src={Icons.googleBtn}
          alt="sign in with google"
          type="button"
        />
      </button>
    </main>
  );
};

export default Welcome;

