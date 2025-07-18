const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

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

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', require('./routes/activity.routes'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
