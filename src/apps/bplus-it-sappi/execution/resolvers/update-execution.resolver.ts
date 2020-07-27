import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { BplusItSappiUpdateExecutionInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateExecutionCommand } from '@hades/bplus-it-sappi/execution/application/update/update-execution.command';
import { FindExecutionByIdQuery } from '@hades/bplus-it-sappi/execution/application/find/find-execution-by-id.query';

@Resolver()
export class UpdateExecutionResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('bplusItSappiUpdateExecution')
    async main(@Args('payload') payload: BplusItSappiUpdateExecutionInput)
    {
        await this.commandBus.dispatch(new UpdateExecutionCommand(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.version,
            payload.type,
            payload.executedAt,
            payload.monitoringStartAt,
            payload.monitoringEndAt,
            
        ));
        
        return await this.queryBus.ask(new FindExecutionByIdQuery(payload.id));
    }
}