import { Request, Response } from 'express';
import { IMovie } from '../interfaces';
export declare type RouteCallback = (req: Request, res: Response) => void;
export declare type FindType = (filters: {
    type?: string;
    max_year?: number;
}) => Promise<IMovie[]>;
