# Quick Start - Get Running in 2 Minutes

## Option 1: Windows Batch Script (Easiest)

```bash
# From bench-allocation directory
start.bat
```

This opens two new terminal windows and starts both backend and frontend automatically.

---

## Option 2: Manual Setup (If batch script fails)

### Terminal 1 - Backend

```bash
cd project-bench-backend
npm run dev
```

Expected output:
```
MongoDB connected
Server running on port 5000
```

### Terminal 2 - Frontend

```bash
cd project-bench-frontend
npm run dev
```

Expected output:
```
VITE v5.0.0 ready in XXX ms
➜ Local: http://localhost:3000/
```

---

## Step 3: Access the System

1. Open browser: http://localhost:3000
2. See login page with demo credentials
3. Login with any demo account

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@bench.com | Admin@123 |
| Manager | manager@bench.com | Manager@123 |
| Employee | employee@bench.com | Employee@123 |

---

## First Test Workflow (5 minutes)

### 1. Admin Flow
- Login as admin
- Go to "Projects" tab
- Click "Create New Project"
- Fill form:
  - Name: Test Project
  - Description: Testing the system
  - Skills: React, Node
  - Team Size: 3
  - Duration: 3 months
- Click "Create Project"
- ✅ Should see success message

### 2. Manager Flow
- Logout (click user dropdown → Logout)
- Login as manager@bench.com / Manager@123
- Go to "Bench Employees" tab
- Click "Search" to see available employees
- Click "Request" on the seeded employee
- Fill form:
  - Select: employee@bench.com
  - Select: Test Project
  - Justification: "Skill match for urgent delivery"
- Click "Create Request"
- ✅ Should see success message

### 3. Admin Approval
- Logout
- Login as admin
- Go to "Pending Requests" tab
- Click "Approve" on the request
- ✅ Should see success message
- Go to "Bench Employees" tab
- ✅ Employee status should change to "Assigned"

### 4. Employee View
- Logout
- Login as employee@bench.com / Employee@123
- Should see "Assigned Project" card with project details
- ✅ Project shows: name, description, skills, team size, duration

---

## Troubleshooting Quick Fixes

### Backend won't start
```
Error: EADDRINUSE: address already in use :::5000
```
Solution: Kill process on port 5000
```powershell
# Find process
netstat -ano | findstr :5000

# Kill it (replace PID)
taskkill /PID <PID> /F
```

### Frontend won't load
- Clear browser cache: Ctrl+Shift+Delete
- Check frontend terminal for errors
- Restart: Kill and run `npm run dev` again

### MongoDB connection fails
- Open MongoDB Compass
- Verify connection to mongodb://127.0.0.1:27017
- Check .env has correct MONGO_URI

### Login fails
- Verify backend is running (check port 5000)
- Run seed script again: `npm run seed` in project-bench-backend
- Check credentials are exactly as shown

---

## What You Should See

### Login Page
- Clean, modern design
- Two input fields (email, password)
- Sign In button
- Demo credentials displayed at bottom
- Link to register

### Employee Dashboard
- Profile card with user info
- Skills section with add/update
- Bench status indicator with toggle
- If assigned: Project details card

### Manager Dashboard
- Stats cards (pending, approved, team)
- Three tabs: Dashboard, Bench Employees, My Team
- Search employees by skills
- Create request button and form
- Team members list

### Admin Dashboard
- System stats in cards
- Four tabs: Dashboard, Projects, Pending Requests, Employees
- Create project button and form
- Projects list with delete
- Pending requests with approve/reject buttons
- All employees list

---

## Next Steps After Testing

1. ✅ Verify all features work (use TEST_CHECKLIST.md)
2. Customize styling (edit src/styles/index.css)
3. Add more demo data if needed
4. Prepare for presentation
5. Deploy to production (optional)

---

## Need Help?

1. Check README.md for full documentation
2. Check TEST_CHECKLIST.md for detailed test cases
3. Look at NEXT_STEPS.md in backend folder
4. Check browser console (F12) for frontend errors
5. Check backend terminal for API errors
