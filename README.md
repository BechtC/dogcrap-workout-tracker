# 💪 Dog Crap Workout Tracker

A professional web-based workout tracking application for **Rest-Pause (Dog Crap) training**. Built for Chris & Denis to systematically track their high-intensity training sessions with detailed mini-set recording and comprehensive progression analytics.

## 🚀 Features

### Core Functionality
- ✅ **Multi-User Support**: Switch between Chris and Denis profiles
- ✅ **Plan A/B Tracking**: Separate workout plans for upper body and legs/arms
- ✅ **Rest-Pause Mini-Sets**: Record individual mini-sets with weight and reps
- ✅ **Real-time Calculations**: Auto-calculate total reps and volume
- ✅ **Workout History**: Complete chronological log of all sessions
- ✅ **Progress Analytics**: Visual charts for strength and volume progression
- ✅ **CSV Export**: Export data for backup and analysis
- ✅ **Full Backup/Restore**: JSON backup for complete data preservation
- ✅ **Last Workout Comparison**: See your previous performance instantly when selecting exercises (v1.1.0)
- ✅ **Dark Mode Theme**: Full dark mode support with toggle switch (v1.1.0)

### Training Plans

**Plan A - Upper Body Focus:**
- Chest
- Shoulders
- Triceps
- Back Width
- Back Thickness

**Plan B - Legs & Arms Focus:**
- Biceps
- Forearms
- Quads
- Hamstrings
- Calves

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **State Management**: React Context API
- **Data Storage**: Browser LocalStorage
- **Language**: JavaScript (ES6+)

## 📦 Installation

### Quick Start

```bash
# 1. Navigate to project
cd dogcrap-tracker

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5174
```

### 📖 Complete Installation Instructions

For detailed installation guide including:
- Node.js installation for Windows/Mac/Linux
- Troubleshooting common issues
- Production build instructions
- Deployment options

**👉 Read [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)**

## 🎯 Usage Guide

### Starting a New Workout

1. Click **"+ New Workout"** in the navigation
2. Select the workout date (defaults to today)
3. Choose **Plan A** or **Plan B**
4. Optionally add notes
5. Click **"Start Workout"**

### Recording Exercises

1. Select a **muscle group** from the plan
2. Choose an **exercise** from the dropdown
3. **View Last Performance** 📊 - Automatically displays your previous workout data:
   - Date of last session
   - Weights and reps from each set
   - Total reps achieved
4. Add **mini-sets** (Rest-Pause):
   - Enter weight (kg) - supports decimals (e.g., 87.5)
   - Enter reps (e.g., 10)
   - Click **"+ Add Mini-Set"**
   - Repeat for each rest-pause set
5. Click **"✓ Save Exercise"** when complete
6. Click **"✓ Finish Workout"** when done

### Viewing Progress

- **Dashboard**: Overview of recent workouts and stats
- **History**: All past workouts with filtering by plan
- **Analytics**:
  - Personal records by exercise
  - Volume progression over time
  - Strength progression charts
  - Exercise-specific analysis

### Data Management

- **Export CSV**: Download workout data for spreadsheets
- **Create Backup**: Full JSON backup of all data
- **Restore Backup**: Import previously exported JSON backup
- **Storage Monitor**: Check LocalStorage usage

## 📊 Data Structure

### LocalStorage Schema

```json
{
  "users": {
    "chris": { "id": "chris", "name": "Chris" },
    "denis": { "id": "denis", "name": "Denis" }
  },
  "workouts": [
    {
      "id": "uuid",
      "user_id": "chris",
      "date": "2024-12-03",
      "plan": "A",
      "notes": "Great session!",
      "exercises": [
        {
          "id": "uuid",
          "muscle_group": "Chest",
          "exercise_name": "Flat Barbell Bench Press",
          "sets": [
            { "set_number": 1, "weight_kg": 100, "reps": 10 },
            { "set_number": 2, "weight_kg": 100, "reps": 5 },
            { "set_number": 3, "weight_kg": 100, "reps": 3 }
          ]
        }
      ]
    }
  ]
}
```

## 🏗️ Project Structure

