const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(async () => {
        const dbName = mongoose.connection.db.databaseName;
        console.log('MongoDB connected:', dbName);
    })
    .catch((err) => {
        console.error('MongoDB error:', err);
    });

// Use routes
const routes = require('./routes/routes')(io);
app.use('/', routes);

// Socket.io connection
const Message = require('./models/message.schema');

console.log(io);

io.on('connection', async (socket) => {
    console.log('Client connected:', socket.id);

    // Send existing messages
    const messages = await Message.find().sort({ createdAt: 1 }).populate('userId', 'name');

    const formatted = messages.map((msg) => ({
        id: msg._id,
        text: msg.text,
        sentiment: msg.sentiment,
        userName: msg.userId.name
    }));

    socket.emit('initMessages', formatted);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
