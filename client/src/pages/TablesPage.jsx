import DataTable from "../components/charts/DataTable";
import { useData } from "../context/DataContext"; // make sure this path is correct

const DataTablePage = () => {
  const { data, loading } = useData();

  if (loading) {
    return <div className="text-center mt-10">Loading data...</div>;
  }

  return (
    <div className="p-2 mt-4">
      <DataTable data={data} />
      <div className="mt-10 text-center text-sm text-gray-600 font-semibold">
        Made with ❤️ by Sumit for BlackCoffer &copy; 2025
      </div>
    </div>
  );
};

export default DataTablePage;
