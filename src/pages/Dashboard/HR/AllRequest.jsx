import React from "react";
import { Search, Filter, Inbox } from "lucide-react";

const AllRequest = () => {
  return (
    <div className="flex-1 overflow-auto p-8">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary inline-block border-b-2 border-primary pb-1">
          All Request
        </h2>
      </div>

      {/* Search + Filter */}
      <div className="flex justify-between items-center mb-6">
        {/* Search */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search requests..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5
            bg-white placeholder-gray-400 text-gray-900 focus:outline-none 
            focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        {/* Filter Button */}
        <div className="flex gap-2">
          <button
            className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md 
            text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors shadow-sm"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {[
                  "Employee",
                  "Asset",
                  "Type",
                  "Date",
                  "Status",
                  "Note",
                  "Actions",
                ].map((head) => (
                  <th
                    key={head}
                    className="py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Empty State */}
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-white">
                <td className="py-16 text-center" colSpan={7}>
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Inbox className="w-16 h-16 mb-3 opacity-50" />
                    <p className="text-sm">No requests found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Showing 0 to 0 of 0 entries
          </div>

          <div className="flex gap-1">
            <button
              disabled
              className="px-2 py-1 rounded border border-gray-300 bg-white text-gray-400 cursor-not-allowed text-xs"
            >
              Previous
            </button>
            <button
              disabled
              className="px-2 py-1 rounded border border-gray-300 bg-white text-gray-400 cursor-not-allowed text-xs"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllRequest;
