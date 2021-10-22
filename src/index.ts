import express from 'express';
import dotenv from 'dotenv';
import dbConnection from './config/db.config.js';
import routes from './routes/index.js';

dotenv.config();

// Config
const PORT = process.env.PORT || 3000;
const app = express();
app.use('/api', routes);

// Database connect
dbConnection.connect((err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(`error connecting: ${err.stack}`);
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `connected to database with threadId : ${dbConnection.threadId}`
    );
  }
});

// Routes
app.get('/', (_, res) => {
  res.status(200).json({ message: 'Welcome to API' });
});

// Route 404
app.use((_, res) => {
  res.status(404).send({ error: 'Route not found' });
});

// Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // eslint-disable-line
});
