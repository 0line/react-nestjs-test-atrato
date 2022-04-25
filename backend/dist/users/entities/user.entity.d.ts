import { Model } from 'sequelize-typescript';
export declare class Users extends Model {
    id: string;
    email: string;
    phone: number;
    firstname: string;
    lastname: string;
    second_lastname: string;
    birthday: Date;
}
