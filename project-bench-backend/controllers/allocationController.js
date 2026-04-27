const Allocation = require("../models/Allocation");
const { asyncHandler } = require("../utils/errorHandler");

const getAllocationHistory = asyncHandler(async (req, res) => {
  const allocations = await Allocation.find()
    .populate("requestId", "status requestDate")
    .populate("employeeId", "name email employeeId")
    .populate("projectId", "projectName duration status")
    .populate("allocatedBy", "name email role")
    .sort({ allocationDate: -1 });

  res.status(200).json({
    success: true,
    count: allocations.length,
    data: allocations,
  });
});

module.exports = {
  getAllocationHistory,
};
