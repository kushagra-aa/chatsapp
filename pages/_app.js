import "../styles/globals.css";
import { auth, db } from "./../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "./loading";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          email: user.email,
          lastSeen: serverTimestamp(),
          imgURL: user.photoURL,
        },
        { merge: true }
      );
    }
    return;
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
