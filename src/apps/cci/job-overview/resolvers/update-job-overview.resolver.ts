import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { CciUpdateJobOverviewInput } from './../../../../graphql';

// @hades
import { ICommandBus } from '@hades/shared/domain/bus/command-bus';
import { IQueryBus } from '@hades/shared/domain/bus/query-bus';
import { UpdateJobOverviewCommand } from '@hades/cci/job-overview/application/update/update-job-overview.command';
import { FindJobOverviewByIdQuery } from '@hades/cci/job-overview/application/find/find-job-overview-by-id.query';

@Resolver()
export class UpdateJobOverviewResolver
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus
    ) {}

    @Mutation('cciUpdateJobOverview')
    async main(@Args('payload') payload: CciUpdateJobOverviewInput)
    {
        await this.commandBus.dispatch(new UpdateJobOverviewCommand(
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
            payload.cancelled,
            payload.completed,
            payload.error,
            
        ));
        
        return await this.queryBus.ask(new FindJobOverviewByIdQuery(payload.id));
    }
}