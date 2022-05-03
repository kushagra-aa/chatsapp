import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPE0cu-f_9e2OmhvO8R0OeRu1RufkX6hY",
  authDomain: "chatsapp-k.firebaseapp.com",
  projectId: "chatsapp-k",
  storageBucket: "chatsapp-k.appspot.com",
  messagingSenderId: "922245114581",
  appId: "1:922245114581:web:fc0a40f8a52456cb1f505c",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
