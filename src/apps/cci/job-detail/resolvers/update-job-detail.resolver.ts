import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateJobDetailInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateJobDetailCommand } from '@hades/cci/job-detail/application/update/update-job-detail.command';
import { FindJobDetailByIdQuery } from '@hades/cci/job-detail/application/find/find-job-detail-by-id.query';

@Resolver()
export class UpdateJobDetailResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateJobDetail')
    async main(@Args('payload') payload: CciUpdateJobDetailInput)
    {
        await this.commandBus.dispatch(new UpdateJobDetailCommand(
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
            payload.status,
            payload.name,
            payload.returnCode,
            payload.node,
            payload.user,
            payload.startAt,
            payload.endAt,
            
        ));
        
        return await this.queryBus.ask(new FindJobDetailByIdQuery(payload.id));
    }
}