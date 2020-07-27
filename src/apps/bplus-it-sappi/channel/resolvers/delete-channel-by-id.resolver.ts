import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { FindChannelByIdQuery } from '@hades/bplus-it-sappi/channel/application/find/find-channel-by-id.query';
import { DeleteChannelByIdCommand } from '@hades/bplus-it-sappi/channel/application/delete/delete-channel-by-id.command';

@Resolver()
export class DeleteChannelByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteChannelById')
    async main(@Args('id') id: string)
    {
        const channel = await this.queryBus.ask(new FindChannelByIdQuery(id));

        await this.commandBus.dispatch(new DeleteChannelByIdCommand(id));

        return channel;
    }
}