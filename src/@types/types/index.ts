import { Request, Response } from 'express';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { FieldPacket, ResultSetHeader } from 'mysql2';
import { IMovie, IMovieUpdate, IUser, IUserUpdate } from '../interfaces';

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

export type FindType = (tableSql: string) => Promise<IUser[]>;

export type FindByIdType = (
  id: string,
  tableSql: string
) => Promise<IMovie | IUser>;

export type FindByType = (
  column: string,
  value: string | number | boolean,
  tableSql: string
) => Promise<IMovie | IUser>;

export type UpdateByIdType = (
  id: string,
  body: IUserUpdate | IMovieUpdate,
  tableSql: string
) => Promise<[ResultSetHeader, FieldPacket[]]>;

export type DeleteByIdType = (
  id: string,
  tableSql: string
) => Promise<ResultSetHeader>;

export type ValidationType = (
  datas: IUser | IMovie,
  forPost?: boolean
) => Joi.ValidationError | undefined;
