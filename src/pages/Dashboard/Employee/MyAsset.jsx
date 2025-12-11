import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaUndo, FaPrint } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { MdOutlineSearchOff } from "react-icons/md";

const MyAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [assetType, setAssetType] = useState("all");

  const {
    data: assets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assigned-assets", search, assetType],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assigned-assets?search=${search}&assetType=${assetType}`
      );
      return res.data;
    },
  });

  const handleReturn = async (id) => {
    const result = await Swal.fire({
      title: "Return Asset?",
      text: "Are you sure you want to return this asset?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, return it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/assigned-assets/${id}/return`);
        if (res.data.success) {
          Swal.fire("Success", "Asset returned successfully!", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "Failed to return asset",
          "error"
        );
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const filterAssets = assets.filter((asset) => {
    const search = asset.assetName
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const searchesType = assetType === "all" || asset.assetType === assetType;
    return search && searchesType;
  });

  return (
    <div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gradient">My Assets</h1>
          {/* <button onClick={handlePrint} className="btn btn-primary">
          <FaPrint className="mr-2" /> Print
        </button> */}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered pl-10 w-full pr-10 py-2.5 rounded border border-border-light   outline-none transition-colors"
            />
          </div>
          <select
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
            className="select select-bordered"
          >
            <option value="all">All Types</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* Assets Table */}
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Assignment Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterAssets.map((asset) => (
                <tr key={asset._id}>
                  <td>
                    <img
                      src={asset.assetImage}
                      alt={asset.assetName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="font-semibold">{asset.assetName}</td>
                  <td>
                    <span
                      className={`badge ${
                        asset.assetType === "Returnable"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
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
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td>
                    {asset.status === "assigned" &&
                      asset.assetType === "Returnable" && (
                        <button
                          onClick={() => handleReturn(asset._id)}
                          className="btn btn-sm btn-primary"
                        >
                          <FaUndo className="mr-2" /> Return
                        </button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filterAssets.length === 0 && (
          <div class="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div class="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <span class=" text-3xl text-gray-400 ">
                <MdOutlineSearchOff />
              </span>
            </div>
            <h3 class="text-lg font-medium  mb-1">No assets found</h3>
            <p class="text-gray-400 text-sm max-w-sm">
              It looks like you don't have any assets assigned to you yet. Try
              adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAsset;