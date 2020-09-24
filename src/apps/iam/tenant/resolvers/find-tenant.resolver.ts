import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindTenantQuery } from '@hades/iam/tenant/application/find/find-tenant.query';
import { IamTenant } from './../../../../graphql';

@Resolver()
export class FindTenantResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('iamFindTenant')
    async main(@Args('query') queryStatement?: QueryStatement): Promise<IamTenant>
    {
        return await this.queryBus.ask(new FindTenantQuery(queryStatement));
    }
}