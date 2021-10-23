import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const hashOptions = {
    type: argon2.argon2id,
    memoryCost: Math.pow(2, 16),
    timeCost: 5,
    parallelism: 1,
};
export const hashPassword = (plainPassword) => argon2.hash(plainPassword, hashOptions);
export const verifyPassword = (plainPassword, hashPassword // eslint-disable-line @typescript-eslint/no-shadow
) => argon2.verify(hashPassword, plainPassword, hashOptions);
export const calculateToken = (userEmail = '', userId) => jwt.sign({ email: userEmail, id: userId }, `${process.env.PRIVATE_KEY}`);
export const decodeToken = (token) => jwt.decode(token);
