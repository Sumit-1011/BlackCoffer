const express = require("express");
const { getAllData } = require("../controllers/dataController");

const router = express.Router();

router.get("/", getAllData);

module.exports = router;
