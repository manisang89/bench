const express = require("express");
const { createRequest, actionRequest } = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/create", protect, authorizeRoles("Manager"), createRequest);
router.patch("/action/:id", protect, authorizeRoles("Admin"), actionRequest);

module.exports = router;
