import dbConnection from '../config/db.config.js';
/**
 * Get all movies
 */
export const find = (filters) => {
    // ?type=Sci-Fi&max_year=2000
    let sql = 'SELECT * FROM movie';
    const sqlValues = [];
    if (filters.type) {
        sql += ' WHERE type = ?';
        sqlValues.push(filters.type);
    }
    if (filters.max_year) {
        if (filters.type)
            sql += ' AND year <= ? ;';
        else
            sql += ' WHERE year <= ?';
        sqlValues.push(filters.max_year);
    }
    return dbConnection
        .promise()
        .query(sql, sqlValues)
        .then((results) => results[0]);
};
/**
 * Get movie By Id
 */
export const findById = (id) => dbConnection
    .promise()
    .query('SELECT * FROM movie WHERE id = ?', [id])
    .then((result) => result[0][0]);
/**
 * Get movie By title
 */
export const findByTitle = (title) => dbConnection
    .promise()
    .query('SELECT * FROM movie WHERE title = ?', [title])
    .then((result) => result[0][0]);
/**
 * Get movie By title with different Id
 */
export const findByTitleWithDifferentId = (id, title) => dbConnection
    .promise()
    .query('SELECT * FROM movie WHERE title = ? AND id <> ?', [
    title,
    id,
])
    .then((result) => result[0][0]);
/**
 * Post new movie
 */
export const save = ({ title, director, year, rating, duration, type, }) => dbConnection
    .promise()
    .query('INSERT INTO movie (title, director, year, rating, duration, type) VALUES (?, ?, ?, ?, ?, ?)', [title, director, year, rating, duration, type])
    .then((result) => result[0].insertId);
/**
 * Update movie
 */
export const updateById = (id, body) => dbConnection
    .promise()
    .query('UPDATE movie SET ? WHERE id = ?', [body, id])
    .then((result) => result);
/**
 * Delete movie by Id
 */
export const deleteById = (id) => dbConnection
    .promise()
    .query('DELETE FROM movie WHERE id = ?', [id])
    .then((result) => result[0]);
