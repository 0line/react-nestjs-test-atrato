import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  MaxDate,
  MaxLength,
  MinLength,
  NotEquals,
} from 'class-validator';
import moment from 'moment';
import { Validate, IsOptional } from 'class-validator';

/**
 * Class DTO for CreateUser and basic validations
 */
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: number;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  second_lastname: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  birthday: Date;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  analyst: string;
}
