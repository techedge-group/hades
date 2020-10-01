import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { ILangRepository } from './../../domain/lang.repository';
import { AdminLang } from './../../domain/lang.aggregate';

@Injectable()
export class PaginateLangsService
{
    constructor(
        private readonly repository: ILangRepository
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement): Promise<Pagination<AdminLang>>
    {        
        return await this.repository.paginate(queryStatement, constraint);
    }
}