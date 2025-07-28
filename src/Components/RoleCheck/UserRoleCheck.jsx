import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../ContextFiles/AuthContext";

const UserRoleCheck = () => {
  const {user, accessToken, loading: authLoading} = useContext(AuthContext);
  const email = user?.email;

  const [role, setRole] = useState(null);
  const [loadingRole, setLoadingRole] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_API;

  useEffect(() => {
    if (authLoading) {
      setLoadingRole(true);
      return;
    }

    if (!email || !accessToken) {
      setLoadingRole(false);
      setRole("user");
      return;
    }

    const fetchRole = async () => {
      setLoadingRole(true);
      try {
        const res = await axios.get(`${BASE_URL}/users/role/${email}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setRole(res.data?.role ?? "user");
        setError(null);
      } catch (err) {

        setError("Error fetching user role");
        setRole("user");
      } finally {
        setLoadingRole(false);
      }
    };

    fetchRole();
  }, [authLoading, email, accessToken, BASE_URL]);

  return {role, roleLoading: loadingRole, error};
};

export default UserRoleCheck;
