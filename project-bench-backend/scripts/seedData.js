const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Project = require("../models/Project");
const Request = require("../models/Request");
const Allocation = require("../models/Allocation");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is missing in .env");
  process.exit(1);
}

const adminSeeds = [
  {
    name: "System Admin",
    email: "admin@bench.com",
    employeeId: "ADM001",
    password: "Admin@123",
    role: "Admin",
    skills: ["Governance", "Risk Management"],
    benchStatus: false,
    contactDetails: "+1-202-555-0101",
  },
  {
    name: "Platform Admin",
    email: "ops.admin@bench.com",
    employeeId: "ADM002",
    password: "Admin@123",
    role: "Admin",
    skills: ["Platform Oversight", "Process Design"],
    benchStatus: false,
    contactDetails: "+1-202-555-0102",
  },
];

const managerSeeds = [
  {
    name: "Delivery Manager",
    email: "manager@bench.com",
    employeeId: "MGR001",
    password: "Manager@123",
    role: "Manager",
    skills: ["Node", "Planning"],
    benchStatus: false,
    contactDetails: "+1-202-555-0201",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@bench.com",
    employeeId: "MGR002",
    password: "Manager@123",
    role: "Manager",
    skills: ["React", "Stakeholder Management"],
    benchStatus: false,
    contactDetails: "+1-202-555-0202",
  },
  {
    name: "Rahul Mehta",
    email: "rahul.mehta@bench.com",
    employeeId: "MGR003",
    password: "Manager@123",
    role: "Manager",
    skills: ["Java", "Delivery Planning"],
    benchStatus: false,
    contactDetails: "+1-202-555-0203",
  },
  {
    name: "Ananya Iyer",
    email: "ananya.iyer@bench.com",
    employeeId: "MGR004",
    password: "Manager@123",
    role: "Manager",
    skills: ["Cloud", "Resource Planning"],
    benchStatus: false,
    contactDetails: "+1-202-555-0204",
  },
  {
    name: "Arjun Singh",
    email: "arjun.singh@bench.com",
    employeeId: "MGR005",
    password: "Manager@123",
    role: "Manager",
    skills: ["API Design", "Team Leadership"],
    benchStatus: false,
    contactDetails: "+1-202-555-0205",
  },
  {
    name: "Neha Kapoor",
    email: "neha.kapoor@bench.com",
    employeeId: "MGR006",
    password: "Manager@123",
    role: "Manager",
    skills: ["Agile", "Process Improvement"],
    benchStatus: false,
    contactDetails: "+1-202-555-0206",
  },
  {
    name: "Vikram Rao",
    email: "vikram.rao@bench.com",
    employeeId: "MGR007",
    password: "Manager@123",
    role: "Manager",
    skills: ["QA", "Release Coordination"],
    benchStatus: false,
    contactDetails: "+1-202-555-0207",
  },
  {
    name: "Meera Nair",
    email: "meera.nair@bench.com",
    employeeId: "MGR008",
    password: "Manager@123",
    role: "Manager",
    skills: ["Data Delivery", "Performance Planning"],
    benchStatus: false,
    contactDetails: "+1-202-555-0208",
  },
];

