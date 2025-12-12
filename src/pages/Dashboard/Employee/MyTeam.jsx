import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Search, Users, UserX } from "lucide-react";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Fetch team members (HR or Employee → company wise)
  const { data: team = [], isLoading } = useQuery({
    queryKey: ["my-team", search, roleFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-team?search=${search}&role=${roleFilter}`
      );
      return res.data;
    },
  });

  // FILTER locally
  const filteredTeam = team.filter((member) => {
    const matchSearch = member.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || member.role === roleFilter;
    return matchSearch && matchRole;
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Title */}
      <div className="mb-6">
        <h2
          className="text-2xl font-bold text-[#006d6f] inline-block pb-1 border-b-2 border-transparent relative 
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#006d6f]/40"
        >
          My Team
        </h2>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white border border-[#006d6f]/20 p-4 rounded-xl shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search team members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border rounded-lg bg-gray-50 border-[#006d6f]/30 
            focus:outline-none focus:ring-2 focus:ring-[#006d6f]/50"
          />
          <Search className="w-5 h-5 absolute right-3 top-3 text-gray-400" />
        </div>

        {/* Filter by role */}
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="select select-bordered border-[#006d6f]/40 focus:border-[#006d6f] w-full md:w-52"
        >
          <option value="all">All Roles</option>
          <option value="employee">Employees</option>
          <option value="hr">HR Managers</option>
        </select>
      </div>

      {/* Empty State */}
      {filteredTeam.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <UserX className="w-12 h-12 text-gray-400" />
          </div>

          <h3 className="text-lg font-medium text-gray-600">
            No team members found
          </h3>

          <p className="mt-2 text-sm text-gray-400 max-w-sm">
            Try adjusting your search or filter options.
          </p>
        </div>
      )}

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeam.map((member) => (
          <div
            key={member._id}
            className="p-6 bg-white border border-[#006d6f]/20 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <img
                src={member.profileImage}
                alt={member.name}
                className="w-16 h-16 rounded-full border-2 border-[#006d6f]/40 object-cover"
              />

              <div className="flex-1">
                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>

                {/* Email */}
                <p className="text-sm text-gray-500">{member.email}</p>

                {/* Role Badge */}
                <span
                  className={`mt-2 inline-block text-xs px-3 py-1 rounded-full 
                  ${
                    member.role === "hr"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {member.role.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-4 text-xs text-gray-500">
              Joined: {new Date(member.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTeam;
