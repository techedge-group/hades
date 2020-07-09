import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class GetSummariesQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = []
    ) {}
}