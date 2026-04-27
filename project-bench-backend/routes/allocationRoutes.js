const express = require("express");
const { getAllocationHistory } = require("../controllers/allocationController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/history", protect, authorizeRoles("Admin", "Manager"), getAllocationHistory);

module.exports = router;
