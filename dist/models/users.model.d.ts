import { ResultSetHeader } from 'mysql2';
import { IUser, IUserUpdate } from '../interfaces/index.js';
/**
 * Get all users
 */
export declare const find: () => Promise<IUser[]>;
/**
 * Get user By Id
 */
export declare const findById: (id: string) => Promise<IUser>;
/**
 * Get user by email
 */
export declare const findByEmail: (email: string) => Promise<IUser>;
/**
 * Get user by email with different Id
 */
export declare const findByEmailWithDifferentId: (id: string, email: string) => Promise<IUser>;
/**
 * Post new user
 */
export declare const save: ({ email, firstname, lastname, city }: IUser) => Promise<number>;
/**
 * Update user
 */
export declare const updateById: (id: string, body: IUserUpdate) => Promise<[import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | ResultSetHeader, import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
/**
 * Delete user by Id
 */
export declare const deleteById: (id: string) => Promise<ResultSetHeader>;
