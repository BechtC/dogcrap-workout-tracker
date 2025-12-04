# 🚀 GitHub Setup Guide - Upload Dog Crap Tracker

## ✅ Git Repository Initialized!

Your project is now ready to be pushed to GitHub. Follow these steps:

---

## Step 1: Create GitHub Repository

### Option A: Via GitHub Website (Easiest)

1. **Go to GitHub**: https://github.com
2. **Sign in** to your account
3. **Click the "+" icon** (top-right corner)
4. **Select "New repository"**

5. **Repository Settings:**
   - **Repository name**: `dogcrap-workout-tracker`
   - **Description**: `Professional Rest-Pause training tracker for Chris & Denis. React + Vite + Tailwind CSS.`
   - **Visibility**: ✅ **Public** (so Denis can access it)
   - **DO NOT** check "Initialize with README" (we already have one)
   - **DO NOT** add .gitignore (we already have one)
   - **DO NOT** choose a license yet

6. **Click "Create repository"**

7. **Copy the repository URL** shown on the next page:
   ```
   https://github.com/YOUR_USERNAME/dogcrap-workout-tracker.git
   ```

### Option B: Using GitHub CLI (If Installed)

```bash
gh repo create dogcrap-workout-tracker --public --source=. --remote=origin --push
```

---

## Step 2: Connect Your Local Repository to GitHub

Open your terminal in the project folder and run:

```bash
cd C:\Users\Becht\Python-Projecte\DogCrap\dogcrap-tracker

# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/dogcrap-workout-tracker.git

# Verify the remote was added
git remote -v
```

**Expected output:**
```
origin  https://github.com/YOUR_USERNAME/dogcrap-workout-tracker.git (fetch)
origin  https://github.com/YOUR_USERNAME/dogcrap-workout-tracker.git (push)
```

---

## Step 3: Push Your Code to GitHub

```bash
# Push to main branch
git push -u origin master

# Or if you prefer 'main' as branch name:
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (NOT your password!)

---

## Step 4: Create GitHub Personal Access Token (If Needed)

If GitHub asks for a password, you need a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Note**: `dogcrap-tracker-upload`
4. **Expiration**: 90 days (or your preference)
5. **Select scopes**: Check ✅ **repo** (full control)
6. Click **"Generate token"**
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as your password when pushing

---

## Step 5: Verify Upload

1. Go to: `https://github.com/YOUR_USERNAME/dogcrap-workout-tracker`
2. You should see:
   - ✅ All your files (34 files)
   - ✅ README.md displayed automatically
   - ✅ Documentation files visible
   - ✅ Source code in `src/` folder

---

## Step 6: Share with Denis

### Option 1: Direct Link

Send Denis this link:
```
https://github.com/YOUR_USERNAME/dogcrap-workout-tracker
```

He can:
- View the code
- Download the repository
- Clone it to his computer

### Option 2: Clone Instructions for Denis

Send Denis these instructions:

```bash
# Denis should run this on his computer:

# Clone the repository
git clone https://github.com/YOUR_USERNAME/dogcrap-workout-tracker.git

# Navigate into the folder
cd dogcrap-workout-tracker

# Install dependencies
npm install

# Start the app
npm run dev

# Open browser to: http://localhost:5174
```

### Option 3: Download ZIP

Denis can also download without Git:

1. Go to: `https://github.com/YOUR_USERNAME/dogcrap-workout-tracker`
2. Click the green **"Code"** button
3. Click **"Download ZIP"**
4. Extract the ZIP file
5. Open terminal in the folder
6. Run `npm install` then `npm run dev`

---

## Sharing CSV Data Between You and Denis

### Your Workflow:

**Chris (You):**
1. Log your workouts in the app
2. Export CSV: Settings → Export My Workouts (CSV)
3. File downloads: `dogcrap_workouts_chris_2024-12-03.csv`
4. Share file with Denis (email, Google Drive, Dropbox, etc.)

**Denis:**
1. Log his workouts in his app
2. Export CSV: Settings → Export My Workouts (CSV)
3. File downloads: `dogcrap_workouts_denis_2024-12-03.csv`
4. Share file with you

**Both:**
- Keep CSV files backed up
- Exchange files weekly or monthly
- Import each other's data if needed (future feature)
- Use Excel/Google Sheets to view combined data

