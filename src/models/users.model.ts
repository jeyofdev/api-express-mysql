import { ResultSetHeader } from 'mysql2';
import dbConnection from '../config/db.config.js';
import { IUser } from '../@types/interfaces/index.js';
import { hashPassword } from '../utils/security.js';

/**
 * Get user by email with different Id
 */
export const findByEmailWithDifferentId = (id: string, email: string) =>
  dbConnection
    .promise()
    .query<IUser[]>('SELECT * FROM user WHERE email = ? AND id <> ?', [
      email,
      id,
    ])
    .then((result) => result[0][0]);

/**
 * Post new user
 */
export const save = ({ email, firstname, lastname, city, password }: IUser) =>
  hashPassword(password).then((hashedPassword: string) =>
    dbConnection
      .promise()
      .query<ResultSetHeader>(
        'INSERT INTO user (email, firstname, lastname, city, password) VALUES (?, ?, ?, ?, ?)',
        [email, firstname, lastname, city, hashedPassword]
      )
      .then((result) => result[0].insertId)
  );
