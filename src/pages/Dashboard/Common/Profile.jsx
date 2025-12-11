import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  LogOut,
  User,
  Copy,
  Globe,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border p-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full border-4 border-blue-100 flex items-center justify-center mb-4 relative">
            <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="profile avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-primary"></div>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-1">
            {user?.displayName || "User Name"}
          </h2>

          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Mail className="w-4 h-4 mr-1" />
            {user?.email}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded flex items-center gap-3 border">
            <Calendar className="text-primary w-4 h-4" />
            <div className="text-sm">
              <span className="font-semibold text-gray-700">
                Account Created:
              </span>
              <span className="text-gray-500 ml-1">12/10/2025</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded flex items-center gap-3 border">
            <Calendar className="text-primary w-4 h-4" />
            <div className="text-sm">
              <span className="font-semibold text-gray-700">Last Sign In:</span>
              <span className="text-gray-500 ml-1">12/10/2025, 9:52:47 PM</span>
            </div>
          </div>
        </div>

        {/* User ID & Verified */}
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded flex items-center gap-3 border">
            <User className="text-primary w-4 h-4" />
            <div className="text-sm flex items-center w-full">
              <span className="font-semibold text-gray-700 whitespace-nowrap">
                User ID:
              </span>
              <span className="text-gray-500 ml-2 font-mono text-xs truncate">
                {user?.uid}
              </span>
              <button className="ml-auto text-primary hover:text-primary">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded flex items-center gap-3 border">
            <div className="text-sm">
              <span className="font-semibold text-gray-700">
                Email Verified:
              </span>
              <span className="text-red-500 font-medium ml-1">
                {user?.emailVerified ? "Yes" : "No"}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2.5 rounded shadow-sm transition-colors">
            Update Profile
          </button>

          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded shadow-sm flex items-center justify-center gap-2 transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="h-10"></div>
    </div>
  );
};

export default Profile;

// import React from "react";
// import useAuth from "../../../hooks/useAuth";

// const Profile = () => {
//   const { user } = useAuth();

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
//         <img
//           alt="cover photo"
//           src=""
//           className="w-full mb-4 rounded-t-lg h-56"
//         />
//         <div className="flex flex-col items-center justify-center p-4 -mt-16">
//           <a href="#" className="relative block">
//             <img
//               alt="profile"
//               src={user?.photoURL}
//               className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
//             />
//           </a>

//           <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
//             Customer
//           </p>
//           {/* <p className="mt-2 text-xl font-medium text-gray-800 ">
//             User Id: {user?.uid}
//           </p> */}
//           <div className="w-full p-2 mt-4 rounded-lg">
//             <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
//               <p className="flex flex-col">
//                 Name
//                 <span className="font-bold text-gray-600 ">
//                   {user?.displayName}
//                 </span>
//               </p>
//               <p className="flex flex-col">
//                 Email
//                 <span className="font-bold text-gray-600 ">{user?.email}</span>
//               </p>

//               <div>
//                 <button className="bg-lime-500  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1">
//                   Update Profile
//                 </button>
//                 <button className="bg-lime-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800">
//                   Change Password
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
