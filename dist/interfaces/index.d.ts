import { RowDataPacket } from 'mysql2';
export interface IMovie extends RowDataPacket, IMovieUpdate {
}
export interface IMovieUpdate {
    title?: string;
    director?: string;
    year?: number;
    rating?: number;
    duration?: number;
    type?: string;
}
export interface IUser extends RowDataPacket, IUserUpdate {
}
export interface IUserUpdate {
    email?: string;
    firstname?: string;
    lastname?: string;
    city?: string;
}
