import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestDatatableDto } from './dto/RequestDatatableDto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(res: any, createUserDto: CreateUserDto): void;
    findAll(res: any, query: RequestDatatableDto): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto, res: any): Promise<any>;
    remove(id: string, res: any): Promise<any>;
}
