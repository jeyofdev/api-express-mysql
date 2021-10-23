import express from 'express';
import moviesRoute from './movies.route.js';
import usersRoute from './users.route.js';
const router = express.Router();
router.get('/', (_, res) => {
    res.status(200).json({ message: 'API home' });
});
router.use('/movies', moviesRoute);
router.use('/users', usersRoute);
export default router;
