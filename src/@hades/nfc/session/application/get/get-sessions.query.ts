import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetSessionsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}