import { Request, Response } from 'express';
import { findAll, findById } from '../models/movies.model.js';

/**
 * Get all movies
 */
export const findAllMovies = (req: Request, res: Response) => {
  findAll()
    .then((results) => {
      const movies = results[0];

      if (movies.length < 1) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }
      return res.status(200).json({ results: movies });
    })
    .catch((err: string | object) => {
      if (err === 'NO_MOVIE_FOUND') {
        res.status(200).json({ message: 'No movies found !!!' });
      } else {
        res.status(500).json({ error: 'Error retrieving data from database' });
      }
    });
};

/*
 * Get user By Id
 */
export const findMovieById = (req: Request, res: Response) => {
  const { id } = req.params;

  findById(id)
    .then((result) => {
      const movie = result[0][0];

      if (!movie) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }
      return res.status(200).json({ result: movie });
    })
    .catch((error) => {
      if (error === 'NO_MOVIE_FOUND') {
        res.status(200).json({ message: 'No movie found !!!' });
      } else {
        res.status(500).json({ error: 'Error retrieving data from database' });
      }
    });
};
