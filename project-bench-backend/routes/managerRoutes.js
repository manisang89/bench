const express = require("express");
const {
  searchBenchEmployees,
  getBenchEmployeeDetails,
  getManagerAllocations,
  getMyTeam,
  createManagerRequest,
  getManagerRequestStatus,
  getManagerDashboard,
  getManagerProjects,
} = require("../controllers/managerController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorizeRoles("Manager"));

router.get("/search", searchBenchEmployees);
router.get("/bench-details/:id", getBenchEmployeeDetails);

router.get("/allocations", getManagerAllocations);
router.get("/my-team", getMyTeam);
router.get("/projects", getManagerProjects);

router.post("/request/create", createManagerRequest);
router.get("/request/status", getManagerRequestStatus);
router.get("/dashboard", getManagerDashboard);

module.exports = router;
