import { ResultSetHeader } from 'mysql2';
import { IMovie, IMovieUpdate } from '../interfaces/index.js';
import { FindType } from '../types/index.js';
/**
 * Get all movies
 */
export declare const find: FindType;
/**
 * Get movie By Id
 */
export declare const findById: (id: string) => Promise<IMovie>;
/**
 * Get movie By title
 */
export declare const findByTitle: (title: string) => Promise<IMovie>;
/**
 * Get movie By title with different Id
 */
export declare const findByTitleWithDifferentId: (id: string, title: string) => Promise<IMovie>;
/**
 * Post new movie
 */
export declare const save: ({ title, director, year, rating, duration, type, }: IMovie) => Promise<number>;
/**
 * Update user
 */
export declare const updateById: (id: string, body: IMovieUpdate) => Promise<[import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | ResultSetHeader, import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
/**
 * Delete movie by Id
 */
export declare const deleteById: (id: string) => Promise<ResultSetHeader>;
