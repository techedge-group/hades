import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';

export class GetRolesQuery
{
    constructor(
        public queryStatement?: QueryStatement
    ) {}
}