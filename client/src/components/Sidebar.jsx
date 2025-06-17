import React from "react";
import { BarChart2, Table, PieChart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 h-screen w-64 flex flex-col justify-between shadow-lg z-20 border-r border-gray-200">

      {/* Logo */}
      <div
        className="p-6 text-3xl text-center font-bold border-b border-gray-700"
        onClick={() => navigate("/")
        }
        style={{ cursor: "pointer" }}
      >
        BlackCoffer
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col space-y-2 px-4 mt-6">
        <button
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/group-bar-chart")}        
        >
          <BarChart2 size={20} />
          Grouped Bar Chart
        </button>
        <button
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors"
            onClick={() => navigate("/tables")}
          >
            <Table size={20} />
            Tables
          </button>
        <button
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => navigate("/map")}
        >
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
