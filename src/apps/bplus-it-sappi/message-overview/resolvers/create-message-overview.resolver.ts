import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiCreateMessageOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { CreateMessageOverviewCommand } from '@hades/bplus-it-sappi/message-overview/application/create/create-message-overview.command';
import { FindMessageOverviewByIdQuery } from '@hades/bplus-it-sappi/message-overview/application/find/find-message-overview-by-id.query';

@Resolver()
export class CreateMessageOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiCreateMessageOverview')
    async main(@Args('payload') payload: BplusItSappiCreateMessageOverviewInput)
    {
        await this.commandBus.dispatch(new CreateMessageOverviewCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.numberMax,
            payload.numberDays,
            payload.success,
            payload.cancelled,
            payload.delivering,
            payload.error,
            payload.holding,
            payload.toBeDelivered,
            payload.waiting,
            
        ));
        
        return await this.queryBus.ask(new FindMessageOverviewByIdQuery(payload.id));
    }
}