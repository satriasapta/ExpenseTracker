# 💰 Expense Tracker

# 💰 Expense Tracker

**Expense Tracker** is a personal finance management application built to help users track their income and expenses with clarity and ease. It provides a visual dashboard to monitor financial health through real-time charts.

---

## 🚀 Features

- **📊 Dynamic Dashboard**: Visualize your financial health with interactive bar charts for income and expenses over the last 30 days.
- **💸 Transaction Management**: Seamlessly record, update, and manage your daily financial activities.
- **🔐 Secure Authentication**: Robust user authentication system powered by JWT (JSON Web Tokens).
- **📈 Financial Overview**: Instant summary of Total Balance, Total Income, and Total Expenses.
- **📱 Responsive Design**: Fully optimized for mobile and desktop views using Tailwind CSS.
- **📥 Data Export/Import**: Built-in support for Excel file handling for financial records.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Date Handling**: [Moment.js](https://momentjs.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Security**: [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) & [JWT](https://jwt.io/)
- **File Handling**: [Multer](https://github.com/expressjs/multer) & [XLSX](https://github.com/SheetJS/sheetjs)

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js installed
- MongoDB (Local or Atlas)

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Running the Application
Open two terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

---

## 📁 Project Structure

```text
ExpenseTracker/
├── backend/            # Express API & MongoDB Models
│   ├── controllers/    # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
├── frontend/           # React Application (Vite + Tailwind)
│   ├── src/
│   │   ├── components/  # Reusable UI bits
│   │   ├── pages/       # Page components
│   │   └── utils/       # Helpers & API config
│   └── index.html       # Entry point
└── README.md
```

---

## 📄 License
This project is licensed under the ISC License.
