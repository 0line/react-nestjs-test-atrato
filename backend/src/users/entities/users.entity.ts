import { IsCreditCard } from 'class-validator';
import {
  Table,
  Column,
  Model,
  IsDate,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Default,
  DataType,
} from 'sequelize-typescript';
@Table
export class Users extends Model<Users> {
  @Default(DataType.UUIDV4)
  @Column
  uuid: string;

  @AllowNull(false)
  @Column
  email: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  phone: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  firstname: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  lastname: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  second_lastname: string;

  @AllowNull(false)
  @IsDate
  @Column
  birthday: Date;

  @Column({
    allowNull: false,
    type: DataType.ENUM,
    values: ['pendiente', 'en proceso', 'completado'],
  })
  status: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  analyst: string;

  @AllowNull(false)
  @IsCreditCard()
  @Column({ type: DataType.INTEGER })
  ncard: number;

  @AllowNull(false)
  @Column
  provider_card: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  cvv: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  pin: number;

  @AllowNull(false)
  @Column
  expirationdate: Date;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
