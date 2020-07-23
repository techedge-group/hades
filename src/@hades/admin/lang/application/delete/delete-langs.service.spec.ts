import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteLangsService } from './delete-langs.service';
import { ILangRepository } from './../../domain/lang.repository';
import { MockLangRepository } from './../../infrastructure/mock/mock-lang.repository';

describe('DeleteLangsService', () => 
{
    let service: DeleteLangsService;
    let repository: ILangRepository;
    let mockRepository: MockLangRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteLangsService,
                MockLangRepository,
                { 
                    provide: ILangRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteLangsService);
        repository      = module.get(ILangRepository);
        mockRepository  = module.get(MockLangRepository);
    });

    describe('main', () => 
    {
        it('DeleteLangsService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete lang and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});