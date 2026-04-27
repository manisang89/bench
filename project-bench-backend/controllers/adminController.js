const mongoose = require("mongoose");
const Allocation = require("../models/Allocation");
const Project = require("../models/Project");
const Request = require("../models/Request");
const User = require("../models/User");
const { AppError, asyncHandler } = require("../utils/errorHandler");

const getBenchList = asyncHandler(async (req, res) => {
  const benchEmployees = await User.find({
    role: "Employee",
    benchStatus: true,
  }).select("-password");

  res.status(200).json({
    success: true,
    count: benchEmployees.length,
    data: benchEmployees,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid user id", 400);
  }

  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

const getAdminStats = asyncHandler(async (req, res) => {
  const [totalEmployees, benchEmployees, totalProjects, pendingRequests, activeAllocations] =
    await Promise.all([
      User.countDocuments({ role: "Employee" }),
      User.countDocuments({ role: "Employee", benchStatus: true }),
      Project.countDocuments(),
      Request.countDocuments({ status: "Pending" }),
      Allocation.countDocuments({ releaseDate: null }),
    ]);

  res.status(200).json({
    success: true,
    data: {
      totalEmployees,
      benchEmployees,
      totalProjects,
      pendingRequests,
      activeAllocations,
    },
  });
});

const createProject = asyncHandler(async (req, res) => {
  const { projectName, description, requiredSkills, teamSize, duration, status } = req.body;

  if (!projectName || !description || !requiredSkills || !teamSize || !duration) {
    throw new AppError(
      "projectName, description, requiredSkills, teamSize and duration are required",
      400
    );
  }

  if (!Array.isArray(requiredSkills) || requiredSkills.length === 0) {
    throw new AppError("requiredSkills must be a non-empty array", 400);
  }

  const project = await Project.create({
    projectName,
    description,
    requiredSkills: requiredSkills.map((skill) => String(skill).trim()),
    teamSize,
    duration,
    status: status || "Open",
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid project id", 400);
  }

  const project = await Project.findById(id);
  if (!project) {
    throw new AppError("Project not found", 404);
  }

  await Project.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Project deleted successfully",
  });
});

const getPendingRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find({ status: "Pending" })
    .populate("managerId", "name email employeeId")
    .populate("employeeId", "name email employeeId skills benchStatus")
    .populate("projectId", "projectName requiredSkills duration status")
    .sort({ requestDate: -1 });

  res.status(200).json({
    success: true,
    data: requests,
  });
});

const actionRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  if (!["Approved", "Rejected"].includes(action)) {
    throw new AppError("action must be Approved or Rejected", 400);
  }

  const request = await Request.findById(id);
  if (!request) {
    throw new AppError("Request not found", 404);
  }

  if (request.status !== "Pending") {
    throw new AppError("Request already processed", 400);
  }

  request.status = action;
  await request.save();

  if (action === "Approved") {
    const employee = await User.findById(request.employeeId);
    if (!employee || !employee.benchStatus) {
      throw new AppError("Cannot approve request for unavailable employee", 400);
    }

    employee.benchStatus = false;
    await employee.save();

    await Allocation.create({
      requestId: request._id,
      employeeId: request.employeeId,
      projectId: request.projectId,
      allocatedBy: req.user._id,
      allocationDate: new Date(),
    });
  }

  res.status(200).json({
    success: true,
    message: `Request ${action.toLowerCase()} successfully`,
  });
});

module.exports = {
  getBenchList,
  deleteUser,
  getAdminStats,
  createProject,
  getAllProjects,
  deleteProject,
  getPendingRequests,
  actionRequest,
};
