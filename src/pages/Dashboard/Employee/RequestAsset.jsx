import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, SearchX, Package, Loader2 } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  // Fetch Available Assets
  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["available-assets", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets/available?search=${search}`);
      return res.data;
    },
  });

  // Request asset function
  const handleRequest = async (id) => {
    const result = await Swal.fire({
      title: "Request this Asset?",
      text: "Your request will be sent to the HR manager.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#006d6f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Request!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.post(`/request-asset/${id}`);

        if (res.data.success) {
          Swal.fire(
            "Requested!",
            "Your asset request is submitted.",
            "success"
          );
          refetch();
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Failed to request.",
          "error"
        );
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Title */}
      <div className="mb-6">
        <h2
          className="text-2xl font-bold text-[#006d6f] inline-block pb-1 border-b-2 border-transparent relative 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#006d6f]/40"
        >
          Request Asset
        </h2>
      </div>

      {/* Search Box */}
      <div className="bg-white  rounded-lg shadow-sm border border-[#006d6f]/20 p-2 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search available assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border rounded-lg bg-gray-50  border-[#006d6f]/30 focus:outline-none focus:ring-2 focus:ring-[#006d6f]/50"
          />
          <Search className="w-5 h-5 absolute right-3 top-3 text-gray-500 " />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#006d6f]" />
        </div>
      )}

      {/* Empty State */}
      {!isLoading && assets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <SearchX className="w-12 h-12 text-gray-400 " />
          </div>

          <h3 className="text-lg font-medium text-gray-600 ">
            No available assets found
          </h3>

          <p className="mt-2 text-sm text-gray-400  max-w-sm">
            Try adjusting your search or check back later for new inventory.
          </p>
        </div>
      )}

      {/* Asset List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="p-5 bg-white border border-[#006d6f]/20 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <img
              src={asset.assetImage}
              alt={asset.assetName}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {asset.assetName}
            </h3>

            <p className="text-sm text-gray-500  mb-3">
              {asset.assetType}
            </p>

            {/* Button */}
            <button
              onClick={() => handleRequest(asset._id)}
              className="w-full py-2.5 bg-[#006d6f] hover:bg-[#005457] text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              Request Asset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestAsset;

// import React from "react";
// import { Search, SearchX } from "lucide-react";

// const RequestAsset = () => {
//   return (
//     <div className="max-w-7xl mx-auto">
//       {/* Title */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-primary border-b-2 border-transparent inline-block pb-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary/30">
//           Request Asset
//         </h2>
//       </div>

//       {/* Search Box */}
//       <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 p-2 mb-8">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search available assets..."
//             className="input input-bordered w-full pl-4 pr-12"
//           />
//           <Search className="w-5 h-5 absolute right-3 top-3 text-gray-400" />
//         </div>
//       </div>

//       {/* Empty State */}
//       <div className="flex flex-col items-center justify-center py-24 text-center">
//         <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//           <SearchX className="w-12 h-12 text-gray-400 " />
//         </div>

//         <h3 className="text-lg font-medium text-gray-500 ">
//           No available assets found
//         </h3>
//         <p className="mt-2 text-sm text-gray-400  max-w-sm">
//           Try adjusting your search or check back later for new inventory.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RequestAsset;
