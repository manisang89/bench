const express = require("express");
const {
  getBenchList,
  deleteUser,
  getAdminStats,
  createProject,
  getAllProjects,
  deleteProject,
  getPendingRequests,
  actionRequest,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect, authorizeRoles("Admin"));

router.get("/bench-list", getBenchList);
router.delete("/users/:id", deleteUser);
router.get("/stats", getAdminStats);

router.post("/projects", createProject);
router.get("/projects/all", getAllProjects);
router.delete("/projects/:id", deleteProject);

router.get("/requests/pending", getPendingRequests);
router.patch("/requests/action/:id", actionRequest);

module.exports = router;
