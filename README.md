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
- ✅ **CSV Export/Import**: Export data for backup and import workouts from CSV files (v1.1.2)
- ✅ **Full Backup/Restore**: JSON backup for complete data preservation
- ✅ **Last Workout Comparison**: See your previous performance instantly when selecting exercises (v1.1.0)
- ✅ **Dark Mode Theme**: Full dark mode support with toggle switch (v1.1.1)
- ✅ **Workout Template Manager**: Create custom workout templates with drag-and-drop exercise selection (v1.1.2)
- ✅ **Exercise Registry**: Centralized database of 30+ exercises organized by 10 muscle groups (v1.1.2)
- ✅ **Comprehensive Testing**: Vitest integration with automated tests (v1.1.1)

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

### 📁 Critical Files for Running the App

The following files are essential for the app to function after cloning:

**Configuration Files:**
- `package.json` - Dependencies and scripts (already at v1.1.2)
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS styling
- `postcss.config.js` - PostCSS configuration
- `vitest.config.js` - Test configuration
- `index.html` - HTML entry point

**Source Files:**
- `src/main.jsx` - Application entry point
- `src/App.jsx` - Main app component with routing
- `src/index.css` - Global styles and Tailwind imports
- `src/components/*.jsx` - All React components (11 files)
- `src/context/*.jsx` - State management contexts (AppContext, ThemeContext)
- `src/utils/*.js` - Utility functions (storage, exerciseRegistry, workoutTemplates, etc.)

All these files are included in the repository and will work immediately after running `npm install`.

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

### Creating Custom Workout Templates (New in v1.1.2)

1. Click **"Templates"** in the navigation
2. Choose **"+ Create New Template"**
3. Enter template name and description
4. Select **Plan A** or **Plan B**
5. Add exercises:
   - Select muscle group from dropdown
   - Choose exercise from centralized registry (30+ exercises)
   - Set technique (Rest-Pause, Widowmakers, Straight Sets)
   - Define target rep range
   - Add exercise alternatives (optional)
6. Click **"✓ Save Template"**
7. Use your custom template when starting new workouts

**Smart Features:**
- Exercise dropdown prevents duplicate selections
- 10 muscle groups: Chest, Shoulders, Triceps, Back Width, Back Thickness, Biceps, Forearms, Quads, Hamstrings, Calves
- Add custom exercises to your personal library
- Edit or delete saved templates anytime

### Importing Workouts from CSV (New in v1.1.2)

1. Go to **"Settings"** tab
2. Scroll to **"Import from CSV"** section
3. Click **"Choose File"** and select your CSV file
4. Review the preview showing:
   - Total workouts to import
   - Date range
   - Users included
5. Choose import strategy:
   - **Smart Merge** (Recommended): Skips duplicate workouts based on user, date, and plan
   - **Merge All**: Imports everything without duplicate checking
   - **Replace All**: Clears existing data and imports fresh
6. Click **"Confirm Import"**
7. Data is immediately available in History and Analytics

**CSV Format Requirements:**
- Must include columns: date, user_id, plan, muscle_group, exercise_name, weight_kg, reps
- Date format: YYYY-MM-DD
- Compatible with exported CSV files from the app

### Data Management

- **Export CSV**: Download workout data for spreadsheets
- **Import CSV**: Import workouts from CSV files with three merge strategies (v1.1.2)
- **Create Backup**: Full JSON backup of all data
- **Restore Backup**: Import previously exported JSON backup
- **Storage Monitor**: Check LocalStorage usage

### Workout Template Manager (New in v1.1.2) 📋

Create and manage custom workout templates with the new Templates tab:

**Built-in Templates:**
- **Plan A Variations** (Upper Body): A1 (Incline Focus), A2 (Flat Focus), A3 (Machine Focus)
- **Plan B Variations** (Legs & Arms): B1 (Squat Focus), B2 (Leg Press Focus), B3 (Machine Focus)

**Custom Template Creation:**
- Design your own workout plans with custom exercise selection
- Choose from 30+ exercises organized by 10 muscle groups
- Smart dropdown prevents duplicate exercise selection
- Add exercise notes, techniques, and target rep ranges
- Save templates for quick workout creation

