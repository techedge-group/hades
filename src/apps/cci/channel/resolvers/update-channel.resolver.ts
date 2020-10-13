import { UseGuards } from '@nestjs/common';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateChannelInput } from './../../../../graphql';

// authorization
import { Permissions } from './../../../shared/modules/auth/decorators/permissions.decorator';
import { AuthGraphQLJwtGuard } from './../../../shared/modules/auth/guards/auth-graphql-jwt.guard';
import { AuthorizationGraphQLGuard } from './../../../shared/modules/auth/guards/authorization-graphql.guard';
import { CurrentAccount } from './../../../shared/decorators/current-account.decorator';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateChannelCommand } from '@hades/cci/channel/application/update/update-channel.command';
import { FindChannelByIdQuery } from '@hades/cci/channel/application/find/find-channel-by-id.query';
import { AccountResponse } from '@hades/iam/account/domain/account.response';

@Resolver()
@Permissions('cci.channel.update')
@UseGuards(AuthGraphQLJwtGuard, AuthorizationGraphQLGuard)
export class UpdateChannelResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateChannel')
    async main(@CurrentAccount() account: AccountResponse, @Args('payload') payload: CciUpdateChannelInput)
    {
        await this.commandBus.dispatch(new UpdateChannelCommand(
            payload.id,
            payload.hash,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.party,
            payload.component,
            payload.name,
            payload.flowHash,
            payload.flowParty,
            payload.flowReceiverParty,
            payload.flowComponent,
            payload.flowReceiverComponent,
            payload.flowInterfaceName,
            payload.flowInterfaceNamespace,
            payload.version,
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
            payload.riInterfaceName,
            payload.riInterfaceNamespace,
            
        ));
        
        return await this.queryBus.ask(new FindChannelByIdQuery(payload.id));
    }
}