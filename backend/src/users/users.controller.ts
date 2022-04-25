import { DatatableDto } from './dto/datatableDto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Res,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserExist } from 'src/guards/UserExist';
import { RequestDatatableDto } from './dto/RequestDatatableDto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * TODO: Create one user when email not exist
   * ? Method public for create users
   * @param createUserDto
   * @returns
   */
  @UseGuards(UserExist)
  @Post()
  create(@Res() res, @Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
    res.status(HttpStatus.CREATED).send({
      success: true,
      message: 'Se creo correctamente el usuario',
      error: false,
      code: HttpStatus.CREATED,
    });
  }

  @Get()
  async findAll(@Res() res, @Query() query: RequestDatatableDto) {
    const result = await this.usersService.getDatatables(query);
    return res.status(HttpStatus.OK).send({
      success: true,
      message: '',
      error: false,
      data: result,
      code: HttpStatus.OK,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
  ) {
    console.log(updateUserDto);
    return this.usersService
      .update(+id, updateUserDto)
      .then(function () {
        return res.status(HttpStatus.OK).send({
          success: true,
          message: 'Se actualizo correctamente al usuario',
          error: false,
          data: [],
          code: HttpStatus.OK,
        });
      })
      .catch(function (e) {
        return res.status(e.status).send({
          success: false,
          message: e.message,
          error: true,
          data: [],
          code: e.status,
        });
      });
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.usersService
      .remove(+id)
      .then(function () {
        return res.status(HttpStatus.OK).send({
          success: true,
          message: 'Se elimino correctamente al usuario',
          error: false,
          data: [],
          code: HttpStatus.OK,
        });
      })
      .catch(function (e) {
        return res.status(e.status).send({
          success: false,
          message: e.message,
          error: true,
          data: [],
          code: e.status,
        });
      });
  }
}
