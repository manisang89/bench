const Allocation = require("../models/Allocation");
const Request = require("../models/Request");
const User = require("../models/User");
const { AppError, asyncHandler } = require("../utils/errorHandler");

const createRequest = asyncHandler(async (req, res) => {
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

  const request = await Request.create({
    managerId: req.user._id,
    employeeId,
    projectId,
    justification,
    status: "Pending",
  });

  res.status(201).json({
    success: true,
    message: "Request created successfully",
    data: request,
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
  createRequest,
  actionRequest,
};
