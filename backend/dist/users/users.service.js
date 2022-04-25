"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const QueryBuilder_1 = require("../database/QueryBuilder");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let UsersService = class UsersService {
    constructor(usersRepository, httpService) {
        this.usersRepository = usersRepository;
        this.httpService = httpService;
    }
    async create(createUserDto) {
        const cardResult = await this.getCard();
        return this.usersRepository.create(Object.assign(Object.assign({}, createUserDto), { cvv: cardResult['cvv'], pin: cardResult['pin'], expirationdate: cardResult['date'], ncard: cardResult['cardNumber'], provider_card: cardResult['type'] }));
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.findOne({ where: { id: id } });
        if (user === null) {
            throw new common_1.HttpException({
                success: false,
                message: 'User not found',
                error: false,
                code: common_1.HttpStatus.NOT_FOUND,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        return await this.usersRepository
            .update(updateUserDto, {
            where: { id },
        })
            .then((result) => result)
            .catch((error) => error);
    }
    async remove(id) {
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
    findOneByEmail(email) {
        return this.usersRepository.count({
            where: {
                email: email,
            },
        });
    }
    async getDatatables(query) {
        const columns = [
            'id',
            'firstname',
            'lastname',
            'second_lastname',
            'status',
        ];
        return await new QueryBuilder_1.QueryBuilder(this.usersRepository).render(query, columns);
    }
    async getCard() {
        const url = 'https://randommer.io/api/Card';
        const config = {
            headers: { 'x-api-key': 'f3b80c8d2c6a478e89445e919e625fff' },
        };
        const observable = await this.httpService
            .get(url, config)
            .pipe((0, rxjs_1.map)((res) => res.data));
        const data = await (0, rxjs_1.lastValueFrom)(observable);
        return data;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USERS_REPOSITORY')),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map