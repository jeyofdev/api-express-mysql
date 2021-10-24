import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  CalculateTokenType,
  DecodeTokenType,
  HashPasswordType,
  VerifyPasswordType,
} from '../@types/types';

dotenv.config();

/**
 * Hash options
 */
const hashOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

/**
 * hash a password
 */
export const hashPassword: HashPasswordType = (plainPassword) =>
  argon2.hash(plainPassword, hashOptions);

/**
 * Check that a password matches a hash password
 */
export const verifyPassword: VerifyPasswordType = (
  plainPassword,
  hashPassword // eslint-disable-line @typescript-eslint/no-shadow
) => argon2.verify(hashPassword, plainPassword, hashOptions);

/**
 * Allows you to login a user
 */
export const calculateToken: CalculateTokenType = (userEmail = '', userId) =>
  jwt.sign({ email: userEmail, id: userId }, `${process.env.PRIVATE_KEY}`);

/**
 * Get the informations from a jwt token
 */
export const decodeToken: DecodeTokenType = (token: string) =>
  jwt.decode(token);
