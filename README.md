# 🏡 Wonderlust — Airbnb-Style Rental Platform

An Airbnb-inspired full-stack web application built with **Node.js, Express, EJS, MongoDB, and Passport.js**.  
Users can create, browse, edit, and delete property listings, leave reviews, and securely authenticate via Passport.js.  

🔗 **Live Demo:** [Wonderlust on Render](https://wonderlust-h12v.onrender.com)  

---

## ✨ Features
- 🏠 **Property Listings** — Create, view, edit, and delete rental listings.  
- 🔑 **User Authentication** — Secure login/signup using **Passport.js** (Local Strategy with sessions).  
- 📝 **Reviews & Ratings** — Users can add and manage feedback on listings.  
- 📱 **Responsive Design** — Clean UI built with **Bootstrap**, optimized for mobile & desktop.  
- ☁️ **Deployment** — Hosted on **Render** with **MongoDB Atlas** for database.  

---

## 🛠 Tech Stack
- **Backend:** Node.js, Express  
- **Frontend:** EJS, Bootstrap  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** Passport.js (Local Strategy, sessions, cookies)  
- **Deployment:** Render (backend + hosting), MongoDB Atlas  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/wonderlust.git
cd wonderlust
```
### 2. Install dependencies
```bash
npm install

```
### 3. Set up environment variables
Create a .env file in the root directory and add:
```bash
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key

```
### 4. Run the application 
```bash
npm start

```
### 5. Access the app
Open your browser and go to:
```bash
http://localhost:3000

```
## 📚 Learning Highlights

- Implemented Passport.js authentication with session & cookie handling.
- Learned how to deploy a Node.js + Express + MongoDB app on Render with environment configs.
- Practiced building server-side rendered web apps with EJS.

