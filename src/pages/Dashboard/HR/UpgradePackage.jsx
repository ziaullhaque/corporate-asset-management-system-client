import React from "react";
import { Crown, Star, CheckCircle } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: 0,
    limit: 5,
    features: ["5 Employees", "Standard Dashboard", "Basic Support"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: 29,
    limit: 20,
    features: ["20 Employees", "Advanced Asset Tracking", "Priority Support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: 79,
    limit: 100,
    features: [
      "100 Employees",
      "Full Automation",
      "24/7 Premium Support",
      "Custom Integrations",
    ],
    highlighted: false,
  },
];

const UpgradePackage = () => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
      {/* Title */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#006d6f]">
          Upgrade Your Package
        </h2>
        <p className="text-gray-600 mt-2 text-lg">
          Scale your team and unlock more power with premium plans.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <div
            key={i}
            className={`border rounded-2xl shadow-md p-8 transition hover:-translate-y-2 hover:shadow-xl 
              ${
                pkg.highlighted
                  ? "border-[#006d6f] bg-[#006d6f]/5"
                  : "border-gray-300"
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
              {pkg.highlighted && <Crown className="text-[#006d6f] w-8 h-8" />}
            </div>

            {/* Price */}
            <p className="text-4xl font-extrabold text-[#006d6f] mt-4">
              ${pkg.price}
              <span className="text-sm text-gray-500 font-medium"> /month</span>
            </p>

            {/* Limit */}
            <p className="text-gray-600 mt-1">{pkg.limit} Employees Limit</p>

            {/* Features */}
            <ul className="mt-6 space-y-3">
              {pkg.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="text-[#006d6f] w-5 h-5" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              className={`mt-8 w-full py-3 rounded-lg font-semibold shadow 
                ${
                  pkg.highlighted
                    ? "bg-[#006d6f] text-white hover:bg-[#005b5c]"
                    : "bg-white border border-[#006d6f] text-[#006d6f] hover:bg-[#006d6f] hover:text-white"
                }
                transition
              `}
            >
              Choose {pkg.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePackage;
