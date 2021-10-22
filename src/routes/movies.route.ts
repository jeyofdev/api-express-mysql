import express from 'express';
import {
  findAllMovies,
  findMovieById,
  saveMovie,
  deleteMovieById,
  updateMovie,
} from '../controllers/movies.controller.js';

const router = express.Router();

router.get('/', findAllMovies);
router.get('/:id', findMovieById);
router.post('/', saveMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovieById);

export default router;
