import axios from "axios";

const BASE_URL = "http://localhost:5000/api/data"; // or your deployed backend URL

export const fetchAllData = async () => {
    try {
        const res = await axios.get(BASE_URL);
        return res.data;
    } catch (err) {
        console.error("Error fetching data:", err);
        return [];
    }
};
