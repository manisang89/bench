# Backend Next Steps

## 1) Seed default users
Run:

```bash
npm run seed
```

Seeded credentials:
- Admin: admin@bench.com / Admin@123
- Manager: manager@bench.com / Manager@123
- Employee: employee@bench.com / Employee@123

## 2) Start API server
Run:

```bash
npm run dev
```

## 3) Verify health endpoint
GET http://localhost:5000/api/health

## 4) Test login for each role
POST http://localhost:5000/api/auth/login

Body:

```json
{
  "email": "admin@bench.com",
  "password": "Admin@123"
}
```

Repeat with manager and employee emails.

## 5) Test key role APIs
- Employee token:
  - GET /api/employee/profile
  - PUT /api/employee/update
  - PATCH /api/employee/status
  - GET /api/employee/project

- Manager token:
  - GET /api/manager/search?skills=React,Node
  - POST /api/manager/request/create
  - GET /api/manager/request/status
  - GET /api/manager/dashboard

- Admin token:
  - POST /api/admin/projects
  - GET /api/admin/projects/all
  - GET /api/admin/requests/pending
  - PATCH /api/admin/requests/action/:id

## 6) Validate request approval flow
1. Manager creates a request for a bench employee.
2. Admin approves the request.
3. Check employee benchStatus becomes false.
4. Verify allocation in GET /api/allocation/history.
