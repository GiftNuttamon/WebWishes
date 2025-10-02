# 🌌 WebWishes – Make a Wish to the Stars  

> 🪐 A full-stack web application where users can send their wishes to planets and stars.  
> Built with **React, Node.js (Express), MySQL**, and styled with **Bootstrap + custom space UI**.  

---

## 🌟 Features
- ✨ User registration & login system (with validation for unique username/email):contentReference[oaicite:0]{index=0}  
- 🌍 Solar system UI – choose a planet to send your wish:contentReference[oaicite:1]{index=1}  
- 📩 Submit wishes to a selected planet and store them in MySQL:contentReference[oaicite:2]{index=2}  
- 📜 View all wishes sorted by latest submissions:contentReference[oaicite:3]{index=3}  
- 🌌 Interactive cosmic design with animations (hover planets, twinkling stars, blur effects):contentReference[oaicite:4]{index=4}  

---

## 📂 Repository Structure
- **Frontend (React)**
  - `App.js`, `WishPage.js`, `pages/` → Main React components & routes:contentReference[oaicite:5]{index=5}:contentReference[oaicite:6]{index=6}  
  - `App.css`, `index.css` → Styling (space theme, planets, stars, wish cards):contentReference[oaicite:7]{index=7}:contentReference[oaicite:8]{index=8}  

- **Backend (Node.js / Express)**
  - `app.js` → REST API (register, login, check username/email, submit wish, fetch wishes):contentReference[oaicite:9]{index=9}  
  - `database.js` → MySQL connection config:contentReference[oaicite:10]{index=10}  

- **Database**
  - MySQL schema with `users` and `wishes` tables:contentReference[oaicite:11]{index=11}  

- **Other**
  - `package.json` → dependencies & scripts:contentReference[oaicite:12]{index=12}  
  - `App.test.js` → React test boilerplate:contentReference[oaicite:13]{index=13}  

---

## 🚀 How to Run

### 1. Clone the repository
```bash
git clone https://github.com/GiftNuttamon/WebWishes.git
cd WebWishes
```
### 2. Setup Backend
```bash
cd backend
npm install
npm run dev   # start backend server on port 3001
```
### 3. Setup Frontend
```bash
cd frontend
npm install
npm start   # start frontend on port 3000
```
### 4. Database Setup
```bash

Import schema into MySQL:

CREATE DATABASE myweb;
USE myweb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(100),
  mail VARCHAR(100) UNIQUE
);

CREATE TABLE wishes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  planet_id VARCHAR(50),
  wisher_name VARCHAR(100),
  wish_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🛠 Tech Stack

Frontend: React, React Router, Bootstrap

Backend: Node.js, Express, CORS

### app

Database: MySQL

Languages: JavaScript (ES6), SQL

Deployment: Localhost / future hosting on Firebase or Vercel

### 📌 Use Case

🎓 Academic project demonstrating full-stack development

⭐ Social app concept for sharing wishes to planets and stars

🧑‍💻 Practice in React + Express + MySQL integration

### ❤️ Credits

### Developed by Nuttamon Chanseeda (Gift) – Computer Engineering, TNI


---

# ✅ Description  
> 🌌 Full-stack web app where users can register, log in, and send wishes to planets. Built with React, Node.js (Express), and MySQL, featuring space-themed UI and interactive cosmic animations.  

