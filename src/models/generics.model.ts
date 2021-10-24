import { ResultSetHeader } from 'mysql2';
import dbConnection from '../config/db.config.js';
import { IMovie, IUser } from '../@types/interfaces';
import {
  DeleteByIdType,
  FindByIdType,
  FindByType,
  FindType,
  UpdateByIdType,
} from '../@types/types';

/**
 * Get all
 */
export const find: FindType = (tableSql) =>
  dbConnection
    .promise()
    .query<IUser[]>(`SELECT * FROM ${tableSql}`)
    .then((results) => results[0]);

/**
 * Get by Id
 */
export const findById: FindByIdType = (id, tableSql) =>
  dbConnection
    .promise()
    .query<IUser[] | IMovie[]>(`SELECT * FROM ${tableSql} WHERE id = ?`, [id])
    .then((result) => result[0][0]);

/**
 * Get By
 */
export const findBy: FindByType = (column, value, tableSql) =>
  dbConnection
    .promise()
    .query<IMovie[] | IUser[]>(
      `SELECT * FROM ${tableSql} WHERE ${column} = ?`,
      [value]
    )
    .then((result) => result[0][0]);

/**
 * Update by Id
 */
export const updateById: UpdateByIdType = (id, body, tableSql) =>
  dbConnection
    .promise()
    .query<ResultSetHeader>(`UPDATE ${tableSql} SET ? WHERE id = ?`, [body, id])
    .then((result) => result);

/**
 * Delete by Id
 */
export const deleteById: DeleteByIdType = (id, tableSql) =>
  dbConnection
    .promise()
    .query<ResultSetHeader>(`DELETE FROM ${tableSql} WHERE id = ?`, [id])
    .then((result) => result[0]);
