import express from 'express';
import moviesRoute from './movies.route.js';

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).json({ message: 'API home' });
});

router.use('/movies', moviesRoute);

export default router;
