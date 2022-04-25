import { IsInt, IsOptional, IsString } from 'class-validator';

/**
 * Class DTO for Datatable
 */
export class RequestDatatableDto {
  @IsOptional()
  @IsString()
  readonly id: number;
  @IsOptional()
  @IsString()
  readonly firstname: string;
  @IsOptional()
  @IsString()
  readonly lastname: string;
  @IsOptional()
  @IsString()
  readonly second_lastname: string;
  @IsOptional()
  @IsString()
  readonly status: string;
  @IsOptional()
  @IsString()
  readonly orderdirection: string;
  @IsOptional()
  @IsString()
  readonly orderby: string;
  @IsOptional()
  @IsString()
  readonly gsearch: string;
  @IsOptional()
  @IsString()
  readonly limit: string;
  @IsOptional()
  @IsString()
  readonly page: string;
}
