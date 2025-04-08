# 📚 E-Learning Platform Backend

This is the backend service for a secure and scalable E-Learning platform built with **Node.js**, **Express**, and **TypeScript**. It handles core functionalities such as user authentication, course management, secure video content, scheduling tasks, and more.

---

## 🚀 Features

- 🔐 JWT-based Authentication
- 🧂 Password hashing with bcrypt
- 🍪 Cookie management with cookie-parser
- 📦 Cloud file handling with Cloudinary
- 📧 Email services with Nodemailer
- 📅 Scheduled tasks with Node-Cron
- 🌐 RESTful APIs built with Express + TypeScript
- ☁️ MongoDB for data persistence
- ⚡ Redis for caching/session handling
- 📄 EJS templates for server-side views

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express
- **Language:** TypeScript
- **Database:** MongoDB
- **Caching:** Redis (ioredis)
- **Email:** Nodemailer
- **Cloud Storage:** Cloudinary
- **Templating:** EJS

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/ChauhanAshish272/E-Learning-Backend-.git
cd E-Learning-Backend-
npm install
npm i bcryptjs cookie-parser cors dotenv express ioredis jsonwebtoken mongoose typescript @types/bcryptjs @types/cookie-parser @types/cors @types/ejs @types/express @types/jsonwebtoken @types/node @types/nodemailer

npm i nodemailer node-cron ejs cookies-parser cloudinary @types/node-cron axios

npm install ts-node-dev --save-dev
touch .env
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
npm run dev

📁 Project Structure
E-Learning-Backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   └── index.ts
├── public/
├── views/
├── .env
├── tsconfig.json
├── package.json
└── README.md
