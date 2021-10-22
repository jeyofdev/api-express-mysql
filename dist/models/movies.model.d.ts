import { RowDataPacket } from 'mysql2';
interface IMovie extends RowDataPacket {
    id: number;
    title: string;
    director: string;
    year: number;
    rating: number;
    duration: number;
    type: string;
}
export declare const findAll: () => Promise<[IMovie[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
export declare const findById: (id: string) => Promise<[IMovie[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
export {};
