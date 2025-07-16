# 🗨️ chat-app
A modern real-time chat application with Angular frontend styled using Tailwind CSS and a Node.js backend using Express, Socket.io, and MongoDB with Mongoose ORM. Supports asynchronous sentiment analysis to update message sentiment live


A full-stack **real-time chat application** featuring:
- Live messaging using **Socket.io**
- Asynchronous **sentiment analysis** (positive, neutral, negative)
- Clean backend architecture with Node.js, Express & MongoDB (Mongoose ORM)
- Responsive Angular frontend styled with **Tailwind CSS**


---

## ✨ **Features**
✅ Send & receive messages instantly (WebSocket)  
✅ Each message initially shows “Pending” sentiment, updated asynchronously  
✅ Cleanly separated models, controllers, and routes in backend  
✅ User joins chat by name, stored in MongoDB  
✅ Live sentiment updates appear in UI  
✅ Simple keyword-based sentiment rules

---

## 🛠 **Tech Stack**

**Frontend:**
- Angular
- Tailwind CSS
- Socket.io-client
- Axios

**Backend:**
- Node.js
- Express
- Socket.io
- MongoDB
- Mongoose

---

## 📦 **Project Structure**

```plaintext
chat-app/
├── backend/
│   ├── models/
│   │   ├── user.schema.js
│   │   └── message.schema.js
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── message.controller.js
│   ├── routes/
│   │   └── routes.js
│   ├── index.js
│   └── package.json
└── frontend/
    ├── (Angular project: components, services, etc.)
    └── package.json