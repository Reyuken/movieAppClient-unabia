# 🏋️ FitForge - MTE

A full-stack fitness tracking application built for the Zuitt full-stack web development mock technical exam.  
FitForge allows users to manage workouts with authentication, CRUD operations, and a modern UI.

---
## ⚙️ Features

---

## 🧩 Core UI Components
- Navigation Bar (Role-based navigation)
- Banner Component
- Highlights Component
- Modal Components (Add / Update Workout)
- 404 Error Page
- Home Page

---

## 👤 Authentication System
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent login via token storage (localStorage)
- User state management using Pinia

---

## 🏋️ Workout Management System

### User Features
- Create new workout
- View personal workouts
- Update workout details
- Delete workout
- Mark workout as completed
- Track workout status (Pending / Completed)

---

### API Endpoints Used

#### Users
- `POST /users/register`
- `POST /users/login`
- `GET /users/details` (Requires token)

#### Workouts
- `POST /workouts/addWorkout`
- `GET /workouts/getMyWorkouts`
- `PATCH /workouts/updateWorkout/:id`
- `DELETE /workouts/deleteWorkout/:id`
- `PATCH /workouts/completeWorkoutStatus/:id`

---

## 🔐 User Profile System
- Fetch logged-in user details
- Display email in navbar
- Role support (`isAdmin`) for future expansion

---

## 🎨 UI / UX Design
- Dark fitness-themed UI
- Responsive layout (mobile-friendly)
- Modal-based forms (Add / Edit Workout)
- Smooth transitions and hover effects
- Consistent FitForge branding
- Modern glassmorphism styling

---

## 📌 Notes
- Capstone 3 demonstration project
- Built for educational purposes
- Focused on CRUD, authentication, and UI/UX design
- Backend deployed on Render