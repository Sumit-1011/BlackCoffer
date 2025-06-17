import React, { useState, useMemo } from "react";

const DataTable = ({ data }) => {
  console.log("DataTable rendered with data:", data);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    const lower = searchText.toLowerCase();
    return data.filter((item) =>
      ["title", "sector", "topic", "insight", "country"]
        .some((key) => item[key]?.toLowerCase().includes(lower))
    );
  }, [searchText, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
 
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const goToPage = (page) => {
      const newPage = Math.max(1, Math.min(totalPages, page));
      setCurrentPage(newPage);
      console.log(`Navigating to page ${newPage}`);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md my-2">
      <h1 className="text-3xl font-bold mb-4 text-center">Data Table for Insights</h1>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="px-4 py-2 border rounded-md w-full sm:w-64"
        />
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Show entries:</label>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-md px-2 py-1"
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
          
          
        {/* Data Table */}
      
          <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Sector</th>
              <th className="px-4 py-2 border">Topic</th>
              <th className="px-4 py-2 border">Insight</th>
              <th className="px-4 py-2 border">Country</th>
              <th className="px-4 py-2 border">City</th>
              <th className="px-4 py-2 border">URL</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{item.title || "-"}</td>
                <td className="px-4 py-2 border">{item.sector || "-"}</td>
                <td className="px-4 py-2 border">{item.topic || "-"}</td>
                <td className="px-4 py-2 border">{item.insight || "-"}</td>
                <td className="px-4 py-2 border">{item.country || "-"}</td>
                <td className="px-4 py-2 border">{item.city || "-"}</td>
                <td className="px-4 py-2 border text-blue-600 truncate max-w-xs">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Link
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No matching records.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

          {/* Pagination Controls */}
    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mt-4">
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          &larr; Prev
        </button>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next &rarr;
        </button>
    </div>
            <div className="flex items-center gap-2">
          <label htmlFor="pageInput" className="text-sm font-medium">
            Go to page:
          </label>
          <input
            id="pageInput"
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => goToPage(Number(e.target.value))}
            className="border px-2 py-1 w-16 rounded"
          />
          <span className="text-sm text-gray-600">of {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
