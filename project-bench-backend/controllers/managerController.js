const mongoose = require("mongoose");
const Allocation = require("../models/Allocation");
const Project = require("../models/Project");
const Request = require("../models/Request");
const User = require("../models/User");
const { AppError, asyncHandler } = require("../utils/errorHandler");

const searchBenchEmployees = asyncHandler(async (req, res) => {
  const { skills = "", q = "" } = req.query;

  const skillList = skills
    ? String(skills)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const query = {
    role: "Employee",
    benchStatus: true,
  };

  if (skillList.length > 0) {
    query.skills = { $all: skillList };
  }

  if (q) {
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { employeeId: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
    ];
  }

  const employees = await User.find(query).select("-password");

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
});

const getBenchEmployeeDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid employee id", 400);
  }

  const employee = await User.findOne({
    _id: id,
    role: "Employee",
    benchStatus: true,
  }).select("-password");

  if (!employee) {
    throw new AppError("Bench employee not found", 404);
  }

  res.status(200).json({
    success: true,
    data: employee,
  });
});

const getManagerAllocations = asyncHandler(async (req, res) => {
  const requestIds = await Request.find({ managerId: req.user._id }).select("_id");

  const allocations = await Allocation.find({
    requestId: { $in: requestIds.map((r) => r._id) },
  })
    .populate("employeeId", "name email employeeId skills benchStatus")
    .populate("projectId", "projectName requiredSkills duration status")
    .populate("allocatedBy", "name email role")
    .sort({ allocationDate: -1 });

  res.status(200).json({
    success: true,
    data: allocations,
  });
});

const getMyTeam = asyncHandler(async (req, res) => {
  const managerRequests = await Request.find({
    managerId: req.user._id,
    status: "Approved",
  }).select("_id");

  const teamAllocations = await Allocation.find({
    requestId: { $in: managerRequests.map((r) => r._id) },
    releaseDate: null,
  })
    .populate("employeeId", "name email employeeId skills")
    .populate("projectId", "projectName duration status")
    .sort({ allocationDate: -1 });

  res.status(200).json({
    success: true,
    count: teamAllocations.length,
    data: teamAllocations,
  });
});

const createManagerRequest = asyncHandler(async (req, res) => {
  const { employeeId, projectId, justification } = req.body;

  if (!employeeId || !projectId || !justification) {
    throw new AppError("employeeId, projectId and justification are required", 400);
  }

  const employee = await User.findOne({ _id: employeeId, role: "Employee" });
  if (!employee) {
    throw new AppError("Employee not found", 404);
  }

  if (!employee.benchStatus) {
    throw new AppError("Cannot assign unavailable employee", 400);
  }

  const duplicatePending = await Request.findOne({
    employeeId,
    projectId,
    status: "Pending",
  });
  if (duplicatePending) {
    throw new AppError("Duplicate pending request for this employee and project", 409);
  }

  const request = await Request.create({
    managerId: req.user._id,
    employeeId,
    projectId,
    justification,
    status: "Pending",
  });

  res.status(201).json({
    success: true,
    message: "Resource request created successfully",
    data: request,
  });
});

const getManagerRequestStatus = asyncHandler(async (req, res) => {
  const requests = await Request.find({ managerId: req.user._id })
    .populate("employeeId", "name email employeeId skills")
    .populate("projectId", "projectName requiredSkills duration status")
    .sort({ requestDate: -1 });

  res.status(200).json({
    success: true,
    data: requests,
  });
});

const getManagerDashboard = asyncHandler(async (req, res) => {
  const [pendingRequests, approvedRequests, rejectedRequests, myTeamCount] =
    await Promise.all([
      Request.countDocuments({ managerId: req.user._id, status: "Pending" }),
      Request.countDocuments({ managerId: req.user._id, status: "Approved" }),
      Request.countDocuments({ managerId: req.user._id, status: "Rejected" }),
      Allocation.countDocuments({ releaseDate: null }),
    ]);

  res.status(200).json({
    success: true,
    data: {
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      activeAllocations: myTeamCount,
    },
  });
});

const getManagerProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

module.exports = {
  searchBenchEmployees,
  getBenchEmployeeDetails,
  getManagerAllocations,
  getMyTeam,
  createManagerRequest,
  getManagerRequestStatus,
  getManagerDashboard,
  getManagerProjects,
};
