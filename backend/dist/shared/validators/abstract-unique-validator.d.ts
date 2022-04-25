import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';
interface UniqueValidationArguments<E> extends ValidationArguments {
    constraints: [
        ObjectType<E> | EntitySchema<E> | string,
        ((validationArguments: ValidationArguments) => FindConditions<E>) | keyof E
    ];
}
export declare abstract class UniqueValidator implements ValidatorConstraintInterface {
    protected readonly connection: Connection;
    protected constructor(connection: Connection);
    validate<E>(value: string, args: UniqueValidationArguments<E>): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export {};
