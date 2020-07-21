import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExecutionsCommand } from './create-executions.command';
import { CreateExecutionsService } from './create-executions.service';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionSystemId, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt
    
} from './../../domain/value-objects';

@CommandHandler(CreateExecutionsCommand)
export class CreateExecutionsCommandHandler implements ICommandHandler<CreateExecutionsCommand>
{
    constructor(
        private readonly createExecutionsService: CreateExecutionsService
    ) { }

    async execute(command: CreateExecutionsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createExecutionsService.main(
            command.executions
                .map(execution => { 
                    return {
                        id: new ExecutionId(execution.id),
                        tenantId: new ExecutionTenantId(execution.tenantId),
                        systemId: new ExecutionSystemId(execution.systemId),
                        type: new ExecutionType(execution.type),
                        monitoringStartAt: new ExecutionMonitoringStartAt(execution.monitoringStartAt),
                        monitoringEndAt: new ExecutionMonitoringEndAt(execution.monitoringEndAt),
                        executedAt: new ExecutionExecutedAt(execution.executedAt),
                        
                    }
                })
        );
    }
}