import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { messagesOverview } from '@hades/bplus-it-sappi/message-overview/infrastructure/seeds/message-overview.seed';
import { CreateMessageOverviewService } from './create-message-overview.service';
import { 
    MessageOverviewId, 
    MessageOverviewTenantId, 
    MessageOverviewTenantCode, 
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
    MessageOverviewWaiting
    
} from './../../domain/value-objects';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { MockMessageOverviewRepository } from './../../infrastructure/mock/mock-message-overview.repository';

describe('CreateMessageOverviewService', () => 
{
    let service: CreateMessageOverviewService;
    let repository: IMessageOverviewRepository;
    let mockRepository: MockMessageOverviewRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                CreateMessageOverviewService,
                MockMessageOverviewRepository,
                { 
                    provide: IMessageOverviewRepository,
                    useValue: {
                        create: (item) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(CreateMessageOverviewService);
        repository      = module.get(IMessageOverviewRepository);
        mockRepository  = module.get(MockMessageOverviewRepository);
    });

    describe('main', () => 
    {
        test('CreateMessageOverviewService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should create a messageOverview and emit event', async () => 
        {
            expect(await service.main(
                new MessageOverviewId(messagesOverview[0].id),
                new MessageOverviewTenantId(messagesOverview[0].tenantId),
                new MessageOverviewTenantCode(messagesOverview[0].tenantCode),
                new MessageOverviewSystemId(messagesOverview[0].systemId),
                new MessageOverviewSystemName(messagesOverview[0].systemName),
                new MessageOverviewExecutionId(messagesOverview[0].executionId),
                new MessageOverviewExecutionType(messagesOverview[0].executionType),
                new MessageOverviewExecutionExecutedAt(messagesOverview[0].executionExecutedAt),
                new MessageOverviewExecutionMonitoringStartAt(messagesOverview[0].executionMonitoringStartAt),
                new MessageOverviewExecutionMonitoringEndAt(messagesOverview[0].executionMonitoringEndAt),
                new MessageOverviewNumberMax(messagesOverview[0].numberMax),
                new MessageOverviewNumberDays(messagesOverview[0].numberDays),
                new MessageOverviewSuccess(messagesOverview[0].success),
                new MessageOverviewCancelled(messagesOverview[0].cancelled),
                new MessageOverviewDelivering(messagesOverview[0].delivering),
                new MessageOverviewError(messagesOverview[0].error),
                new MessageOverviewHolding(messagesOverview[0].holding),
                new MessageOverviewToBeDelivered(messagesOverview[0].toBeDelivered),
                new MessageOverviewWaiting(messagesOverview[0].waiting),
                
            )).toBe(undefined);
        });
    });
});