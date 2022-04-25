import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class UniqueEmailValidator implements ValidatorConstraintInterface {
    private repository;
    constructor(repository: any);
    validate(email: string, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
