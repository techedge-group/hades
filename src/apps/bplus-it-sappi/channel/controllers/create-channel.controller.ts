import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateChannelDto } from './../dto/create-channel.dto';
import { ChannelDto } from './../dto/channel.dto';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelByIdQuery } from '@hades/bplus-it-sappi/channel/application/find/find-channel-by-id.query';
import { CreateChannelCommand } from '@hades/bplus-it-sappi/channel/application/create/create-channel.command';

@ApiTags('[bplus-it-sappi] channel')
@ApiCreatedResponse({ description: 'The record has been successfully created.', type: ChannelDto})
@Controller('bplus-it-sappi/channel')
export class CreateChannelController 
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create channel' })
    async main(@Body() payload: CreateChannelDto)
    {
        await this.commandBus.dispatch(new CreateChannelCommand(
            payload.id,
            payload.tenantId,
            payload.systemId,
            payload.party,
            payload.component,
            payload.name,
            payload.flowParty,
            payload.flowComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.adapterType,
            payload.direction,
            payload.transportProtocol,
            payload.messageProtocol,
            payload.adapterEngineName,
            payload.url,
            payload.username,
            payload.remoteHost,
            payload.remotePort,
            payload.directory,
            payload.fileSchema,
            payload.proxyHost,
            payload.proxyPort,
            payload.destination,
            payload.adapterStatus,
            payload.softwareComponentName,
            payload.responsibleUserAccountName,
            payload.lastChangeUserAccount,
            payload.lastChangedAt,
            
        ));

        return await this.queryBus.ask(new FindChannelByIdQuery(payload.id));
    }
}