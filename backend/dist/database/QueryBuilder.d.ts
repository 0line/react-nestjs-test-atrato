import { Model, Repository } from 'sequelize-typescript';
export declare class QueryBuilder {
    private repository;
    private where;
    private sort;
    private totalrecords;
    private totalrecordswithfilter;
    private limit;
    private page;
    private offset;
    constructor(repository: Repository<Model>);
    searchColumn(request: any): void;
    searchGlobal(request: any, columns: any): void;
    order(request: any, columns: any): void;
    paggination(request: any): void;
    render(request: any, columns: any): Promise<{
        data: any;
        totalPages: number;
        currentPage: number;
        totalrecors: any;
        totalfilteredrecords: any;
    }>;
    getColumsFromDTO(dto: any): Object[];
    addCondition({ condition }: {
        condition: Object;
    }): Promise<void>;
    addSort(sort: any): Promise<void>;
    runQueryFullQuery(): Promise<any>;
    CountQuery(): Promise<any>;
}
