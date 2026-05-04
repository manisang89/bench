# Troubleshooting Guide - Common Issues & Solutions

## 🔍 Troubleshooting Overview

This guide helps identify and resolve common issues encountered during development, testing, and production use.

---

## 🚀 Startup Issues

### Issue: "Cannot find module" Error

**Symptom:**
```
Error: Cannot find module 'express'
```

**Causes:**
- Dependencies not installed
- Wrong directory
- Node version mismatch

**Solutions:**

1. **Install Dependencies:**
```bash
cd project-bench-backend
npm install
```

2. **Verify Node Version:**
```bash
node --version
# Should be v18 or higher
```

3. **Clear npm Cache:**
```bash
npm cache clean --force
npm install
```

---

### Issue: "Port Already in Use"

**Symptom:**
```
listen EADDRINUSE: address already in use :::5000
```

**Causes:**
- Another process using port
- Previous instance still running
- Port configured in .env

**Solutions:**

1. **Find Process Using Port:**
```bash
# Windows
netstat -ano | findstr :5000

# macOS/Linux
lsof -i :5000
```

2. **Kill Process:**
```bash
# Windows
taskkill /PID <PID> /F

# macOS/Linux
kill -9 <PID>
```

3. **Change Port (Temporary):**
```bash
# In .env
PORT=5001
```

---

### Issue: "ECONNREFUSED" to MongoDB

**Symptom:**
```
MongooseError: connect ECONNREFUSED 127.0.0.1:27017
```

**Causes:**
- MongoDB not running
- Wrong connection string
- Network issues

**Solutions:**

1. **Start MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongod
```

2. **Check Connection String:**
```bash
# In .env file
MONGODB_URI=mongodb://localhost:27017/bench

# Or for Atlas
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bench
```

3. **Verify MongoDB Running:**
```bash
# Try connecting
mongo mongodb://localhost:27017
```

---

## 🌐 Frontend Issues

### Issue: "Blank White Screen"

**Symptom:**
- Frontend loads but shows nothing
- No console errors

**Causes:**
- React not rendering
- CSS hiding content
- JavaScript error silently failing

**Solutions:**

1. **Hard Refresh:**
```
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (macOS)
```

2. **Clear Cache:**
- Open DevTools (F12)
- Application tab → Storage → Clear All
- Reload page

3. **Check Console for Errors:**
- Press F12
- Look in Console tab
- Search for red errors

4. **Check API Calls:**
- Press F12
- Network tab
- Check if API requests are 404 or 500

---

### Issue: "Styles Not Loading"

**Symptom:**
- Page looks unstyled
- Colors wrong
- Layout broken

**Causes:**
- CSS file not found
- Wrong path to styles
- Bootstrap not imported

**Solutions:**

1. **Check CSS Import in main.jsx:**
```javascript
import './styles/index.css'
import './styles/auth.css'
import './styles/homepage.css'
```

2. **Verify Bootstrap:**
```javascript
// In index.css
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
```

3. **Check File Paths:**
```bash
# Verify files exist
ls src/styles/
# Should show: index.css, auth.css, homepage.css, devtools.css
```

---

### Issue: "Cannot Read Property of Undefined"

**Symptom:**
```
TypeError: Cannot read property 'user' of undefined
```

**Causes:**
- Context not provided
- State not initialized
- Component rendered before data loads

**Solutions:**

1. **Check Context Provider:**
```javascript
// In App.jsx, wrap content
<AuthProvider>
  <Routes>...</Routes>
