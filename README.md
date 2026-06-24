# 🎬 MovieVault - MTE

A full-stack movie catalog application built for the Zuitt full-stack web development mock technical exam.  
MovieVault allows users and admins to manage movies with authentication, CRUD operations, comments, and a modern UI.

---
##🔐 User Credentials
👑 Admin User
- Email: admin@mail.com
- Password: admin123

👤 Dummy Customer
- Email: reuser@mail.com
- Password:reuser123

---
## ⚙️ Features

---

## 🧩 Core UI Components
- Navigation Bar (Role-based navigation: User / Admin)
- Banner Component
- Movies Catalog Page (User view)
- Admin Movies Catalog Page (Table view)
- View Movie Modal Component
- Add Movie Modal Component
- Update Movie Modal Component
- 404 Error Page
- Home Page

---

## 👤 Authentication System
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Persistent login via `localStorage`
- User state management using Pinia (`global store`)
- Role-based access control (`isAdmin` / user)

---

## 🎬 Movie Management System

### Admin Features
- Create new movie
- View all movies (table format)
- Update movie details
- Delete movie
- View full movie details in modal

---

### User Features
- View movie catalog
- View movie details (modal)
- Add comments to movies
- View comments per movie
- Read-only access to movie data

---

## 💬 Comment System
- Add comment to a movie
- Fetch comments per movie
- Display comments per movie
- Real-time refresh after posting comment

---

## 🌐 API Endpoints Used

### Users
- POST /users/register  
- POST /users/login  
- GET /users/details (Requires token)

---

### Movies
- POST /movies/addMovie  
- GET /movies/getMovies  
- PATCH /movies/updateMovie/:id  
- DELETE /movies/deleteMovie/:id  

---

### Comments
- POST /movies/addComment/:id  
- GET /movies/getComments/:id  

---

## 🔐 User Profile System
- Fetch logged-in user details
- Display email in navbar
- Role support (`isAdmin`) for admin dashboard access
- Conditional rendering (Admin vs User UI)

---

## 🎨 UI / UX Design
- Dark cinematic UI theme
- Blue accent branding (#60a5fa style system)
- Responsive grid layout
- Modal-based interactions (View / Add / Edit)
- Smooth hover animations
- Clean card-based UI for movies
- Admin table layout for management
- Modern glassmorphism-inspired styling

---

## 📌 Notes
- Built for educational purposes
- Focused on CRUD, authentication, role-based UI, and UI/UX design
- Backend deployed on Render
- Frontend consumes REST API via Axios