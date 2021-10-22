import dbConnection from '../config/db.config.js';
/*
 * Get all movies
 */
export const findAll = () => dbConnection
    .promise()
    .query('SELECT * FROM movie')
    .then((results) => results[0]);
/*
 * Get movie By Id
 */
export const findById = (id) => dbConnection
    .promise()
    .query('SELECT * FROM movie WHERE id = ?', [id])
    .then((result) => result[0][0]);
/*
 * Get movie By title
 */
export const findByTitle = (title) => dbConnection
    .promise()
    .query('SELECT * FROM movie WHERE title = ?', [title])
    .then((result) => result[0][0]);
/*
 * Get movie By title with different Id
 */
export const findByTitleWithDifferentId = (id, title) => dbConnection
    .promise()
    .query('SELECT * FROM movie WHERE title = ? AND id <> ?', [
    title,
    id,
])
    .then((result) => result[0][0]);
/*
 * Post new movie
 */
export const save = ({ title, director, year, rating, duration, type, }) => dbConnection
    .promise()
    .query('INSERT INTO movie (title, director, year, rating, duration, type) VALUES (?, ?, ?, ?, ?, ?)', [title, director, year, rating, duration, type])
    .then((result) => result[0].insertId);
/*
 * Update user
 */
export const updateById = (id, body) => dbConnection
    .promise()
    .query('UPDATE movie SET ? WHERE id = ?', [body, id])
    .then((result) => result);
/*
 * Delete movie by Id
 */
export const deleteById = (id) => dbConnection
    .promise()
    .query('DELETE FROM movie WHERE id = ?', [id])
    .then((result) => result[0]);
