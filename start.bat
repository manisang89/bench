@echo off
REM Bench Allocation System - Startup Script for Windows

echo.
echo ========================================
echo  Bench Allocation System - Startup
echo ========================================
echo.

REM Check if both directories exist
if not exist "project-bench-backend" (
    echo Error: project-bench-backend directory not found
    exit /b 1
)

if not exist "project-bench-frontend" (
    echo Error: project-bench-frontend directory not found
    exit /b 1
)

echo Starting Backend...
start cmd /k "cd project-bench-backend && npm run dev"

echo.
echo Waiting 3 seconds before starting Frontend...
timeout /t 3

echo Starting Frontend...
start cmd /k "cd project-bench-frontend && npm run dev"

echo.
echo ========================================
echo  Services Starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Demo Credentials:
echo   Admin:    admin@bench.com / Admin@123
echo   Manager:  manager@bench.com / Manager@123
echo   Employee: employee@bench.com / Employee@123
echo.
pause
