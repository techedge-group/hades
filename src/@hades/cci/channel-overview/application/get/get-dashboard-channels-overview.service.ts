import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';

@Injectable()
export class GetDashboardChannelsOverviewService
{
    constructor(
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(tenantIds: string[], systemIds: string[]): Promise<CciChannelOverview[]>
    {
        return await this.repository.getDashboardData(tenantIds, systemIds);
    }
}