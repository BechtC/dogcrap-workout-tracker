# 📖 Dog Crap Workout Tracker - User Manual

## Table of Contents
1. [Getting Started](#getting-started)
2. [Understanding Data Storage](#understanding-data-storage)
3. [Creating Your First Workout](#creating-your-first-workout)
4. [Recording Exercises](#recording-exercises)
5. [Viewing Your Progress](#viewing-your-progress)
6. [Data Management & Backups](#data-management--backups)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Opening the Application

1. Make sure the development server is running:
   ```bash
   cd dogcrap-tracker
   npm run dev
   ```

2. Open your web browser and go to:
   ```
   http://localhost:5174
   ```
   (Or whatever port is shown in your terminal)

### Switching Between Users

At the top-right of the screen, you'll see two buttons:
- **Chris** (blue when active)
- **Denis** (blue when active)

Simply click the button to switch users. All data is separated by user automatically.

---

## Understanding Data Storage

### Where Your Data Lives

Your workout data is stored in **Browser LocalStorage**. Think of it like this:

```
Your Browser (Chrome/Firefox/Safari)
  └── LocalStorage
      └── Dog Crap Workout Tracker
          ├── Chris's Workouts
          └── Denis's Workouts
```

### What This Means for You

**✅ Good News:**
- No internet connection needed
- No monthly fees or subscriptions
- Complete privacy - data never leaves your computer
- Super fast - no waiting for servers
- Works anywhere, anytime

**⚠️ Important:**
- **Each browser stores data separately**
  - Chrome data ≠ Firefox data ≠ Safari data
  - Use ONE browser consistently

- **Data can be lost if:**
  - You clear browser history/cache
  - You uninstall the browser
  - Your computer crashes without backups
  - You use browser "incognito" mode

**🔒 Solution: Regular Backups!**
- Export your data weekly (see [Data Management](#data-management--backups))
- Keep backup files in Google Drive, Dropbox, or USB drive

### Storage Capacity

- **Maximum:** ~10MB (about 5,000-10,000 workouts)
- **Check usage:** Settings → Storage Information
- **Warning shown** when you reach 8MB

---

## Creating Your First Workout

### Step-by-Step Guide

#### 1. Navigate to New Workout
Click the **"+ New Workout"** button in the navigation bar.

#### 2. Select Date
- Default: Today's date
- Click the calendar to choose a different date
- Format: YYYY-MM-DD (e.g., 2024-12-03)

#### 3. Choose Your Plan

**Plan A - Upper Body Focus:**
- ✅ Chest
- ✅ Shoulders
- ✅ Triceps
- ✅ Back Width
- ✅ Back Thickness

**Plan B - Legs & Arms Focus:**
- ✅ Biceps
- ✅ Forearms
- ✅ Quads
- ✅ Hamstrings
- ✅ Calves

Click the plan card to select (it will turn blue/green).

#### 4. Add Notes (Optional)
- Free text field for session notes
- Max 500 characters
- Examples:
  - "Feeling strong today, slept 8 hours"
  - "Shoulders still sore from last workout"
  - "First workout after deload week"

#### 5. Start Workout
Click the **"Start Workout →"** button.

### What You'll See Next

You'll enter the **Workout Session** screen with:
- **Left Panel:** Add new exercises
- **Right Panel:** Completed exercises
- **Top Banner:** Real-time stats (exercises, sets, reps)

---

## Recording Exercises

### Understanding Rest-Pause Training

Dog Crap training uses **Rest-Pause sets**:
1. Perform 1 set to failure
2. Rest for 15 deep breaths (~45 seconds)
3. Repeat for 2-4 total mini-sets
4. Each mini-set is recorded separately

### Adding an Exercise

#### Step 1: Select Muscle Group
Click the dropdown under **"Muscle Group"**.
- You'll only see muscle groups for your selected plan
- Example (Plan A): Chest, Shoulders, Triceps, etc.

#### Step 2: Choose Exercise
Click the dropdown under **"Exercise"**.
- Shows all exercises for the selected muscle group
- 8-10 exercises per muscle group
- Examples: "Flat Barbell Bench Press", "Dumbbell Flyes"

#### Step 3: Add Mini-Sets

**For each rest-pause set:**

1. **Enter Weight (kg)**
   - Supports decimals: 87.5, 100.5, etc.
   - Be precise for accurate tracking

2. **Enter Reps**
   - Whole numbers only: 10, 8, 5, etc.
   - Press Tab to move to next field
   - Press Enter to add set quickly

3. **Click "+ Add Mini-Set"**
   - Set appears in the list above
   - Total reps calculated automatically

**Example Rest-Pause Sequence:**
```
Set 1: 100 kg × 10 reps  (to failure)
  → Rest 15 breaths
Set 2: 100 kg × 5 reps   (to failure)
  → Rest 15 breaths
Set 3: 100 kg × 3 reps   (to failure)

Total: 18 reps (calculated automatically)
```

#### Step 4: Remove a Set (If Mistake)
Click the **×** button next to any set to delete it.

#### Step 5: Save Exercise
Click **"✓ Save Exercise"** button.
- Exercise moves to "Completed Exercises" panel
- Form resets for next exercise
- Data saved immediately to browser

#### Step 6: Repeat
Continue adding exercises for all muscle groups you trained.

### Tips for Fast Entry

**Keyboard Shortcuts:**
- **Tab:** Move between weight/reps fields
- **Enter in Weight field:** Jump to Reps
- **Enter in Reps field:** Add set automatically

**Workflow:**
1. Type weight → Press Tab
2. Type reps → Press Enter
3. Repeat for each set
4. Click "Save Exercise"

---

## Viewing Your Progress

### Dashboard (Home Screen)

**Quick Stats Cards:**
- Total Workouts
- Plan A Sessions
- Plan B Sessions
- Total Volume (kg)

**Recent Workouts:**
- Last 5 workouts displayed
- Click any workout to view details
- Shows date, plan, exercises, volume

**Quick Actions:**
- Start New Workout (blue button)
- View Analytics (purple button)

### Workout History

Click **"History"** in navigation.

**Features:**
- All workouts in chronological order (newest first)
- **Filter by plan:** All / Plan A / Plan B buttons
- Each card shows:
  - Date
  - Plan (A/B)
  - Exercise count
  - Total sets and reps
  - Total volume
  - Exercise names
  - Notes preview

**View Details:**
Click any workout card to see:
- Complete exercise list
- All sets with weight × reps
- Volume calculations per exercise
- Workout notes

### Analytics

Click **"Analytics"** in navigation.

#### Personal Records
See your best performance for each exercise:
- **Max Weight:** Heaviest weight lifted
- **Max Reps:** Most total reps in one session
- **Max Volume:** Highest weight × reps total

#### Volume Progression Chart
- **Bar chart** showing total volume over time
- Blue bars = Plan A
- Green bars = Plan B
- Hover over bars for exact values

#### Strength Progression by Exercise
1. Select an exercise from dropdown
2. View **line chart** showing:
   - Max weight over time (blue line)
   - Total reps over time (green line)
3. Hover for exact date and values

#### Volume by Exercise Chart
When exercise selected, also shows:
- Volume trend over time (orange line)
- Identifies if you're progressing or plateauing

---

## Data Management & Backups

### Why Backups Are Critical

⚠️ **Your workout data can be lost if:**
- Browser cache is cleared
- Browser is uninstalled
- Computer crashes
- You accidentally use incognito mode

✅ **Solution: Export regularly!**

### Backup Options

#### Option 1: CSV Export (Spreadsheet Format)

**Best for:**
- Opening in Excel, Google Sheets
- Creating custom charts
- Sharing with coaches
- Data analysis

**How to Export:**
1. Click **"Settings"** in navigation
2. Choose export option:
   - **"Export My Workouts"** - Just your data (Chris or Denis)
   - **"Export All Workouts"** - Both Chris & Denis
3. File downloads automatically
4. Filename: `dogcrap_workouts_chris_2024-12-03.csv`

**CSV Contains:**
- Date, User, Plan, Muscle Group, Exercise
- Set Number, Weight, Reps
- Notes

#### Option 2: Full Backup (JSON Format)

**Best for:**
- Complete data preservation
- Restoring everything exactly as it was
- Moving to different browser
- Long-term archival

**How to Create Backup:**
1. Click **"Settings"**
2. Click **"💾 Create Full Backup (JSON)"**
3. File downloads: `dogcrap_backup_2024-12-03.json`
4. **Save this file in multiple places:**
   - Google Drive
   - Dropbox
   - External USB drive
   - Email to yourself

### Restoring a Backup

**⚠️ WARNING: This will overwrite all current data!**

1. Go to **Settings**
2. Under "Restore Backup"
3. Click the file upload area
4. Select your `.json` backup file
5. Confirm the warning
6. Page will reload with restored data

### Backup Schedule Recommendation

**Weekly Routine:**
- Every Sunday after your last workout
- Export JSON backup
- Save to cloud storage

**Monthly Archive:**
- First day of each month
- Export CSV for spreadsheet analysis
- Review progress in Excel/Sheets

### Storage Monitoring

**Check Storage Usage:**
1. Go to **Settings**
2. See "Storage Information" card
3. Bar shows usage vs. 10MB limit

**If Near Limit (>8MB):**
- Warning displayed automatically
- Export old data as CSV
- Consider deleting very old workouts
- Keep JSON backup before deletion

---

## Best Practices

### Daily Training

**Before Workout:**
- Open app before going to gym
- Review last workout for same plan
- Note weights/reps you achieved last time

**During Workout:**
- Record sets immediately after completion
- Don't wait until after gym (you'll forget details)
- Use keyboard shortcuts for speed

**After Workout:**
- Add notes while fresh in mind
- Export backup if it's been a week

### Data Entry Accuracy

**Weight:**
- Use exact values: 87.5, not 87 or 88
- Include plate + bar weight
- Be consistent with units (always kg)

**Reps:**
- Count only full reps
- Don't count failed attempts
- Assisted reps should be noted in workout notes

**Sets:**
- Record each rest-pause mini-set
- Don't combine them
- If you took extra rest, add a note

### Browser Best Practices

**Recommended Setup:**
- **Use ONE browser** (e.g., Chrome) for all tracking
- **Bookmark the app:** `http://localhost:5174`
- **Don't use Incognito Mode** (data won't save)
- **Keep browser updated** for best performance

**Browser Settings to Check:**
- LocalStorage enabled (default: yes)
- Cookies enabled (default: yes)
- Don't auto-clear history on exit

### Multi-User (Chris & Denis)

**If training at same gym:**
- Chris tracks on his phone browser
- Denis tracks on his phone browser
- Export both users' data weekly
- Merge data later if needed

**If sharing one computer:**
- Switch user profile at top-right
- Always check correct user is selected
- Each user exports their own backup

---

## Troubleshooting

### App Won't Load

**Symptom:** Blank page or error message

**Solutions:**
1. Check if dev server is running:
   ```bash
   cd dogcrap-tracker
   npm run dev
   ```
2. Try different port if 5174 is busy
3. Clear browser cache (Ctrl+Shift+Del)
4. Try different browser
5. Press F12 → Console tab to see errors

### Data Disappeared

**Symptom:** Workouts are gone

**Possible Causes:**
1. **Wrong user selected** → Switch to correct user (Chris/Denis)
2. **Different browser** → Check browser you originally used
3. **Browser cache cleared** → Restore from JSON backup
4. **Incognito mode** → Data never saved, switch to normal mode

**Recovery:**
- Go to Settings → Restore Backup
- Upload your last JSON backup
- Data will be restored

### Can't Add Sets

**Symptom:** "Add Mini-Set" button doesn't work

**Solutions:**
1. Ensure both Weight AND Reps are filled
2. Check that Weight is a number (87.5, not "87.5kg")
3. Check that Reps is a whole number
4. Try clicking in field and pressing Enter

### Charts Not Showing

**Symptom:** Analytics page empty or "No data"

**Solutions:**
1. Need at least 1 completed workout
2. For exercise charts, select exercise from dropdown
3. Try a different exercise if selected one has no data
4. Refresh page (F5)

### Storage Full Warning

**Symptom:** Red warning in Settings

**Solutions:**
1. Export all data as JSON (backup)
2. Export as CSV for archival
3. Delete very old workouts (1+ year ago)
4. Move old data to spreadsheet

### Export Doesn't Download

**Symptom:** Click export but no file appears

**Solutions:**
1. Check browser's download folder
2. Check if browser blocked download (popup warning)
3. Allow downloads in browser settings
4. Try different browser

### Numbers Look Wrong

**Symptom:** Total reps or volume seems incorrect

**Solutions:**
1. Check that all sets were saved
2. Verify weight and reps values in workout detail
3. Remember: Volume = Weight × Reps for ALL sets combined
4. Use calculator to double-check math

---

## Quick Reference Guide

### Navigation
| Button | Purpose |
|--------|---------|
| Dashboard | Home screen, recent workouts |
| + New Workout | Start tracking a session |
| History | View all past workouts |
| Analytics | Charts and progress |
| Settings | Export, backup, manage data |

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| Tab | Move between fields |
| Enter (in Weight) | Jump to Reps |
| Enter (in Reps) | Add set |
| Esc | Close modals |

### File Formats
| Format | Best For | Filename Example |
|--------|----------|------------------|
| CSV | Spreadsheets, analysis | `dogcrap_workouts_chris_2024-12-03.csv` |
| JSON | Full backup, restore | `dogcrap_backup_2024-12-03.json` |

### Important Reminders

✅ **DO:**
- Export backup weekly
- Use one browser consistently
- Record sets immediately
- Check user name is correct
- Keep backup files safe

❌ **DON'T:**
- Use incognito mode
- Clear browser data without backup
- Forget to switch user
- Wait until after gym to log
- Store backups only on one device

---

## Getting Help

### Self-Help Resources
1. This User Manual (you're here!)
2. README.md - Technical documentation
3. QUICKSTART.md - Quick start guide
4. Browser Console (F12) - View error messages

### Common Questions

**Q: Can I use on my phone?**
A: Yes! Open browser and go to the URL. Best on laptop/desktop for now. Mobile app planned for Phase 3.

**Q: Can I sync between devices?**
A: Not yet. Each device/browser has separate data. Export from one, import to another. Cloud sync planned for Phase 3.

**Q: Can I add custom exercises?**
A: Not in UI yet. For now, ask developer to add to exercise database. Coming in Phase 2.

**Q: What if I forget to log a workout?**
A: Just enter it later! You can backdate workouts by selecting the date.

**Q: Can I edit a workout after saving?**
A: Not currently. You can delete it and re-enter. Edit feature planned for Phase 2.

**Q: Is my data secure?**
A: Yes! It never leaves your computer. Only you can access it. But YOU are responsible for backups.

---

## Contact & Support

**For Issues:**
- Check this manual first
- Review README.md
- Check browser console (F12)
- Contact developer with specific error messages

**For Feature Requests:**
- See Roadmap in README.md
- Submit ideas to developer

---

**Happy Training! 💪**

*Track consistently, progress steadily, and always backup your data!*

---

*User Manual Version 1.0 | December 2024*
