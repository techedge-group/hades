import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    ExecutionId, 
    ExecutionTenantId, 
    ExecutionSystemId, 
    ExecutionType, 
    ExecutionMonitoringStartAt, 
    ExecutionMonitoringEndAt, 
    ExecutionExecutedAt, 
    ExecutionCreatedAt, 
    ExecutionUpdatedAt, 
    ExecutionDeletedAt
    
} from './../../domain/value-objects';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.aggregate';

@Injectable()
export class UpdateExecutionService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IExecutionRepository
    ) {}

    public async main(
        id: ExecutionId,
        tenantId?: ExecutionTenantId,
        systemId?: ExecutionSystemId,
        type?: ExecutionType,
        monitoringStartAt?: ExecutionMonitoringStartAt,
        monitoringEndAt?: ExecutionMonitoringEndAt,
        executedAt?: ExecutionExecutedAt,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const execution = BplusItSappiExecution.register(
            id,
            tenantId,
            systemId,
            type,
            monitoringStartAt,
            monitoringEndAt,
            executedAt,
            null,
            new ExecutionUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(execution);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const executionRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        executionRegister.updated(execution); // apply event to model events
        executionRegister.commit(); // commit all events of model
    }
}