import { NextFunction, Response } from 'express';
declare const router: import("express-serve-static-core").Router;
/**
 * Check if user token exist
 */
export declare const verifyToken: (req: any, res: Response, next: NextFunction) => void;
export default router;
