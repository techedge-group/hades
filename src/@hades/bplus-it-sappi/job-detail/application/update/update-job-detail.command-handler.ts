import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateJobDetailCommand } from './update-job-detail.command';
import { UpdateJobDetailService } from './update-job-detail.service';
import { 
    JobDetailId, 
    JobDetailTenantId, 
    JobDetailTenantCode, 
    JobDetailSystemId, 
    JobDetailSystemName, 
    JobDetailExecutionId, 
    JobDetailExecutionType, 
    JobDetailExecutionExecutedAt, 
    JobDetailExecutionMonitoringStartAt, 
    JobDetailExecutionMonitoringEndAt, 
    JobDetailStatus, 
    JobDetailName, 
    JobDetailReturnCode, 
    JobDetailNode, 
    JobDetailUser, 
    JobDetailStartAt, 
    JobDetailEndAt
    
} from './../../domain/value-objects';

@CommandHandler(UpdateJobDetailCommand)
export class UpdateJobDetailCommandHandler implements ICommandHandler<UpdateJobDetailCommand>
{
    constructor(
        private readonly updateJobDetailService: UpdateJobDetailService
    ) { }

    async execute(command: UpdateJobDetailCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateJobDetailService.main(
            new JobDetailId(command.id),
            new JobDetailTenantId(command.tenantId, { undefinable: true }),
            new JobDetailTenantCode(command.tenantCode, { undefinable: true }),
            new JobDetailSystemId(command.systemId, { undefinable: true }),
            new JobDetailSystemName(command.systemName, { undefinable: true }),
            new JobDetailExecutionId(command.executionId, { undefinable: true }),
            new JobDetailExecutionType(command.executionType, { undefinable: true }),
            new JobDetailExecutionExecutedAt(command.executionExecutedAt, { undefinable: true }),
            new JobDetailExecutionMonitoringStartAt(command.executionMonitoringStartAt, { undefinable: true }),
            new JobDetailExecutionMonitoringEndAt(command.executionMonitoringEndAt, { undefinable: true }),
            new JobDetailStatus(command.status, { undefinable: true }),
            new JobDetailName(command.name),
            new JobDetailReturnCode(command.returnCode),
            new JobDetailNode(command.node),
            new JobDetailUser(command.user),
            new JobDetailStartAt(command.startAt, { undefinable: true }),
            new JobDetailEndAt(command.endAt, { undefinable: true }),
            
        )
    }
}