</AuthProvider>
```

2. **Add Loading State:**
```javascript
if (loading) return <Spinner />
if (!user) return <Login />
```

3. **Use Optional Chaining:**
```javascript
// Instead of: user.name
// Use: user?.name
```

---

## 🔐 Authentication Issues

### Issue: "Invalid Token" on Every Request

**Symptom:**
- Login works
- API calls return 401
- Token in localStorage but rejected

**Causes:**
- JWT_SECRET mismatch
- Token corrupted
- Token expired

**Solutions:**

1. **Check JWT_SECRET:**
```bash
# Backend .env - should be same on dev and prod
JWT_SECRET=same-secret-both-places
```

2. **Clear Token and Login Again:**
```javascript
// In browser console
localStorage.clear()
// Then login fresh
```

3. **Check Token Format:**
```javascript
// Token should have 3 parts separated by dots
// HEADER.PAYLOAD.SIGNATURE
console.log(localStorage.getItem('token'))
```

---

### Issue: "User Stays Logged Out After Refresh"

**Symptom:**
- Can login and use app
- Page refresh requires re-login
- Token not persisting

**Causes:**
- Token not saved to localStorage
- AuthContext not initializing from storage
- localStorage cleared

**Solutions:**

1. **Check Login Handler:**
```javascript
// Should save token
localStorage.setItem('token', response.token)
localStorage.setItem('user', JSON.stringify(response.user))
```

2. **Check AuthContext Initialization:**
```javascript
// Should restore from storage on mount
useEffect(() => {
  const saved = localStorage.getItem('user')
  if (saved) setUser(JSON.parse(saved))
}, [])
```

3. **Check Storage Enabled:**
```javascript
// In browser console
try {
  localStorage.setItem('test', '1')
  localStorage.removeItem('test')
  console.log('localStorage works')
} catch (e) {
  console.log('localStorage disabled')
}
```

---

## 📊 Data & Database Issues

### Issue: "No Data Appears in Dashboard"

**Symptom:**
- Dashboard loads but shows 0 for all stats
- Lists are empty
- Graphs have no data

**Causes:**
- Database not seeded
- Data not loaded
- Wrong database connected

**Solutions:**

1. **Seed Sample Data:**
```bash
cd project-bench-backend
npm run seed
```

2. **Verify Database Connection:**
```javascript
// In server.js, check connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.log('DB error:', err))
```

3. **Check Network Tab:**
- Press F12
- Network tab
- Make API call
- Check response has data

---

### Issue: "Database Locks Up"

**Symptom:**
- Requests hang
- No response from API
- Application freezes

**Causes:**
- Long-running query
- Connection pool exhausted
- Deadlock

**Solutions:**

1. **Restart MongoDB:**
```bash
# Stop
sudo systemctl stop mongod

# Start
sudo systemctl start mongod
```

2. **Check Active Connections:**
```javascript
// Add to backend
setInterval(() => {
  mongoose.connection.db.admin().serverStatus(
    (err, status) => console.log('Connections:', status.connections)
  )
}, 5000)
```

3. **Increase Connection Pool:**
```javascript
mongoose.connect(uri, {
  maxPoolSize: 10,
  minPoolSize: 5
})
```

---

## 🔄 API Issues

### Issue: "CORS Error"

**Symptom:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Causes:**
- Frontend and backend on different origins
- CORS not configured
- Credentials not sent

**Solutions:**

1. **Configure CORS in Backend:**
```javascript
// In server.js
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

2. **Check CORS_ORIGIN in .env:**
```bash
CORS_ORIGIN=http://localhost:5173
```

3. **Send Credentials:**
```javascript
// In api.js
axios.defaults.withCredentials = true;
```

---

### Issue: "404 Not Found on API Call"

**Symptom:**
```
GET /api/employee/profile 404 Not Found
```

**Causes:**
- Wrong endpoint URL
- Route not defined
- Path typo

**Solutions:**

1. **Check Route Definition:**
```bash
# Backend routes/employeeRoutes.js
router.get('/profile', authMiddleware, getProfile)
```

2. **Check API Call:**
```javascript
// Should match exactly
await api.get('/employee/profile')
```

3. **Check Backend Logs:**
```bash
# Look for routing errors
# npm run dev should show routes loaded
```

---

### Issue: "500 Internal Server Error"

**Symptom:**
```
POST /api/auth/login 500 Internal Server Error
```

**Causes:**
- Unhandled exception
- Database error
- Missing environment variable

**Solutions:**

1. **Check Backend Logs:**
```bash
# npm run dev shows errors
# Look for stack trace
```

2. **Check Environment Variables:**
```bash
# .env file
echo $MONGODB_URI  # Should print connection string
echo $JWT_SECRET   # Should print secret
```

3. **Add Error Logging:**
```javascript
app.use((err, req, res, next) => {
  console.error('Error:', err.message, err.stack);
  res.status(500).json({ message: 'Server error' });
});
```

