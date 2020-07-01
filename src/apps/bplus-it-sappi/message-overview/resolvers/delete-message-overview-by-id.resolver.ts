import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindMessageOverviewByIdQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview-by-id.query';
import { DeleteMessageOverviewByIdCommand } from '@hades/bplus-it-sappi/message-overview/application/delete/delete-message-overview-by-id.command';

@Resolver()
export class DeleteMessageOverviewByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiDeleteMessageOverviewById')
    async main(@Args('id') id: string)
    {
        const messageOverview = await this.queryBus.ask(new FindMessageOverviewByIdQuery(id));

        await this.commandBus.dispatch(new DeleteMessageOverviewByIdCommand(id));

        return messageOverview;
    }
}