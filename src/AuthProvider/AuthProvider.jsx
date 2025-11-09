import React from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const AllInfo = {};
  return <AuthContext value={AllInfo}>{children}</AuthContext>;
};

export default AuthProvider;
