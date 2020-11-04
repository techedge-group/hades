import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IDataLakeRepository } from './../../domain/data-lake.repository';
import { CciDataLake } from './../../domain/data-lake.aggregate';

@Injectable()
export class PaginateDataLakesService
{
    constructor(
        private readonly repository: IDataLakeRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciDataLake>>
    {
        return await this.repository.paginate(queryStatement, constraint, cQMetadata);
    }
}