---

## Future: Collaborative Features

For now, you'll share CSV files manually. In the future, you could:

**Phase 2 (Q1 2025):**
- CSV import feature (import Denis's workouts into your app)
- Merge multiple CSV files

**Phase 3 (Q2 2025):**
- Cloud sync (Firebase/Supabase)
- Real-time sharing between devices
- Mobile apps for both

---

## Quick Commands Reference

```bash
# Check git status
git status

# View commit history
git log --oneline

# See what remote is configured
git remote -v

# Push new changes
git add .
git commit -m "Your commit message"
git push

# Pull updates (if Denis contributes code)
git pull origin main

# Clone to another computer
git clone https://github.com/YOUR_USERNAME/dogcrap-workout-tracker.git
```

---

## Repository Structure on GitHub

```
dogcrap-workout-tracker/
├── 📄 README.md                   ← Main page (shown by default)
├── 📄 INSTALLATION_GUIDE.md       ← Setup instructions
├── 📄 USER_MANUAL.md              ← How to use
├── 📄 GITHUB_SETUP_GUIDE.md       ← This file
├── 📄 CHEAT_SHEET.md              ← Quick reference
├── 📄 QUICKSTART.md               ← 5-min tutorial
├── 📄 DATA_STORAGE_EXPLAINED.md   ← Storage info
├── 📄 SEED_DATA_GUIDE.md          ← Demo data
├── 📁 src/                        ← Source code
│   ├── 📁 components/             ← React components
│   ├── 📁 context/                ← State management
│   └── 📁 utils/                  ← Helper functions
├── 📁 public/                     ← Static assets
├── 📄 package.json                ← Dependencies
└── 📄 .gitignore                  ← Ignored files
```

---

## Troubleshooting

### "Authentication failed"

**Solution**: Use a Personal Access Token instead of password (see Step 4)

### "Repository not found"

**Solution**: Double-check the repository URL and your GitHub username

### "Permission denied"

**Solution**: Make sure you're signed in to the correct GitHub account

### "Already exists"

**Solution**: Delete the remote and re-add it:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/dogcrap-workout-tracker.git
```

### "Large files warning"

**Solution**: The repository is only ~10MB, which is fine. GitHub warns at 100MB.

---

## Make Repository More Attractive

### Add a Cover Image

1. Take a screenshot of the app
2. Upload to: `https://github.com/YOUR_USERNAME/dogcrap-workout-tracker/upload/main`
3. Add to README.md: `![App Screenshot](screenshot.png)`

### Add Topics/Tags

1. Go to repository page
2. Click the ⚙️ gear icon next to "About"
3. Add topics: `react`, `fitness`, `workout-tracker`, `training`, `vite`, `tailwindcss`

### Add a License (Optional)

1. Go to repository page
2. Click "Add file" → "Create new file"
3. Name it: `LICENSE`
4. Click "Choose a license template"
5. Select "MIT License" (most permissive)
6. Commit the file

---

## Example Message to Send Denis

```
Hey Denis!

I've created our workout tracking app and uploaded it to GitHub.
You can access it here: https://github.com/YOUR_USERNAME/dogcrap-workout-tracker

To get started:
1. Install Node.js from: https://nodejs.org (if you don't have it)
2. Download the repository (green "Code" button → Download ZIP)
3. Extract the ZIP file
4. Open terminal in that folder
5. Run: npm install
6. Run: npm run dev
7. Open browser to: http://localhost:5174

Complete instructions are in the INSTALLATION_GUIDE.md file.

For now, we'll share our workout data as CSV files (weekly or monthly).
You export your workouts, I export mine, and we exchange the files.

Let me know if you need help setting it up!

💪 Chris
```

---

## Next Steps After Upload

1. ✅ Verify everything uploaded correctly
2. ✅ Share link with Denis
3. ✅ Test clone on another computer (optional)
4. ✅ Add screenshot to README (optional)
5. ✅ Start using the app regularly
6. ✅ Exchange CSV files weekly

---

**Your repository is ready to go! Just follow Steps 1-3 above to push to GitHub! 🚀**

*GitHub Setup Guide Version 1.0 | December 2024*
