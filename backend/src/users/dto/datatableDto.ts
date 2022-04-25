import { IsInt, IsOptional, IsString } from 'class-validator';

/**
 * Class DTO for Datatable
 */
export class DatatableDto {
  
  orderdirection: string;
  orderby: string;
  gsearch: string;
}
