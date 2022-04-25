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
exports.UniqueEmailValidator = void 0;
const class_validator_1 = require("class-validator");
const sequelize_1 = require("sequelize");
const common_1 = require("@nestjs/common");
let UniqueEmailValidator = class UniqueEmailValidator {
    constructor(repository) {
        this.repository = repository;
    }
    async validate(email, args) {
        console.log(this.repository);
        return ((await this.repository.count({
            where: {
                email: {
                    [sequelize_1.Op.eq]: email,
                },
            },
        })) <= 0);
    }
    defaultMessage(args) {
        return 'Text ($value) is too short or too long!';
    }
};
UniqueEmailValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'UniqueEmail', async: false }),
    __param(0, (0, common_1.Inject)('REPOSITORY')),
    __metadata("design:paramtypes", [Object])
], UniqueEmailValidator);
exports.UniqueEmailValidator = UniqueEmailValidator;
//# sourceMappingURL=UniqueEmailValidator.js.map