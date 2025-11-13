import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  //   createUser
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  //   onAuthState change
  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
      setLoading(false);
    });
    return () => {
      subscribed();
    };
  }, []);
  //   login User
  const LoginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //   updateUser
  const updateuser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };
  //   google Log In
  const GoogleProviders = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, GoogleProviders);
  };
  // forget Password
  const ForgetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //   signOut
  const SignOutUser = () => {
    return signOut(auth);
  };

  const AllInfo = {
    createUser,
    user,
    googleSignIn,
    setUser,
    loading,
    SignOutUser,
    LoginUser,
    updateuser,
    setLoading,
    ForgetPass,
  };
  return <AuthContext value={AllInfo}>{children}</AuthContext>;
};

export default AuthProvider;
