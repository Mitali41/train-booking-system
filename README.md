# Train Reservation System

This repository contains the frontend and backend code for a Train Reservation System. The project allows users to book train tickets, view available seats, and manage bookings. The backend is built with Node.js, Express, Sequelize, and PostgreSQL, while the frontend is built with Next.js and Material-UI.

---

## Features

### Backend
- User authentication (Signup/Login)
- Train management
- Seat reservation system with row prioritization
- Search trains by name
- Manage and cancel bookings
- Sequelize ORM for database management

### Frontend
- Responsive UI with Material-UI
- Login and Signup functionality
- Dashboard to view and search trains
- Book seats with row prioritization
- View user-specific bookings
- Conditional layout to include a common header for authenticated pages

---

## Prerequisites

### Tools and Technologies
- **Node.js**: v16+ recommended
- **PostgreSQL**: For database management
- **npm or yarn**: For package management
- **Docker (Optional)**: To run PostgreSQL in a container

---

## Installation and Setup

### 1. Clone the Repository
git clone https://github.com/Mitali41/train-booking-system.git

### 2. Install Dependencies
npm install (inside server and webapp directory.)

### 3. Start the Server
cd server
node index.js

### 4. Start the WebApp
cd webapp
npm run dev
