import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisher, EventBus, CommandBus } from '@nestjs/cqrs';

// custom items
import { FindResourceService } from './find-resource.service';
import { IResourceRepository } from './../../domain/resource.repository';
import { MockResourceRepository } from './../../infrastructure/mock/mock-resource.repository';

describe('FindResourceService', () => 
{
    let service: FindResourceService;
    let repository: IResourceRepository;
    let mockRepository: MockResourceRepository;

    beforeEach(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommandBus,
                EventBus,
                EventPublisher,
                FindResourceService,
                MockResourceRepository,
                { 
                    provide: IResourceRepository,
                    useValue: {
                        find: (queryStatements) => {}
                    }
                }
            ]
        }).compile();

        service         = module.get(FindResourceService);
        repository      = module.get(IResourceRepository);
        mockRepository  = module.get(MockResourceRepository);
    });

    describe('main', () => 
    {
        it('FindResourceService should be defined', () => 
        {
            expect(service).toBeDefined();
        });

        it('should find resource', async () => 
        {
            jest.spyOn(repository, 'find').mockImplementation(() => new Promise(resolve => resolve(mockRepository.collectionSource[0])));
            expect(await service.main([])).toBe(mockRepository.collectionSource[0]);
        });
    });
});