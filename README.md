# Bench Allocation System - MERN Stack

A complete resource allocation system built with React, Node.js, Express, and MongoDB.

## Project Structure

```
bench-allocation/
├── project-bench-backend/     # Node.js + Express Backend
│   ├── config/                # Database configuration
│   ├── models/                # Mongoose schemas
│   ├── controllers/           # Route handlers
│   ├── routes/                # API endpoints
│   ├── middleware/            # Auth & RBAC middleware
│   ├── utils/                 # Error handling & helpers
│   ├── scripts/               # Database seeding
│   ├── server.js              # Entry point
│   ├── .env                   # Environment variables
│   └── package.json           # Dependencies
│
└── project-bench-frontend/    # React + Vite Frontend
    ├── src/
    │   ├── components/        # Reusable components
    │   ├── pages/            # Page components
    │   ├── context/          # React context (Auth)
    │   ├── services/         # API client
    │   ├── styles/           # CSS files
    │   ├── App.jsx           # Main app with routing
    │   └── main.jsx          # Entry point
    ├── vite.config.js        # Vite configuration
    ├── index.html            # HTML template
    └── package.json          # Dependencies
```

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Routing
- **Bootstrap 5** - UI components
- **Axios** - HTTP client
- **Custom CSS** - Styling

## Setup & Installation

### 1. Clone or Extract Project

```bash
cd bench-allocation
```

### 2. Backend Setup

```bash
cd project-bench-backend

# Install dependencies
npm install

# Create .env file (already provided with defaults)
# Edit .env if needed for MongoDB connection

# Seed database with demo users
npm run seed

# Start backend server
npm run dev
```

**Backend runs on:** http://localhost:5000

### 3. Frontend Setup

```bash
cd project-bench-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend runs on:** http://localhost:3000

## Default Demo Credentials

- **Admin**
  - Email: admin@bench.com
  - Password: Admin@123

- **Manager**
  - Email: manager@bench.com
  - Password: Manager@123

- **Employee**
  - Email: employee@bench.com
  - Password: Employee@123

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new employee
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/reset-password` - Reset password

### Employee Endpoints (Protected)
- `GET /api/employee/profile` - Get profile
- `PUT /api/employee/update` - Update skills & contact
- `PATCH /api/employee/status` - Update bench status
- `GET /api/employee/project` - Get assigned project

### Manager Endpoints (Protected)
- `GET /api/manager/search?skills=React,Node` - Search bench employees by skills
- `GET /api/manager/bench-details/:id` - Get employee details
- `POST /api/manager/request/create` - Create resource request
- `GET /api/manager/request/status` - Get request status
- `GET /api/manager/allocations` - Get allocations
- `GET /api/manager/my-team` - Get assigned team
- `GET /api/manager/dashboard` - Get dashboard stats

### Admin Endpoints (Protected)
- `POST /api/admin/projects` - Create project
- `GET /api/admin/projects/all` - Get all projects
- `DELETE /api/admin/projects/:id` - Delete project
- `GET /api/admin/bench-list` - Get bench employees
- `GET /api/admin/stats` - Get system stats
- `GET /api/admin/requests/pending` - Get pending requests
- `PATCH /api/admin/requests/action/:id` - Approve/Reject request
- `DELETE /api/admin/users/:id` - Delete user

### Allocation Endpoints (Protected)
- `GET /api/allocation/history` - Get allocation history

## Testing the System

### Step 1: Start Both Servers

Terminal 1 - Backend:
```bash
cd project-bench-backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd project-bench-frontend
npm run dev
```

### Step 2: Test Login Flow

1. Open http://localhost:3000 in browser
2. Login with demo credentials
3. Each role has its own dashboard

### Step 3: Test Complete Workflow

1. **Admin:**
   - Create a project with required skills
   - View all employees and projects
   - See pending requests

2. **Manager:**
   - Search bench employees by skills
   - Create resource request for an employee
   - View team allocations

3. **Admin (Again):**
   - Review pending request
   - Approve the request
   - Verify employee allocation

4. **Employee:**
   - View assigned project
   - Update skills and status
   - See profile information

## Features Implemented

### Authentication & Authorization
- ✅ User registration with role assignment
- ✅ Secure login with JWT tokens
- ✅ Role-based access control (RBAC)
- ✅ Protected routes

### Employee Features
- ✅ View and update profile
- ✅ Manage skills
- ✅ Update bench status
- ✅ View assigned projects

### Manager Features
- ✅ Search bench employees by skills
- ✅ Create resource requests
- ✅ View team allocations
- ✅ Dashboard with stats

### Admin Features
- ✅ Project management (CRUD)
- ✅ Employee management
- ✅ Request approval workflow
- ✅ System statistics
- ✅ Bench employee monitoring

### UI/UX
- ✅ Bootstrap 5 responsive design
- ✅ Custom CSS styling
- ✅ Role-based dashboards
- ✅ Modal dialogs for actions
- ✅ Real-time validation
- ✅ Error & success alerts

## Troubleshooting

### Backend won't start
- Check MONGO_URI in .env
- Ensure MongoDB is running
- Check port 5000 is not in use

### Frontend won't start
- Check port 3000 is not in use
- Clear node_modules and reinstall: `rm -r node_modules && npm install`
- Check vite.config.js proxy settings

### Login fails
- Verify backend is running on port 5000
- Check seed data was created: `npm run seed`
- Verify credentials in demo section

### CORS errors
- Ensure backend has CORS enabled
- Check frontend baseURL in services/api.js points to correct backend URL

## Scripts

### Backend
```bash
npm start          # Production mode
npm run dev        # Development with nodemon
npm run seed       # Seed demo data
```

### Frontend
```bash
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

## Next Steps

1. ✅ Backend fully implemented
2. ✅ Frontend fully implemented with all dashboards
3. Deployment options:
   - Backend: Heroku, AWS, DigitalOcean
   - Frontend: Vercel, Netlify, AWS S3 + CloudFront

## Support

For issues or questions, check:
- Backend logs in terminal
- Browser console for frontend errors
- MongoDB Compass for database inspection
- Network tab in browser DevTools for API calls
