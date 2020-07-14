import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindExecutionQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution.query';
import { BplusItSappiExecution } from './../../../../graphql';

@Resolver()
export class FindExecutionResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindExecution')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiExecution>
    {
        return await this.queryBus.ask(new FindExecutionQuery(queryStatements));
    }
}