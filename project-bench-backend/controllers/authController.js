const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AppError, asyncHandler } = require("../utils/errorHandler");

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

const register = asyncHandler(async (req, res) => {
  const { name, email, employeeId, password } = req.body;

  if (!name || !email || !employeeId || !password) {
    throw new AppError("Name, email, employeeId and password are required", 400);
  }

  const existing = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { employeeId }],
  });
  if (existing) {
    throw new AppError("Email or employeeId already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    employeeId,
    password: hashedPassword,
    role: "Employee",
  });

  res.status(201).json({
    success: true,
    message: "Employee registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      employeeId: user.employeeId,
      role: user.role,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateToken(user._id, user.role);

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      employeeId: user.employeeId,
      role: user.role,
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, employeeId, newPassword } = req.body;

  if (!email || !employeeId || !newPassword) {
    throw new AppError("Email, employeeId and newPassword are required", 400);
  }

  const user = await User.findOne({
    email: email.toLowerCase(),
    employeeId,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
  });
});

module.exports = {
  register,
  login,
  logout,
  resetPassword,
};
