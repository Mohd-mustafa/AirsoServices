import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCBEombiynNKZFFLGsBdsfWqDBcNT1nX3k",
    authDomain: "airso-78944.firebaseapp.com",
    projectId: "airso-78944",
    storageBucket: "airso-78944.firebasestorage.app",
    messagingSenderId: "48614786084",
    appId: "1:48614786084:web:43e82bcd42b875530984b1",
    measurementId: "G-Z1W9QTTFC5"
  };



  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };