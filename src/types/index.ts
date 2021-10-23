import { Request, Response } from 'express';
import { IMovie } from '../interfaces';

export type RouteCallback = (req: Request, res: Response) => void;

export type FindMovieType = (filters: {
  type?: string;
  max_year?: number;
}) => Promise<IMovie[]>;
