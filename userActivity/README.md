## Task 2: User Activity Tracking API
Scenario:
You are developing a backend service that tracks user activity within an application. Every time a user
performs an action (such as logging in, uploading a file, or clicking a button), the frontend logs it by
sending a small payload to your server.
Your task is to build a simple REST API to store these activities and provide reporting endpoints.

# 📊 User Activity Tracking API

This is a simple Node.js + Express backend service that tracks user activities such as login, click, and upload. It stores the data in MongoDB and provides reporting endpoints.

---

## 📦 Tech Stack

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **dotenv**
- Testable via **Postman** or **Talend API Tester**

---

## 🚀 Features

| Endpoint                          | Method | Description                                  |
|----------------------------------|--------|----------------------------------------------|
| `/activity`                      | POST   | Store a new user activity                    |
| `/activity/:userId`              | GET    | Fetch last 10 activities by a user           |
| `/activity/:userId/summary`      | GET    | Get action count summary per user            |

---

## 🛠️ Project Setup

### 1. Clone the Repository

### 2. Install Dependencies 
        ```npm install 
        ```

### 3. To Run application comand 
        ```npm start
        ```
