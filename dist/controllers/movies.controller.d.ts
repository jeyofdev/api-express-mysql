import { Request, Response } from 'express';
/**
 * Get all movies
 */
export declare const findAllMovies: (req: Request, res: Response) => void;
export declare const findMovieById: (req: Request, res: Response) => void;
export declare const saveMovie: (req: Request, res: Response) => void;
export declare const updateMovie: (req: Request, res: Response) => void;
export declare const deleteMovieById: (req: Request, res: Response) => void;
