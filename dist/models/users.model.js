import dbConnection from '../config/db.config.js';
import { hashPassword } from '../utils/security.js';
/**
 * Get all users
 */
export const find = () => dbConnection
    .promise()
    .query('SELECT * FROM user')
    .then((results) => results[0]);
/**
 * Get user By Id
 */
export const findById = (id) => dbConnection
    .promise()
    .query('SELECT * FROM user WHERE id = ?', [id])
    .then((result) => result[0][0]);
/**
 * Get user by email
 */
export const findByEmail = (email) => dbConnection
    .promise()
    .query('SELECT * FROM user WHERE email = ?', [email])
    .then((result) => result[0][0]);
/**
 * Get user by email with different Id
 */
export const findByEmailWithDifferentId = (id, email) => dbConnection
    .promise()
    .query('SELECT * FROM user WHERE email = ? AND id <> ?', [
    email,
    id,
])
    .then((result) => result[0][0]);
/**
 * Post new user
 */
export const save = ({ email, firstname, lastname, city, password }) => hashPassword(password).then((hashedPassword) => dbConnection
    .promise()
    .query('INSERT INTO user (email, firstname, lastname, city, password) VALUES (?, ?, ?, ?, ?)', [email, firstname, lastname, city, hashedPassword])
    .then((result) => result[0].insertId));
/**
 * Update user
 */
export const updateById = (id, body) => dbConnection
    .promise()
    .query('UPDATE user SET ? WHERE id = ?', [body, id])
    .then((result) => result);
/**
 * Delete user by Id
 */
export const deleteById = (id) => dbConnection
    .promise()
    .query('DELETE FROM user WHERE id = ?', [id])
    .then((result) => result[0]);
