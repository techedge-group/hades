import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { PaginateSystemsQuery } from '@hades/cci/system/application/paginate/paginate-systems.query';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateSystemsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('cciPaginateSystems')
    async main(@Args('query') queryStatement?: QueryStatement, @Args('constraint') constraint?: QueryStatement): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateSystemsQuery(queryStatement, constraint));   
    }
}