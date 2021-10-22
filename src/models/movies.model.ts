import { ResultSetHeader, RowDataPacket } from 'mysql2';
import dbConnection from '../config/db.config.js';

export interface IMovie extends RowDataPacket {
  id?: number;
  title: string;
  director: string;
  year: number;
  rating: number;
  duration: number;
  type: string;
}

/*
 * Get all movies
 */
export const findAll = () =>
  dbConnection
    .promise()
    .query<IMovie[]>('SELECT * FROM movie')
    .then((results) => results[0]);

/*
 * Get movie By Id
 */
export const findById = (id: string) =>
  dbConnection
    .promise()
    .query<IMovie[]>('SELECT * FROM movie WHERE id = ?', [id])
    .then((result) => result[0][0]);

/*
 * Get movie By title
 */
export const findByTitle = (title: string) =>
  dbConnection
    .promise()
    .query<IMovie[]>('SELECT * FROM movie WHERE title = ?', [title])
    .then((result) => result[0][0]);

/*
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

/*
 * Delete movie by Id
 */
export const deleteById = (id: string) =>
  dbConnection
    .promise()
    .query<ResultSetHeader>('DELETE FROM movie WHERE id = ?', [id])
    .then((result) => result[0]);
