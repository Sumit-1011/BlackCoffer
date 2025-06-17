// src/context/DataContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllData } from "../services/api";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllData()
            .then((res) => {
                setData(res);
                console.log("Fetched data:", res); //
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    if (loading || !data) {
        return (
          <div className="w-full h-screen flex justify-center items-center">
            <p className="text-gray-500 text-lg font-medium">Loading data...</p>
          </div>
        );
      }

    return (
        <DataContext.Provider value={{ data, loading }}>
            {children}
        </DataContext.Provider>
    );
};


