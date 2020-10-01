import { Controller, Delete, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { GetChannelsOverviewQuery } from '@hades/cci/channel-overview/application/get/get-channels-overview.query';
import { DeleteChannelsOverviewCommand } from '@hades/cci/channel-overview/application/delete/delete-channels-overview.command';

@ApiTags('[cci] channel-overview')
@Controller('cci/channels-overview')
export class DeleteChannelsOverviewController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete()
    @ApiOperation({ summary: 'Delete channels-overview in batch according to query' })
    @ApiOkResponse({ description: 'The records has been deleted successfully.', type: [ChannelOverviewDto] })
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
    async main(@Body('query') queryStatement?: QueryStatement)
    {
        const channelsOverview = await this.queryBus.ask(new GetChannelsOverviewQuery(queryStatement));

        await this.commandBus.dispatch(new DeleteChannelsOverviewCommand(queryStatement));

        return channelsOverview;
    }
}