# Deployment Guide - Production Setup

## 📦 Deployment Overview

This guide covers deploying the Bench Allocation System to production environments.

---

## 🔧 Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing
- [ ] No console errors
- [ ] No console warnings
- [ ] Code reviewed by team
- [ ] Git commits clean
- [ ] No sensitive data in code

### Security
- [ ] All endpoints authenticated
- [ ] All CORS configured
- [ ] Passwords hashed (bcryptjs)
- [ ] JWT secret configured
- [ ] Environment variables secure
- [ ] Rate limiting configured
- [ ] Input validation active

### Performance
- [ ] Database indexes created
- [ ] API response times < 500ms
- [ ] Frontend loads < 3 seconds
- [ ] No memory leaks
- [ ] Caching strategy in place

### Documentation
- [ ] API documentation complete
- [ ] README updated
- [ ] Deployment steps documented
- [ ] Emergency contacts listed
- [ ] Rollback procedure documented

---

## 📋 Environment Setup

### Production Environment Variables

**Backend (.env file):**
```
# Server Configuration
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://bench-allocation.yourcompany.com

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/bench-db
DB_NAME=bench_allocation

# JWT
JWT_SECRET=your-very-secure-secret-key-minimum-32-characters
JWT_EXPIRY=7d

# Email (if needed)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Logging
LOG_LEVEL=info
LOG_FILE=/var/log/bench-app/app.log
```

**Frontend (.env file):**
```
VITE_API_BASE_URL=https://api.bench-allocation.yourcompany.com
VITE_APP_NAME=Bench Allocation System
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

---

## 🚀 Deployment Options

### Option 1: Heroku Deployment

**Backend Setup:**

1. **Create Heroku App:**
```bash
heroku login
heroku create bench-allocation-api
```

2. **Set Environment Variables:**
```bash
heroku config:set -a bench-allocation-api \
  NODE_ENV=production \
  JWT_SECRET=your-secret-key \
  MONGODB_URI=your-mongo-uri
```

3. **Deploy Backend:**
```bash
cd project-bench-backend
git push heroku main
```

4. **Check Logs:**
```bash
heroku logs -a bench-allocation-api --tail
```

**Frontend Setup:**

1. **Create Heroku App:**
```bash
heroku create bench-allocation-ui
```

2. **Configure for Heroku:**
```bash
cd project-bench-frontend
echo "web: npm run preview" > Procfile
```

3. **Deploy Frontend:**
```bash
git push heroku main
```

**Result:**
- Backend: `https://bench-allocation-api.herokuapp.com`
- Frontend: `https://bench-allocation-ui.herokuapp.com`

---

### Option 2: Docker Deployment

**Backend Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["node", "server.js"]
```

**Frontend Dockerfile:**
```dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  backend:
    build: ./project-bench-backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/bench
      - JWT_SECRET=your-secret
    depends_on:
      - mongo

  frontend:
    build: ./project-bench-frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  mongo:
    image: mongo:5.0
    volumes:
      - mongo_data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo_data:
```

**Deploy:**
```bash
docker-compose up -d
```

---

### Option 3: AWS Deployment

**Using Elastic Beanstalk:**

1. **Prepare Backend:**
```bash
cd project-bench-backend
eb init -p node.js-18 bench-backend
eb create bench-backend-env
```

2. **Configure Environment:**
```bash
eb setenv NODE_ENV=production JWT_SECRET=your-secret
```

3. **Deploy:**
```bash
eb deploy
```

**Using AWS Amplify for Frontend:**

1. **Connect Repository:**
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Select main branch

2. **Configure Build:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Deploy:**
   - Push to main branch
   - Amplify automatically deploys

---

### Option 4: DigitalOcean Deployment

**Droplet Setup:**

1. **Create Droplet:**
   - OS: Ubuntu 22.04
   - Size: $5-20/month
   - Region: Closest to users

2. **Initial Setup:**
```bash
ssh root@your_droplet_ip

# Update system
apt update && apt upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
apt update
apt install -y mongodb-org
systemctl start mongod

# Install Nginx
apt install -y nginx
```

3. **Deploy Application:**
```bash
cd /home
git clone your-repo-url
cd bench-allocation

# Backend
cd project-bench-backend
npm install --production
npm run seed

# Start with PM2
npm install -g pm2
pm2 start server.js --name "bench-backend"
pm2 save

# Frontend
cd ../project-bench-frontend
npm install
npm run build

