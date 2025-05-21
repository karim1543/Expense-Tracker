# 💸 Expense Tracker (MERN Stack)

A full-stack Expense Tracker application built using the **MERN** stack — enabling users to register, log in, and manage their daily expenses with full CRUD functionality and secure authentication.

---

## 🚀 Features

- 🔐 User Authentication (Login/Register)
- ➕ Add, ✏️ Edit, ❌ Delete Expenses
- 📊 Track and View Total Expenses
- 🏷️ Category Badges (e.g., Food, Travel)
- 🌐 JWT Protected Routes
- 💅 TailwindCSS UI Styling
- ⚙️ REST API (Testable with Postman)

---

## 🛠️ Tech Stack

**Frontend**
- React
- TailwindCSS
- Axios
- React Router
- Context API (for auth)

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing

---

## 📦 Installation

### ⚙️ Backend

```bash
cd backend
npm install
Create a .env file in the backend folder:
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
🖥️ Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
📬 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get token
GET	/api/expenses	Get all user expenses
POST	/api/expenses	Add a new expense
PUT	/api/expenses/:id	Update an expense
DELETE	/api/expenses/:id	Delete an expens
