import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch Assets from Server (Update API URL)
    fetch(`${import.meta.env.VITE_API_URL}/assets`)
      .then((res) => res.json())
      .then((data) => setAssets(data));
  }, []);

  // Search filter
  const filteredAssets = assets.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Asset List</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search assets..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Zebra Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-gray-200 text-black">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Total Qty</th>
              <th>Available</th>
              <th>Date Added</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <tr key={asset._id}>
                  <td>{index + 1}</td>

                  {/* Product Image */}
                  <td>
                    <img
                      src={asset.productImage}
                      alt={asset.productName}
                      className="w-12 h-12 rounded-md object-cover border"
                    />
                  </td>

                  <td className="font-semibold">{asset.productName}</td>

                  <td>
                    <span
                      className={`badge ${
                        asset.productType === "Returnable"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {asset.productType}
                    </span>
                  </td>

                  <td>{asset.productQuantity}</td>

                  <td>{asset.availableQuantity}</td>

                  <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>

                  {/* Edit/Delete Actions */}
                  <td className="flex gap-3 justify-center">
                    <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
                      <FaEdit />
                    </button>
                    <button className="btn btn-sm bg-red-500 text-white hover:bg-red-600">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No assets found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
