require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/data", require("./routes/data"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
