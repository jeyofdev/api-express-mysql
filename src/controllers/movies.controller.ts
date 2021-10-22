import { Request, Response } from 'express';
import {
  deleteById,
  findAll,
  findById,
  findByTitle,
  findByTitleWithDifferentId,
  save,
  updateById,
} from '../models/movies.model.js';

/**
 * Get all movies
 */
export const findAllMovies = (req: Request, res: Response) => {
  findAll()
    .then((results) => {
      if (results.length < 1) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }
      return res.status(200).json({ results });
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
 * Get movie By Id
 */
export const findMovieById = (req: Request, res: Response) => {
  const { id } = req.params;

  findById(id)
    .then((result) => {
      if (!result) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }
      return res.status(200).json({ result });
    })
    .catch((error) => {
      if (error === 'NO_MOVIE_FOUND') {
        res.status(200).json({ message: 'No movie found !!!' });
      } else {
        res.status(500).json({ error: 'Error retrieving data from database' });
      }
    });
};

/*
 * Post new movie
 */
export const saveMovie = (req: Request, res: Response) => {
  const { title } = req.body;

  findByTitle(title)
    .then((result) => {
      if (result) {
        return Promise.reject('DUPLICATE_MOVIE'); // eslint-disable-line prefer-promise-reject-errors
      }

      return save(req.body).then((postId) => {
        res.status(201).json({
          id: postId,
          ...req.body,
        });
      });
    })
    .catch((err) => {
      if (err === 'DUPLICATE_MOVIE') {
        res
          .status(409)
          .json({ message: 'This movie is already in the database' });
      } else {
        res.status(500).send({ error: 'Error saving the movie' });
      }
    });
};

/*
 * Update movie
 */
export const updateMovie = (req: Request, res: Response) => {
  const { id } = req.params;

  Promise.all([findById(id), findByTitleWithDifferentId(id, req.body.title)])

    .then(([movie, otherUserWithTitle]) => {
      if (!movie) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      if (otherUserWithTitle) {
        return Promise.reject('DUPLICATE_MOVIE'); // eslint-disable-line prefer-promise-reject-errors
      }

      return updateById(id, req.body).then(() => {
        res.status(200).json({ data: { old: movie, new: req.body } });
      });
    })
    .catch((err) => {
      if (err === 'NO_MOVIE_FOUND') {
        res.status(409).json({ message: 'Movie not found' });
      } else if (err === 'DUPLICATE_MOVIE') {
        res
          .status(409)
          .json({ message: 'This movie is already in the database' });
      } else {
        res.status(500).send({ error: 'Error update the movie' });
      }
    });
};

/*
 * Delete movie by Id
 */
export const deleteMovieById = (req: Request, res: Response) => {
  const { id } = req.params;

  deleteById(id)
    .then((result) => {
      if (result.affectedRows < 1) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      return res.status(200).json({
        message: 'Movie deleting successfully',
        result,
      });
    })
    .catch((err) => {
      if (err === 'NO_MOVIE_FOUND') {
        res.status(200).send({ message: 'Movie not found' });
      } else {
        res.status(500).send({ error: 'Error deleting an user' });
      }
    });
};
