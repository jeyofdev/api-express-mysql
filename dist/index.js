import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
// Config
const PORT = process.env.PORT || 3000;
const app = express();
// Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to API' });
});
// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // eslint-disable-line
});
