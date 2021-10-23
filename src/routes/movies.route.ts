import express from 'express';
import {
  findMovies,
  findMovieById,
  saveMovie,
  deleteMovieById,
  updateMovie,
} from '../controllers/movies.controller.js';
import { verifyToken } from './users.route.js';

const router = express.Router();

router.get('/', findMovies);
router.get('/:id', findMovieById);
router.post('/', verifyToken, saveMovie);
router.put('/:id', verifyToken, updateMovie);
router.delete('/:id', verifyToken, deleteMovieById);

export default router;
