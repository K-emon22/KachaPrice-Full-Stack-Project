



import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Auth } from "../FirebaseAuth/FirebaseAuth";
import { useEffect, useState } from "react";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null); // ✅ New
  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(Auth, email, password);
  };

  const loginWithPass = (email, password) => {
    return signInWithEmailAndPassword(Auth, email, password);
  };

  const googleLogin = () => {
    return signInWithPopup(Auth, provider);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    return signOut(Auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const token = await currentUser.getIdToken();
        setAccessToken(token);
        localStorage.setItem("accessToken", token);
        console.log(token);
        
      } else {
        setAccessToken(null);
        localStorage.removeItem("accessToken");
      }
    });

    return () => unsubscribe();
  }, []);

  const exports = {
    createUser,
    googleLogin,
    loginWithPass,
    user,
    loading,
    logout,
    accessToken, 
  };

  return <AuthContext value={exports}>{children}</AuthContext>;
};