const employeeSeeds = [
  {
    name: "Demo Employee",
    email: "employee@bench.com",
    employeeId: "EMP001",
    password: "Employee@123",
    role: "Employee",
    skills: ["React", "Node"],
    benchStatus: false,
    contactDetails: "+1-202-555-0301",
  },
  {
    name: "Nisha Kapoor",
    email: "nisha.kapoor@bench.com",
    employeeId: "EMP002",
    password: "Employee@123",
    role: "Employee",
    skills: ["TypeScript", "Next.js"],
    benchStatus: false,
    contactDetails: "+1-202-555-0302",
  },
  {
    name: "Karan Patel",
    email: "karan.patel@bench.com",
    employeeId: "EMP003",
    password: "Employee@123",
    role: "Employee",
    skills: ["Node", "Express"],
    benchStatus: false,
    contactDetails: "+1-202-555-0303",
  },
  {
    name: "Aisha Khan",
    email: "aisha.khan@bench.com",
    employeeId: "EMP004",
    password: "Employee@123",
    role: "Employee",
    skills: ["React", "Redux"],
    benchStatus: false,
    contactDetails: "+1-202-555-0304",
  },
  {
    name: "Rohan Desai",
    email: "rohan.desai@bench.com",
    employeeId: "EMP005",
    password: "Employee@123",
    role: "Employee",
    skills: ["Java", "Spring Boot"],
    benchStatus: false,
    contactDetails: "+1-202-555-0305",
  },
  {
    name: "Sana Ali",
    email: "sana.ali@bench.com",
    employeeId: "EMP006",
    password: "Employee@123",
    role: "Employee",
    skills: ["Python", "Django"],
    benchStatus: false,
    contactDetails: "+1-202-555-0306",
  },
  {
    name: "Aditya Verma",
    email: "aditya.verma@bench.com",
    employeeId: "EMP007",
    password: "Employee@123",
    role: "Employee",
    skills: ["AWS", "Terraform"],
    benchStatus: false,
    contactDetails: "+1-202-555-0307",
  },
  {
    name: "Sneha Joshi",
    email: "sneha.joshi@bench.com",
    employeeId: "EMP008",
    password: "Employee@123",
    role: "Employee",
    skills: ["QA Automation", "Cypress"],
    benchStatus: false,
    contactDetails: "+1-202-555-0308",
  },
  {
    name: "Vivek Sood",
    email: "vivek.sood@bench.com",
    employeeId: "EMP009",
    password: "Employee@123",
    role: "Employee",
    skills: ["MongoDB", "Express"],
    benchStatus: false,
    contactDetails: "+1-202-555-0309",
  },
  {
    name: "Tanya Bansal",
    email: "tanya.bansal@bench.com",
    employeeId: "EMP010",
    password: "Employee@123",
    role: "Employee",
    skills: ["Power BI", "SQL"],
    benchStatus: false,
    contactDetails: "+1-202-555-0310",
  },
  {
    name: "Harsh Sharma",
    email: "harsh.sharma@bench.com",
    employeeId: "EMP011",
    password: "Employee@123",
    role: "Employee",
    skills: ["Flutter", "Firebase"],
    benchStatus: false,
    contactDetails: "+1-202-555-0311",
  },
  {
    name: "Isha Pandey",
    email: "isha.pandey@bench.com",
    employeeId: "EMP012",
    password: "Employee@123",
    role: "Employee",
    skills: ["GraphQL", "TypeScript"],
    benchStatus: false,
    contactDetails: "+1-202-555-0312",
  },
  {
    name: "Siddharth Jain",
    email: "siddharth.jain@bench.com",
    employeeId: "EMP013",
    password: "Employee@123",
    role: "Employee",
    skills: ["Python", "FastAPI"],
    benchStatus: false,
    contactDetails: "+1-202-555-0313",
  },
  {
    name: "Pooja Kulkarni",
    email: "pooja.kulkarni@bench.com",
    employeeId: "EMP014",
    password: "Employee@123",
    role: "Employee",
    skills: ["Node", "NestJS"],
    benchStatus: false,
    contactDetails: "+1-202-555-0314",
  },
  {
    name: "Rahul Nambiar",
    email: "rahul.nambiar@bench.com",
    employeeId: "EMP015",
    password: "Employee@123",
    role: "Employee",
    skills: ["React", "Material UI"],
    benchStatus: false,
    contactDetails: "+1-202-555-0315",
  },
  {
    name: "Kavya Menon",
    email: "kavya.menon@bench.com",
    employeeId: "EMP016",
    password: "Employee@123",
    role: "Employee",
    skills: ["Java", "Microservices"],
    benchStatus: false,
    contactDetails: "+1-202-555-0316",
  },
  {
    name: "Manish Gupta",
    email: "manish.gupta@bench.com",
    employeeId: "EMP017",
    password: "Employee@123",
    role: "Employee",
    skills: ["Azure", "DevOps"],
    benchStatus: false,
    contactDetails: "+1-202-555-0317",
  },
  {
    name: "Anjali Bhat",
    email: "anjali.bhat@bench.com",
    employeeId: "EMP018",
    password: "Employee@123",
    role: "Employee",
    skills: ["React Native", "Expo"],
    benchStatus: false,
    contactDetails: "+1-202-555-0318",
  },
  {
    name: "Arun Pillai",
    email: "arun.pillai@bench.com",
    employeeId: "EMP019",
    password: "Employee@123",
    role: "Employee",
    skills: ["SQL", "Data Modeling"],
    benchStatus: false,
    contactDetails: "+1-202-555-0319",
  },
  {
    name: "Divya Rao",
    email: "divya.rao@bench.com",
    employeeId: "EMP020",
    password: "Employee@123",
    role: "Employee",
    skills: ["Testing", "Playwright"],
    benchStatus: false,
    contactDetails: "+1-202-555-0320",
  },
  {
    name: "Nikhil Kulshrestha",
    email: "nikhil.kulshrestha@bench.com",
    employeeId: "EMP021",
    password: "Employee@123",
    role: "Employee",
    skills: ["Angular", "RxJS"],
    benchStatus: false,
    contactDetails: "+1-202-555-0321",
  },
  {
    name: "Simran Gill",
    email: "simran.gill@bench.com",
    employeeId: "EMP022",
    password: "Employee@123",
    role: "Employee",
    skills: ["Vue", "Nuxt"],
    benchStatus: false,
    contactDetails: "+1-202-555-0322",
  },
  {
    name: "Aman Sethi",
    email: "aman.sethi@bench.com",
    employeeId: "EMP023",
    password: "Employee@123",
    role: "Employee",
    skills: ["C#", ".NET"],
    benchStatus: false,
    contactDetails: "+1-202-555-0323",
  },
  {
    name: "Ritika Chawla",
    email: "ritika.chawla@bench.com",
    employeeId: "EMP024",
    password: "Employee@123",
    role: "Employee",
    skills: ["Figma", "UI Design"],
    benchStatus: false,
    contactDetails: "+1-202-555-0324",
  },
  {
    name: "Deepak Mendiratta",
    email: "deepak.mendiratta@bench.com",
    employeeId: "EMP025",
    password: "Employee@123",
    role: "Employee",
    skills: ["Docker", "Kubernetes"],
    benchStatus: false,
    contactDetails: "+1-202-555-0325",
  },
  {
    name: "Neelam Arora",
    email: "neelam.arora@bench.com",
    employeeId: "EMP026",
    password: "Employee@123",
    role: "Employee",
    skills: ["Node", "GraphQL"],
    benchStatus: false,
    contactDetails: "+1-202-555-0326",
  },
  {
    name: "Gaurav Bedi",
    email: "gaurav.bedi@bench.com",
    employeeId: "EMP027",
    password: "Employee@123",
    role: "Employee",
    skills: ["Backend", "REST APIs"],
    benchStatus: false,
    contactDetails: "+1-202-555-0327",
  },
  {
    name: "Bhavna Khurana",
    email: "bhavna.khurana@bench.com",
    employeeId: "EMP028",
    password: "Employee@123",
    role: "Employee",
    skills: ["React", "Testing"],
    benchStatus: false,
    contactDetails: "+1-202-555-0328",
  },
  {
    name: "Tarun Kapoor",
    email: "tarun.kapoor@bench.com",
    employeeId: "EMP029",
    password: "Employee@123",
    role: "Employee",
    skills: ["DevOps", "AWS"],
    benchStatus: false,
    contactDetails: "+1-202-555-0329",
  },
  {
    name: "Megha Solanki",
    email: "megha.solanki@bench.com",
    employeeId: "EMP030",
    password: "Employee@123",
    role: "Employee",
    skills: ["Python", "ML"],
    benchStatus: false,
    contactDetails: "+1-202-555-0330",
  },
  {
    name: "Yash Bansal",
    email: "yash.bansal@bench.com",
    employeeId: "EMP031",
    password: "Employee@123",
    role: "Employee",
    skills: ["React", "Tailwind"],
    benchStatus: false,
    contactDetails: "+1-202-555-0331",
  },
  {
    name: "Komal Chadha",
    email: "komal.chadha@bench.com",
    employeeId: "EMP032",
    password: "Employee@123",
    role: "Employee",
    skills: ["JavaScript", "Accessibility"],
    benchStatus: false,
    contactDetails: "+1-202-555-0332",
  },
  {
    name: "Piyush Malhotra",
    email: "piyush.malhotra@bench.com",
    employeeId: "EMP033",
    password: "Employee@123",
    role: "Employee",
    skills: ["Java", "Spring"],
    benchStatus: false,
    contactDetails: "+1-202-555-0333",
  },
  {
    name: "Shreya Ahuja",
    email: "shreya.ahuja@bench.com",
    employeeId: "EMP034",
    password: "Employee@123",
    role: "Employee",
    skills: ["Node", "MongoDB"],
    benchStatus: false,
    contactDetails: "+1-202-555-0334",
  },
  {
    name: "Mudit Saxena",
    email: "mudit.saxena@bench.com",
    employeeId: "EMP035",
    password: "Employee@123",
    role: "Employee",
    skills: ["Cloud", "Security"],
    benchStatus: false,
    contactDetails: "+1-202-555-0335",
  },
  {
    name: "Ira Chatterjee",
    email: "ira.chatterjee@bench.com",
    employeeId: "EMP036",
    password: "Employee@123",
    role: "Employee",
    skills: ["Data", "Visualization"],
    benchStatus: false,
    contactDetails: "+1-202-555-0336",
  },
  {
    name: "Naveen Reddy",
    email: "naveen.reddy@bench.com",
    employeeId: "EMP037",
    password: "Employee@123",
    role: "Employee",
    skills: ["React", "Performance"],
    benchStatus: true,
    contactDetails: "+1-202-555-0337",
  },
  {
    name: "Zoya Farooqui",
    email: "zoya.farooqui@bench.com",
    employeeId: "EMP038",
    password: "Employee@123",
    role: "Employee",
    skills: ["QA", "Automation"],
    benchStatus: true,
    contactDetails: "+1-202-555-0338",
  },
  {
    name: "Kabir Sinha",
    email: "kabir.sinha@bench.com",
    employeeId: "EMP039",
    password: "Employee@123",
    role: "Employee",
    skills: ["Backend", "APIs"],
    benchStatus: true,
    contactDetails: "+1-202-555-0339",
  },
  {
    name: "Lavanya Srinivasan",
    email: "lavanya.srinivasan@bench.com",
    employeeId: "EMP040",
    password: "Employee@123",
    role: "Employee",
    skills: ["Design Systems", "Figma"],
    benchStatus: true,
    contactDetails: "+1-202-555-0340",
  },
];

