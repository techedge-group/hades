import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { FindAccessTokenQuery } from '@hades/o-auth/access-token/application/find/find-access-token.query';
import { OAuthAccessToken } from './../../../../graphql';

@Resolver()
export class FindAccessTokenResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('oAuthFindAccessToken')
    async main(@Args('query') queryStatement: QueryStatement): Promise<OAuthAccessToken>
    {
        return await this.queryBus.ask(new FindAccessTokenQuery(queryStatement));
    }
}