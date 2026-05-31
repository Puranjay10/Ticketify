# 🎟️ Ticketify

A full-stack event ticketing platform that enables users to discover events, create and manage events, book tickets, and verify attendance through QR-based ticket validation and real-time seat updates.

## 🚀 Live Demo

**Frontend:** https://ticketify-lemon.vercel.app/

**Backend API:** https://ticketify-2f30.onrender.com

---

## 📌 Overview

Ticketify is a modern event management and ticket booking platform built using a full-stack JavaScript architecture.

The platform supports secure authentication, role-based access control, event management, ticket booking, QR-code ticket generation, organizer-side ticket verification, and real-time seat availability updates using Socket.IO.

Designed with scalability and maintainability in mind, Ticketify follows a layered backend architecture consisting of controllers, services, middleware, and database models.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Secure password hashing using bcrypt
* Protected routes
* Role-Based Access Control (RBAC)
* User, Organizer, and Admin roles
* Backend-enforced role authorization

### 🎉 Event Management

* Create events (Organizer/Admin)
* Update event details
* Delete events
* Browse all available events
* View organizer-specific events
* Event ownership validation
* Seat availability tracking

### 🎫 Ticket Management

* Book tickets for events
* Prevent booking for expired events
* Automatic seat deduction
* Ticket history management
* QR-code ticket generation
* Unique ticket codes

### ✅ Ticket Verification

* Organizer/Admin ticket verification
* QR-code based validation workflow
* Duplicate ticket usage prevention
* Event ownership verification during validation

### ⚡ Real-Time Updates

* Socket.IO integration
* Live seat availability updates
* Real-time event synchronization

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Real-Time Communication

* Socket.IO

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🏗️ Architecture

```text
Frontend (Vercel)
      │
      ▼
REST API + Socket.IO
      │
      ▼
Express.js Backend (Render)
      │
      ▼
MongoDB Atlas
```

### Backend Structure

```text
src/
├── controllers/
├── services/
├── routes/
├── middleware/
├── models/
├── validators/
├── sockets/
└── server.js
```

The backend follows a layered architecture separating business logic, routing, validation, authentication, and database operations.

---

## 🔧 Installation

### Clone Repository

```bash
git clone https://github.com/Puranjay10/Ticketify.git
cd Ticketify
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm start
```

---

## 🔐 API Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
GET  /auth/profile
```

### Events

```http
GET    /events
GET    /events/:id
GET    /events/my-events
POST   /events
PUT    /events/:id
DELETE /events/:id
```

### Tickets

```http
POST /tickets/book
GET  /tickets/my
POST /tickets/verify
```

---

## 🌐 Deployment

Ticketify is deployed using a cloud-native architecture:

* Frontend hosted on Vercel
* Backend hosted on Render
* Database hosted on MongoDB Atlas

This deployment setup enables easy scalability and independent frontend/backend deployments.

---

## 🎯 Future Enhancements

* Payment Gateway Integration
* Email Notifications
* Event Categories & Search
* Analytics Dashboard
* Redis-based Seat Locking
* Automated Testing Pipeline
* Advanced Admin Controls

---

## 👨‍💻 Author

**Puranjay Kapoor**

Computer Science Student | Full-Stack Developer

GitHub: https://github.com/Puranjay10

---

## 📜 License

This project is intended for educational and portfolio purposes.
