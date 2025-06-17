# 📊 BlackCoffer – Data Visualization Dashboard

This project is a **Data Visualization Dashboard** built as part of an assignment for **BlackCoffer**. It displays insights from diverse datasets using interactive and informative charts.

---

## ⚙️ Tech Stack

### Frontend:
- **React.js** – Frontend library
- **Tailwind CSS** – Styling
- **Context API** – State management
- **Vite** – Build tool for faster development
- **Chart libraries** – D3.js, Recharts, or custom SVGs

### Backend:
- **Node.js** – JavaScript runtime
- **Express.js** – Backend framework
- **MongoDB** – Database to store the dataset
- **Mongoose** – ODM for MongoDB
- **dotenv** and other middlewares

---

## 🚀 Getting Started

### 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** – Running locally or on cloud (e.g., MongoDB Atlas)

### 📦 Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/blackcoffer-dashboard.git
cd blackcoffer-dashboard
```

#### Install frontend dependencies:

```bash
cd client
npm install
# or
yarn install
```

#### Install backend dependencies:

```bash
cd ../server
npm install
# or
yarn install
```

### ⚙️ Environment Setup

Create a `.env` file inside the `server` directory and add the following:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blackcoffer
```

> Update the URI if you're using MongoDB Atlas.

---

## ▶️ Running the Project

### Start Backend:

```bash
cd server
npm run dev
# or
yarn dev
```

### Start Frontend:

```bash
cd client
npm run dev
# or
yarn dev
```

The app will run on `http://localhost:5173` and the API on `http://localhost:5000`.

---

## 📂 Project Structure

```
blackcoffer-dashboard/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Charts & UI components
│   │   ├── context/       # Context API setup
│   │   ├── services/      # API service functions
│   │   ├── App.jsx
│   │   └── main.jsx
├── server/                # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
└── README.md
```

---

## 📈 Features

- Choropleth Map
- Intensity Charts
- Relevance & Likelihood Graphs
- Pestle and Region Distribution
- Interactive Filters and Table View
- Context-aware state management

---
