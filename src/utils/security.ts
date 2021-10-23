import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  CalculateTokenType,
  DecodeTokenType,
  HashPasswordType,
  VerifyPasswordType,
} from '../types';

dotenv.config();

const hashOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

export const hashPassword: HashPasswordType = (plainPassword) =>
  argon2.hash(plainPassword, hashOptions);

export const verifyPassword: VerifyPasswordType = (
  plainPassword,
  hashPassword // eslint-disable-line @typescript-eslint/no-shadow
) => argon2.verify(hashPassword, plainPassword, hashOptions);

export const calculateToken: CalculateTokenType = (userEmail = '', userId) =>
  jwt.sign({ email: userEmail, id: userId }, `${process.env.PRIVATE_KEY}`);

export const decodeToken: DecodeTokenType = (token: string) =>
  jwt.decode(token);
