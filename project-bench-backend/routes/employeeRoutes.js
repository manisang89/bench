const express = require("express");
const {
  getProfile,
  updateProfile,
  updateBenchStatus,
  getAssignedProject,
} = require("../controllers/employeeController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorizeRoles("Employee"));

router.get("/profile", getProfile);
router.put("/update", updateProfile);
router.patch("/status", updateBenchStatus);
router.get("/project", getAssignedProject);

module.exports = router;
