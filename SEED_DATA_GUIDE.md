# 🎲 Seed Data Guide - Demo Workouts

## Overview

The Dog Crap Workout Tracker includes a seed data generator that creates **150 realistic training sessions** for testing and demonstration purposes.

## What Gets Generated?

### Summary Statistics

- **Total Workouts**: 150
- **Chris Workouts**: 75
- **Denis Workouts**: 75
- **Date Range**: January 1, 2024 to January 1, 2025 (full year)
- **Total Exercises**: ~550 (3-5 per workout)
- **Total Sets**: ~2,200+ (2-4 mini-sets per exercise)
- **Plans**: Alternating Plan A and Plan B

### Realistic Training Patterns

The seed data simulates real training with:

✅ **Progressive Overload**: Weight increases gradually over the year (~15% total)
✅ **Rest-Pause Sets**: 2-4 mini-sets per exercise with declining reps
✅ **Variety**: Exercises rotate from the full database
✅ **Random Notes**: ~30% of workouts have notes
✅ **Different Strengths**: Chris and Denis have different base weights
✅ **Natural Variation**: Small random fluctuations in performance

### Chris's Base Strengths (Starting Weights)

```
Upper Body (Plan A):
├── Chest: 95 kg
├── Shoulders: 70 kg
├── Triceps: 80 kg
├── Back Width: 85 kg
└── Back Thickness: 100 kg

Lower Body & Arms (Plan B):
├── Biceps: 35 kg
├── Forearms: 30 kg
├── Quads: 120 kg
├── Hamstrings: 90 kg
└── Calves: 110 kg
```

### Denis's Base Strengths (Starting Weights)

```
Upper Body (Plan A):
├── Chest: 85 kg
├── Shoulders: 65 kg
├── Triceps: 70 kg
├── Back Width: 80 kg
└── Back Thickness: 95 kg

Lower Body & Arms (Plan B):
├── Biceps: 32 kg
├── Forearms: 28 kg
├── Quads: 110 kg
├── Hamstrings: 85 kg
└── Calves: 100 kg
```

## How to Load Seed Data

### Method 1: Via Settings Page (Recommended)

1. Open the app: `http://localhost:5174`
2. Click **"Settings"** in navigation
3. Scroll to **"🎲 Demo Data for Testing"** section
4. Click **"🎲 Load 150 Demo Workouts"** button
5. Confirm the popup (warns about replacing data)
6. Wait for page to reload
7. Done! Explore the data

### Method 2: Via Console (Developer)

```javascript
// Open browser console (F12)
import { seedDatabase } from './src/utils/seedData';

// Load seed data
seedDatabase();

// Reload page
window.location.reload();
```

## What to Test With Seed Data

### Dashboard Testing

✅ View recent workouts (should show 5 most recent)
✅ Check total workout count (should be 150)
✅ Check Plan A/B counts (75 each)
✅ Check total volume (should be in tens of thousands)

### History Testing

✅ Browse all 150 workouts
✅ Filter by Plan A (should show 75)
✅ Filter by Plan B (should show 75)
✅ Click individual workouts to view details
✅ Check date sorting (newest first)

### Analytics Testing

✅ **Personal Records Tab**:
   - Should show PRs for many exercises
   - Compare Chris vs Denis strengths
   - Check if weights are realistic

✅ **Volume Progression Chart**:
   - Should show upward trend
   - Blue bars = Plan A, Green bars = Plan B
   - Hover to see exact values

✅ **Strength Progression by Exercise**:
   - Select "Flat Barbell Bench Press"
   - Should show gradual weight increase from Jan to Dec
   - Check total reps variation (10-18 typical)

✅ **Exercise-Specific Analysis**:
   - Try different exercises
   - Check if progression makes sense
   - Look for plateaus (there will be some!)

### Data Export Testing

✅ Export Chris's workouts as CSV
✅ Export all workouts as CSV
✅ Create full JSON backup
✅ Open CSV in Excel/Google Sheets
✅ Verify data format and completeness

## Expected Progression Examples

### Chris - Bench Press Progression (Sample)

```
Jan 2024:  95 kg × 18 reps (10+5+3)
Mar 2024:  98 kg × 17 reps (10+5+2)
Jun 2024: 102 kg × 16 reps (9+5+2)
Sep 2024: 106 kg × 18 reps (11+5+2)
Dec 2024: 109 kg × 17 reps (10+5+2)

Total increase: ~15% (95kg → 109kg)
```

### Denis - Squat Progression (Sample)

```
Jan 2024: 110 kg × 16 reps (10+4+2)
Mar 2024: 113 kg × 18 reps (11+5+2)
Jun 2024: 118 kg × 17 reps (10+5+2)
Sep 2024: 122 kg × 16 reps (10+4+2)
Dec 2024: 126 kg × 18 reps (11+5+2)

Total increase: ~15% (110kg → 126kg)
```

## Sample Workout Structure

### Example: Chris - Plan A - February 15, 2024

