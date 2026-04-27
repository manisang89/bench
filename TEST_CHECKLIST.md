# System Test Checklist

Complete this checklist to verify all features are working correctly.

## Prerequisites
- [ ] MongoDB running and connected in Compass
- [ ] Backend dependencies installed: `npm install` in project-bench-backend
- [ ] Frontend dependencies installed: `npm install` in project-bench-frontend
- [ ] Backend seeded: `npm run seed` in project-bench-backend

## Startup
- [ ] Backend running: `npm run dev` in project-bench-backend (port 5000)
- [ ] Frontend running: `npm run dev` in project-bench-frontend (port 3000)
- [ ] No CORS errors in browser console
- [ ] No connection errors in backend terminal

## Authentication Flow
- [ ] **Login Page Loads**: http://localhost:3000 shows login form
- [ ] **Demo Credentials Displayed**: All three demo logins shown on login page
- [ ] **Admin Login**: admin@bench.com / Admin@123 → Admin Dashboard
- [ ] **Manager Login**: manager@bench.com / Manager@123 → Manager Dashboard
- [ ] **Employee Login**: employee@bench.com / Employee@123 → Employee Dashboard
- [ ] **Invalid Credentials**: Wrong password shows error message
- [ ] **Logout**: User can logout from dashboard
- [ ] **Route Protection**: Try accessing /admin without admin role → redirects to login
- [ ] **Register Link**: Can navigate to register page and create new user

## Employee Dashboard
- [ ] **Profile Display**: Shows name, email, employee ID, role, status
- [ ] **Skills Display**: Shows skills (empty or from seeded data)
- [ ] **Update Profile Modal**: Opens and closes correctly
- [ ] **Add Skills**: Can add multiple skills and remove them
- [ ] **Bench Status Toggle**: Can toggle between "On Bench" and "Assigned"
- [ ] **Assigned Project**: When assigned, shows project details
- [ ] **Project Info**: Display project name, description, skills, team size, duration, status

## Manager Dashboard
- [ ] **Dashboard Tab**: Displays stats (pending, approved, rejected requests, team count)
- [ ] **Bench Employees Tab**: Shows available employees with skills
- [ ] **Search by Skills**: Can filter employees by entering skills like "React,Node"
- [ ] **My Team Tab**: Shows currently assigned team members
- [ ] **Create Request Button**: Modal opens to create resource request
- [ ] **Request Form**: Can select employee, project, and enter justification
- [ ] **Request Created**: Shows success message and request appears in system
- [ ] **Request Status**: Can view status of created requests

## Admin Dashboard
- [ ] **Stats Display**: Shows total employees, on bench, projects, pending requests
- [ ] **Create Project Button**: Modal opens with form
- [ ] **Project Form**: All fields required (name, description, skills, team size, duration)
- [ ] **Add Skills to Project**: Can add and remove required skills
- [ ] **Project Created**: Success message and project in list
- [ ] **Projects Tab**: Lists all projects with ability to delete
- [ ] **Pending Requests Tab**: Shows all pending requests with manager/employee info
- [ ] **Approve Request**: Button works, employee status changes to "Assigned"
- [ ] **Reject Request**: Button works, request marked as rejected
- [ ] **Employees Tab**: Lists all employees with current status
- [ ] **Bench List**: Correctly identifies on-bench vs assigned employees

## Complete Workflow Test
1. [ ] Admin creates project "React App Development" with skills: React, Node
2. [ ] Admin verifies project appears in Projects list
3. [ ] Manager logs in and searches employees with skills "React,Node"
4. [ ] Manager sees the seeded employee in search results
5. [ ] Manager creates request for employee to React App Development project
6. [ ] Admin logs in and sees pending request
7. [ ] Admin approves the request
8. [ ] Employee's status changes to "Assigned" (benchStatus = false)
9. [ ] Allocation appears in allocation history
10. [ ] Employee logs in and sees assigned project details
11. [ ] Manager sees employee in "My Team" tab

## Negative Tests (Should Fail Gracefully)
- [ ] Try creating project with empty name → shows error
- [ ] Try creating request without selecting fields → shows error
- [ ] Try approving request for already-assigned employee → shows error
- [ ] Try accessing manager API as employee → 403 Forbidden
- [ ] Try accessing admin API as manager → 403 Forbidden
- [ ] Try requesting unavailable employee → error message
- [ ] Try creating duplicate request for same employee/project → error message
- [ ] Wrong MongoDB connection → server fails gracefully

## UI/UX Verification
- [ ] All pages responsive (test on mobile viewport)
- [ ] Bootstrap styling applied correctly
- [ ] Custom CSS styles visible (gradients, cards, badges)
- [ ] Modals open and close smoothly
- [ ] Alert messages display correctly (errors in red, success in green)
- [ ] Loading spinners appear during operations
- [ ] Tables are responsive and readable
- [ ] Buttons are accessible and clickable
- [ ] Form inputs have proper validation feedback
- [ ] Navbar displays user info and role
- [ ] Logout button in navbar works

## API Validation (Postman/Browser)
- [ ] `GET /api/health` returns 200 success
- [ ] `POST /api/auth/login` returns token
- [ ] `GET /api/employee/profile` with valid token returns profile
- [ ] `GET /api/employee/profile` without token returns 401
- [ ] `POST /api/admin/projects` creates project successfully
- [ ] `GET /api/manager/search` returns bench employees
- [ ] `POST /api/manager/request/create` creates request
- [ ] `GET /api/admin/requests/pending` returns pending requests
- [ ] `PATCH /api/admin/requests/action/:id` approves request
- [ ] `GET /api/allocation/history` returns allocations

## Database Verification (MongoDB Compass)
- [ ] Users collection contains 3 seeded users (admin, manager, employee)
- [ ] All users have hashed passwords (not plain text)
- [ ] Projects collection has created projects
- [ ] Requests collection has resource requests with correct references
- [ ] Allocations collection has entries after approval
- [ ] Timestamps are correct (createdAt, updatedAt)

## Performance & Stability
- [ ] No console errors during normal operations
- [ ] No memory leaks (task manager check)
- [ ] Backend handles rapid requests without crashing
- [ ] Frontend doesn't freeze during API calls
- [ ] Network requests complete within reasonable time
- [ ] Refresh token/session handling works
- [ ] Can perform multiple operations in sequence

## Final Checklist
- [ ] All critical features working
- [ ] No showstopper bugs found
- [ ] System ready for demo/presentation
- [ ] Demo credentials documented
- [ ] README updated with instructions
- [ ] Startup scripts working

## Notes
- Document any issues found here
- Test on Chrome, Firefox, and Edge if possible
- Test on both Windows and another OS if available
- Ask end user for feedback after testing
