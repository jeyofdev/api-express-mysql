import express from 'express';
import {
  findAllMovies,
  findMovieById,
  saveMovie,
  deleteMovieById,
} from '../controllers/movies.controller.js';

const router = express.Router();

router.get('/', findAllMovies);
router.get('/:id', findMovieById);
router.post('/', saveMovie);
router.delete('/:id', deleteMovieById);

export default router;