```
📅 Date: 2024-02-15
👤 User: Chris
📋 Plan: A (Upper Body)
📝 Notes: "Felt strong today, good session!"

Exercises:
1. Chest - Flat Barbell Bench Press
   ├── Set 1: 96.5 kg × 11 reps
   ├── Set 2: 96.5 kg × 6 reps
   └── Set 3: 96.5 kg × 3 reps
   Total: 20 reps | Volume: 1,930 kg

2. Shoulders - Barbell Overhead Press
   ├── Set 1: 72 kg × 10 reps
   ├── Set 2: 72 kg × 5 reps
   └── Set 3: 72 kg × 2 reps
   Total: 17 reps | Volume: 1,224 kg

3. Triceps - Close-Grip Bench Press
   ├── Set 1: 81 kg × 12 reps
   ├── Set 2: 81 kg × 7 reps
   ├── Set 3: 81 kg × 4 reps
   └── Set 4: 81 kg × 2 reps
   Total: 25 reps | Volume: 2,025 kg

Total Workout Volume: 5,179 kg
```

## Data Quality Features

### Realistic Patterns

✅ **Declining Reps in Rest-Pause**: First set highest, each subsequent set lower
✅ **Weight Progression**: Gradual increase over time
✅ **Natural Variation**: Some workouts are better/worse than others
✅ **Muscle Group Balance**: All muscle groups get trained
✅ **Exercise Variety**: Different exercises each session

### Edge Cases Included

✅ Good days (higher reps, higher weight)
✅ Bad days (lower reps, lower weight)
✅ Workouts with notes vs without
✅ Short workouts (3 exercises)
✅ Long workouts (5 exercises)
✅ Different rest-pause patterns (2-4 sets)

## Clearing Seed Data

### Option 1: Load New Seed Data
Simply click "Load Demo Data" again - it will replace the old data.

### Option 2: Clear All Data
1. Go to Settings
2. Scroll to "Danger Zone"
3. Click "Clear All Data"
4. Confirm warnings
5. Page reloads with empty database

### Option 3: Restore Your Backup
1. Export backup before loading seed data
2. Go to Settings → Restore Backup
3. Upload your backup JSON file
4. Your original data returns

## Use Cases

### For Developers

- Test all features without manual data entry
- Verify analytics calculations
- Check chart rendering with large datasets
- Test export/import functionality
- Benchmark performance with realistic data size

### For Users (Testing)

- Learn the interface with existing data
- Understand how progression tracking works
- See what charts look like with full data
- Practice navigating workout history
- Test before committing to real training logs

### For Demonstrations

- Show potential users what the app can do
- Present to training partners (Denis)
- Demo for feedback sessions
- Create screenshots for documentation
- Test on different devices/browsers

## Technical Details

### File Location

```
src/utils/seedData.js
```

### Key Functions

```javascript
generateSeedData()     // Creates all 150 workouts
seedDatabase()         // Loads data into LocalStorage
getSeedDataStats()     // Returns statistics about data
```

### Data Size

```
JSON Size: ~800 KB
LocalStorage: ~1 MB (compressed)
Number of Records: ~2,900 (workouts + exercises + sets)
Generation Time: < 1 second
```

### Customization

Want different data? Edit `src/utils/seedData.js`:

```javascript
// Change base weights
const userProfiles = {
  chris: {
    baseWeights: {
      'Chest': 100,  // Change this
      // ...
    }
  }
};

// Change workout count
const workoutsPerUser = 100;  // Default: 75

// Change date range
const startDate = new Date('2023-01-01');  // Change start
```

## Troubleshooting

### "Error loading demo data"

**Cause**: JavaScript error in seed generation
**Solution**: Check browser console (F12) for error message

### Page doesn't reload after loading

**Cause**: JavaScript error preventing reload
**Solution**: Manually refresh page (F5)

### Charts show weird data

**Cause**: Previous data mixed with seed data
**Solution**: Clear all data first, then load seed data fresh

### Storage full warning appears

**Cause**: 150 workouts use ~1MB, might be near limit if had data before
**Solution**: Clear data first, or export old data before loading seed

## FAQ

**Q: Will this delete my real workout data?**
A: YES! Always export a backup first if you have real data.

**Q: Can I load seed data multiple times?**
A: Yes, each time replaces previous data with fresh seed data.

**Q: Can I edit seed data after loading?**
A: No, but you can delete individual workouts in the app normally.

**Q: Is the progression realistic?**
A: Yes! Based on typical strength gains (~15% per year for intermediates).

**Q: Why 150 workouts specifically?**
A: 75 per user = ~1.5 workouts per week for a full year (realistic frequency).

**Q: Can I add my own data alongside seed data?**
A: Yes! Once loaded, use "New Workout" to add more workouts normally.

---

## Quick Start Commands

```bash
# 1. Open app
http://localhost:5174

# 2. Go to Settings

# 3. Click "Load 150 Demo Workouts"

# 4. Explore!
```

---

**Happy Testing! 🎲💪**

*Seed Data Guide Version 1.0 | December 2024*
