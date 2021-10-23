import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IMovie } from '../interfaces';

export type RouteCallback = (req: Request, res: Response) => void;

export type FindMovieType = (filters: {
  type?: string;
  max_year?: number;
}) => Promise<IMovie[]>;

export type HashPasswordType = (plainPassword: string) => Promise<string>;

export type VerifyPasswordType = (
  plainPassword: string,
  hashPassword: string
) => Promise<boolean>;

export type DecodeTokenType = (
  token: string
) => string | object | jwt.JwtPayload | null;

export type CalculateTokenType = (
  userEmail: string | undefined,
  userId: any
) => never | string;
