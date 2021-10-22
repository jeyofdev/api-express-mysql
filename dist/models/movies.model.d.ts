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
export interface IMovieUpdate {
    title?: string;
    director?: string;
    year?: number;
    rating?: number;
    duration?: number;
    type?: string;
}
export declare const findAll: () => Promise<IMovie[]>;
export declare const findById: (id: string) => Promise<IMovie>;
export declare const findByTitle: (title: string) => Promise<IMovie>;
export declare const findByTitleWithDifferentId: (id: string, title: string) => Promise<IMovie>;
export declare const save: ({ title, director, year, rating, duration, type, }: IMovie) => Promise<number>;
export declare const updateById: (id: string, body: IMovieUpdate) => Promise<[RowDataPacket[] | RowDataPacket[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[] | ResultSetHeader, import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
export declare const deleteById: (id: string) => Promise<ResultSetHeader>;
