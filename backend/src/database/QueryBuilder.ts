import { Op } from 'sequelize';
import { Model, Repository } from 'sequelize-typescript';
export class QueryBuilder {
  private repository: Repository<Model>;
  private where: object[];
  private sort: string[];
  private totalrecords: number;
  private totalrecordswithfilter: number;
  private limit: number;
  private page: number;
  private offset: number;
  constructor(repository: Repository<Model>) {
    this.repository = repository;
    this.limit = 10;
    this.page = 1;
    this.offset = 0;
  }

  searchColumn(request: any) {
    if (typeof request !== 'undefined') {
      const searchColumns = {};
      Object.keys(this.repository.getAttributes()).filter(function (key): void {
        if (request.hasOwnProperty(key)) {
          searchColumns[`${key}`] = { [Op.like]: '%' + request[key] + '%' };
        }
      });
      if (Object.keys(searchColumns).length != 0) {
        this.addCondition({ condition: { [Op.or]: [searchColumns] } });
      }
    }
  }

  searchGlobal(request: any, columns: any) {
    if (
      typeof request.gsearch !== 'undefined' &&
      request.gsearch !== '' &&
      request.gsearch !== null
    ) {
      const searchGlobal = {};
      Object.values(columns).forEach((keyColumn) => {
        searchGlobal[`${keyColumn}`] = { [Op.like]: `%${request['gsearch']}%` };
      });
      this.addCondition({
        condition: { [Op.or]: [{ [Op.or]: searchGlobal }] },
      });
    }
  }

  order(request: any, columns: any) {
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

  paggination(request: any) {
    if (
      typeof request.page !== 'undefined' &&
      typeof request.limit !== 'undefined'
    ) {
      if (request.limit > 0) {
        this.page = parseInt(request.page);
        this.limit = parseInt(request.limit);
        this.offset = parseInt(this.limit * this.page - this.limit);
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

  getColumsFromDTO(dto: any) {
    const columns: Array<Object> = Object.keys(dto).map((key) => {
      return { text: key, value: key };
    });
    return columns;
  }

  async addCondition({ condition }: { condition: Object }) {
    if (
      typeof this.where !== 'undefined' &&
      this.where != null &&
      this.where.length != null &&
      this.where.length > 0
    ) {
      this.where = [...this.where, condition];
    } else {
      this.where = new Array(condition);
    }
  }

  async addSort(sort: any): Promise<void> {
    this.sort = [sort];
  }

  async runQueryFullQuery() {
    let where;
    const sort = this.sort;
    if (
      typeof this.where !== 'undefined' &&
      this.where != null &&
      this.where.length != null &&
      this.where.length > 0
    ) {
      where = {
        [Op.or]: this.where,
      };
      return await this.repository
        .findAll<Model>({
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
    } else {
      return await this.repository
        .findAll<Model>({
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
    if (
      typeof this.where !== 'undefined' &&
      this.where != null &&
      this.where.length != null &&
      this.where.length > 0
    ) {
      where = {
        [Op.or]: this.where,
      };
      return await this.repository
        .findAndCountAll<Model>({
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
    } else {
      return await this.repository
        .findAndCountAll<Model>()
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
