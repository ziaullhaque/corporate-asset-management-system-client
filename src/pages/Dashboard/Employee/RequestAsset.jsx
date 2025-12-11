import React from "react";
import { Search, SearchX } from "lucide-react";

const RequestAsset = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary border-b-2 border-transparent inline-block pb-1 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary/30">
          Request Asse
        </h2>
      </div>

      {/* Search Box */}
      <div className="bg-base-100 dark:bg-base-200 rounded-lg shadow-sm border border-base-300 p-2 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search available assets..."
            className="input input-bordered w-full pl-4 pr-12"
          />
          <Search className="w-5 h-5 absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <SearchX className="w-12 h-12 text-gray-400 " />
        </div>

        <h3 className="text-lg font-medium text-gray-500 ">
          No available assets found
        </h3>
        <p className="mt-2 text-sm text-gray-400  max-w-sm">
          Try adjusting your search or check back later for new inventory.
        </p>
      </div>
    </div>
  );
};

export default RequestAsset;
