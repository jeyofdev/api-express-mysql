import express from 'express';

const router = express.Router();

router.get('/', (_, res) => {
  res.status(200).json({ message: 'API home' });
});

export default router;
