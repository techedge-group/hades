import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelOverviewDto } from './../dto/channel-overview.dto';

// @hades
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelOverviewByIdQuery } from '@hades/cci/channel-overview/application/find/find-channel-overview-by-id.query';

@ApiTags('[cci] channel-overview')
@Controller('cci/channel-overview')
export class FindChannelOverviewByIdController 
{
    constructor(
        private readonly queryBus: IQueryBus
    ) {}

    @Get(':id')
    @ApiOperation({ summary: 'Find channel-overview by id' })
    @ApiOkResponse({ description: 'The record has been successfully created.', type: ChannelOverviewDto })
    async main(@Param('id') id: string)
    {
        return await this.queryBus.ask(new FindChannelOverviewByIdQuery(id));
    }
}