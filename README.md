# 💰 Finance Dashboard

A modern and interactive finance tracking dashboard built using React.  
It allows users to manage transactions, track savings goals, and visualize financial insights.

---

## 📌 Project Overview

This application helps users:
- Track income and expenses
- Visualize financial trends using charts
- Set and monitor savings goals
- Get insights into spending habits

The focus was on **clean UI, smooth UX, and real-time feedback**.

---

## 🔧 Prerequisites

Make sure you have installed:

- Node.js (v14 or higher)
- npm (comes with Node.js)

Download from: https://nodejs.org/

## ⚙️ Setup Instructions

Follow these steps to run the project locally:

```bash
# 1. Clone repository
git clone <your-repo-link>

# 2. Go to project folder
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Run project
npm run dev

👉 Open in browser:  
http://localhost:5173

---

## Tech Stack
-React (Vite)
-JavaScript(Variant)
-Recharts (for charts)
-Material UI (MUI v5)
-LocalStorage (for data persistence)

##MUI Note 
This project uses Material UI v5 Grid (legacy syntax):
Uses: item, xs, md
These may show warnings in newer MUI versions
These warnings do NOT affect functionality and can be safely ignored.

## 🚀 Features

### 💸 Transaction Management
- Add income and expense transactions
- Delete transactions
- Inline validation (no alert popups)
- Success message on adding transaction
- Sound feedback for better interaction
- Role-based access (Admin / Viewer)

---

### 📊 Data Visualization
- Pie chart for income vs expense
- Balance trend chart
- Monthly expense comparison chart

---

### 🎯 Goal Tracking
- Add multiple savings goals
- Track progress using progress bar
- Remaining amount calculation
- Input validation with error messages

---

### 🤖 Insights
- Provides suggestions based on user spending
- Helps identify areas to reduce expenses

---

### 🎨 UI / UX Enhancements
- Glassmorphism design
- Dark and Light mode toggle
- Responsive layout
- Sidebar navigation
- Smooth animations
- Audio feedback system

---

## 🧠 Approach

The project is built using a **component-based architecture** in React.

- Each feature is divided into reusable components
- State is managed using React hooks (`useState`, `useEffect`)
- Transactions are stored using LocalStorage for persistence
- Charts dynamically update based on transaction data
- Input validation ensures correct data entry
- UI is designed using custom styling for flexibility

Focus:
- Clean code structure
- Smooth user experience
- Handling edge cases properly

---

## ⚠️ Edge Cases Handled

- Empty transaction list
- Invalid user inputs
- Zero data in charts
- Incorrect or negative amounts
- Audio playback issues

---

## 🎤 Conclusion

This project demonstrates:
- Strong frontend development skills
- Clean UI/UX design
- Real-world feature implementation

---
