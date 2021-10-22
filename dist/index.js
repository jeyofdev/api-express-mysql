import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db.config.js';
dotenv.config();
// Config
const PORT = process.env.PORT || 3000;
const app = express();
// Database connect
dbConnection.connect((err) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.error(`error connecting: ${err.stack}`);
    }
    else {
        // eslint-disable-next-line no-console
        console.log(`connected to database with threadId : ${dbConnection.threadId}`);
    }
});
// Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to API' });
});
// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // eslint-disable-line
});
