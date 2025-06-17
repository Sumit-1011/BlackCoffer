import { useData } from "../context/DataContext";
import ChoroplethChart from "../components/charts/ChoroplethChart";

const ChoroplethMapPage = () => {
    
    const { data, loading } = useData();
    console.log("Data from context in Map:", data);

        if (loading) {
            return <div className="text-center mt-10">Loading data...</div>;
        }

    return (
        <div className="px-2 mt-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Choropleth Map Visualization</h1>
            <ChoroplethChart data={data} />
            <div className="mt-10 text-center text-sm text-gray-600 font-semibold">
                Made with ❤️ by Sumit for BlackCoffer &copy; 2025
            </div>
        </div>
    );
}

export default ChoroplethMapPage;