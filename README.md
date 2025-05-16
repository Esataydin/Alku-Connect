# Test Repo

Get started with the project by following these simple steps:

---

## 🚀 Quick Start Guide

### 1️⃣ Set Up Your Environment

Split your terminal into **two panes** — one for the backend and one for the frontend.

---

### 🐍 Terminal 1: Backend (Python)

1. Navigate to the backend folder:
   ```bash
   cd ./backend
   ```
2. Create and activate a virtual environment:
   - **Windows:**
     ```bash
     python -m venv env
     .\env\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     python3 -m venv env
     source env/bin/activate
     ```
3. Install dependencies and run the server:
   ```bash
   python3 -m pip install -r requirements.txt
   python3 manage.py runserver
   ```

---

### ⚛️ Terminal 2: Frontend (JavaScript)

1. Navigate to the frontend directory:
   ```bash
   cd ./frontend
   ```
2. Install packages and start the development server:
   ```bash
   npm install
   npm run dev
   ```

---

## 📡 API Documentation

Visit [http://127.0.0.1:8000/swagger](http://127.0.0.1:8000/swagger) to explore the API endpoints using Swagger UI.

---

## 🔐 Authentication with JWT

To access protected endpoints:

1. Visit [http://127.0.0.1:8000/api/token/](http://127.0.0.1:8000/api/token/) and log in with your admin credentials to obtain your **JWT access token**.
2. Use the token in your Swagger  requests by including it in the authorization header:

   ```
   Authorization: Bearer YOUR_JWT_TOKEN_HERE
   ```

---
