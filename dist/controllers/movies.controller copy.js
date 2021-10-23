var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { deleteById, find, findById, findByTitle, findByTitleWithDifferentId, save, updateById, } from '../models/movies.model.js';
/**
 * Get movies
 */
export const findMovies = (req, res) => {
    find(req.query)
        .then((results) => {
        if (results.length < 1) {
            return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
        }
        return res.status(200).json({ results });
    })
        .catch((err) => {
        if (err === 'NO_MOVIE_FOUND') {
            res.status(200).json({ message: 'No movies found !!!' });
        }
        else {
            res.status(500).json({ error: 'Error retrieving data from database' });
        }
    });
};
/**
 * Get movie By Id
 */
export const findMovieById = (req, res) => {
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
        }
        else {
            res.status(500).json({ error: 'Error retrieving data from database' });
        }
    });
};
/**
 * Post new movie
 */
export const saveMovie = (req, res) => {
    const { title } = req.body;
    findByTitle(title)
        .then((result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result) {
            return Promise.reject('DUPLICATE_MOVIE'); // eslint-disable-line prefer-promise-reject-errors
        }
        const postId = yield save(req.body);
        return res.status(201).json(Object.assign({ id: postId }, req.body));
    }))
        .catch((err) => {
        if (err === 'DUPLICATE_MOVIE') {
            res
                .status(409)
                .json({ message: 'This movie is already in the database' });
        }
        else {
            res.status(500).send({ error: 'Error saving the movie' });
        }
    });
};
/**
 * Update movie
 */
export const updateMovie = (req, res) => {
    const { id } = req.params;
    Promise.all([findById(id), findByTitleWithDifferentId(id, req.body.title)])
        .then(([movie, otherUserWithTitle]) => __awaiter(void 0, void 0, void 0, function* () {
        if (!movie) {
            return Promise.reject('NO_MOVIE_FOUND'); // eslint-disable-line prefer-promise-reject-errors
        }
        if (otherUserWithTitle) {
            return Promise.reject('DUPLICATE_MOVIE'); // eslint-disable-line prefer-promise-reject-errors
        }
        yield updateById(id, req.body);
        return res.status(200).json({ data: { old: movie, new: req.body } });
    }))
        .catch((err) => {
        if (err === 'NO_MOVIE_FOUND') {
            res.status(409).json({ message: 'Movie not found' });
        }
        else if (err === 'DUPLICATE_MOVIE') {
            res
                .status(409)
                .json({ message: 'This movie is already in the database' });
        }
        else {
            res.status(500).send({ error: 'Error update the movie' });
        }
    });
};
/**
 * Delete movie by Id
 */
export const deleteMovieById = (req, res) => {
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
        }
        else {
            res.status(500).send({ error: 'Error deleting an user' });
        }
    });
};
