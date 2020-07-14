import { Resolver, Query, Args } from '@nestjs/graphql';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { GetActionsQuery } from '@hades/nfc/action/application/get/get-actions.query';
import { NfcAction } from './../../../../graphql';

@Resolver()
export class GetActionsResolver
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Query('nfcGetActions')
    async main(@Args('query') queryStatements: QueryStatementInput[]): Promise<NfcAction[]>
    {
        return await this.queryBus.ask(new GetActionsQuery(queryStatements));
    }
}