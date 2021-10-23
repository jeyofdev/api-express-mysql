import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IMovie } from '../interfaces';
export declare type RouteCallback = (req: Request, res: Response) => void;
export declare type FindMovieType = (filters: {
    type?: string;
    max_year?: number;
}) => Promise<IMovie[]>;
export declare type HashPasswordType = (plainPassword: string) => Promise<string>;
export declare type VerifyPasswordType = (plainPassword: string, hashPassword: string) => Promise<boolean>;
export declare type DecodeTokenType = (token: string) => string | object | jwt.JwtPayload | null;
export declare type CalculateTokenType = (userEmail: string | undefined, userId: any) => never | string;
