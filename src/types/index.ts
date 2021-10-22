import { Request, Response } from 'express';

export type RouteCallback = (req: Request, res: Response) => void;

export const ok = 'ok';
