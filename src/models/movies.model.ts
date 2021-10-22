import { RowDataPacket } from 'mysql2';
import dbConnection from '../config/db.config.js';

interface IMovie extends RowDataPacket {
  id: number;
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
    .then((results) => results);

/*
 * Get movie By Id
 */
export const findById = (id: string) =>
  dbConnection
    .promise()
    .query<IMovie[]>('SELECT * FROM movie WHERE id = ?', [id])
    .then((result) => result);
