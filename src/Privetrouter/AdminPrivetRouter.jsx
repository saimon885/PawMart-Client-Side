import React, { useContext } from "react";
import useAdmin from "../AuthProvider/AdminProvider";
import { AuthContext } from "../AuthProvider/AuthContext";
import Loading from "../Pages/Loading";
import UnauthorizedPage from "../Pages/UnauthorizedPage";

const AdminPrivetRouter = ({ children }) => {
  const { loading: authLoading } = useContext(AuthContext);
  const [role, isAdminLoading] = useAdmin();

  if (authLoading || isAdminLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if (role === "admin") {
    return children;
  }
  return (
    <div>
      <UnauthorizedPage></UnauthorizedPage>
    </div>
  );
};

export default AdminPrivetRouter;
