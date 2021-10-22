import dbConnection from '../config/db.config.js';
/*
 * Get all movies
 */
export const findAll = () => dbConnection
    .promise()
    .query('SELECT * FROM movie')
    .then((results) => results);
/*
 * Get movie By Id
 */
export const findById = (id) => dbConnection
    .promise()
    .query('SELECT * FROM movie WHERE id = ?', [id])
    .then((result) => result);
