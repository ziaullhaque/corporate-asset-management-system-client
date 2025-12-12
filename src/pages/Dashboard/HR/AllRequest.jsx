import React from "react";
import { Search, Filter, Inbox } from "lucide-react";

const AllRequest = () => {
  return (
    <div className="flex-1 overflow-auto p-8">
      <h2 className="text-2xl font-bold text-[#006d6f] inline-block border-b-2 border-[#006d6f]/30 pb-1 mb-6">
        All Requests
      </h2>

      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-col md:flex-row">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search requests..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#006d6f] focus:border-[#006d6f]"
          />
        </div>

        <button className="bg-white border border-gray-300 px-4 py-2 rounded-md flex items-center gap-2 shadow-sm hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#006d6f]/20 shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#006d6f]/10 text-[#006d6f]">
            <tr>
              {[
                "Employee",
                "Asset",
                "Type",
                "Date",
                "Status",
                "Note",
                "Actions",
              ].map((t) => (
                <th
                  key={t}
                  className="py-3 px-6 text-xs font-semibold uppercase"
                >
                  {t}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan="7" className="py-16 text-center">
                <div className="flex flex-col items-center">
                  <Inbox className="w-16 h-16 text-gray-300 mb-3" />
                  <p className="text-gray-500">No requests found</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-gray-50 py-3 px-6 text-sm text-gray-500 flex justify-between">
          <span>Showing 0 to 0 of 0 entries</span>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 border rounded text-gray-400 cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRequest;

// import React from "react";
// import { Search, Filter, Inbox } from "lucide-react";

// const AllRequest = () => {
//   return (
//     <div className="flex-1 overflow-auto p-8">
//       {/* Title */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-primary inline-block border-b-2 border-primary pb-1">
//           All Requests
//         </h2>
//       </div>

//       {/* Search + Filter */}
//       <div className="flex justify-between items-center mb-6">
//         {/* Search */}
//         <div className="relative w-full max-w-md">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="w-5 h-5 text-gray-400" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search requests..."
//             className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5
//             bg-white placeholder-gray-400 text-gray-900 focus:outline-none 
//             focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
//           />
//         </div>

//         {/* Filter Button */}
//         <div className="flex gap-2">
//           <button
//             className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md 
//             text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
//           >
//             <Filter className="w-4 h-4" />
//             Filter
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50">
//                 {[
//                   "Employee",
//                   "Asset",
//                   "Type",
//                   "Date",
//                   "Status",
//                   "Note",
//                   "Actions",
//                 ].map((head) => (
//                   <th
//                     key={head}
//                     className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider"
//                   >
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             {/* Empty State */}
//             <tbody className="divide-y divide-gray-200">
//               <tr className="bg-white">
//                 <td className="py-16 text-center" colSpan={7}>
//                   <div className="flex flex-col items-center justify-center text-gray-400">
//                     <Inbox className="w-16 h-16 mb-3 opacity-50" />
//                     <p className="text-sm">No requests found</p>
//                   </div>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
//           <div className="text-xs text-gray-500">
//             Showing 0 to 0 of 0 entries
//           </div>

//           <div className="flex gap-1">
//             <button
//               disabled
//               className="px-2 py-1 rounded border border-gray-300 bg-white text-gray-400 cursor-not-allowed text-xs"
//             >
//               Previous
//             </button>
//             <button
//               disabled
//               className="px-2 py-1 rounded border border-gray-300 bg-white text-gray-400 cursor-not-allowed text-xs"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllRequest;
