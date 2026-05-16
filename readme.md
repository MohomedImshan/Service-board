# 🛠 Service Board - Full Stack App

A full-stack service request management system built using:

- Frontend: Next.js (React)
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)
- Authentication: JWT
- Styling: Bootstrap

---

## 🚀 Features

### 👤 Authentication
- User registration
- User login (JWT-based)
- Protected routes (create, delete jobs)

### 📋 Job Management
- Create service requests
- View all jobs
- View single job details
- Update job status (Open / In Progress / Closed)
- Delete job (authorized users only)

### 🔎 Search & Filter
- Search jobs by title/description
- Filter by category
- Filter by status

---

## 🧱 Project Structure
service-board/
│
├── client/ # Next.js frontend
├── server/ # Express backend
└── README.md

---

## ⚙️ Setup Instructions

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/MohomedImshan/service-board.git
cd service-board

2.Backend setup (server)
cd server
npm install
Create .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run backend:
npm run dev

Backend runs at:

http://localhost:5000
3️⃣ Frontend Setup (Client)
cd ../client
npm install
npm run dev

Frontend runs at:

http://localhost:3000
