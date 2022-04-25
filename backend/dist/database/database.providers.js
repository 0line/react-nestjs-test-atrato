"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => new typeorm_1.DataSource({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'atrato',
            synchronize: true,
            logging: true,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            subscribers: [],
            migrations: [],
        })
            .initialize()
            .then(() => {
        })
            .catch((error) => console.log(error)),
    },
];
//# sourceMappingURL=database.providers.js.map