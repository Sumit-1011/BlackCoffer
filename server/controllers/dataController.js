const dataModel = require("../models/dataModel");
const data = require("../models/dataModel");

async function getAllData(req, res) {
    try {
        const { sector, region } = req.query;
        const filter = {};

        if (sector) filter.sector = sector;
        if (region) filter.region = region;

        const dataResults = await data.find(filter).limit(500); // Add pagination later if needed
        res.status(200).json(dataResults);
    } catch (error) {
        console.error("Error fetching insights:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {
    getAllData,
  };