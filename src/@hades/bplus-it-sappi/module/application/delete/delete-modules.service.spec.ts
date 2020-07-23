import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { DeleteModulesService } from './delete-modules.service';
import { IModuleRepository } from './../../domain/module.repository';
import { MockModuleRepository } from './../../infrastructure/mock/mock-module.repository';

describe('DeleteModulesService', () => 
{
    let service: DeleteModulesService;
    let repository: IModuleRepository;
    let mockRepository: MockModuleRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                DeleteModulesService,
                MockModuleRepository,
                { 
                    provide: IModuleRepository,
                    useValue: {
                        get: (queryStatements) => {},
                        delete: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(DeleteModulesService);
        repository      = module.get(IModuleRepository);
        mockRepository  = module.get(MockModuleRepository);
    });

    describe('main', () => 
    {
        it('DeleteModulesService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should delete module and emit event', async () => 
        {
            jest.spyOn(repository, 'get').mockImplementation(() => new Promise(resolve => resolve([])));
            expect(await service.main([])).toBe(undefined);
        });
    });
});