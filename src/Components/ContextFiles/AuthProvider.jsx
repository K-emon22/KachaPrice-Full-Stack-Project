import {GoogleAuthProvider} from "firebase/auth";
import {AuthContext} from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {Auth} from "../FirebaseAuth/FirebaseAuth";
import {useEffect, useState} from "react";

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    return signOut(Auth);
  };
  const exports = {
    createUser,
    googleLogin,
    loginWithPass,
    user,
    loading,
    logout,
  };

  return <AuthContext value={exports}>{children} </AuthContext>;
};
