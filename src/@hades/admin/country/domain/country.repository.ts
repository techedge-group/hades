
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { AdminCountry } from './country.aggregate';
import { CountryId } from './value-objects';

export abstract class ICountryRepository implements IRepository<AdminCountry>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatement: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<AdminCountry>>;

    // create a single record
    abstract async create(country: AdminCountry): Promise<void>;

    // create a single or multiple records
    abstract async insert(countries: AdminCountry[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminCountry | null>;

    // find a single record by id
    abstract async findById(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminCountry | null>;

    // get multiple records
    abstract async get(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<AdminCountry[]>;

    // update record
    abstract async update(country: AdminCountry, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete record
    abstract async deleteById(id: CountryId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<void>;
}