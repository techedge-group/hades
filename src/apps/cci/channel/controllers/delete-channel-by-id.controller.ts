import { Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';
import { DeleteChannelByIdCommand } from '@hades/cci/channel/application/delete/delete-channel-by-id.command';

@ApiTags('[cci] channel')
@Controller('cci/channel')
export class DeleteChannelByIdController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete channel by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: ChannelDto })
    async main(@Param('id') id: string)
    {
        const channel = await this.queryBus.ask(new FindChannelByIdQuery(id));

        await this.commandBus.dispatch(new DeleteChannelByIdCommand(id));

        return channel;
    }
}