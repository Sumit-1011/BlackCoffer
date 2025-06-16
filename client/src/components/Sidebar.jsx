import React from "react";
import { BarChart2, LineChart, PieChart, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 flex flex-col justify-between shadow-lg z-20 bg-gray-100">

      {/* Logo */}
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        BlackCoffer
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col space-y-2 px-4 mt-6">
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors">
          <BarChart2 size={20} />
          Grouped Bar Chart
        </button>
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors">
          <LineChart size={20} />
          Line Chart
        </button>
        <button className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors">
          <PieChart size={20} />
          Choropleth Map
        </button>
        {/* Add more buttons as needed */}
      </div>

      {/* Logout Button */}
      <div className="px-4 mb-6">
        <button className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-600 transition-colors">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