const projectNames = [
  "Customer Self-Service Portal",
  "Finance Reconciliation Engine",
  "Retail Inventory Tracker",
  "Internal Knowledge Hub",
  "Sales Forecast Dashboard",
  "Mobile Onboarding Journey",
  "Vendor Compliance Suite",
  "Support Ticket Automation",
  "Cloud Cost Optimizer",
  "Employee Performance Review Tool",
  "Healthcare Appointment Scheduler",
  "Order Fulfillment Tracker",
  "Marketing Campaign Manager",
  "Fraud Detection Console",
  "Learning Pathway Platform",
  "Warehouse Efficiency Monitor",
  "API Gateway Modernization",
  "Real Estate Lead Tracker",
  "Procurement Approval Portal",
  "Field Service Dispatch App",
  "Analytics Data Mart Upgrade",
  "Partner Onboarding Workflow",
  "Subscription Billing Hub",
  "Customer Loyalty Engine",
  "Quality Assurance Dashboard",
  "Supply Chain Visibility Layer",
  "Project Capacity Planner",
  "IoT Device Telemetry Portal",
  "Travel Expense Automation",
  "Risk Register Centralization",
  "Knowledge Base Search Revamp",
  "Performance Testing Harness",
  "Data Privacy Compliance Pack",
  "Digital Signature Workflow",
  "Resource Allocation Cockpit",
  "Executive KPI Snapshot",
];

