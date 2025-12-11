import React from "react";
import { Users, Plus } from "lucide-react";

const EmployeeList = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/20 pb-1 inline-block">
          Employee List
        </h2>

        <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-md shadow-sm flex items-center gap-2">
          <span className="opacity-90">0 / 0 employees used</span>
        </div>
      </div>

      {/* Empty State Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[400px] flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-sm mx-auto">
          {/* Icon Circle */}
          <div className="w-24 h-24 bg-gray-50 rounded-full mx-auto flex items-center justify-center mb-4">
            <Users className="w-14 h-14 text-gray-300" />
          </div>

          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No employees found
          </h3>

          <p className="text-gray-500 text-sm">
            Get started by adding a new employee to your organization's roster.
          </p>

          <button className="mt-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
