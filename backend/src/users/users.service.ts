import { DatatableDto } from './dto/datatableDto';
import {
  Injectable,
  Inject,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { QueryBuilder } from 'src/database/QueryBuilder';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CardDTO } from './dto/cardDto';
import { response } from 'express';

@Injectable()
export class UsersService {
  /**
   * TODO: Inject Users_Repository and initialize  var usersRepository
   * @param usersRepository
   */
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof Users,
    private httpService: HttpService,
  ) {}

  /**
   * TODO: Create a user from DTO
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: CreateUserDto): Promise<any> {
    const cardResult = await this.getCard();
    return this.usersRepository.create({
      ...createUserDto,
      cvv: cardResult['cvv'],
      pin: cardResult['pin'],
      expirationdate: cardResult['date'],
      ncard: cardResult['cardNumber'],
      provider_card: cardResult['type'],
    });
  }

  /**
   * TODO: Update data someone user
   * @param id
   * @param updateUserDto
   * @returns
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (user === null) {
      throw new HttpException(
        {
          success: false,
          message: 'User not found',
          error: false,
          code: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.usersRepository
      .update(updateUserDto, {
        where: { id },
      })
      .then((result) => result)
      .catch((error) => error);
  }

  /**
   * TODO: Delete one user from id
   * @param id
   * @returns
   */
  async remove(id: number) {
    return await this.usersRepository
      .destroy({
        where: { id: id },
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   * TODO: Count emails from one email
   * ? This method is use from UserExist Guard
   * @show ../guards/UserExist.ts
   * @param email
   * @returns number of identical e-mails
   */
  findOneByEmail(email: string) {
    return this.usersRepository.count({
      where: {
        email: email,
      },
    });
  }

  /**
   * TODO: Get data style datatables
   * @param query
   * @returns json
   */
  async getDatatables(query: DatatableDto) {
    const columns = [
      'id',
      'firstname',
      'lastname',
      'second_lastname',
      'status',
    ];
    return await new QueryBuilder(this.usersRepository).render(query, columns);
  }

  /**
   * TODO: get data from api
   * @returns json ramdon card
   */
  async getCard(): Promise<Observable<AxiosResponse<CardDTO[]>>> {
    const url = 'https://randommer.io/api/Card';
    const config = {
      headers: { 'x-api-key': 'f3b80c8d2c6a478e89445e919e625fff' },
    };
    const observable = await this.httpService
      .get(url, config)
      .pipe(map((res) => res.data));
    const data = await lastValueFrom(observable);
    return data;
  }
}