const projectSkillSets = [
  ["React", "Node"],
  ["Java", "Spring Boot"],
  ["Python", "Django"],
  ["TypeScript", "Next.js"],
  ["AWS", "Terraform"],
  ["MongoDB", "Express"],
  ["QA Automation", "Cypress"],
  ["Power BI", "SQL"],
  ["Flutter", "Firebase"],
  ["GraphQL", "REST APIs"],
];

const projectStatuses = ["Open", "In Progress", "Completed", "Open", "In Progress"];

const justifications = [
  "Need immediate support for a priority delivery milestone.",
  "Project timeline requires an additional full-stack developer.",
  "Customer launch is blocked without these specific skills.",
  "The team needs extra bandwidth for the next release cycle.",
  "We are scaling the platform and need a quick allocation.",
  "The initiative is behind schedule and needs bench support.",
  "A new feature stream needs an experienced engineer.",
  "We are backfilling a critical role during the sprint.",
  "This workstream requires a cross-functional delivery partner.",
  "We need dedicated support for testing and rollout.",
];

const daysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const buildUsers = async () => {
  const allUsers = [...adminSeeds, ...managerSeeds, ...employeeSeeds];

  return Promise.all(
    allUsers.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );
};

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected for seeding");

    await Promise.all([
      Allocation.deleteMany({}),
      Request.deleteMany({}),
      Project.deleteMany({}),
      User.deleteMany({}),
    ]);

    const users = await buildUsers();
    const insertedUsers = await User.insertMany(users);

    const adminDocs = insertedUsers.filter((user) => user.role === "Admin");
    const managerDocs = insertedUsers.filter((user) => user.role === "Manager");
    const employeeDocs = insertedUsers.filter((user) => user.role === "Employee");

    const projects = projectNames.map((projectName, index) => ({
      projectName,
      description: `Delivery of ${projectName.toLowerCase()} with a production-ready rollout, documented handover, and measurable business value.`,
      requiredSkills: projectSkillSets[index % projectSkillSets.length],
      teamSize: 2 + (index % 4),
      duration: `${3 + (index % 6)} months`,
      status: projectStatuses[index % projectStatuses.length],
    }));

    const insertedProjects = await Project.insertMany(projects);

    const approvedRequestCount = 36;
    const pendingRequestCount = 4;
    const rejectedRequestCount = 2;

    const requests = [];

    for (let index = 0; index < approvedRequestCount; index += 1) {
      const employee = employeeDocs[index];
      const manager = managerDocs[index % managerDocs.length];
      const project = insertedProjects[index % insertedProjects.length];
      const requestDate = daysAgo(52 - index);

      requests.push({
        managerId: manager._id,
        employeeId: employee._id,
        projectId: project._id,
        justification: justifications[index % justifications.length],
        status: "Approved",
        requestDate,
        updatedAt: addDays(requestDate, 1),
      });
    }

    for (let index = 0; index < pendingRequestCount; index += 1) {
      const employee = employeeDocs[36 + index];
      const manager = managerDocs[(index + 4) % managerDocs.length];
      const project = insertedProjects[24 + index];
      const requestDate = daysAgo(10 - index);

      requests.push({
        managerId: manager._id,
        employeeId: employee._id,
        projectId: project._id,
        justification: justifications[(index + 3) % justifications.length],
        status: "Pending",
        requestDate,
        updatedAt: requestDate,
      });
    }

    for (let index = 0; index < rejectedRequestCount; index += 1) {
      const employee = employeeDocs[37 + index];
      const manager = managerDocs[(index + 6) % managerDocs.length];
      const project = insertedProjects[30 + index];
      const requestDate = daysAgo(6 - index);

      requests.push({
        managerId: manager._id,
        employeeId: employee._id,
        projectId: project._id,
        justification: justifications[(index + 6) % justifications.length],
        status: "Rejected",
        requestDate,
        updatedAt: addDays(requestDate, 1),
      });
    }

    const insertedRequests = await Request.insertMany(requests);
    const approvedRequests = insertedRequests.filter((request) => request.status === "Approved");

    const allocations = approvedRequests.map((request, index) => ({
      requestId: request._id,
      employeeId: request.employeeId,
      projectId: request.projectId,
      allocatedBy: request.managerId,
      allocationDate: addDays(request.requestDate, 1 + (index % 3)),
      releaseDate: index % 6 === 0 ? addDays(request.requestDate, 30 + index) : null,
    }));

    await Allocation.insertMany(allocations);

    console.log("Seed completed successfully");
    console.log(`Users seeded: ${insertedUsers.length} (${adminDocs.length} admins, ${managerDocs.length} managers, ${employeeDocs.length} employees)`);
    console.log(`Projects seeded: ${insertedProjects.length}`);
    console.log(`Requests seeded: ${insertedRequests.length} (${approvedRequests.length} approved)`);
    console.log(`Allocations seeded: ${allocations.length}`);
    console.log("Demo credentials preserved:");
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