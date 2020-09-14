
import { IRepository } from '@hades/shared/domain/persistence/repository';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { OAuthRefreshToken } from './refresh-token.aggregate';
import { RefreshTokenId } from './value-objects';

export abstract class IRefreshTokenRepository implements IRepository<OAuthRefreshToken>
{
    abstract readonly repository: any;

    // paginate records
    abstract async paginate(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<OAuthRefreshToken>>;

    // create a single record
    abstract async create(refreshToken: OAuthRefreshToken): Promise<void>;

    // create a single or multiple records
    abstract async insert(refreshTokens: OAuthRefreshToken[], options?: object): Promise<void>;

    // find a single record
    abstract async find(query: QueryStatementInput[]): Promise<OAuthRefreshToken | null>;

    // find a single record by id
    abstract async findById(id: RefreshTokenId): Promise<OAuthRefreshToken | null>;

    // get multiple records
    abstract async get(query: QueryStatementInput[]): Promise<OAuthRefreshToken[]>;

    // update record
    abstract async update(refreshToken: OAuthRefreshToken): Promise<void>;
  
    // delete record
    abstract async deleteById(id: RefreshTokenId): Promise<void>;

    // delete records
    abstract async delete(query: QueryStatementInput[]): Promise<void>;
}