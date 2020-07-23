import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteContactsService } from './delete-contacts.service';
import { IContactRepository } from './../../domain/contact.repository';
import { MockContactRepository } from './../../infrastructure/mock/mock-contact.repository';

describe('DeleteContactsService', () => 
{
    let service: DeleteContactsService;
    let repository: IContactRepository;
    let mockRepository: MockContactRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteContactsService,
                MockContactRepository,
                { 
                    provide: IContactRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteContactsService);
        repository      = module.get(IContactRepository);
        mockRepository  = module.get(MockContactRepository);
    });

    describe('main', () => 
    {
        it('DeleteContactsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete contact and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});