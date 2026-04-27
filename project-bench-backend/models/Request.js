const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    justification: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: false,
      updatedAt: "updatedAt",
    },
  }
);

module.exports = mongoose.model("Request", requestSchema);
