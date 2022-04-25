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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const UserExist_1 = require("../guards/UserExist");
const RequestDatatableDto_1 = require("./dto/RequestDatatableDto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(res, createUserDto) {
        this.usersService.create(createUserDto);
        res.status(common_1.HttpStatus.CREATED).send({
            success: true,
            message: 'Se creo correctamente el usuario',
            error: false,
            code: common_1.HttpStatus.CREATED,
        });
    }
    async findAll(res, query) {
        const result = await this.usersService.getDatatables(query);
        return res.status(common_1.HttpStatus.OK).send({
            success: true,
            message: '',
            error: false,
            data: result,
            code: common_1.HttpStatus.OK,
        });
    }
    update(id, updateUserDto, res) {
        console.log(updateUserDto);
        return this.usersService
            .update(+id, updateUserDto)
            .then(function () {
            return res.status(common_1.HttpStatus.OK).send({
                success: true,
                message: 'Se actualizo correctamente al usuario',
                error: false,
                data: [],
                code: common_1.HttpStatus.OK,
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
    remove(id, res) {
        return this.usersService
            .remove(+id)
            .then(function () {
            return res.status(common_1.HttpStatus.OK).send({
                success: true,
                message: 'Se elimino correctamente al usuario',
                error: false,
                data: [],
                code: common_1.HttpStatus.OK,
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
};
__decorate([
    (0, common_1.UseGuards)(UserExist_1.UserExist),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequestDatatableDto_1.RequestDatatableDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map