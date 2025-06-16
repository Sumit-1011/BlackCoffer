import React, { useEffect, useState } from "react";
import { fetchAllData } from "../services/api";
import IntensityChart from "./charts/IntensityCharts";
import IntensityPieChart from "./charts/IntensityPieChart";
import ChoroplethChart from "./charts/ChoroplethChart";
import GroupedBarChart from "./charts/GroupedBarcChart";
import PestleChart from "./charts/PestleChart";
import BubbleChart from "./charts/BubbleChart";
import DataTable from "./charts/DataTable";

function Dashboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetchAllData().then((res) => {
            setData(res);
            setFilteredData(res); // initially no filters
        });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Data Visualization Dashboard</h1>

            {/* FilterPanel will go here */}
            {/* Charts will go here */}
            <div className=" justify-between flex flex-col sm:flex-row gap-4 mb-6">
            <IntensityChart data={filteredData} />
            <IntensityPieChart data={filteredData} />
            </div>
            
            <ChoroplethChart data={filteredData} />
            <GroupedBarChart data={filteredData} />
            <PestleChart data={filteredData} />
            <BubbleChart data={filteredData} />
            <DataTable data={filteredData} />
           
            <div className="mt-10 text-center text-sm text-gray-600 font-semibold">
                Made with ❤️ by Sumit for BlackCoffer &copy; 2025
            </div>
        </div>
    );
}

export default Dashboard;
    