# Copy to Nginx
cp -r dist/* /var/www/html/
```

4. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name bench.yourcompany.com;

    location / {
        root /var/www/html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Cloud)

1. **Create Account:** https://www.mongodb.com/cloud/atlas

2. **Create Cluster:**
   - Choose free tier (M0)
   - Select region
   - Create database admin user

3. **Get Connection String:**
```
mongodb+srv://username:password@cluster.mongodb.net/bench?retryWrites=true
```

4. **Create Collections (Auto-created by app):**
   - users
   - projects
   - requests
   - allocations

### MongoDB Local

```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
apt install mongodb

# Start service
systemctl start mongod

# Seed data
cd project-bench-backend
npm run seed
```

---

## 🔒 SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Obtain certificate
certbot certonly --nginx -d bench.yourcompany.com

# Auto-renewal
certbot renew --dry-run
```

### Configure Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name bench.yourcompany.com;

    ssl_certificate /etc/letsencrypt/live/bench.yourcompany.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bench.yourcompany.com/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    location / {
        root /var/www/html;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name bench.yourcompany.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 📊 Monitoring & Logging

### Application Monitoring

**PM2 Monitoring:**
```bash
# Connect to PM2+ cloud
pm2 link

# Monitor
pm2 monit

# Logs
pm2 logs
```

**Application Logging:**
```javascript
// In backend
const logger = require('winston');

logger.info('Server started', { port: 5000 });
logger.error('Database connection failed', { error: err });
```

### Server Monitoring

```bash
# Install Node Exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
tar xvfz node_exporter-1.3.1.linux-amd64.tar.gz
cd node_exporter-1.3.1.linux-amd64
./node_exporter

# Install Prometheus
wget https://github.com/prometheus/prometheus/releases/download/v2.30.0/prometheus-2.30.0.linux-amd64.tar.gz
# Configure and run
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Setup

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  backend-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Run tests
        run: |
          cd project-bench-backend
          npm install
          npm test

      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push heroku main

  frontend-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Build
        run: |
          cd project-bench-frontend
          npm install
          npm run build

      - name: Deploy to Amplify
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: |
          aws amplify start-deployment --app-id ${{ secrets.AMPLIFY_APP_ID }}
```

---

## 🚨 Rollback Procedure

### If Deployment Fails

**Heroku:**
```bash
# View previous releases
heroku releases -a bench-allocation-api

# Rollback to previous version
heroku releases:rollback v3 -a bench-allocation-api

# Check status
heroku logs -a bench-allocation-api --tail
```

**Docker:**
```bash
# Stop current containers
docker-compose down

# Start previous version
docker-compose up -d

# Check logs
docker-compose logs -f
```

**Manual Revert:**
```bash
# Stop application
systemctl stop bench-app

# Restore from backup
cp -r /backup/bench-app-v1 /home/bench-app

# Start application
systemctl start bench-app
```

---

## 📈 Scaling Strategy

### Horizontal Scaling

**Multiple Backend Instances:**
```yaml
# docker-compose.yml
version: '3.8'
services:
  backend-1:
    build: ./project-bench-backend
    ports:
      - "5001:5000"
  
  backend-2:
    build: ./project-bench-backend
    ports:
      - "5002:5000"

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
```

**nginx.conf (Load Balancing):**
```nginx
upstream backend {
    server backend-1:5000;
    server backend-2:5000;
}

server {
    listen 80;
    location /api {
        proxy_pass http://backend;
    }
}
```

### Caching Strategy

**Redis Implementation:**
```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache user profile
app.get('/api/employee/profile', async (req, res) => {
  const cached = await client.get(`user:${req.userId}`);
  if (cached) return res.json(JSON.parse(cached));
  
  const user = await User.findById(req.userId);
  await client.setex(`user:${req.userId}`, 3600, JSON.stringify(user));
  res.json(user);
});
```

---

## 📞 Support & Maintenance

### Emergency Contacts
- **Primary:** [Team Lead Name]
- **Backup:** [Backup Person Name]
- **On-Call:** [Rotation Schedule]

### Regular Maintenance
- Daily: Check logs and metrics
- Weekly: Review error rates
- Monthly: Update dependencies
- Quarterly: Security audit

### Backup Strategy
- Daily backups to S3
- Weekly offsite backups
- Monthly backup verification
- Recovery test quarterly

---

## ✅ Post-Deployment Verification

- [ ] Frontend loads without errors
- [ ] Login page accessible
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Dashboard displays correctly
- [ ] All API endpoints responding
- [ ] Database connected
- [ ] SSL certificate valid
- [ ] Monitoring active
- [ ] Logs being collected

---

## 📋 Deployment Checklist

- [ ] Code reviewed and approved
- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate installed
- [ ] Backup created
- [ ] Monitoring configured
- [ ] Team notified
- [ ] Deployment window scheduled
- [ ] Rollback plan ready
- [ ] Post-deployment tests passing
- [ ] Performance acceptable

---

**System deployed and ready for production! 🚀**
