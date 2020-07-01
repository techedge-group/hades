import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { PaginateSystemsQuery } from '@hades/bplus-it-sappi/system/application/paginate/paginate-systems.query';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from './../../../../graphql';

@Resolver()
export class PaginateSystemsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiPaginateSystems')
    async main(@Args('query') queryStatements: QueryStatementInput[], @Args('constraint') constraint: QueryStatementInput[]): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginateSystemsQuery(queryStatements, constraint));   
    }
}