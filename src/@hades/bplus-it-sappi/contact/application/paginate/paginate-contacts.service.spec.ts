import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';
import { Command } from '@hades/shared/domain/persistence/sql-statement-input';

// custom items
import { PaginateContactsService } from './paginate-contacts.service';
import { IContactRepository } from './../../domain/contact.repository';
import { MockContactRepository } from './../../infrastructure/mock/mock-contact.repository';

describe('PaginateContactsService', () => 
{
    let service: PaginateContactsService;
    let repository: IContactRepository;
    let mockRepository: MockContactRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                PaginateContactsService,
                MockContactRepository,
                { 
                    provide: IContactRepository,
                    useValue: {
                        paginate: (queryStatements, constraints) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(PaginateContactsService);
        repository      = module.get(IContactRepository);
        mockRepository  = module.get(MockContactRepository);
    });

    describe('main', () => 
    {
        test('PaginateContactsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        test('should paginate contacts', async () => 
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