import { ResultSetHeader, RowDataPacket } from 'mysql2';
export interface IMovie extends RowDataPacket {
    id?: number;
    title: string;
    director: string;
    year: number;
    rating: number;
    duration: number;
    type: string;
}
export declare const findAll: () => Promise<IMovie[]>;
export declare const findById: (id: string) => Promise<IMovie>;
export declare const findByTitle: (title: string) => Promise<IMovie>;
export declare const save: ({ title, director, year, rating, duration, type, }: IMovie) => Promise<number>;
export declare const deleteById: (id: string) => Promise<ResultSetHeader>;
