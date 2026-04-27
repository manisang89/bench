const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    allocatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    allocationDate: {
      type: Date,
      default: Date.now,
    },
    releaseDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Allocation", allocationSchema);
