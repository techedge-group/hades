import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';

export class PaginateTagsQuery
{
    constructor(
        public queryStatements: QueryStatementInput[] = [],
        public constraint: QueryStatementInput[] = [],
    ) {}
}