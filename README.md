# Exam Taking Backend (Student-Side Only)

This is a **Node.js + Express.js + MongoDB** backend for an exam-taking interface (student side only).  
It provides authentication, randomized exam questions, exam submission, and result storage.

---

## 🚀 Features
- User registration and login with **JWT authentication**
- Fetch randomized **MCQ questions** for exams
- Navigate through questions (handled on frontend)
- **Submit exam** with auto-score calculation
- Store results in database
- Simple **result API** for fetching student scores
- Includes **Postman collection** for testing APIs

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (Mongoose ODM)  
- **Auth**: JWT (JSON Web Token)  

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/binayak597/exam-app.git
cd exam-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a .env file in the root directory by refering env.example

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/examdb
JWT_SECRET=your_jwt_secret_key
```

### 4. Seed sample questions
```bash
node seeder/questions.seed.js
```

### 5. Start the server
```bash
npm run dev
```

The server will run at:
👉 http://localhost:8000

## 🔑 API Endpoints

Auth Routes

- POST /api/v1.0/auth/register → Register a new user

- POST /api/v1.0/auth/login → Login and receive JWT token

Exam Routes

- GET /api/v1.0/exam/start → Fetch 10 random questions (requires JWT)

- POST /api/v1.0/exam/submit → Submit answers and calculate score

Example submitExam payload:

```json
{
  "answers": [
    {
      "questionId": "64b9f12a1234567890abcdef",
      "selectedOption": "Newton's Second Law"
    },
    {
      "questionId": "64b9f12a1234567890abcdf0",
      "selectedOption": "3 x 10^8 m/s"
    }
  ]
}
```

Result Routes

- GET /api/v1.0/results → Fetch logged-in user's exam results

## 🧪 Testing with Postman

### 1. Import the provided Postman Collection file in Postman:

- File: Exam-Backend.postman_collection.json (can find this file under backend folder)

### 2. Steps to test:

- Register a user (/api/v1.0/auth/register)

- Login to get the JWT token

- Copy the token → set it in Authorization tab → Type: Bearer Token

- Start exam → /api/v1.0/exam/start

- Submit exam → /api/v1.0/exam/submit

- View results → /api/v1.0/results

## ✅ Notes

- JWT authentication is required for all exam-related endpoints.

- This project only implements student-side functionality.

## 🧑‍💻 Author

Built by Binayak Mukherjee 🚀
