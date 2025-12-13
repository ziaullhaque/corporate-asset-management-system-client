import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCalendarAlt, FaBuilding, FaSave } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { imageUpload } from "../../../utils";

const UpdateProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`${import.meta.env.VITE_API_URL}/users/${user.email}`)
      .then((res) => {
        setUserData(res.data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const form = e.target;
    let profileImage = userData.profileImage;
    let companyLogo = userData.companyLogo;

    try {
      if (form.profileImage.files[0]) {
        profileImage = await imageUpload(form.profileImage.files[0]);
      }

      if (userData.role === "hr" && form.companyLogo?.files[0]) {
        companyLogo = await imageUpload(form.companyLogo.files[0]);
      }

      const updatedData = {
        name: form.name.value,
        dateOfBirth: form.dateOfBirth.value,
        profileImage,
        companyName: userData.role === "hr" ? form.companyName.value : undefined,
        companyLogo,
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        updatedData
      );

      Swal.fire("Success", "Profile updated successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white border rounded-xl shadow p-8"
      >
        <h2 className="text-2xl font-bold text-[#006d6f] mb-6">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Full Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                name="name"
                defaultValue={userData.name}
                className="w-full pl-10 py-2 border rounded-md bg-gray-100"
                required
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-semibold mb-1">Date of Birth</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                name="dateOfBirth"
                defaultValue={userData.dateOfBirth}
                className="w-full pl-10 py-2 border rounded-md bg-gray-100"
                required
              />
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className="block font-semibold mb-1">Profile Image</label>
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              className="w-full bg-gray-100 border rounded-md p-2"
            />
          </div>

          {/* HR Only */}
          {userData.role === "hr" && (
            <>
              <div>
                <label className="block font-semibold mb-1">Company Name</label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                  <input
                    name="companyName"
                    defaultValue={userData.companyName}
                    className="w-full pl-10 py-2 border rounded-md bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Company Logo</label>
                <input
                  type="file"
                  name="companyLogo"
                  accept="image/*"
                  className="w-full bg-gray-100 border rounded-md p-2"
                />
              </div>
            </>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-[#006d6f] hover:bg-[#005459] text-white py-3 rounded-md font-bold"
          >
            <FaSave />
            {saving ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
