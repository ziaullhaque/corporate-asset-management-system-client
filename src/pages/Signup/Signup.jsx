import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
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

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);

  // HR or Employee
  const userType = watch("userType");

  const onSubmit = async (data) => {
    const { name, email, password, dateOfBirth } = data;
    // const imageFile = image[0];

    // new
    try {
      // profile image upload
      const profileImageURL = await imageUpload(data.image[0]);

      // create firebase auth user
      const result = await createUser(email, password);
      console.log(result);

      // prepare user data
      let userData = {
        name,
        email,
        image: profileImageURL,
        dateOfBirth,
      };

      if (data.userType === "hr") {
        // company logo upload
        const companyLogoURL = await imageUpload(data.companyLogo[0]);

        userData = {
          ...userData,
          role: "hr",
          companyName: data.companyName,
          companyLogo: companyLogoURL,
          packageLimit: 5,
          currentEmployees: 0,
          subscription: "basic",
        };
      } else {
        // employee
        userData.role = "employee";
      }
      console.log(userData);
      // save to database
      // await saveOrUpdateUser(userData);

      // update firebase profile
      await updateUserProfile(name, profileImageURL);

      navigate(from, { replace: true });
      Swal.fire({
        title: "Signup Successful",
        icon: "success",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err?.message,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to PlantNet</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Register As */}
          <div>
            <label className="block mb-2 text-sm">Register As</label>
            <select
              {...register("userType", { required: true })}
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
            >
              <option value="employee">Employee</option>
              <option value="hr">HR Manager</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is Required" })}
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
              placeholder="Enter your name"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label className="block mb-2 text-sm">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              className="block w-full text-sm bg-gray-100 border border-dashed border-lime-300 rounded-md py-2"
            />
          </div>

          {/* Only HR Fields */}
          {userType === "hr" && (
            <>
              {/* Company Name */}
              <div>
                <label className="block mb-2 text-sm">Company Name</label>
                <input
                  type="text"
                  {...register("companyName", { required: true })}
                  className="w-full px-3 py-2 border rounded-md bg-gray-200"
                  placeholder="Enter company name"
                />
              </div>

              {/* Company Logo */}
              <div>
                <label className="block mb-2 text-sm">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("companyLogo", { required: true })}
                  className="block w-full text-sm bg-gray-100 border border-dashed border-lime-300 rounded-md py-2"
                />
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
              placeholder="Enter your email"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block mb-2 text-sm">Date of Birth</label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
            />
          </div>

          <div className="relative">
            <label className="block mb-2 text-sm">Password</label>
            <input
              type={show ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-md bg-gray-200"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-10 cursor-pointer"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-lime-500 w-full rounded-md py-3 text-white"
          >
            {loading ? (
              <ImSpinner9 className="animate-spin m-auto" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="px-6 text-sm text-center text-gray-400 mt-3">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline text-lime-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
