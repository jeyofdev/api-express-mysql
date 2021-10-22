import express from 'express';
import { findAllMovies, findMovieById, } from '../controllers/movies.controller.js';
const router = express.Router();
router.get('/', findAllMovies);
router.get('/:id', findMovieById);
export default router;
