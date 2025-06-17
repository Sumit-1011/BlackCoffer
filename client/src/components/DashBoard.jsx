import { useData } from "../context/DataContext";
import IntensityChart from "./charts/IntensityCharts";
import IntensityPieChart from "./charts/IntensityPieChart";
import ChoroplethChart from "./charts/ChoroplethChart";
import GroupedBarChart from "./charts/GroupedBarcChart";
import PestleChart from "./charts/PestleChart";
import BubbleChart from "./charts/BubbleChart";
import DataTable from "./charts/DataTable";

const Dashboard = () => {
    const {data, loading} = useData();
    console.log("Data from context in Dashboard:", data);

    if (loading) {
        return <div className="text-center mt-10">Loading data...</div>;
    }

    return (
        <div className="px-2">
            <h1 className="text-3xl font-bold mb-4 text-center">Data Visualization Dashboard</h1>

            {/* FilterPanel will go here */}
            {/* Charts will go here */}
            <div className=" justify-between flex flex-col sm:flex-row gap-4 mb-6">
            <IntensityChart data={data} />
            <IntensityPieChart data={data} />
            </div>
            
            <ChoroplethChart data={data} />
            <GroupedBarChart data={data} />
            <PestleChart data={data} />
            <BubbleChart data={data} />
            <DataTable data={data} />
           
            <div className="mt-6 text-center text-sm text-gray-600 font-semibold">
                Made with ❤️ by Sumit for BlackCoffer &copy; 2025
            </div>
        </div>
    );
}

export default Dashboard;
    