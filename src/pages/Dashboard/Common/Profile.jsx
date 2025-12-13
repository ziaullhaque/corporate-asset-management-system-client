import React, { useEffect, useState } from "react";
import { Mail, Calendar, User, Copy, Camera } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    setLoadingUserData(true);

    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then((res) => {
        setUserData(res.data?.user || null);
        setLoadingUserData(false);
      })
      .catch((err) => {
        console.error("User fetch error:", err);
        setError("Failed to load user profile");
        setLoadingUserData(false);
      });
  }, [user?.email]);

  if (loadingUserData) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  if (!userData) {
    return <p className="text-center mt-10">No user data found!</p>;
  }

  const {
    _id,
    name,
    email,
    role: userRole,
    dateOfBirth,
    profileImage,
    createdAt,
    companyName,
    companyLogo,
    subscription,
    packageLimit,
    currentEmployees,
  } = userData;

  return (
    <div className="flex-1 overflow-auto py-20 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-300 p-10"
      >
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative">
            <img
              src={profileImage || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
              className="w-28 h-28 rounded-full border-4 border-[#006d6f]/20 shadow-md object-cover"
              alt="avatar"
            />
            <span className="absolute bottom-1 right-1 bg-[#006d6f] text-white p-1 rounded-full shadow">
              <Camera size={16} />
            </span>
          </div>

          <h2 className="text-2xl font-bold text-[#006d6f] mt-4">{name}</h2>

          <p className="flex items-center text-gray-600 text-sm mt-2">
            <Mail size={16} className="mr-2" /> {email}
          </p>

          <p className="mt-2 text-sm font-medium bg-[#006d6f]/10 text-[#006d6f] px-3 py-1 rounded-full capitalize">
            {userRole}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
            <Calendar className="text-[#006d6f] w-5 h-5" />
            <div className="text-sm">
              <span className="font-semibold">Joined:</span>{" "}
              <span className="text-gray-600">
                {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
            <User className="text-[#006d6f] w-5 h-5" />
            <div className="text-sm">
              <span className="font-semibold">Date of Birth:</span>{" "}
              <span className="text-gray-600">{dateOfBirth || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* HR Only Section */}
        {role === "hr" && (
          <div className="bg-[#f5fefe] border border-[#006d6f]/20 p-6 rounded-xl mb-6">
            <h3 className="text-lg font-bold text-[#006d6f] mb-4">
              Company Information
            </h3>

            <div className="flex items-center gap-4 mb-3">
              <img
                src={companyLogo || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                className="w-16 h-16 rounded-lg border object-cover"
                alt="company"
              />
              <div>
                <p className="font-semibold text-gray-700">
                  {companyName || "N/A"}
                </p>
                <p className="text-gray-500 text-sm">
                  Subscription: {subscription || "Free"}
                </p>
            <p className="text-sm text-gray-600">
              Employee Limit:{" "}
              <span className="font-bold">{currentEmployees || 0}</span> /{" "}
              <span className="font-bold">{packageLimit || 0}</span>
            </p>
              </div>
            </div>

          </div>
        )}

        {/* User ID */}
        <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3 mb-6">
          <User className="text-[#006d6f] w-5 h-5" />
          <p className="font-semibold text-gray-700 text-sm">User ID:</p>
          <p className="text-xs text-gray-500 font-mono truncate">{_id}</p>
          <Copy className="w-4 h-4 text-[#006d6f] ml-auto cursor-pointer" />
        </div>

        {/* Update Button */}
        <button
          className="w-full bg-[#006d6f] hover:bg-[#005459] text-white py-3 rounded-lg font-semibold shadow-md"
          onClick={() => (window.location.href = "/dashboard/update-profile")}
        >
          Update Profile
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;

// import React, { useEffect, useState } from "react";
// import { Mail, Calendar, User, Copy, Building, Camera } from "lucide-react";
// import { motion } from "framer-motion";
// import useAuth from "../../../hooks/useAuth";
// import axios from "axios";
// import useRole from "../../../hooks/useRole";
// // import useUserData from "../../../hooks/useUserData";

// const Profile = () => {
//   const { user } = useAuth();
//   const {role } = useRole()
//   const [userData, setUserData] = useState(null);
//   const [loadingUserData, setLoadingUserData] = useState(true);

//   useEffect(() => {
//     if (user?.email) {
//       axios
//         .get(`${import.meta.env.VITE_API_URL}/users/${user?.email}`)
//         .then((res) => {
//           setUserData(res.data);
//           setLoadingUserData(false);
//         })
//         .catch(() => setLoadingUserData(false));
//     }
//   }, [user]);
//   console.log(userData.user);
//   // console.log(userData);
//   // const { loadingUserData } = useUserData();

//   if (loadingUserData) return <p>Loading profile...</p>;
//   if (!userData) return <p>No user data found!</p>;
//   // console.log(userData);
//   // const {
//   //   name,
//   //   email,
//   //   role,
//   //   dateOfBirth,
//   //   profileImage,
//   //   createdAt,
//   //   companyName,
//   //   companyLogo,
//   //   subscription,
//   //   packageLimit,
//   //   currentEmployees,
//   // } = userData || {};

//   return (
//     <div className="flex-1 overflow-auto p-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border p-10"
//       >
//         {/* Profile Header */}
//         <div className="flex flex-col items-center mb-10">
//           <div className="relative">
//             <img
//               src={userData.user.profileImage}
//               className="w-28 h-28 rounded-full border-4 border-[#006d6f]/20 shadow-md object-cover"
//               alt="avatar"
//             />
//             <span className="absolute bottom-1 right-1 bg-[#006d6f] text-white p-1 rounded-full shadow">
//               <Camera size={16} />
//             </span>
//           </div>

//           <h2 className="text-2xl font-bold text-[#006d6f] mt-4">
//             {userData.user.CopyName}
//           </h2>

//           <p className="flex items-center text-gray-600 text-sm mt-2">
//             <Mail size={16} className="mr-2" /> {userData.user.email}
//           </p>

//           <p className="mt-2 text-sm font-medium bg-[#006d6f]/10 text-[#006d6f] px-3 py-1 rounded-full capitalize">
//             {userData.user.role}
//           </p>
//         </div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
//             <Calendar className="text-[#006d6f] w-5 h-5" />
//             <div className="text-sm">
//               <span className="font-semibold">Joined:</span>{" "}
//               <span className="text-gray-600">
//                 {new Date(userData.user.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3">
//             <User className="text-[#006d6f] w-5 h-5" />
//             <div className="text-sm">
//               <span className="font-semibold">Date of Birth:</span>{" "}
//               <span className="text-gray-600">{userData.user.dateOfBirth}</span>
//             </div>
//           </div>
//         </div>

//         {/* HR Only Section */}
//         {role === "hr" && (
//           <div className="bg-[#f5fefe] border border-[#006d6f]/20 p-6 rounded-xl mb-6">
//             <h3 className="text-lg font-bold text-[#006d6f] mb-4">
//               Company Information
//             </h3>

//             <div className="flex items-center gap-4 mb-3">
//               <img
//                 src={user.companyLogo}
//                 className="w-16 h-16 rounded-lg border object-cover"
//               />
//               <div>
//                 <p className="font-semibold text-gray-700">
//                   {userData.user.companyName}
//                 </p>
//                 <p className="text-gray-500 text-sm">
//                   Subscription: {userData.user.subscription}
//                 </p>
//               </div>
//             </div>

//             <p className="text-sm text-gray-600">
//               Employee Limit:{" "}
//               <span className="font-bold">{userData.user.currentEmployees}</span> /{" "}
//               <span className="font-bold">{userData.user.packageLimit}</span>
//             </p>
//           </div>
//         )}

//         {/* User ID */}
//         <div className="bg-gray-50 p-4 rounded-lg border flex items-center gap-3 mb-6">
//           <User className="text-[#006d6f] w-5 h-5" />
//           <p className="font-semibold text-gray-700 text-sm">User ID:</p>
//           <p className="text-xs text-gray-500 font-mono truncate">
//             {userData.user._id}
//           </p>
//           <Copy className="w-4 h-4 text-[#006d6f] ml-auto cursor-pointer" />
//         </div>

//         {/* Update Button */}
//         <button
//           className="w-full bg-[#006d6f] hover:bg-[#005459] text-white py-3 rounded-lg font-semibold shadow-md"
//           onClick={() => (window.location.href = "/update-profile")}
//         >
//           Update Profile
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Profile;

// import React from "react";
// import { Mail, Calendar, User, Copy } from "lucide-react";
// import useAuth from "../../../hooks/useAuth";

// const Profile = () => {
//   const { user } = useAuth();
//   console.log(user);

//   return (
//     <div className="flex-1 overflow-auto p-8">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-8">
//         {/* Profile Header */}
//         <div className="flex flex-col items-center mb-10">
//           <div className="w-24 h-24 rounded-full border-4 border-blue-100 flex items-center justify-center mb-4 relative">
//             <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
//               <img
//                 src={user?.photoURL || "https://via.placeholder.com/150"}
//                 alt="profile avatar"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <div className="absolute inset-0 rounded-full border-2 border-primary"></div>
//           </div>

//           <h2 className="text-2xl font-bold text-primary mb-1">
//             {user?.displayName || "User Name"}
//           </h2>

//           <div className="flex items-center text-sm text-gray-500 mb-2">
//             <Mail className="w-4 h-4 mr-1" />
//             {user?.email}
//           </div>
//         </div>

//         {/* Info Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div className="bg-gray-50 p-4 rounded flex items-center gap-3 border">
//             <Calendar className="text-primary w-4 h-4" />
//             <div className="text-sm">
//               <span className="font-semibold text-gray-700">
//                 Account Created:
//               </span>
//               <span className="text-gray-500 ml-1">12/10/2025</span>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded flex items-center gap-3 border">
//             <Calendar className="text-primary w-4 h-4" />
//             <div className="text-sm">
//               <span className="font-semibold text-gray-700">Last Sign In:</span>
//               <span className="text-gray-500 ml-1">12/10/2025, 9:52:47 PM</span>
//             </div>
//           </div>
//         </div>

//         {/* User ID & Verified */}
//         <div className="space-y-4 mb-8">
//           <div className="bg-gray-50 p-4 rounded flex items-center gap-3 border">
//             <User className="text-primary w-4 h-4" />
//             <div className="text-sm flex items-center w-full">
//               <span className="font-semibold text-gray-700 whitespace-nowrap">
//                 User ID:
//               </span>
//               <span className="text-gray-500 ml-2 font-mono text-xs truncate">
//                 {user?.uid}
//               </span>
//               <button className="ml-auto text-primary hover:text-primary">
//                 <Copy className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           <div className="bg-gray-50 p-4 rounded flex items-center gap-3 border">
//             <div className="text-sm">
//               <span className="font-semibold text-gray-700">
//                 Email Verified:
//               </span>
//               <span className="text-red-500 font-medium ml-1">
//                 {user?.emailVerified ? "Yes" : "No"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="space-y-3">
//           <button className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded shadow-sm transition-colors">
//             Update Profile
//           </button>
//         </div>
//       </div>

//       <div className="h-10"></div>
//     </div>
//   );
// };

// export default Profile;

// // import React from "react";
// // import useAuth from "../../../hooks/useAuth";

// // const Profile = () => {
// //   const { user } = useAuth();

// //   return (
// //     <div className="flex justify-center items-center h-screen">
// //       <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
// //         <img
// //           alt="cover photo"
// //           src=""
// //           className="w-full mb-4 rounded-t-lg h-56"
// //         />
// //         <div className="flex flex-col items-center justify-center p-4 -mt-16">
// //           <a href="#" className="relative block">
// //             <img
// //               alt="profile"
// //               src={user?.photoURL}
// //               className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
// //             />
// //           </a>

// //           <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
// //             Customer
// //           </p>
// //           {/* <p className="mt-2 text-xl font-medium text-gray-800 ">
// //             User Id: {user?.uid}
// //           </p> */}
// //           <div className="w-full p-2 mt-4 rounded-lg">
// //             <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
// //               <p className="flex flex-col">
// //                 Name
// //                 <span className="font-bold text-gray-600 ">
// //                   {user?.displayName}
// //                 </span>
// //               </p>
// //               <p className="flex flex-col">
// //                 Email
// //                 <span className="font-bold text-gray-600 ">{user?.email}</span>
// //               </p>

// //               <div>
// //                 <button className="bg-lime-500  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1">
// //                   Update Profile
// //                 </button>
// //                 <button className="bg-lime-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800">
// //                   Change Password
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Profile;
