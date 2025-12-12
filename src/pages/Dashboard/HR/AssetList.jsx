import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Search, PackageX } from "lucide-react";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/assets`)
      .then((res) => res.json())
      .then((data) => setAssets(data));
  }, []);

  const filteredAssets = assets.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#006d6f] mb-6 pb-1 inline-block border-b-2 border-[#006d6f]/30">
        Asset List
      </h1>

      {/* Search Bar */}
      <div className="mb-6 bg-white border border-[#006d6f]/20 p-4 rounded-xl shadow-sm flex items-center gap-3">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search assets..."
            className="input input-bordered w-full pl-10 border-[#006d6f]/30 focus:ring-[#006d6f] focus:border-[#006d6f]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#006d6f]/20 shadow-sm">
        <table className="table w-full">
          <thead className="bg-[#006d6f]/10 text-[#006d6f]">
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

          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset, index) => (
                <tr key={asset._id} className="hover:bg-[#006d6f]/5 transition">
                  <td className="font-medium">{index + 1}</td>

                  {/* Image */}
                  <td>
                    <img
                      src={asset.productImage}
                      alt={asset.productName}
                      className="w-14 h-14 rounded-md object-cover border border-gray-200"
                    />
                  </td>

                  {/* Name */}
                  <td className="font-semibold text-gray-700">
                    {asset.productName}
                  </td>

                  {/* Type Badge */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        asset.productType === "Returnable"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {asset.productType}
                    </span>
                  </td>

                  {/* Quantities */}
                  <td>{asset.productQuantity}</td>
                  <td>{asset.availableQuantity}</td>

                  {/* Date */}
                  <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>

                  {/* Action Buttons */}
                  <td className="flex gap-3 justify-center">
                    <button className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white shadow">
                      <FaEdit />
                    </button>

                    <button className="btn btn-sm bg-red-500 hover:bg-red-600 text-white shadow">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-16 text-gray-500">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <PackageX className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="font-medium">No assets found</p>
                    <span className="text-sm text-gray-400">
                      Try another search keyword.
                    </span>
                  </div>
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

// import { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const AssetList = () => {
//   const [assets, setAssets] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     // Fetch Assets from Server (Update API URL)
//     fetch(`${import.meta.env.VITE_API_URL}/assets`)
//       .then((res) => res.json())
//       .then((data) => setAssets(data));
//   }, []);

//   // Search filter
//   const filteredAssets = assets.filter((item) =>
//     item.productName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6">Asset List</h1>

//       {/* Search Bar */}
//       <div className="mb-4 flex justify-between items-center">
//         <input
//           type="text"
//           placeholder="Search assets..."
//           className="input input-bordered w-full max-w-xs"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Zebra Table */}
//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           {/* Table Head */}
//           <thead className="bg-gray-200 text-black">
//             <tr>
//               <th>#</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Total Qty</th>
//               <th>Available</th>
//               <th>Date Added</th>
//               <th className="text-center">Actions</th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {filteredAssets.length > 0 ? (
//               filteredAssets.map((asset, index) => (
//                 <tr key={asset._id}>
//                   <td>{index + 1}</td>

//                   {/* Product Image */}
//                   <td>
//                     <img
//                       src={asset.productImage}
//                       alt={asset.productName}
//                       className="w-12 h-12 rounded-md object-cover border"
//                     />
//                   </td>

//                   <td className="font-semibold">{asset.productName}</td>

//                   <td>
//                     <span
//                       className={`badge ${
//                         asset.productType === "Returnable"
//                           ? "badge-success"
//                           : "badge-warning"
//                       }`}
//                     >
//                       {asset.productType}
//                     </span>
//                   </td>

//                   <td>{asset.productQuantity}</td>

//                   <td>{asset.availableQuantity}</td>

//                   <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>

//                   {/* Edit/Delete Actions */}
//                   <td className="flex gap-3 justify-center">
//                     <button className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
//                       <FaEdit />
//                     </button>
//                     <button className="btn btn-sm bg-red-500 text-white hover:bg-red-600">
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center py-6 text-gray-500">
//                   No assets found!
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AssetList;
