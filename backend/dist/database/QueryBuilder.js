"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const sequelize_1 = require("sequelize");
class QueryBuilder {
    constructor(repository) {
        this.repository = repository;
        this.limit = 10;
        this.page = 1;
        this.offset = 0;
    }
    searchColumn(request) {
        if (typeof request !== 'undefined') {
            const searchColumns = {};
            Object.keys(this.repository.getAttributes()).filter(function (key) {
                if (request.hasOwnProperty(key)) {
                    searchColumns[`${key}`] = { [sequelize_1.Op.like]: '%' + request[key] + '%' };
                }
            });
            if (Object.keys(searchColumns).length != 0) {
                this.addCondition({ condition: { [sequelize_1.Op.or]: [searchColumns] } });
            }
        }
    }
    searchGlobal(request, columns) {
        if (typeof request.gsearch !== 'undefined' &&
            request.gsearch !== '' &&
            request.gsearch !== null) {
            const searchGlobal = {};
            Object.values(columns).forEach((keyColumn) => {
                searchGlobal[`${keyColumn}`] = { [sequelize_1.Op.like]: `%${request['gsearch']}%` };
            });
            this.addCondition({
                condition: { [sequelize_1.Op.or]: [{ [sequelize_1.Op.or]: searchGlobal }] },
            });
        }
    }
    order(request, columns) {
        let namesort = request.orderBy;
        let sort = request.orderdirection;
        if (typeof namesort === 'undefined') {
            namesort = columns[0];
        }
        if (typeof namesort === 'string') {
            namesort = namesort.toString().toLowerCase().replace(/,\s/g, '');
        }
        if (typeof sort === 'undefined') {
            sort = 'asc';
        }
        if (typeof sort === 'string') {
            sort = sort.toString().toLowerCase().replace(/,\s/g, '');
        }
        const aSort = [namesort, sort];
        this.addSort(aSort);
    }
    paggination(request) {
        if (typeof request.page !== 'undefined' &&
            typeof request.limit !== 'undefined') {
            if (request.limit > 0) {
                this.page = parseInt(request.page);
                this.limit = parseInt(request.limit);
                this.offset = this.limit * this.page - this.limit;
            }
        }
    }
    async render(request, columns) {
        const totalrecors = await this.CountQuery();
        this.searchGlobal(request, columns);
        this.searchColumn(request);
        this.order(request, columns);
        this.paggination(request);
        const totalfilteredrecords = await this.CountQuery();
        const data = await this.runQueryFullQuery();
        const totalPages = Math.ceil(totalrecors / this.limit);
        return {
            data,
            totalPages,
            currentPage: this.page,
            totalrecors,
            totalfilteredrecords,
        };
    }
    getColumsFromDTO(dto) {
        const columns = Object.keys(dto).map((key) => {
            return { text: key, value: key };
        });
        return columns;
    }
    async addCondition({ condition }) {
        if (typeof this.where !== 'undefined' &&
            this.where != null &&
            this.where.length != null &&
            this.where.length > 0) {
            this.where = [...this.where, condition];
        }
        else {
            this.where = new Array(condition);
        }
    }
    async addSort(sort) {
        this.sort = [sort];
    }
    async runQueryFullQuery() {
        let where;
        const sort = this.sort;
        if (typeof this.where !== 'undefined' &&
            this.where != null &&
            this.where.length != null &&
            this.where.length > 0) {
            where = {
                [sequelize_1.Op.or]: this.where,
            };
            return await this.repository
                .findAll({
                where: where,
                order: sort,
                limit: this.limit,
                offset: this.offset,
            })
                .then(function (resultado) {
                return resultado;
            })
                .catch(function (error) {
                return error;
            });
        }
        else {
            return await this.repository
                .findAll({
                order: sort,
                limit: this.limit,
                offset: this.offset,
            })
                .then(function (resultado) {
                return resultado;
            })
                .catch(function (error) {
                return error;
            });
        }
    }
    async CountQuery() {
        let where;
        const sort = this.sort;
        if (typeof this.where !== 'undefined' &&
            this.where != null &&
            this.where.length != null &&
            this.where.length > 0) {
            where = {
                [sequelize_1.Op.or]: this.where,
            };
            return await this.repository
                .findAndCountAll({
                where: where,
                order: sort,
                limit: this.limit,
                offset: this.offset,
            })
                .then(function (resultado) {
                const { count } = resultado;
                return count;
            })
                .catch(function (error) {
                return error;
            });
        }
        else {
            return await this.repository
                .findAndCountAll()
                .then(function (resultado) {
                const { count } = resultado;
                return count;
            })
                .catch(function (error) {
                return error;
            });
        }
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=QueryBuilder.js.map