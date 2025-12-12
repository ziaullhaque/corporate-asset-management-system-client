import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaLock,
  FaBuilding,
} from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";

const SignUp = () => {
  const { createUser, updateUserProfile, loading } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userType = watch("userType");

  // const onSubmit = async (data) => {
  //   try {
  //     const profileImageURL = await imageUpload(data.image[0]);
  //     const result = await createUser(data.email, data.password);

  //     let userData = {
  //       name: data.name,
  //       email: data.email,
  //       image: profileImageURL,
  //       dateOfBirth: data.dateOfBirth,
  //     };

  //     if (data.userType === "hr") {
  //       const companyLogoURL = await imageUpload(data.companyLogo[0]);
  //       userData = {
  //         ...userData,
  //         role: "hr",
  //         companyName: data.companyName,
  //         companyLogo: companyLogoURL,
  //         packageLimit: 5,
  //         currentEmployees: 0,
  //         subscription: "basic",
  //       };
  //     } else {
  //       userData.role = "employee";
  //     }
  //     console.log(userData);

  //     await updateUserProfile(data.name, profileImageURL);

  //     Swal.fire({ title: "Signup Successful", icon: "success" });
  //     navigate(from, { replace: true });
  //   } catch (err) {
  //     Swal.fire({ icon: "error", title: err?.message });
  //   }
  // };
  const onSubmit = async (data) => {
    try {
      // 1️⃣ Upload Profile Image
      const profileImageURL = await imageUpload(data.image[0]);

      // 2️⃣ Create Firebase User
      const result = await createUser(data.email, data.password);

      // 3️⃣ Update Firebase Profile (Name + Photo)
      await updateUserProfile(data.name, profileImageURL);

      // 4️⃣ Prepare User Data for Server
      let userData = {
        name: data.name,
        email: data.email,
        role: data.userType, // hr / employee
        image: profileImageURL,
        dateOfBirth: data.dateOfBirth,
      };

      // 5️⃣ HR Extra Data
      if (data.userType === "hr") {
        const companyLogoURL = await imageUpload(data.companyLogo[0]);

        userData.companyName = data.companyName;
        userData.companyLogo = companyLogoURL;
        userData.packageLimit = 5;
        userData.currentEmployees = 0;
        userData.subscription = "basic";
      }

      console.log("Sending Data to Server:", userData);

      // 6️⃣ Send to Backend Server (POST /register)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const resultData = await res.json();
      console.log(resultData);

      if (!res.ok) {
        throw new Error(resultData.message || "Failed to register");
      }

      // 7️⃣ Success
      Swal.fire({ title: "Signup Successful", icon: "success" });

      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({ icon: "error", title: err?.message });
    }
  };



  return (
    <main className="flex-grow min-h-screen flex flex-col justify-center py-12 pt-34 px-4 sm:px-6 lg:px-8 relative">
      {/* Glow BG */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] bg-[#006d6f]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-[#006d6f]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#006d6f]">
          Create Your Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Join us and start managing assets efficiently
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-[550px]">
        <div className="bg-white py-8 px-4 shadow-xl rounded-xl sm:px-10 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ROLE SELECT */}
            <div>
              <label className="block text-sm font-bold mb-3">
                Select Your Role <span className="text-[#006d6f]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {/* HR Manager */}
                <div
                  className={`relative flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all border group 
                  ${
                    userType === "hr"
                      ? "border-[#006d6f] bg-[#006d6f]/10"
                      : "border-gray-300 hover:border-[#006d6f]"
                  }`}
                >
                  <FaBuilding className="text-3xl text-gray-400 group-hover:text-[#006d6f] mb-2 bg-gray-100 p-2 rounded-full" />
                  <span className="font-bold group-hover:text-[#006d6f]">
                    HR Manager
                  </span>
                  <span className="text-xs text-gray-500">
                    Manage company assets
                  </span>

                  <input
                    type="radio"
                    value="hr"
                    {...register("userType", { required: true })}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                {/* Employee */}
                <div
                  className={`relative flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all border 
                  ${
                    userType !== "hr"
                      ? "border-[#006d6f] bg-[#006d6f]/10"
                      : "border-gray-300 hover:border-[#006d6f]"
                  }`}
                >
                  <FaUser className="text-3xl text-[#006d6f] mb-2 bg-[#006d6f]/10 p-2 rounded-full" />
                  <span className="font-bold text-[#006d6f]">Employee</span>
                  <span className="text-xs text-gray-500">
                    Join as an employee
                  </span>

                  <input
                    type="radio"
                    value="employee"
                    {...register("userType", { required: true })}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Full Name *
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400" />
                <input
                  {...register("name", { required: true })}
                  placeholder="Enter your full name"
                  className="w-full pl-10 py-2.5 border rounded-md bg-gray-100"
                />
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Profile Image *
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="w-full bg-gray-100 border border-dashed border-[#006d6f] rounded-md p-2"
              />
            </div>

            {/* HR Extra Fields */}
            {userType === "hr" && (
              <>
                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type="date"
                      {...register("dateOfBirth", { required: true })}
                      className="w-full pl-10 py-2.5 border rounded-md bg-gray-100"
                    />
                  </div>
                </div>
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Company Name *
                  </label>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-4 text-gray-400" />
                    <input
                      {...register("companyName", { required: true })}
                      placeholder="Company Name"
                      className="w-full pl-10 py-2.5 border rounded-md bg-gray-100"
                    />
                  </div>
                </div>

                {/* Company Logo */}
                <div>
                  <label className="block text-sm font-bold mb-2">
                    Company Logo *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("companyLogo", { required: true })}
                    className="w-full bg-gray-100 border border-dashed border-[#006d6f] rounded-md p-2"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2">Email *</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                <input
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="w-full pl-10 py-2.5 border rounded-md bg-gray-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2">Password *</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-4 text-gray-400" />

                <input
                  type={show ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="*******"
                  className="w-full pl-10 pr-10 py-2.5 border rounded-md bg-gray-100"
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#006d6f] hover:bg-[#005355] text-white py-3 rounded-md font-bold shadow"
            >
              {loading ? (
                <ImSpinner9 className="animate-spin m-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-[#006d6f] font-bold hover:underline ml-1"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
