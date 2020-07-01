import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    MessageOverviewId, 
    MessageOverviewTenantId, 
    MessageOverviewSystemId, 
    MessageOverviewSystemName, 
    MessageOverviewExecutionId, 
    MessageOverviewExecutionType, 
    MessageOverviewExecutionExecutedAt, 
    MessageOverviewExecutionMonitoringStartAt, 
    MessageOverviewExecutionMonitoringEndAt, 
    MessageOverviewNumberMax, 
    MessageOverviewNumberDays, 
    MessageOverviewSuccess, 
    MessageOverviewCancelled, 
    MessageOverviewDelivering, 
    MessageOverviewError, 
    MessageOverviewHolding, 
    MessageOverviewToBeDelivered, 
    MessageOverviewWaiting, 
    MessageOverviewCreatedAt, 
    MessageOverviewUpdatedAt, 
    MessageOverviewDeletedAt
    
} from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { BplusItSappiMessageOverview } from './../../domain/message-overview.entity';

@Injectable()
export class UpdateMessageOverviewService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(
        id: MessageOverviewId,
        tenantId?: MessageOverviewTenantId,
        systemId?: MessageOverviewSystemId,
        systemName?: MessageOverviewSystemName,
        executionId?: MessageOverviewExecutionId,
        executionType?: MessageOverviewExecutionType,
        executionExecutedAt?: MessageOverviewExecutionExecutedAt,
        executionMonitoringStartAt?: MessageOverviewExecutionMonitoringStartAt,
        executionMonitoringEndAt?: MessageOverviewExecutionMonitoringEndAt,
        numberMax?: MessageOverviewNumberMax,
        numberDays?: MessageOverviewNumberDays,
        success?: MessageOverviewSuccess,
        cancelled?: MessageOverviewCancelled,
        delivering?: MessageOverviewDelivering,
        error?: MessageOverviewError,
        holding?: MessageOverviewHolding,
        toBeDelivered?: MessageOverviewToBeDelivered,
        waiting?: MessageOverviewWaiting,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const messageOverview = BplusItSappiMessageOverview.register(
            id,
            tenantId,
            systemId,
            systemName,
            executionId,
            executionType,
            executionExecutedAt,
            executionMonitoringStartAt,
            executionMonitoringEndAt,
            numberMax,
            numberDays,
            success,
            cancelled,
            delivering,
            error,
            holding,
            toBeDelivered,
            waiting,
            null,
            new MessageOverviewUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(messageOverview);        
            
        // insert EventBus in object returned by the repository, to be able to apply and commit events
        const messageOverviewRegister = this.publisher.mergeObjectContext(
            await this.repository.findById(id)
        );
        
        messageOverviewRegister.updated(messageOverview); // apply event to model events
        messageOverviewRegister.commit(); // commit all events of model
    }
}