import { Model } from 'sequelize-typescript';
export declare class Users extends Model<Users> {
    uuid: string;
    email: string;
    phone: number;
    firstname: string;
    lastname: string;
    second_lastname: string;
    birthday: Date;
    status: string;
    analyst: string;
    ncard: number;
    provider_card: string;
    cvv: number;
    pin: number;
    expirationdate: Date;
    creationDate: Date;
    updatedOn: Date;
}
