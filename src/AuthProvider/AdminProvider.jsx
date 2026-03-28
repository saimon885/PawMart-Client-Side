import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setIsAdminLoading(true);
      fetch(
        `https://my-assignment-10-lime.vercel.app/users?email=${user?.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          const userRole = Array.isArray(data) ? data[0]?.role : data?.role;
          setRole(userRole);
          setIsAdminLoading(false);
        })
        .catch(() => setIsAdminLoading(false));
    } else {
      setIsAdminLoading(false);
    }
  }, [user?.email]);

  return [role, isAdminLoading];
};

export default useAdmin;
