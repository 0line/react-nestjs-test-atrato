"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueValidator = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const types_1 = require("sequelize/types");
class UniqueValidator {
    constructor(repository) {
        this.repository = repository;
    }
    async validate(value) {
        return ((await this.repository.count({
            where: {
                email: {
                    [types_1.Op.eq]: value,
                },
            },
        })) <= 0);
    }
    defaultMessage(args) {
        const entity = sequelize_typescript_1.Model.getTableName || 'Entity';
        return `${entity} with the same '${args.property}' already exist`;
    }
}
exports.UniqueValidator = UniqueValidator;
//# sourceMappingURL=abstract-unique-validator.js.map