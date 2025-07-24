// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { AuthContext } from "../ContextFiles/AuthContext";

// const UserRoleCheck = () => {
//   const { user, accessToken, loading: authLoading } = useContext(AuthContext);
//   const email = user?.email;

//   const [role, setRole] = useState(null);
//   const [loadingRole, setLoadingRole] = useState(true);
//   const [error, setError] = useState(null);
//   const BASE_URL = import.meta.env.VITE_API;

//   useEffect(() => {
//     // While the main authentication is loading, this hook is also loading.
//     if (authLoading) {
//       // This line isn't strictly necessary since the initial state is true,
//       // but it correctly reflects the hook's status.
//       setLoadingRole(true); 
//       return;
//     }

//     // If authentication is finished but there's no user, they are a guest.
//     if (!email || !accessToken) {
//       setLoadingRole(false);
//       setRole("user"); // Using "guest" can be clearer than null.
//       return;
//     }

//     // If we have a user, fetch their specific role.
//     const fetchRole = async () => {
//       setLoadingRole(true);
//       try {
//         const res = await axios.get(`${BASE_URL}/users/role/${email}`, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         setRole(res.data.role || "user"); // Fallback for logged-in users
//         setError(null);
//       } catch (err) {
//         console.error(err);
//         setError("Error fetching user role");
//         setRole(null);
//       } finally {
//         setLoadingRole(false);
//       }
//     };

//     fetchRole();
//   }, [authLoading, email, accessToken, BASE_URL]);

//   // ✅ FIX: The key for the loading state has been changed back to 'roleLoading'.
//   return { role, roleLoading: loadingRole, error };
// };

// export default UserRoleCheck;



import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../ContextFiles/AuthContext";

const UserRoleCheck = () => {
  const { user, accessToken, loading: authLoading } = useContext(AuthContext);
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

        // ✅ fallback role is 'user' if no role is returned
        setRole(res.data?.role ?? "user");
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error fetching user role");
        setRole("user"); // ✅ fallback to user on error too
      } finally {
        setLoadingRole(false);
      }
    };

    fetchRole();
  }, [authLoading, email, accessToken, BASE_URL]);

  return { role, roleLoading: loadingRole, error };
};

export default UserRoleCheck;