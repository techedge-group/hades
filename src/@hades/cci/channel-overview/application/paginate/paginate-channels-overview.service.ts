import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';

@Injectable()
export class PaginateChannelsOverviewService
{
    constructor(
        private readonly repository: IChannelOverviewRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciChannelOverview>>
    {
        return await this.repository.paginate(queryStatement, constraint, cQMetadata);
    }
}