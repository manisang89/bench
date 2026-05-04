# User Guide - Complete System Instructions

## 👥 Role-Based User Guides

This guide provides instructions for each role in the Bench Allocation System.

---

## 🎯 Quick Start for All Users

### First Time Login

**Step 1: Visit Homepage**
- Go to: http://localhost:5173 (or production URL)
- Click "Login" button

**Step 2: Enter Credentials**
- Use credentials provided by administrator
- Email format: xxx@bench.com
- Password: See welcome email

**Step 3: You're In!**
- You'll be taken to your role-specific dashboard
- Your name appears in top-right corner

**Step 4: Change Password**
- Click your name in top-right
- Select "Profile Settings"
- Enter new password
- Save changes

---

## 👤 Employee Guide

### Dashboard Overview

When you log in as an Employee, you see:

**Profile Section**
- Your name
- Email address
- Employee ID
- Current skills
- Bench/Assigned status

**My Project Section**
- If Assigned: Shows your current project details
- If On Bench: Shows instructions to update status

**Edit Profile**
- Click "Edit Profile" to update name or email
- Changes save immediately
- You'll see success message

---

### Managing Your Profile

**Update Personal Information:**

1. Click "Edit Profile" button
2. Fields become editable:
   - Name (letters only, min 3 chars)
   - Email (valid format required)
3. Make changes
4. Click "Save Changes"
5. Success message: "Profile updated successfully"

**Profile Requirements:**
- Name: At least 3 characters, letters only
- Email: Valid email format (xxx@yyy.com)
- EmployeeId: Assigned by admin, cannot change

---

### Managing Skills

**Add a New Skill:**

1. In "Skills" section, click "Add Skill" button
2. New input field appears
3. Type skill name (e.g., "React", "Python", "Leadership")
4. Click "Add" button
5. Skill appears in your list as a badge
6. Skill is immediately saved

**Remove a Skill:**

1. Find skill in your skills list
2. Click the "X" (remove) button on the skill badge
3. Skill disappears from list
4. Change is immediately saved

**Tips for Skills:**
- Add all technical skills you have
- Include soft skills (Communication, Leadership)
- Update when you learn new skills
- Remove if you no longer use them
- Managers search for employees by these skills

---

### Bench Status Management

**What is Bench Status?**
- **Bench (Green):** You're available for new projects
- **Assigned (Red):** You're already on a project

**Change Your Status:**

1. Look for "Bench Status" indicator (large badge)
2. Current status displays: Either "🟢 Bench" or "🔴 Assigned"
3. Click "Toggle Status" button
4. Status changes immediately
5. Success message confirms change

**Important:**
- When status is "Bench," managers can see you
- Managers search for employees to allocate to projects
- When "Assigned," you don't appear in manager searches
- You'll be taken off "Assigned" when project ends
- Keep status updated so correct work comes your way

---

### View Your Project Assignment

**When You're Not Assigned:**
- Section shows: "No assigned project"
- Helpful message: "Set your status to Bench to receive allocations"
- Administrator will assign you when you toggle to Bench

