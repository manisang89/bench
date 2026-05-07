const Allocation = require("../models/Allocation");
const User = require("../models/User");
const { AppError, asyncHandler } = require("../utils/errorHandler");

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.status(200).json({
    success: true,
    data: user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const { skills, contactDetails } = req.body;

  if (skills !== undefined) {
    if (!Array.isArray(skills) || skills.length === 0) {
      throw new AppError("skills must be a non-empty array", 400);
    }

    const invalidSkill = skills.find(
      (skill) => typeof skill !== "string" || !skill.trim()
    );
    if (invalidSkill) {
      throw new AppError("All skills must be non-empty strings", 400);
    }
  }

  const updateData = {};
  if (skills !== undefined) {
    updateData.skills = skills.map((s) => s.trim());
  }
  if (contactDetails !== undefined) {
    updateData.contactDetails = String(contactDetails).trim();
  }

  const user = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
});

const updateBenchStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["Bench", "Assigned"].includes(status)) {
    throw new AppError("status must be either Bench or Assigned", 400);
  }

  // Check if employee has active allocation and is trying to mark as Bench
  if (status === "Bench") {
    const activeAllocation = await Allocation.findOne({
      employeeId: req.user._id,
      releaseDate: null,
    });

    if (activeAllocation) {
      throw new AppError(
        "Cannot mark as Bench while assigned to a project. Please wait for project release or ask your manager to release you.",
        400
      );
    }
  }

  const benchStatus = status === "Bench";

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { benchStatus },
    { new: true, runValidators: true }
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Bench status updated",
    data: {
      id: user._id,
      benchStatus: user.benchStatus,
      status,
    },
  });
});

const getAssignedProject = asyncHandler(async (req, res) => {
  const activeAllocation = await Allocation.findOne({
    employeeId: req.user._id,
    releaseDate: null,
  })
    .sort({ allocationDate: -1 })
    .populate("projectId", "projectName description requiredSkills teamSize duration status");

  if (!activeAllocation) {
    throw new AppError("No assigned project found", 404);
  }

  res.status(200).json({
    success: true,
    data: activeAllocation.projectId,
  });
});

module.exports = {
  getProfile,
  updateProfile,
  updateBenchStatus,
  getAssignedProject,
};
