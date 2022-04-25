import { DatatableDto } from './dto/datatableDto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { CardDTO } from './dto/cardDto';
export declare class UsersService {
    private usersRepository;
    private httpService;
    constructor(usersRepository: typeof Users, httpService: HttpService);
    create(createUserDto: CreateUserDto): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: number): Promise<any>;
    findOneByEmail(email: string): Promise<number>;
    getDatatables(query: DatatableDto): Promise<{
        data: any;
        totalPages: number;
        currentPage: number;
        totalrecors: any;
        totalfilteredrecords: any;
    }>;
    getCard(): Promise<Observable<AxiosResponse<CardDTO[]>>>;
}