---

## 🎨 UI/UX Issues

### Issue: "Validation Errors Don't Disappear"

**Symptom:**
- Error message appears on invalid input
- Typing valid input doesn't clear error
- Must submit form to clear

**Causes:**
- Error handler not deleting from state
- Incorrect validation logic
- Form state not updating

**Solutions:**

1. **Check Error Handler:**
```javascript
// Correct way
if (isValid) {
  delete newErrors.fieldName  // Delete, don't set to null
} else {
  newErrors.fieldName = error
}

// Wrong way
newErrors.fieldName = null  // This keeps the key in object
```

2. **Verify onChange Handler:**
```javascript
<input
  onChange={(e) => {
    setFieldValue(e.target.value)
    validateAndClearError(e.target.value)  // Must validate
  }}
/>
```

---

### Issue: "Mobile Layout Broken"

**Symptom:**
- Looks good on desktop
- Mobile view squished or broken
- Text not readable

**Causes:**
- No viewport meta tag
- CSS not responsive
- Bootstrap classes missing

**Solutions:**

1. **Check Viewport Meta:**
```html
<!-- In index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. **Check Responsive Classes:**
```javascript
// Use Bootstrap responsive classes
<div className="col-lg-3 col-md-6 col-sm-12">
  Card content
</div>
```

3. **Test on Mobile:**
- Press F12
- Click device toolbar
- Test different sizes
- Check portrait/landscape

---

## 🛠️ DevTools Issues

### Issue: "DevTools Panel Not Showing"

**Symptom:**
- 🛠️ button not visible
- Clicking doesn't open panel
- Hidden or stuck

**Causes:**
- Component not mounted
- CSS hiding it
- Hidden in production mode

**Solutions:**

1. **Check Component Mounted:**
```javascript
// In App.jsx
<DevTools />  // Must be in render
```

2. **Check Development Mode:**
```javascript
// DevTools only shows in development
if (process.env.NODE_ENV === 'development') {
  return <DevTools />
}
```

3. **Check CSS:**
```css
/* devtools.css - button should be visible */
.devtools-button {
  display: block !important;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}
```

---

## 🔴 Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| Cannot find module | Missing npm install | `npm install` |
| Port in use | Process occupying port | Kill process or change port |
| ECONNREFUSED | MongoDB not running | Start MongoDB service |
| CORS error | Frontend/backend mismatch | Configure CORS |
| 401 Unauthorized | Invalid token | Clear storage, login again |
| 404 Not Found | Route doesn't exist | Check route definition |
| 500 Server Error | Code error | Check backend logs |
| Blank white screen | Render error | Check console F12 |
| Styles not loading | CSS path wrong | Check import statements |

---

## 📞 Support Escalation

### Level 1: Try These Steps
1. Restart both services (backend and frontend)
2. Clear browser cache (Ctrl+Shift+Del)
3. Check console for errors (F12)
4. Review logs

### Level 2: If Still Issues
1. Check environment variables
2. Verify database connection
3. Review recent code changes
4. Check git diff

### Level 3: Escalate to Team Lead
1. Provide error message
2. Share console screenshot
3. Share network tab screenshot
4. Share .env file (without secrets)
5. Note when issue started

---

## 🎯 Prevention Tips

✅ **Always:**
- Check browser console for errors
- Check backend logs (npm run dev)
- Verify .env variables set
- Restart services after changes
- Hard refresh browser (Ctrl+Shift+R)

✅ **Don't:**
- Ignore error messages
- Assume it's "just" a cache issue
- Skip reading error stack traces
- Commit without testing
- Leave console errors unresolved

---

## 📝 Debugging Checklist

When troubleshooting:
- [ ] Read entire error message
- [ ] Check browser console (F12)
- [ ] Check backend logs (npm run dev)
- [ ] Verify .env variables
- [ ] Check database connection
- [ ] Try hard refresh (Ctrl+Shift+R)
- [ ] Restart services
- [ ] Search this guide for issue
- [ ] Check git status for changes
- [ ] Ask team member if stuck

---

**Most issues resolved with restart or cache clear! 🚀**
