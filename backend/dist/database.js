"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
exports.Database = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [],
    migrations: [],
});
//# sourceMappingURL=database.js.map