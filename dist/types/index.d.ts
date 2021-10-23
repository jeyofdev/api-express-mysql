import { Request, Response } from 'express';
import { IMovie } from '../interfaces';
export declare type RouteCallback = (req: Request, res: Response) => void;
export declare type FindMovieType = (filters: {
    type?: string;
    max_year?: number;
}) => Promise<IMovie[]>;
