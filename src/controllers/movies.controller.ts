import {
  findBy,
  findById,
  updateById,
  deleteById,
} from '../models/generics.model.js';
import {
  find,
  findByTitleWithDifferentId,
  save,
} from '../models/movies.model.js';
import { RouteCallback } from '../@types/types/index.js';

/**
 * Get movies
 */
export const findMovies: RouteCallback = (req, res) => {
  find(req.query)
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

/**
 * Get movie By Id
 */
export const findMovieById: RouteCallback = (req, res) => {
  const { id } = req.params;

  findById(id, 'movie')
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

/**
 * Post new movie
 */
export const saveMovie: RouteCallback = (req, res) => {
  if (!req.headers.cookie && !req.headers.authorization) {
    return res.status(500).json({ error: 'Unauthorized user' });
  }

  const { title } = req.body;

  return findBy('title', title, 'movie')
    .then(async (result) => {
      if (result) {
        return Promise.reject('DUPLICATE_MOVIE'); // eslint-disable-line prefer-promise-reject-errors
      }

      const postId = await save(req.body);
      return res.status(201).json({
        result: {
          id: postId,
          ...req.body,
        },
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

/**
 * Update movie
 */
export const updateMovie: RouteCallback = (req, res) => {
  if (!req.headers.cookie && !req.headers.authorization) {
    return res.status(500).json({ error: 'Unauthorized user' });
  }

  const { id } = req.params;

  return Promise.all([
    findById(id, 'movie'),
    findByTitleWithDifferentId(id, req.body.title),
  ])
    .then(async ([movie, otherMovieWithTitle]) => {
      if (!movie) {
        return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
      }

      if (otherMovieWithTitle) {
        return Promise.reject('DUPLICATE_MOVIE'); // eslint-disable-line prefer-promise-reject-errors
      }

      await updateById(id, req.body, 'movie');
      return res.status(200).json({ data: { old: movie, new: req.body } });
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

/**
 * Delete movie by Id
 */
export const deleteMovieById: RouteCallback = (req, res) => {
  if (!req.headers.cookie && !req.headers.authorization) {
    return res.status(500).json({ error: 'Unauthorized user' });
  }

  const { id } = req.params;

  return deleteById(id, 'movie')
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
        res.status(500).send({ error: 'Error deleting an movie' });
      }
    });
};
