import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = "employee", isLoading: roleLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data.user.role;
    },
  });

  return { role, roleLoading: authLoading || roleLoading };
};

export default useRole;

// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useRole = () => {
//   const { user, loading: authLoading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: role = "employee",
//     isLoading: roleLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["userRole", user?.email],
//     enabled:
//       !authLoading && !!user?.email && typeof user?.getIdToken === "function",
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `${import.meta.env.VITE_API_URL}/users/${user.email}`
//       );
//       return res.data.role;
//     },
//   });

//   return { role, roleLoading: authLoading || roleLoading, refetch };
// };

// export default useRole;
// // import React from "react";
// // import useAuth from "./useAuth";
// // import useAxiosSecure from "./useAxiosSecure";
// // import { useQuery } from "@tanstack/react-query";

// // const useRole = () => {
// //   const { user, loading } = useAuth();
// //   const axiosSecure = useAxiosSecure();

// //   const { data: role, isLoading: isRoleLoading } = useQuery({
// //     enabled: !loading && !!user?.email,
// //     queryKey: ["role", user?.email],
// //     queryFn: async () => {
// //       const { data } = await axiosSecure(`/user/role`);
// //       //   const { data } = await axiosSecure.get(`/user/role/${user?.email}`);
// //       return data.role;
// //     },
// //   });
// //   //   return {role, isRoleLoading};
// //   return [role, isRoleLoading];
// // };

// // export default useRole;
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data, isLoading: isRoleLoading } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: ["role", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/user/role/${user?.email}`);
//       return res.data;
//     },
//   });

//   return {
//     role: data?.role || "employee",
//     userData: data?.userData || {},
//     isRoleLoading,
//   };
// };

// export default useRole;
