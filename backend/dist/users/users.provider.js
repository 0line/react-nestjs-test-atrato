"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const users_entity_1 = require("./entities/users.entity");
exports.usersProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: users_entity_1.Users,
    },
];
//# sourceMappingURL=users.provider.js.map