**Exercise Registry Features:**
- Centralized database of all exercises
- 10 muscle groups: Chest, Shoulders, Triceps, Back Width, Back Thickness, Biceps, Forearms, Quads, Hamstrings, Calves
- 30+ pre-loaded exercises
- Add custom exercises to your personal library
- Exercise alternatives and technique recommendations

### CSV Import Strategies (New in v1.1.2) 📊

Import workouts from CSV files with intelligent merge options:
1. **Smart Merge** (Recommended): Skip duplicate workouts based on user, date, and plan
2. **Merge All**: Import all workouts without checking for duplicates
3. **Replace All**: Clear existing data and import fresh dataset

Preview imported data before confirming, including:
- Total workout count
- Date range coverage
- Users included
- Exercise breakdown

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
│   │   ├── Competition.jsx  # User comparison view
│   │   ├── Settings.jsx     # Data management, CSV import & theme toggle
│   │   ├── WorkoutTemplateManager.jsx  # Custom template creation (v1.1.2)
│   │   └── ThemeDebug.jsx   # Theme debugging component
│   ├── context/
│   │   ├── AppContext.jsx   # Global state management
│   │   └── ThemeContext.jsx # Dark mode state management
│   ├── utils/
│   │   ├── storage.js       # LocalStorage operations & CSV import
│   │   ├── exercises.js     # Exercise database (legacy)
│   │   ├── exerciseRegistry.js  # Centralized exercise registry (v1.1.2)
│   │   ├── calculations.js  # Analytics calculations
│   │   ├── seedData.js      # Sample data generator
│   │   └── workoutTemplates.js  # Pre-defined workout plans
│   ├── tests/
│   │   └── setup.js         # Test environment setup
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind imports
├── public/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vitest.config.js         # Test configuration
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

#### v1.1.2 (December 2024)
- ✅ **Workout Template Manager** - New "Templates" tab for creating custom workout plans
- ✅ **Exercise Registry** - Centralized database of 30+ exercises organized by 10 muscle groups
- ✅ **CSV Import Feature** - Import workouts from CSV files with three merge strategies
- ✅ **Smart Merge Strategy** - Skip duplicate workouts during CSV import
- ✅ **Exercise Dropdown Enhancement** - Prevent duplicate exercise selection in templates
- ✅ **Custom Exercise Support** - Add exercises to personal library from template manager

#### v1.1.1 (December 2024)
- ✅ **Dark mode theme** - Full dark mode support with persistent toggle
- ✅ **Workout templates** - Pre-defined workout plans with 6 variations (A1-A3, B1-B3)
- ✅ **Comprehensive test suite** - Vitest integration with 13+ automated tests
- ✅ **Enhanced exercise database** - Structured workout templates with technique guidance
- ✅ **Theme debugging tools** - ThemeDebug component for development

#### v1.1.0 (December 2024)
- ✅ **Last-workout comparison during session** - View previous performance when selecting exercises
- ✅ **Initial dark mode implementation** - Foundation for theme system

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
- [ ] Exercise notes/form tips enhancements
- [ ] Advanced analytics (1RM calculator, deload recommendations)
- [ ] Template sharing between users
- [ ] Workout plan scheduling

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

1. **Create custom templates** - Design templates for your favorite workout variations (v1.1.2)
2. **Use Smart Merge for CSV imports** - Prevents duplicate data when importing workouts (v1.1.2)
3. **Log workouts immediately** - don't wait until after the gym
4. **Be accurate with weights** - use exact values (87.5kg not 87kg)
5. **Track all mini-sets** - the magic is in the rest-pause details
6. **Export weekly** - backup your hard-earned data via CSV or JSON
7. **Review analytics monthly** - identify trends and plateaus
8. **Use notes** - record how you felt, sleep quality, etc.
9. **Build exercise library** - Add your custom exercises to the centralized registry (v1.1.2)

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

*Version 1.1.2 - December 2024*
