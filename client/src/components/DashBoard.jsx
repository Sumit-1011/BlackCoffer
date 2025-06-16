import React, { useEffect, useState } from "react";
import { fetchAllData } from "../services/api";
import IntensityChart from "./charts/IntensityCharts";
import IntensityPieChart from "./charts/IntensityPieChart";
import ChoroplethChart from "./charts/ChoroplethChart";
import GroupedBarChart from "./charts/GroupedBarcChart";
import PestleChart from "./charts/PestleChart";

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
            <IntensityChart data={filteredData} />
            <IntensityPieChart data={filteredData} />
            <ChoroplethChart data={filteredData} />
            <GroupedBarChart data={filteredData} />
            <PestleChart data={filteredData} />

            {/* Add more charts as needed */}

        </div>
    );
}

export default Dashboard;
    