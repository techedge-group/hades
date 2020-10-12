import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { PaginateSystemsService } from './paginate-systems.service';
import { ISystemRepository } from './../../domain/system.repository';
import { MockSystemRepository } from './../../infrastructure/mock/mock-system.repository';

describe('PaginateSystemsService', () => 
{
    let service: PaginateSystemsService;
    let repository: ISystemRepository;
    let mockRepository: MockSystemRepository;

    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateSystemsService,
                MockSystemRepository,
                { 
                    provide: ISystemRepository,
                    useValue: {
                        paginate: (queryStatement, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateSystemsService);
        repository      = module.get(ISystemRepository);
        mockRepository  = module.get(MockSystemRepository);
    });

    describe('main', () => 
    {
        test('PaginateSystemsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate systems', async () => 
        {
            jest.spyOn(repository, 'paginate').mockImplementation(() => new Promise(resolve => resolve({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            })));
            expect(await service.main({
                offset: 0,
                limit: 10
            })).toStrictEqual({
                total: mockRepository.collectionSource.slice(0,10).length,
                count: mockRepository.collectionSource.slice(0,10).length,
                rows: mockRepository.collectionSource.slice(0,10)
            });
        });
    });
});