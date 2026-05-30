# 🎟️ Ticketify

A full-stack event ticketing platform that enables users to discover events, register accounts, book tickets, and manage their event participation through a seamless web experience.

## 🚀 Live Demo

**Frontend:** https://ticketify-lemon.vercel.app/

**Backend API:** https://ticketify-2f30.onrender.com

---

## 📌 Overview

Ticketify is a web-based event management and ticket booking platform designed to simplify the process of organizing and attending events.

The platform provides secure user authentication, event creation and management, ticket booking, and real-time updates. It follows a modern client-server architecture with a Node.js backend, MongoDB database, and a responsive frontend built using HTML, CSS, and JavaScript.

---

## ✨ Features

### User Authentication

* User registration and login
* JWT-based authentication
* Secure password handling
* Protected routes for authenticated users

### Event Management

* Create new events
* View available events
* Manage event details
* Track seat availability

### Ticket Booking

* Book tickets for events
* Prevent overbooking
* Manage ticket records
* View booked tickets

### Real-Time Communication

* Socket.IO integration
* Instant event-related updates
* Improved user experience through live interactions

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

* JSON Web Tokens (JWT)

### Real-Time Features

* Socket.IO

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 🏗️ System Architecture

Frontend (Vercel)
↓
REST API Requests
↓
Express.js Backend (Render)
↓
MongoDB Atlas Database

---

## 📂 Project Structure

```text
Ticketify/
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   └── ...
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

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

Create a `.env` file in the root directory:

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
```

### Events

```http
GET    /events
POST   /events
PUT    /events/:id
DELETE /events/:id
```

### Tickets

```http
GET    /tickets
POST   /tickets/book
```

---

## 🌐 Deployment

The application is deployed using a modern cloud-native architecture:

* Frontend hosted on Vercel
* Backend hosted on Render
* Database hosted on MongoDB Atlas

This setup ensures scalability, reliability, and easy maintenance.

---

## 🎯 Future Enhancements

* Payment Gateway Integration
* Email Notifications
* Event Categories and Search
* Admin Dashboard
* QR Code Based Ticket Validation
* Analytics and Reporting
* Role-Based Access Control

---

## 👨‍💻 Author

**Puranjay Kapoor**

Computer Science Student | Full-Stack Developer

GitHub: https://github.com/Puranjay10

---

## 📜 License

This project is intended for educational and portfolio purposes.
