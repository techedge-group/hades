import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';

// custom items
import { PaginateChannelsDetailService } from './paginate-channels-detail.service';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { MockChannelDetailRepository } from './../../infrastructure/mock/mock-channel-detail.repository';

describe('PaginateChannelsDetailService', () => 
{
    let service: PaginateChannelsDetailService;
    let repository: IChannelDetailRepository;
    let mockRepository: MockChannelDetailRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateChannelsDetailService,
                MockChannelDetailRepository,
                { 
                    provide: IChannelDetailRepository,
                    useValue: {
                        paginate: (queryStatements, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateChannelsDetailService);
        repository      = module.get(IChannelDetailRepository);
        mockRepository  = module.get(MockChannelDetailRepository);
    });

    describe('main', () => 
    {
        test('PaginateChannelsDetailService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate channelsDetail', async () => 
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main([
                {
                    'command': Command.OFFSET,
                    'value': 0
                },
                {
                    'command': Command.LIMIT,
                    'value': 10
                }
            ], [])).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});