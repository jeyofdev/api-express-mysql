import { ResultSetHeader } from 'mysql2';
import dbConnection from '../config/db.config.js';
import { IMovie } from '../@types/interfaces/index.js';
import { FindMovieType } from '../@types/types/index.js';

/**
 * Get all movies
 */
export const find: FindMovieType = (filters) => {
  // ?type=Sci-Fi&max_year=2000

  let sql = 'SELECT * FROM movie';
  const sqlValues = [];

  if (filters.type) {
    sql += ' WHERE type = ?';
    sqlValues.push(filters.type);
  }

  if (filters.max_year) {
    if (filters.type) sql += ' AND year <= ? ;';
    else sql += ' WHERE year <= ?';

    sqlValues.push(filters.max_year);
  }

  return dbConnection
    .promise()
    .query<IMovie[]>(sql, sqlValues)
    .then((results) => results[0]);
};

/**
 * Get movie By title with different Id
 */
export const findByTitleWithDifferentId = (id: string, title: string) =>
  dbConnection
    .promise()
    .query<IMovie[]>('SELECT * FROM movie WHERE title = ? AND id <> ?', [
      title,
      id,
    ])
    .then((result) => result[0][0]);

/**
 * Post new movie
 */
export const save = ({
  title,
  director,
  year,
  rating,
  duration,
  type,
}: IMovie) =>
  dbConnection
    .promise()
    .query<ResultSetHeader>(
      'INSERT INTO movie (title, director, year, rating, duration, type) VALUES (?, ?, ?, ?, ?, ?)',
      [title, director, year, rating, duration, type]
    )
    .then((result) => result[0].insertId);
