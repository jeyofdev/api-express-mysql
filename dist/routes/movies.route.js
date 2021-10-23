import express from 'express';
import { findMovies, findMovieById, saveMovie, deleteMovieById, updateMovie, } from '../controllers/movies.controller.js';
const router = express.Router();
router.get('/', findMovies);
router.get('/:id', findMovieById);
router.post('/', saveMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovieById);
export default router;