```
dogcrap-tracker/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation and user switching
│   │   ├── Dashboard.jsx    # Main dashboard view
│   │   ├── NewWorkout.jsx   # Workout creation form
│   │   ├── WorkoutSession.jsx  # Active workout recording
│   │   ├── WorkoutHistory.jsx  # Historical workouts
│   │   ├── WorkoutDetail.jsx   # Individual workout view
│   │   ├── Analytics.jsx    # Progress charts
│   │   └── Settings.jsx     # Data management
│   ├── context/
│   │   └── AppContext.jsx   # Global state management
│   ├── utils/
│   │   ├── storage.js       # LocalStorage operations
│   │   ├── exercises.js     # Exercise database
│   │   └── calculations.js  # Analytics calculations
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind imports
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Key Features Explained

### Last Workout Comparison (New in v1.1.0) 📊

Perfect for gym sessions - instantly see what you did last time:
- **Automatic Display**: When you select an exercise, your previous performance appears
- **Complete History**: View all sets with exact weights and reps from your last session
- **Date & Plan Context**: Know when and which plan you last performed the exercise
- **Progressive Overload**: Easy to beat your previous numbers with data right in front of you
- **No Memory Required**: Never forget what weight you used last time

### Rest-Pause Training Support

The app is specifically designed for Dog Crap training methodology:
- Track multiple mini-sets within a single exercise
- View total reps across all mini-sets
- Calculate total volume (weight × reps)
- Compare performance against last workout

### Analytics & Progression

- **Strength Progression**: Line charts showing max weight over time
- **Volume Tracking**: Total workout volume trends
- **Personal Records**: Automatic tracking of PRs for each exercise
- **Exercise-Specific Analysis**: Detailed progression for individual lifts

### Data Safety

- **Auto-Save**: Every set is saved immediately
- **Regular Exports**: CSV and JSON export options
- **Storage Monitoring**: Warning when approaching 10MB limit
- **Local-First**: All data stored in browser, no server required

## ⚠️ Important Notes

### Data Persistence
- Data is stored in browser LocalStorage (max ~10MB)
- Clearing browser data will delete all workouts
- **Export backups regularly** to prevent data loss
- Use CSV export for spreadsheet analysis
- Use JSON backup for complete data preservation

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Keyboard Shortcuts
- Tab through input fields for faster data entry
- Enter key to add sets quickly
- All forms support keyboard navigation

## 🔧 Development

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### Deployment Options

1. **Netlify** (Recommended):
   - Connect GitHub repo
   - Auto-deploy on push
   - Free HTTPS

2. **Vercel**: Similar to Netlify

3. **GitHub Pages**: Static hosting

4. **Local**: Open `dist/index.html` in browser

### Adding New Exercises

Edit `src/utils/exercises.js` and add exercises to the appropriate muscle group:

```javascript
export const EXERCISE_DATABASE = {
  'Chest': [
    'Flat Barbell Bench Press',
    'Your New Exercise',  // Add here
    // ...
  ],
  // ...
};
```

## 📈 Roadmap & Version History

### ✅ Completed Features

#### v1.1.0 (December 2024)
- ✅ **Last-workout comparison during session** - View previous performance when selecting exercises
- ✅ **Dark mode theme** - Full dark mode support with persistent toggle

#### v1.0.0 (December 2024)
- ✅ Multi-user support (Chris & Denis)
- ✅ Plan A/B tracking system
- ✅ Rest-pause mini-sets recording
- ✅ Workout history and analytics
- ✅ CSV export and JSON backup/restore
- ✅ LocalStorage data persistence
- ✅ Comprehensive documentation suite

### 🚧 Upcoming Features

#### Phase 2 (Q1 2025)
- [ ] Exercise notes/form tips
- [ ] Advanced analytics (1RM calculator, deload recommendations)
- [ ] Custom exercise creation improvements
- [ ] Workout templates

#### Phase 3 (Q2 2025)
- [ ] Progressive Web App (PWA)
- [ ] Mobile app (React Native)
- [ ] Cloud sync between devices
- [ ] Rest-pause timer integration
- [ ] Social features (share workouts with training partner)

## 🤝 Contributing

This is a personal project for Chris & Denis. If you want to use it:

1. Fork the repository
2. Customize exercise database
3. Modify user names in `src/utils/storage.js`
4. Deploy to your own hosting

## 📄 License

Personal project - use as you wish!

## 🙏 Acknowledgments

- **Training Methodology**: Based on Dante Trudel's Dog Crap Training
- **Built by**: Professional development for Chris & Denis
- **Requirements**: Based on comprehensive requirements document

## 💡 Tips for Best Results

1. **Log workouts immediately** - don't wait until after the gym
2. **Be accurate with weights** - use exact values (87.5kg not 87kg)
3. **Track all mini-sets** - the magic is in the rest-pause details
4. **Export weekly** - backup your hard-earned data
5. **Review analytics monthly** - identify trends and plateaus
6. **Use notes** - record how you felt, sleep quality, etc.

## 🐛 Troubleshooting

### App won't load
- Clear browser cache
- Check browser console for errors
- Ensure JavaScript is enabled

### Data disappeared
- Check if you're in correct user profile (Chris/Denis)
- Restore from latest JSON backup
- Check if browser data was cleared

### Storage full warning
- Export and download CSV
- Delete old workouts you don't need
- Use JSON backup before clearing data

## 📞 Support

For issues or questions:
1. Check this README
2. Review requirements document
3. Check browser console for errors

---

## 📚 Complete Documentation

This project includes comprehensive documentation:

| Document | Purpose | Audience |
|----------|---------|----------|
| **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** | Complete installation instructions with bash commands | Developers/Setup |
| **[USER_MANUAL.md](USER_MANUAL.md)** | 30+ page complete user guide | End Users |
| **[DATA_STORAGE_EXPLAINED.md](DATA_STORAGE_EXPLAINED.md)** | How LocalStorage works with diagrams | All Users |
| **[CHEAT_SHEET.md](CHEAT_SHEET.md)** | One-page quick reference | All Users |
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute quick start tutorial | New Users |
| **[README.md](README.md)** | Technical overview and features | This file |

### 🎯 Where to Start?

**New to the app?**
1. Start with [INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md) to set up
2. Read [QUICKSTART.md](QUICKSTART.md) for quick tutorial
3. Use [CHEAT_SHEET.md](CHEAT_SHEET.md) as daily reference

**Want to understand everything?**
1. Read [USER_MANUAL.md](USER_MANUAL.md) - complete guide
2. Read [DATA_STORAGE_EXPLAINED.md](DATA_STORAGE_EXPLAINED.md) - data concepts
3. Keep [CHEAT_SHEET.md](CHEAT_SHEET.md) handy

**Just want to install and run?**
```bash
cd dogcrap-tracker
npm install
npm run dev
# Open http://localhost:5174
```

---

**Built with 💪 for serious training tracking**

*Version 1.1.0 - December 2024*
