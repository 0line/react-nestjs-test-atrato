import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  IsDate,
  MaxDate,
  IsEnum,
  IsOptional,
  isNotEmpty,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: number;

  @IsOptional()
  @IsNotEmpty()
  firstname: string;

  @IsOptional()
  @IsNotEmpty()
  lastname: string;

  @IsOptional()
  @IsNotEmpty()
  second_lastname: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date())
  birthday: Date;

  @IsOptional()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsNotEmpty()
  analyst: string;
}