**When You're Assigned:**
- Shows project name you're assigned to
- Description of the project
- Required skills for the project (as badges)
- Team size (how many people total)
- Project duration (how long it runs)
- Start date (when you began)
- Release date (if known, when you'll be released)

**What This Means:**
- Your manager assigned you to this project
- You're part of this team
- Complete the work within the duration
- You can view project details anytime
- Check with your manager about next steps

---

### Dashboard Statistics

Your employee dashboard shows:
- Your profile completeness
- Your bench status
- Your current project (if any)
- Your skill count
- Your project history (if applicable)

---

### Important Employee Rules

✅ **Do:**
- Keep profile updated
- Add all your skills
- Update bench status accurately
- Review your assigned projects
- Report issues to your manager

❌ **Don't:**
- Share your login credentials
- Log in from unauthorized devices
- Add fake skills
- Ignore project assignments
- Leave old skills that don't apply

---

## 👔 Manager Guide

### Dashboard Overview

When you log in as a Manager, you see:

**Dashboard Statistics**
- Total bench employees available
- Team size (how many assigned to you)
- Your pending allocation requests
- Your approved allocations
- Team members overview

**Main Sections**
1. Search Employees
2. My Team
3. My Requests
4. Create Request

---

### Searching for Employees

**Basic Single Skill Search:**

1. Go to "Search Employees" tab
2. Skill Search field appears
3. Type a skill (e.g., "React")
4. Click "Search" button
5. Results show all Bench employees with that skill

**Multi-Skill Search:**

1. In Skill field, type: "React,Node.js"
2. Separate skills with commas (no spaces needed)
3. Click "Search"
4. Results show employees with ALL listed skills
5. Much narrower results (more specific matches)

**Search Results Show:**
- Employee name
- Employee ID
- All their skills (skill of interest highlighted)
- Current bench status
- "View Profile" link

**Filtering Tips:**
- Search is case-insensitive ("react" = "React")
- Employees can only appear when they're "Bench" status
- No results? Try different skill or fewer skills
- Results show up to 20 at a time

---

### Viewing Employee Details

**Click "View Profile" to See:**
- Full employee details
- All skills they have
- Contact information
- Previous project history
- How long they've been available
- Success rate/performance notes

**From Profile:**
- You can send allocation request
- You can see if they fit your project
- You can review their background
- Button: "Send Allocation Request"

---

### Creating Allocation Requests

**How It Works:**
1. You search for and find employee
2. You request them for your project
3. Admin reviews your request
4. Admin approves or rejects
5. If approved, employee joins your team

**Step-by-Step:**

1. Search for employee (instructions above)
2. View their profile
3. Click "Send Allocation Request" button
4. Request form appears with fields:
   - **Project:** Dropdown showing your available projects
   - **Justification:** Explain why this person is needed

5. Fill in request:
   - Select appropriate project
   - Write 1-2 sentence justification (e.g., "John has exactly the React and Node skills we need")
   - Click "Create Request" button

6. Success message: "Request sent to admin"

**Request Status Appears in "My Requests" Tab:**
- Shows as "Pending" (waiting for admin)
- Waiting time varies (usually 1-3 days)
- Admin will approve or reject
- You'll be notified when decision made

---

### Viewing Your Team

**"My Team" Tab Shows:**
- All employees currently assigned to you
- Project they're working on
- When they started
- Their skills
- Contact information

**What You Can Do:**
- View team member details
- See when they'll be released
- Plan project work
- Communicate project requirements
- Monitor team progress

---

### Managing Your Requests

**"My Requests" Tab Shows:**
- All requests you've created
- Status of each (Pending, Approved, Rejected)
- When you created it
- Which employee and project
- Admin notes if any

**Request Lifecycle:**
```
You Create → Pending (waiting) → Admin Approves → Active
                               ↓
                         Employee joins your team
                         (They appear in My Team)

Or:
You Create → Pending (waiting) → Admin Rejects
                               ↓
                         Employee stays available
                         (Still on Bench for others)
```

**If Rejected:**
- Try different employee
- Add more skills to project requirements
- Ask admin for feedback
- Try again with updated justification

---

### Allocation Process Timeline

**Day 1 (You Submit Request):**
- Search employee
- Create request
- Status: "Pending"

**Days 2-3 (Admin Reviews):**
- Admin sees your request
- Admin reviews employee match
- Admin reviews project needs

**Day 3 (Admin Approves):**
- Employee status changes: Bench → Assigned
- You get notification
- Employee joins your team
- Employee can see their assignment

**Project Duration:**
- You work with this team
- Report any issues to admin
- Prepare for project completion

**Project End:**
- Admin releases employee
- Employee returns to Bench
- Employee available for new projects

---

### Tips for Manager Success

✅ **Best Practices:**
- Search for specific skill combinations
- Write clear justifications
- Check employee availability regularly
- Manage team workload properly
- Report issues to admin promptly
- Give team members clear goals
- Keep projects on track
- Release employees on time

❌ **Avoid:**
- Requesting assigned employees
- Requesting employees not on bench
- Unclear justifications
- Holding onto employees too long
- Requesting duplicate allocations
- Not updating project status

---

## 🛠️ Admin Guide

### Dashboard Overview

When you log in as an Admin, you see:

**System Statistics**
- Total system users (50 in demo)
- Total projects (36 in demo)
- Bench employees count (available)
- Active allocations (deployed)
- Pending requests (awaiting action)

**Main Sections**
1. Projects Management
2. Bench Employees Monitoring
3. Requests Approval
4. System Settings

---

### Project Management

**View All Projects:**

1. Go to "Projects" tab
2. See all projects in system
3. Each shows:
   - Project name
   - Description
   - Required skills (as badges)
   - Team size needed
   - Project duration
   - Current status (Active/On Hold/Completed)
   - Created date

**Create New Project:**

1. Click "Create Project" button
2. Form appears with fields:
   - **Project Name:** Clear, descriptive name
   - **Description:** What the project does
   - **Required Skills:** Employee skills needed
   - **Team Size:** How many people needed
   - **Duration:** "3 months", "6 months", etc.

3. Adding Skills to Project:
   - Type skill name (e.g., "React")
   - Click "Add" button
   - Skill appears as badge
   - Add all required skills
   - Can remove skills if needed

4. Fill complete form
5. Click "Create Project"
6. Success: "Project created successfully"
7. Project appears in list with status "Active"

**Update Project Status:**

1. Find project in list
2. Current status displays
3. Click on status or "Edit" button
4. Change status:
   - **Active:** Project accepting new allocations
   - **On Hold:** Temporarily paused
   - **Completed:** Project finished
5. Click "Save"
6. Status updates immediately

**Example Project Creation:**
```
Project Name: AI Analytics Platform
Description: Machine learning based analytics engine
Required Skills: Python, TensorFlow, Node.js
Team Size: 5
Duration: 6 months
Status: Active (default)
```

---

### Monitoring Bench Employees

**View All Bench Employees:**

1. Go to "Bench Employees" tab
2. See complete list of available employees
3. Each shows:
   - Employee name
   - Employee ID
   - Skills (as badges)
   - Bench status indicator
   - Time on bench
   - Contact info

**Dashboard Statistics:**
- "Bench Employees" card shows count
- Updates in real-time as status changes
- Quick indicator of available talent

**Use For:**
- Track available talent
- Plan project staffing
- Identify skill gaps
- Monitor resource availability
- Forecast allocation needs

**Bench Employee Information:**
- All skills they have
- How long available
- Previous projects
- Success metrics
- Performance notes

---

### Approving Allocation Requests

**View Pending Requests:**

1. Go to "Requests" tab
2. Filter by "Pending" to see awaiting approval
3. See all unapproved manager requests

**Request Details Show:**
- Manager who created request
- Employee requested
- Project they're requested for
- Manager's justification
- Request creation date
- Employee's skills
- Project requirements

**Evaluate Request:**

Check if:
- ✅ Employee has required skills
- ✅ Employee is currently on bench
- ✅ Project exists and is active
- ✅ Justification is sound
- ✅ No duplicate allocation exists

**Approve Request:**

1. Review request details
2. Verify employee meets project needs
3. Click "Approve" button
4. System automatically:
   - Creates allocation record
   - Changes employee status: Bench → Assigned
   - Removes employee from bench pool
   - Notifies manager
   - Notifies employee
5. Request closes
6. Allocation appears in system

**Reject Request:**

1. If request doesn't meet criteria
2. Click "Reject" button
3. (Optional) Add notes about why
4. System:
   - Marks request "Rejected"
   - Employee remains on bench
   - Manager notified
   - Request archived

**After Approval:**
- Employee no longer appears in bench search
- Employee can see assignment in their dashboard
- Manager sees employee in their team
- Project allocation tracked

---

### Managing Allocations

**Active Allocations:**

1. Go to "Allocations" tab
2. See all active project allocations
3. Each shows:
   - Employee name
   - Project name
   - Start date
   - Current status
   - Manager assigned
   - Time in project

**Allocation Lifecycle:**

```
Request Approved
    ↓
Allocation Created (Start Date: Today)
    ↓
Employee Assigned to Project
    ↓
Project Duration [3-6 months]
    ↓
Release Date Approaching
    ↓
Admin Releases Employee (Remove from project)
    ↓
Employee Returns to Bench
```

**Managing Project Duration:**

1. Track allocation progress
2. Note release date (when should end)
3. Prepare release before date
4. Update project status when complete
5. Release employee to bench

---

### System Administration

**User Management:**
- View all users
- Manage user roles
- Reset passwords if needed
- Deactivate users
- Audit user activity

**Settings:**
- Configure system settings
- Manage email notifications
- Set project templates
- Configure role permissions
- Backup system data

**Reports:**
- Generate allocation reports
- View skill utilization
- Track project timelines
- Analyze team capacity
- Forecast planning

---

### Admin Responsibilities

**Daily:**
- ✅ Review pending requests
- ✅ Check for overdue allocations
- ✅ Monitor system health
- ✅ Respond to issues

**Weekly:**
- ✅ Review bench status
- ✅ Plan upcoming allocations
- ✅ Check project progress
- ✅ Generate usage reports

**Monthly:**
- ✅ Complete allocation reviews
- ✅ Release employees from completed projects
- ✅ Plan future projects
- ✅ Analyze resource utilization
- ✅ Audit system for issues

**Quarterly:**
- ✅ Plan resource forecasting
- ✅ Update project pipeline
- ✅ Review system performance
- ✅ Plan training needs
- ✅ Backup critical data

---

### Admin Best Practices

✅ **Do:**
- Respond to requests within 24 hours
- Keep employee skills current
- Track project timelines
- Communicate with managers
- Document decisions
- Monitor system performance
- Plan ahead for allocations
- Keep backups current

❌ **Avoid:**
- Approving invalid requests
- Allocating non-bench employees
- Keeping projects too long
- Losing request history
- Ignoring system errors
- Poor documentation
- Emergency-only approvals
- Skipping backups

---

### Key Admin Rules

**Project Management:**
- All projects must have required skills
- Projects must be created before allocations
- Project status must be Active for allocations
- Completed projects should be archived

**Allocation Approval:**
- Only approve if employee has skills
- Only approve if employee is Bench status
- Only approve if project is Active
- Document rejection reasons

**Release Management:**
- Release employees on release date
- Don't hold employees longer than needed
- Plan releases in advance
- Verify project completion before release

---

## 🆘 Getting Help

### For All Users

**Within the App:**
- DevTools Panel (🛠️) shows errors and routes
- Error messages guide you to fix issues
- Form validation shows immediately

**Need Support?**
- Contact your admin
- Check troubleshooting guide
- Review this user guide
- Check FAQ section

### User Preferences

**Change Password:**
- Click your name (top-right)
- Click "Settings"
- Enter old and new password
- Click "Update"

**View Profile:**
- Click your name (top-right)
- See your information
- Update as needed

**Logout:**
- Click your name (top-right)
- Click "Logout"
- Taken to homepage
- Can login again later

---

## 📋 Common Tasks Quick Reference

| Task | How To | Time |
|------|--------|------|
| Update Profile | Click Edit, make changes, Save | 1 min |
| Add Skill | Click Add Skill, type, Add | 30 sec |
| Change Status | Click Toggle, confirm | 30 sec |
| Search Employee | Type skill, Search | 1 min |
| Create Request | Select project, add note, Create | 2 min |
| Create Project | Fill form, add skills, Create | 3 min |
| Approve Request | Review, click Approve | 1 min |

---

**You're all set! Happy working! 🚀**
