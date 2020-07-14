import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { FindRoleQuery } from '@hades/bplus-it-sappi/role/application/find/find-role.query';
import { BplusItSappiRole } from './../../../../graphql';

@Resolver()
export class FindRoleResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('bplusItSappiFindRole')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<BplusItSappiRole>
    {
        return await this.queryBus.ask(new FindRoleQuery(queryStatements));
    }
}