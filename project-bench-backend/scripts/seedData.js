const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing in .env");
  process.exit(1);
}

const seedUsers = [
  {
    name: "System Admin",
    email: "admin@bench.com",
    employeeId: "ADM001",
    password: "Admin@123",
    role: "Admin",
    skills: ["Leadership", "Governance"],
    benchStatus: false,
    contactDetails: "admin@bench.com",
  },
  {
    name: "Delivery Manager",
    email: "manager@bench.com",
    employeeId: "MGR001",
    password: "Manager@123",
    role: "Manager",
    skills: ["Node", "Planning"],
    benchStatus: false,
    contactDetails: "manager@bench.com",
  },
  {
    name: "Demo Employee",
    email: "employee@bench.com",
    employeeId: "EMP001",
    password: "Employee@123",
    role: "Employee",
    skills: ["React", "Node"],
    benchStatus: true,
    contactDetails: "employee@bench.com",
  },
];

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected for seeding");

    for (const user of seedUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      await User.updateOne(
        { email: user.email },
        {
          $set: {
            name: user.name,
            employeeId: user.employeeId,
            password: hashedPassword,
            role: user.role,
            skills: user.skills,
            benchStatus: user.benchStatus,
            contactDetails: user.contactDetails,
          },
        },
        { upsert: true }
      );
    }

    console.log("Seed completed");
    console.log("Admin: admin@bench.com / Admin@123");
    console.log("Manager: manager@bench.com / Manager@123");
    console.log("Employee: employee@bench.com / Employee@123");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();
