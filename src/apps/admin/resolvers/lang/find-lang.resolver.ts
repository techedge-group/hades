import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindLangQuery } from '@hades/admin/lang/application/find/find-lang.query';
import { AdminLang, QueryStatementInput } from './../../../../graphql';

@Resolver()
export class FindLangResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('adminFindLang')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<AdminLang>
    {
        return await this.queryBus.ask(new FindLangQuery(queryStatements));
    }
}