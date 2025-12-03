# 🔧 Installation Guide - Dog Crap Workout Tracker

Complete step-by-step installation guide with all required commands.

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Prerequisites Installation](#prerequisites-installation)
3. [Project Setup](#project-setup)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)
6. [Production Build](#production-build)
7. [Deployment Options](#deployment-options)

---

## 📌 System Requirements

### Minimum Requirements:
- **Operating System:** Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **RAM:** 4GB minimum (8GB recommended)
- **Disk Space:** 500MB free space
- **Browser:** Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

---

## 🛠️ Prerequisites Installation

### Step 1: Install Node.js

Node.js is required to run the application. We need Node.js 16 or higher.

#### Windows:

**Option 1: Using Installer (Recommended)**
```bash
# Download from official website
# Go to: https://nodejs.org/
# Download the LTS version (Long Term Support)
# Run the installer and follow the wizard
```

**Option 2: Using Chocolatey**
```bash
# If you have Chocolatey installed
choco install nodejs-lts
```

**Option 3: Using Winget**
```bash
# Windows 10/11 with winget
winget install OpenJS.NodeJS.LTS
```

#### macOS:

**Option 1: Using Homebrew (Recommended)**
```bash
# Install Homebrew first if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Node.js
brew install node
```

**Option 2: Using Installer**
```bash
# Download from: https://nodejs.org/
# Run the .pkg installer
```

#### Linux (Ubuntu/Debian):

```bash
# Update package list
sudo apt update

# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Linux (Fedora/CentOS/RHEL):

```bash
# Install Node.js 18.x
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo dnf install -y nodejs

# Verify installation
node --version
npm --version
```

### Step 2: Verify Node.js Installation

Run these commands to verify installation:

```bash
# Check Node.js version (should be 16.x or higher)
node --version

# Check npm version (should be 8.x or higher)
npm --version
```

**Expected Output:**
```
node --version
v18.17.0  (or similar)

npm --version
9.6.7  (or similar)
```

If you see version numbers, you're good to go! ✅

---

## 📦 Project Setup

### Step 1: Navigate to Project Directory

```bash
# If you already have the project
cd C:\Users\Becht\Python-Projecte\DogCrap\dogcrap-tracker

# Or on Mac/Linux
cd /path/to/DogCrap/dogcrap-tracker
```

### Step 2: Install All Dependencies

This will install React, Vite, Tailwind CSS, Recharts, and all other required packages.

```bash
# Install all dependencies from package.json
npm install
```

**What this does:**
- Reads `package.json` file
- Downloads all required packages
- Creates `node_modules` folder (contains ~260 packages)
- Creates `package-lock.json` (locks versions)

**Expected Output:**
```
added 261 packages, and audited 261 packages in 15s

51 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

**If installation fails, try:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json  # Mac/Linux
# or
rmdir /s node_modules & del package-lock.json  # Windows CMD

# Reinstall
npm install
```

### Step 3: Verify Installation

Check that all key packages are installed:

```bash
# List installed packages
npm list --depth=0
```

**You should see:**
- react@18.x
- react-dom@18.x
- recharts@2.x
- tailwindcss@3.x
- vite@5.x

---

## 🚀 Running the Application

### Development Mode (For Local Testing)

```bash
# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v7.2.6  ready in 496 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

**What this does:**
- Starts Vite development server
- Enables Hot Module Replacement (HMR)
- Watches files for changes
- Opens port 5173 or 5174

### Open in Browser

```bash
# The server is now running!
# Open your browser to:
http://localhost:5174

# Or if port 5173 is used:
http://localhost:5173
```

### Stop the Server

```bash
# Press Ctrl + C in the terminal to stop
```

---

## 🐛 Troubleshooting

### Problem 1: "node is not recognized as an internal or external command"

**Solution:**
```bash
# Node.js not installed or not in PATH
# Reinstall Node.js from https://nodejs.org/
# Make sure to check "Add to PATH" during installation

# Or manually add to PATH (Windows):
# 1. Search "Environment Variables" in Windows
# 2. Edit "Path" in System Variables
# 3. Add: C:\Program Files\nodejs\
```

### Problem 2: "npm install" fails with permission errors

**Solution (Mac/Linux):**
```bash
# Don't use sudo! Instead, fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# Then retry
npm install
```

**Solution (Windows):**
```bash
# Run terminal as Administrator
# Right-click Command Prompt → "Run as Administrator"
npm install
```

### Problem 3: Port 5173/5174 already in use

**Solution:**
```bash
# Option 1: Kill the process using the port
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9

# Option 2: Use a different port
npm run dev -- --port 3000
```

### Problem 4: "Cannot find module" errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json  # Mac/Linux
# or
rmdir /s node_modules & del package-lock.json  # Windows

npm install
```

### Problem 5: Tailwind CSS not working

**Solution:**
```bash
# Reinstall Tailwind CSS v3
npm uninstall tailwindcss postcss autoprefixer
npm install -D tailwindcss@3 postcss autoprefixer

# Restart dev server
npm run dev
```

### Problem 6: React errors in browser

**Solution:**
```bash
# Clear browser cache
# Chrome: Ctrl+Shift+Delete
# Firefox: Ctrl+Shift+Delete
# Safari: Cmd+Option+E

# Or hard refresh
# Ctrl+F5 (Windows)
# Cmd+Shift+R (Mac)
```

---

## 📦 Production Build

### Build for Production

```bash
# Create optimized production build
npm run build
```

**What this does:**
- Minifies JavaScript and CSS
- Optimizes assets
- Creates `dist/` folder with production files
- Typically reduces size by 60-80%

**Expected Output:**
```
vite v7.2.6 building for production...
✓ 245 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-abc123.css     12.34 kB │ gzip:  3.45 kB
dist/assets/index-xyz789.js     156.78 kB │ gzip: 52.34 kB
✓ built in 3.45s
```

### Preview Production Build Locally

```bash
# Test the production build locally
npm run preview
```

Opens at: `http://localhost:4173`

### Build Output Location

```
dogcrap-tracker/
└── dist/                    ← Production files here
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   └── index-[hash].css
    └── vite.svg
```

---

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Free)

**Using Netlify CLI:**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

**Using Netlify Web Interface:**

1. Create account at [netlify.com](https://www.netlify.com)
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `dist` folder
4. Done! You get a URL like: `https://your-app.netlify.app`

**Using Git:**

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/dogcrap-tracker.git
git push -u origin main

# Connect to Netlify via GitHub
# Go to netlify.com → New site from Git → Select repo
# Build command: npm run build
# Publish directory: dist
```

### Option 2: Vercel (Free)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts
# Build Command: npm run build
# Output Directory: dist
```

### Option 3: GitHub Pages (Free)

```bash
# Install gh-pages package
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**Manual GitHub Pages setup:**

```bash
# Build the project
npm run build

# Create gh-pages branch
git checkout --orphan gh-pages

# Add and commit dist contents
git --work-tree dist add --all
git --work-tree dist commit -m "Deploy"

# Push to gh-pages branch
git push origin HEAD:gh-pages --force

# Back to main branch
git checkout main
```

URL will be: `https://yourusername.github.io/dogcrap-tracker/`

### Option 4: Local Network Access

Share with others on your local network:

```bash
# Start server with network access
npm run dev -- --host

# You'll see:
# ➜  Local:   http://localhost:5174/
# ➜  Network: http://192.168.1.100:5174/
```

Share the Network URL with others on same WiFi.

### Option 5: Self-Hosting (Advanced)

```bash
# Build the project
npm run build

# Copy dist folder to your web server
scp -r dist/* user@yourserver.com:/var/www/html/

# Or with rsync
rsync -avz dist/ user@yourserver.com:/var/www/html/
```

---

## 🔍 Verification Checklist

After installation, verify everything works:

### ✅ Installation Checklist

```bash
# 1. Check Node.js
node --version
# Expected: v16.x or higher ✓

# 2. Check npm
npm --version
# Expected: 8.x or higher ✓

# 3. Check dependencies installed
npm list --depth=0
# Should show ~50 packages ✓

# 4. Check build works
npm run build
# Should create dist/ folder ✓

# 5. Start dev server
npm run dev
# Should open on port 5173 or 5174 ✓

# 6. Open browser
# Go to http://localhost:5174
# Should see the app ✓
```

---

## 📊 Package Sizes (For Reference)

```
Total install size: ~260 packages

Key packages:
- react + react-dom:      ~1.5 MB
- recharts:               ~800 KB
- tailwindcss:            ~3.5 MB
- vite:                   ~15 MB
- Dependencies:           ~180 MB total

Production build size:
- Compressed (gzip):      ~60-80 KB
- Uncompressed:           ~200-300 KB
```

---

## 🔄 Update Dependencies

Keep packages up to date:

```bash
# Check for outdated packages
npm outdated

# Update all packages (careful!)
npm update

# Update specific package
npm update react

# Update to latest versions (breaking changes possible)
npm install react@latest react-dom@latest
```

---

## 🧹 Clean Installation (If Problems Occur)

Complete fresh start:

```bash
# 1. Delete everything
rm -rf node_modules package-lock.json dist  # Mac/Linux
# or
rmdir /s node_modules & del package-lock.json & rmdir /s dist  # Windows

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall everything
npm install

# 4. Rebuild
npm run build

# 5. Test
npm run dev
```

---

## 📝 Quick Command Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install new package
npm install package-name

# Install dev dependency
npm install -D package-name

# Uninstall package
npm uninstall package-name

# Update packages
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Clear cache
npm cache clean --force

# Check version
node --version
npm --version
```

---

## 🆘 Getting Help

### If installation fails:

1. **Check Node.js version**
   ```bash
   node --version  # Must be 16+
   ```

2. **Read error messages carefully**
   - Most errors tell you exactly what's wrong
   - Google the exact error message

3. **Check internet connection**
   - npm needs to download packages from registry

4. **Try different network**
   - Some corporate networks block npm
   - Try personal hotspot

5. **Check disk space**
   ```bash
   df -h  # Mac/Linux
   # or check C:\ drive on Windows
   ```

6. **Check permissions**
   - Don't use sudo with npm (Mac/Linux)
   - Run as Administrator if needed (Windows)

### Still stuck?

- Check the error log: `npm-debug.log`
- Read full error message (scroll up in terminal)
- Search: "npm install error [your error message]"
- Check Node.js compatibility: https://nodejs.org/en/download/

---

## ✅ Installation Complete!

If you can run `npm run dev` and see the app in your browser, you're all set! 🎉

### Next Steps:

1. Read **USER_MANUAL.md** for usage instructions
2. Read **QUICKSTART.md** for quick tutorial
3. Start tracking your workouts!

---

**Happy Training! 💪**

*Installation Guide Version 1.0 | December 2024*
