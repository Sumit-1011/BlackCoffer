const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
    {
        intensity: Number,
        sector: String,
        topic: String,
        insight: String,
        url: String,
        region: String,
        added: Date,
        published: Date,
        country: String,
        relevance: Number,
        pestle: String,
        source: String,
        title: String,
        likelihood: Number,
    },
    { strict: false, timestamps: true, collection: "blackcoffer_data" }
);

module.exports = mongoose.model("data", dataSchema);
