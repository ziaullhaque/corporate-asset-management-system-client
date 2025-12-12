import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaUndo } from "react-icons/fa";
import { MdOutlineSearchOff } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const MyAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const [assetType, setAssetType] = useState("all");

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-assets`);
      return res.data;
    },
  });

  const handleReturn = async (id) => {
    const result = await Swal.fire({
      title: "Return Asset?",
      text: "Are you sure you want to return this asset?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006d6f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/assigned-assets/${id}/return`);
      if (res.data.success) {
        Swal.fire("Returned!", "Asset returned successfully.", "success");
        refetch();
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  // FINAL FILTERING
  const filteredAssets = assets.filter((asset) => {
    const matchSearch = asset.assetName
      ?.toLowerCase()
      .includes(searchText.toLowerCase());

    const matchType =
      assetType === "all" ? true : asset.assetType === assetType;

    return matchSearch && matchType;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#006d6f]">My Assets</h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Search Input */}
        <div className="relative col-span-2">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search asset..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
        </div>

        {/* Type Filter */}
        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="all">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="table w-full">
          <thead className="bg-[#006d6f] text-white text-sm">
            <tr>
              <th>Image</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Company</th>
              <th>Assigned</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.map((asset) => (
              <tr key={asset._id} className="hover:bg-gray-50">
                <td>
                  <img
                    src={asset.assetImage}
                    alt={asset.assetName}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                </td>

                <td className="font-semibold">{asset.assetName}</td>

                <td>
                  <span
                    className={`badge ${
                      asset.assetType === "Returnable"
                        ? "badge-success"
                        : "badge-warning"
                    } text-xs`}
                  >
                    {asset.assetType}
                  </span>
                </td>

                <td>{asset.companyName}</td>

                <td>{new Date(asset.assignmentDate).toLocaleDateString()}</td>

                <td>
                  <span
                    className={`badge ${
                      asset.status === "assigned"
                        ? "badge-success"
                        : "badge-info"
                    } text-xs`}
                  >
                    {asset.status}
                  </span>
                </td>

                <td className="text-center">
                  {asset.status === "assigned" &&
                    asset.assetType === "Returnable" && (
                      <button
                        onClick={() => handleReturn(asset._id)}
                        className="btn btn-sm bg-[#006d6f] text-white hover:bg-[#005556]"
                      >
                        <FaUndo className="mr-1" />
                        Return
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {filteredAssets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <MdOutlineSearchOff className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mt-4">No assets found</h3>
          <p className="text-gray-500 max-w-xs text-center">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyAsset;

// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaSearch, FaUndo, FaPrint } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import { MdOutlineSearchOff } from "react-icons/md";

// const MyAsset = () => {
//   const axiosSecure = useAxiosSecure();
//   const [search, setSearch] = useState("");
//   const [assetType, setAssetType] = useState("all");

//   const {
//     data: assets = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["assigned-assets", search, assetType],
//     queryFn: async () => {
//       const res = await axiosSecure.get(
//         `/assigned-assets?search=${search}&assetType=${assetType}`
//       );
//       return res.data;
//     },
//   });

//   const handleReturn = async (id) => {
//     const result = await Swal.fire({
//       title: "Return Asset?",
//       text: "Are you sure you want to return this asset?",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, return it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         const res = await axiosSecure.patch(`/assigned-assets/${id}/return`);
//         if (res.data.success) {
//           Swal.fire("Success", "Asset returned successfully!", "success");
//           refetch();
//         }
//       } catch (error) {
//         Swal.fire(
//           "Error",
//           error.response?.data?.message || "Failed to return asset",
//           "error"
//         );
//       }
//     }
//   };

//   if (isLoading) return <LoadingSpinner />;

//   const filterAssets = assets.filter((asset) => {
//     const search = asset.assetName
//       ?.toLowerCase()
//       .includes(search.toLowerCase());
//     const searchesType = assetType === "all" || asset.assetType === assetType;
//     return search && searchesType;
//   });

//   return (
//     <div>
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-3xl font-bold text-gradient">My Assets</h1>
//           {/* <button onClick={handlePrint} className="btn btn-primary">
//           <FaPrint className="mr-2" /> Print
//         </button> */}
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
//             <input
//               type="text"
//               placeholder="Search assets..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="input input-bordered pl-10 w-full pr-10 py-2.5 rounded border border-border-light   outline-none transition-colors"
//             />
//           </div>
//           <select
//             value={assetType}
//             onChange={(e) => setAssetType(e.target.value)}
//             className="select select-bordered"
//           >
//             <option value="all">All Types</option>
//             <option value="Returnable">Returnable</option>
//             <option value="Non-returnable">Non-returnable</option>
//           </select>
//         </div>

//         {/* Assets Table */}
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr>
//                 <th>Image</th>
//                 <th>Asset Name</th>
//                 <th>Type</th>
//                 <th>Company</th>
//                 <th>Assignment Date</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filterAssets.map((asset) => (
//                 <tr key={asset._id}>
//                   <td>
//                     <img
//                       src={asset.assetImage}
//                       alt={asset.assetName}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   </td>
//                   <td className="font-semibold">{asset.assetName}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         asset.assetType === "Returnable"
//                           ? "badge-success"
//                           : "badge-warning"
//                       }`}
//                     >
//                       {asset.assetType}
//                     </span>
//                   </td>
//                   <td>{asset.companyName}</td>
//                   <td>{new Date(asset.assignmentDate).toLocaleDateString()}</td>
//                   <td>
//                     <span
//                       className={`badge ${
//                         asset.status === "assigned"
//                           ? "badge-success"
//                           : "badge-info"
//                       }`}
//                     >
//                       {asset.status}
//                     </span>
//                   </td>
//                   <td>
//                     {asset.status === "assigned" &&
//                       asset.assetType === "Returnable" && (
//                         <button
//                           onClick={() => handleReturn(asset._id)}
//                           className="btn btn-sm btn-primary"
//                         >
//                           <FaUndo className="mr-2" /> Return
//                         </button>
//                       )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filterAssets.length === 0 && (
//           <div class="flex flex-col items-center justify-center py-20 px-4 text-center">
//             <div class="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
//               <span class=" text-3xl text-gray-400 ">
//                 <MdOutlineSearchOff />
//               </span>
//             </div>
//             <h3 class="text-lg font-medium  mb-1">No assets found</h3>
//             <p class="text-gray-400 text-sm max-w-sm">
//               It looks like you don't have any assets assigned to you yet. Try
//               adjusting your search or filters.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyAsset;
