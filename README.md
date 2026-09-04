# 🍽️ WebService — Full-Stack Web App for Pengonda Kalyani Foods

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

> A production-ready full-stack web application built for **Pengonda Kalyani Foods** — a real-world client project featuring a React + Vite frontend and a Node.js/Express REST API backend following the MVC pattern.

---

## 🚀 Features

- **MVC Architecture** — Clean separation of Models, Controllers, Routes, and Middleware on the backend
- **React + Vite Frontend** — Lightning-fast HMR development with optimized production builds
- **RESTful API** — Structured Express API with dedicated route files per resource
- **Custom Middleware** — Request validation, error handling, and authentication middleware
- **Monorepo Structure** — Frontend and backend co-located in one repository for easy deployment

---

## 🏗️ Architecture

```
webService/
├── backend/
│   ├── server.js         # Express app entry point
│   ├── config/           # DB connection & environment config
│   ├── controllers/      # Business logic handlers
│   ├── middleware/       # Auth, error handling, validation middleware
│   ├── model/            # Database models (schema definitions)
│   ├── routes/           # API route definitions
│   └── package.json
└── frontend/
    ├── src/              # React components & pages
    ├── public/           # Static assets
    ├── vite.config.js    # Vite configuration with proxy setup
    └── package.json
```

**Key Design Decisions:**
- **Vite proxy** configured to forward `/api` requests to Express during development — zero CORS issues
- **MVC pattern** chosen on the backend to keep business logic out of route handlers
- Separate `package.json` for frontend and backend enables independent deployment

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 |
| Build Tool | Vite |
| Backend Runtime | Node.js |
| Web Framework | Express.js |
| Database | MongoDB |
| Linting | ESLint |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Backend

```bash
cd backend
npm install

# Create .env file
echo "MONGO_URI=your_mongodb_connection_string" > .env
echo "PORT=5000" >> .env

npm start          # Production
npm run dev        # Development with auto-reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev        # Starts on http://localhost:5173
npm run build      # Production build
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all food products |
| POST | `/api/products` | Add a new product |
| PUT | `/api/products/:id` | Update product details |
| DELETE | `/api/products/:id` | Remove a product |
| POST | `/api/auth/login` | User authentication |

---

## 🌱 Future Enhancements

- [ ] JWT authentication with refresh tokens
- [ ] Order management system
- [ ] Admin dashboard with analytics
- [ ] Image upload via Cloudinary
- [ ] Docker + CI/CD pipeline

---
