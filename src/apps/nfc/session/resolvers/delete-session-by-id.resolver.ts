import { Resolver, Args, Mutation } from '@nestjs/graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus.service';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus.service';
import { FindSessionByIdQuery } from '@hades/nfc/session/application/find/find-session-by-id.query';
import { DeleteSessionByIdCommand } from '@hades/nfc/session/application/delete/delete-session-by-id.command';

@Resolver()
export class DeleteSessionByIdResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('nfcDeleteSessionById')
    async main(@Args('id') id: string)
    {
        const session = await this.queryBus.ask(new FindSessionByIdQuery(id));

        await this.commandBus.dispatch(new DeleteSessionByIdCommand(id));

        return session;
    }
}