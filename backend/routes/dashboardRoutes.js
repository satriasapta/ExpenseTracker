const express = require("express");
const {protect} = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, getDashboardData); 
console.log("protect:", typeof protect);
console.log("getDashboardData:", typeof getDashboardData);
module.exports = router;